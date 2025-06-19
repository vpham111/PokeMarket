import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

class Card {
    String name;
    String set;
    String img;
    String rarity;
    String cardNum;
}

public class ReadFile {
    public static void main(String[] args) throws ClassNotFoundException, SQLException, FileNotFoundException {
        String path = "E:\\cs122b\\PokeMarket\\backend\\data";
        File file = new File(path);
        File[] files = file.listFiles();

        Class.forName("org.postgresql.Driver");
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/pokemarket", "postgres", "pokemarket");
        Gson gson = new Gson();

        if (files != null) {
            for (File f : files) {
                try (JsonReader jsonReader = new JsonReader(new FileReader(f.getAbsolutePath()))) {
                    jsonReader.beginObject();
                    String setName = null;
                    UUID setId = null;
                    while (jsonReader.hasNext()) {
                        String key  = jsonReader.nextName();
                        if (key.equals("setName")) {
                            setName = jsonReader.nextString();
                            String sql = "INSERT INTO Set (name, language) VALUES (?, ?) RETURNING id";
                            PreparedStatement pstmt = conn.prepareStatement(sql);
                            pstmt.setString(1, setName);
                            pstmt.setString(2, "English");
                            ResultSet rs = pstmt.executeQuery();

                            if (rs.next()) {
                               setId = (UUID) rs.getObject("id");
                            }
                            System.out.println("Inserted set: " + setName + " with id: " + setId);
                        }
                        else if (key.equals("cards")) {
                            jsonReader.beginArray();
                            while (jsonReader.hasNext()) {
                                Card card = gson.fromJson(jsonReader, Card.class);
                                String insertCardSQL = "INSERT INTO Card (name, setId, rarity, card_number, language) VALUES (?, ?, ?, ?, ?)";
                                PreparedStatement psCard = conn.prepareStatement(insertCardSQL);
                                psCard.setString(1, card.name);
                                psCard.setObject(2, setId);
                                psCard.setString(3, card.rarity);
                                psCard.setString(4, card.cardNum);
                                psCard.setString(5, "English");
                                psCard.executeUpdate();
                                System.out.println("Inserted card: " + card.name);
                            }
                        }
                    }
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}

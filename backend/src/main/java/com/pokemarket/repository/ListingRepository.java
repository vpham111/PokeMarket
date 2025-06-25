package com.pokemarket.repository;

import com.pokemarket.model.Condition;
import com.pokemarket.model.Listings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ListingRepository extends JpaRepository<Listings, UUID> {
    @Query(value = """
            SELECT *
            FROM Listings 
            WHERE seller_id = :seller_id
""", nativeQuery = true)
    List<Listings> getListingsBySellerId(@Param("seller_id") UUID seller_id);

    @Query(value = """
        SELECT * 
        FROM Listings
        WHERE card_id = :card_id
""", nativeQuery = true)
    List<Listings> getListingsByCardId(@Param("card_id") UUID card_id);

    @Modifying
    @Transactional
    @Query(value = """
    INSERT INTO Listings (card_id, full_name, seller_id, seller_name, price, quantity, created_at, condition) VALUES (:cardId, :full_name, :sellerId, :seller_name, :price, :quantity, :currentTime, CAST(:condition AS cardcondition))
""", nativeQuery = true)
    void createListing(@Param("cardId") UUID cardId,@Param("full_name") String full_name, @Param("sellerId") UUID sellerId, @Param("seller_name") String seller_name ,
                       @Param("price") float price , @Param("quantity") int quantity, @Param("currentTime")LocalDateTime currentTime, @Param("condition") String condition);
}

package com.pokemarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name="Card")
public class Card {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, name = "set_id")
    private UUID setId;

    @Column(nullable = false)
    private String rarity;

    @Column(nullable = false)
    private String card_number;

    @Column(nullable = false)
    private String language;

    public Card() {

    }

    public Card(UUID id, String name, UUID setId, String rarity, String card_number, String language) {
        this.id = id;
        this.name = name;
        this.setId = setId;
        this.rarity = rarity;
        this.card_number = card_number;
        this.language = language;
    }

    public UUID getId() {return id;}

    public void setId(UUID id) {this.id = id;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public UUID getSetId() {return setId;}

    public void setSetId(UUID setId) {this.setId = setId;}

    public String getRarity() {return rarity;}

    public void setRarity(String rarity) {this.rarity = rarity;}

    public String getCard_number() {return card_number;}

    public void setCard_number(String card_number) {this.card_number = card_number;}

    public String getLanguage() {return language;}

    public void setLanguage(String language) {this.language = language;}

}

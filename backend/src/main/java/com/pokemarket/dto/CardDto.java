package com.pokemarket.dto;

import java.util.UUID;

public class CardDto {

    private UUID id;
    private String name;
    private UUID setId;
    private String rarity;
    private String card_number;
    private String language;         

    public CardDto() {

    }

    public CardDto(UUID id, String name, UUID setId, String rarity, String card_number, String language) {
        this.id = id;
        this.name = name;
        this.setId = setId;
        this.rarity = rarity;
        this.card_number = card_number;
        this.language = language;        
    }

    public UUID getId(){
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity;
    }

    public String card_number() {
        return card_number;
    }

    public void setCard_number(String card_number) {
        this.card_number = card_number;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

}

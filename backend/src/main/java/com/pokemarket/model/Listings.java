package com.pokemarket.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name="Listings")
public class Listings {

    @Id
    private UUID id;

    @Column
    private UUID card_id;

    @Column
    private String full_name;

    @Column
    private UUID seller_id;

    @Column
    private String seller_name;

    @Column
    private float price;

    @Column
    private int quantity;

    @Column
    private Timestamp created_at;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Condition condition;

    public Listings() {

    }

    public Listings(UUID id, UUID card_id, String full_name, UUID seller_id, String seller_name, float price, int quantity, Timestamp created_at, Status status, Condition condition) {
        this.id = id;
        this.card_id = card_id;
        this.full_name = full_name;
        this.seller_id = seller_id;
        this.seller_name = seller_name;
        this.price = price;
        this.quantity = quantity;
        this.created_at = created_at;
        this.status = status;
        this.condition = condition;
    }

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getCard_id() {
        return card_id;
    }
    public void setCard_id(UUID card_id) {
        this.card_id = card_id;
    }
    public String getFull_name() { return full_name; }
    public void setFull_name(String full_name) { this.full_name = full_name; }
    public UUID getSeller_id() {
        return seller_id;
    }
    public void setSeller_id(UUID seller_id) {
        this.seller_id = seller_id;
    }
    public String getSeller_name() { return seller_name; }
    public void setSeller_name(String seller_name) { this.seller_name = seller_name; }
    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public Timestamp getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public Condition getCondition() {return condition;}
    public void setCondition(Condition condition) {this.condition = condition;}
}

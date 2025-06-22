package com.pokemarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="Set")
public class Set {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private Date release_date;

    public Set() {

    }

    public Set(UUID id, String name, String language, Date release_date) {
        this.id = id;
        this.name = name;
        this.language = language;
        this.release_date = release_date;
    }

    public UUID getId() {return this.id;}

    public void setId(UUID id) {this.id = id;}

    public String getName() {return this.name;}

    public void setName(String name) {this.name = name;}

    public String getLanguage() {return this.language;}

    public void setLanguage(String language) {this.language = language;}

    public Date getRelease_date() {return this.release_date;}

    public void setRelease_date(Date release_date) {this.release_date = release_date;}

}

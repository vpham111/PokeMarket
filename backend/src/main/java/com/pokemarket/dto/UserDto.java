package com.pokemarket.dto;

import java.time.LocalDate;
import java.util.UUID;


public class UserDto {

    private UUID id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String bio;         
    private LocalDate joinedAt;

    public UserDto() {

    }

    public UserDto(UUID id, String firstname, String lastname, String email, String password, String bio, LocalDate joinedAt) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.joinedAt = joinedAt;
        
    }

    public UUID getId(){
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstname;
    }

    public void setFirstName(String firstname) {
        this.firstname = firstname;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDate joinedAt) {
        this.joinedAt = joinedAt;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    
}

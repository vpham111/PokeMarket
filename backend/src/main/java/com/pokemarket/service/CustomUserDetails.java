package com.pokemarket.service;

import java.util.Collection;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {

 private UUID id;
 private String password;
 private String email;
 private Collection<? extends GrantedAuthority> authorities;
 private String firstName;
private String lastName;


 public CustomUserDetails(UUID id, String email, String password, Collection<? extends GrantedAuthority> authorities,
   String firstName, String lastName) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
    this.firstName = firstName;
    this.lastName = lastName;
 }

 public String getFirstName() {
  return firstName;
 }

 public String getLastName() {
  return lastName;
 }

 public UUID getId() {
    return id;
 }

 @Override
 public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
 }

 @Override
 public String getUsername() {
    return email; 
 }

 @Override
 public String getPassword() {
    return password;
 }

 @Override
 public boolean isAccountNonExpired() {
    return true;
 }

 @Override
 public boolean isAccountNonLocked() {
    return true;
 }

 @Override
 public boolean isCredentialsNonExpired() {
    return true;
 }


 @Override
 public boolean isEnabled() {
    return true;
 }
}
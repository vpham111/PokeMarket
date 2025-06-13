package com.pokemarket.service;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pokemarket.model.User;
import com.pokemarket.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

 private UserRepository userRepository;

 public CustomUserDetailsService(UserRepository userRepository) {
  super();
  this.userRepository = userRepository;
 }

 @Override
 public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

  User user = userRepository.findByEmail(email);
  if (user == null) {
   throw new UsernameNotFoundException("User with email " + email + " not found");
  }
  return new CustomUserDetails(
            user.getId(),
            user.getEmail(), // using email as username
            user.getPassword(),
            getAuthorities(),
            user.getFirstName(),
            user.getLastName()
        );
 }

 public Collection<? extends GrantedAuthority> getAuthorities() {
  return Arrays.asList(new SimpleGrantedAuthority("USER"));
 }

}
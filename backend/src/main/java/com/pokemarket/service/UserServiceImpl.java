package com.pokemarket.service;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pokemarket.model.User;
import com.pokemarket.dto.UserDto;
import com.pokemarket.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

 @Autowired
 PasswordEncoder passwordEncoder;

 private UserRepository userRepository;

 public UserServiceImpl(UserRepository userRepository) {
  super();
  this.userRepository = userRepository;
 }

 @Override
 public User findById(UUID id) {
  return userRepository.findById(id)
    .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
 }

 @Override
 public User findByEmail(String email) {
  return userRepository.findByEmail(email);
 }

 @Override
 public User save(UserDto userDto) {
  User user = new User(
        userDto.getId(),
        userDto.getFirstName(),
        userDto.getLastName(),
        userDto.getEmail(),
        passwordEncoder.encode(userDto.getPassword()),
        userDto.getBio(),
        userDto.getJoinedAt() != null ? userDto.getJoinedAt() : LocalDate.now()
    );
  return userRepository.save(user);
 }

}
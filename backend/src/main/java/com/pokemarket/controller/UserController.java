package com.pokemarket.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.pokemarket.model.User;
import com.pokemarket.service.UserService;
import com.pokemarket.dto.UserDto;

@RestController
@RequestMapping("/api")
public class UserController {
 @Autowired
 PasswordEncoder passwordEncoder;

 @Autowired
 private UserDetailsService userDetailsService;

 private UserService userService;

 @Autowired
 public UserController(UserDetailsService userDetailsService, UserService userService) {
  this.userDetailsService = userDetailsService;
  this.userService = userService;
 }

 @GetMapping("/home")
 public ResponseEntity<?> home(Model model, Principal principal) {
  if (principal == null) {
   return ResponseEntity.status(401).body("Unauthorized");
  }
  UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
  return ResponseEntity.ok(userDetails);
 }

 @PostMapping("/register")
 public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
  System.out.println("register");
  User user = userService.findByEmail(userDto.getEmail());
  if (user != null) {
   return ResponseEntity.status(409).body("User already exists");
  }
  userService.save(userDto);
  return ResponseEntity.ok(Map.of("status", "success"));
 }

 @PostMapping("/login")
 public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
  User user = userService.findByEmail(userDto.getEmail());
  if (user == null) {
   return ResponseEntity.status(401).body(Map.of("status", "Email Does Not Exist"));
  }
  if (passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
   return ResponseEntity.ok(Map.of("status", "success"));
  }
  return ResponseEntity.status(401).body(Map.of("status", "Incorrect Password"));
 }
}
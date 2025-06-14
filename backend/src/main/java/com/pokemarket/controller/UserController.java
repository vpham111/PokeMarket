package com.pokemarket.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import com.pokemarket.model.User;
import com.pokemarket.service.UserService;
import com.pokemarket.dto.UserDto;

@RestController
@RequestMapping("/api")
public class UserController {

 @Autowired
 private PasswordEncoder passwordEncoder;

 @Autowired
 private UserDetailsService userDetailsService;

 @Autowired
 private AuthenticationManager authenticationManager;

 @Autowired
 private UserService userService;

 @GetMapping("/home")
 public ResponseEntity<?> home(Principal principal) {
  if (principal == null) {
   return ResponseEntity.status(401).body(Map.of("status", "error", "message", "Unauthorized"));
  }
  UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
  Map<String, Object> response = new HashMap<>();
  response.put("status", "success");
  response.put("user", userDetails.getUsername());
  response.put("authorities", userDetails.getAuthorities());
  return ResponseEntity.ok(response);
 }

 @PostMapping("/register")
 public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
  System.out.println("register");
  User user = userService.findByEmail(userDto.getEmail());
  if (user != null) {
   return ResponseEntity.status(409).body(Map.of("status", "error", "message", "User already exists"));
  }
  userService.save(userDto);
  return ResponseEntity.ok(Map.of("status", "success", "message", "Registration successful"));
 }

 @PostMapping("/login")
 public ResponseEntity<?> loginUser(@RequestBody UserDto userDto, HttpServletRequest request) {
  try {
   // Use Spring Security's AuthenticationManager to authenticate
   Authentication authentication = authenticationManager.authenticate(
           new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword())
   );

   // Set up the security context
   SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
   securityContext.setAuthentication(authentication);
   SecurityContextHolder.setContext(securityContext);

   // Store the security context in the session
   HttpSession session = request.getSession(true);
   session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);

   Map<String, Object> response = new HashMap<>();
   response.put("status", "success");
   response.put("message", "Login successful");
   response.put("user", authentication.getName());

   return ResponseEntity.ok(response);

  } catch (BadCredentialsException e) {
   // Check if user exists to provide specific error message
   User user = userService.findByEmail(userDto.getEmail());
   if (user == null) {
    return ResponseEntity.status(401).body(Map.of("status", "error", "message", "Email Does Not Exist"));
   } else {
    return ResponseEntity.status(401).body(Map.of("status", "error", "message", "Incorrect Password"));
   }
  } catch (Exception e) {
   return ResponseEntity.status(500).body(Map.of("status", "error", "message", "Authentication failed"));
  }
 }

 @PostMapping("/logout")
 public ResponseEntity<?> logoutUser(HttpServletRequest request) {
  HttpSession session = request.getSession(false);
  if (session != null) {
   session.invalidate();
  }
  SecurityContextHolder.clearContext();
  return ResponseEntity.ok(Map.of("status", "success", "message", "Logout successful"));
 }
}
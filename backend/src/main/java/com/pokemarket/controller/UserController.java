package com.pokemarket.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
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
import com.pokemarket.util.JwtUtil;
import com.pokemarket.dto.UserDto;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

 @Autowired
 private UserDetailsService userDetailsService;

 @Autowired
 private AuthenticationManager authenticationManager;

 @Autowired
 private UserService userService;

 @Autowired
 private JwtUtil jwtUtil;

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
 public ResponseEntity<?> loginUser(@RequestBody UserDto userDto, HttpServletRequest request, HttpServletResponse response) {
  try {
   // Use Spring Security's AuthenticationManager to authenticate
   Authentication authentication = authenticationManager.authenticate(
           new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword())
   );

   // Set up the security context
   SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
   securityContext.setAuthentication(authentication);
   SecurityContextHolder.setContext(securityContext);

   String jwt = jwtUtil.generateToken(userDto.getEmail());
   Cookie cookie = new Cookie("jwt", jwt);
   cookie.setHttpOnly(true);
   cookie.setSecure(false);  // set to true for https
   cookie.setPath("/");
   cookie.setMaxAge(60 * 60);
   cookie.setAttribute("SameSite", "Lax");

   response.addCookie(cookie);

   // Store the security context in the session
   HttpSession session = request.getSession(true);
   session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);

   Map<String, Object> resp = new HashMap<>();
   resp.put("status", "success");
   resp.put("message", "Login successful");
   resp.put("user", authentication.getName());

   return ResponseEntity.ok(resp);

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

 @GetMapping("/auth-status")
public ResponseEntity<?> authStatus(HttpServletRequest request) {
    // Your JwtAuthenticationFilter should set authentication if JWT is valid
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
        return ResponseEntity.ok(Map.of("status", "success", "user", authentication.getName()));
    } else {
        return ResponseEntity.status(401).body(Map.of("status", "error", "message", "Unauthorized"));
    }
}


 @PostMapping("/logout")
 public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
    // Invalidate any HTTP session if exists (optional, JWT usually stateless)
    HttpSession session = request.getSession(false);
    if (session != null) {
        session.invalidate();
    }

    SecurityContextHolder.clearContext();

    Cookie jwtCookie = new Cookie("jwt", null); 
    jwtCookie.setHttpOnly(true);
    jwtCookie.setPath("/");
    jwtCookie.setMaxAge(0);  

    response.addCookie(jwtCookie);

    return ResponseEntity.ok(Map.of("status", "success", "message", "Logout successful"));
 }
}
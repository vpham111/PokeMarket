package com.pokemarket.controller;

import java.security.Principal;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.Date;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
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
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;

import com.pokemarket.model.PasswordResetToken;
import com.pokemarket.model.User;
import com.pokemarket.service.UserService;
import com.pokemarket.util.JwtUtil;
import com.pokemarket.dto.UserDto;
import com.pokemarket.repository.PasswordTokenRepository;

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

 @Autowired
 private JavaMailSender mailSender;

 @Autowired
 private MessageSource messages;

 @Autowired
 private Environment env;

 @Autowired
 private PasswordTokenRepository passwordTokenRepository;

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
 
@PostMapping("/forgot-password")
public ResponseEntity<?> resetPassword(@RequestBody UserDto userDto, HttpServletRequest request) {
    try {
        System.out.println("=== FORGOT PASSWORD DEBUG START ===");
        System.out.println("Received email: " + userDto.getEmail());
        
        User user = userService.findByEmail(userDto.getEmail());
        if (user == null) {
            System.out.println("User not found for email: " + userDto.getEmail());
            return ResponseEntity.status(404).body(Map.of(
                "status", "error",
                "message", "Email Does Not Exist"
            ));
        }
        System.out.println("User found: " + user.getEmail());

        String token = UUID.randomUUID().toString();
        System.out.println("Generated token: " + token);
        
        try {
            userService.createPasswordResetTokenForUser(user, token);
            System.out.println("Token saved successfully");
        } catch (Exception e) {
            System.err.println("Error saving token: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }

        String appUrl = getAppUrl(request);
        System.out.println("App URL: " + appUrl);
        
        Locale locale = request.getLocale();
        System.out.println("Locale: " + locale);

        try {
            SimpleMailMessage email = constructResetTokenEmail(appUrl, locale, token, user);
            System.out.println("Email constructed successfully");
            System.out.println("Email TO: " + email.getTo()[0]);
            System.out.println("Email FROM: " + email.getFrom());
            System.out.println("Email SUBJECT: " + email.getSubject());
            System.out.println("Email TEXT: " + email.getText());
        } catch (Exception e) {
            System.err.println("Error constructing email: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }

        // Step 6: Send email
        try {
            SimpleMailMessage email = constructResetTokenEmail(appUrl, locale, token, user);
            mailSender.send(email);
            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }

        System.out.println("=== FORGOT PASSWORD DEBUG END ===");
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Password reset email sent"
        ));
        
    } catch (Exception e) {
        System.err.println("=== FORGOT PASSWORD ERROR ===");
        System.err.println("Error: " + e.getMessage());
        System.err.println("Error type: " + e.getClass().getSimpleName());
        e.printStackTrace();
        System.err.println("=== END ERROR ===");
        
        return ResponseEntity.status(500).body(Map.of(
            "status", "error",
            "message", "Internal server error: " + e.getMessage()
        ));
    }
}

@PostMapping("/reset-password")
public ResponseEntity<?> resetUserPassword(@RequestBody Map<String, String> payload) {
    String token = payload.get("token");
    String newPassword = payload.get("newPassword");

    PasswordResetToken passToken = passwordTokenRepository.findByToken(token);
    if (passToken == null) {
        return ResponseEntity.status(400).body(Map.of(
            "status", "error",
            "message", "Invalid token"
        ));
    }

    String validationResult = validatePasswordResetToken(token);
    if (validationResult != null) {
        return ResponseEntity.status(400).body(Map.of(
        "status", "error",
        "message", validationResult.equals("expired") ? "Token expired" : "Invalid token"
        ));
    }

    User user = passToken.getUser();
    if (user == null) {
        return ResponseEntity.status(400).body(Map.of(
            "status", "error",
            "message", "Invalid user"
        ));
    }

    if (userService.checkIfSamePassword(user, newPassword)) {
        return ResponseEntity.status(400).body(Map.of(
            "status", "error",
            "message", "Invalid Password"
        ));
    }

    userService.changeUserPassword(user, newPassword);
    passwordTokenRepository.delete(passToken); // optional

    return ResponseEntity.ok(Map.of(
        "status", "success",
        "message", "Password successfully updated"
    ));
}


private String getAppUrl(HttpServletRequest request) {
    return request.getScheme() + "://" +
           request.getServerName() +
           ":" + request.getServerPort() +
           request.getContextPath();
}
private SimpleMailMessage constructResetTokenEmail(
  String contextPath, Locale locale, String token, User user) {
    String url = "http://localhost:3000/reset-password?token=" + token;
    String message = "Please click the link below to reset your password:"; // Hardcoded message
    return constructEmail("Reset Password", message + " \r\n" + url, user);
}

private SimpleMailMessage constructEmail(String subject, String body, 
  User user) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setSubject(subject);
    email.setText(body);
    email.setTo(user.getEmail());
    email.setFrom(env.getProperty("spring.mail.username"));
    return email;
}

public String validatePasswordResetToken(String token) {
    final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

    return !isTokenFound(passToken) ? "invalidToken"
            : isTokenExpired(passToken) ? "expired"
            : null;
}

private boolean isTokenFound(PasswordResetToken passToken) {
    return passToken != null;
}

private boolean isTokenExpired(PasswordResetToken passToken) {
    final Calendar cal = Calendar.getInstance();
    return passToken.getExpiryDate().before(cal.getTime());
}
}
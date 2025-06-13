package com.pokemarket.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.pokemarket.model.User;
import com.pokemarket.service.UserService;
import com.pokemarket.dto.UserDto;

@Controller
public class UserController {

 @Autowired
 private UserDetailsService userDetailsService;

 private UserService userService;

 @Autowired
 public UserController(UserDetailsService userDetailsService, UserService userService) {
  this.userDetailsService = userDetailsService;
  this.userService = userService;
 }

 @GetMapping("/home")
 public String home(Model model, Principal principal) {
  UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
  model.addAttribute("userdetail", userDetails);
  return "home";
 }

 @GetMapping("/login")
 public String login(Model model, UserDto userDto) {

  model.addAttribute("user", userDto);
  return "login";
 }

 @GetMapping("/register")
 public String register(Model model, UserDto userDto) {
  model.addAttribute("user", userDto);
  return "register";
 }

 @PostMapping("/register")
 public String registerUser(@ModelAttribute("user") UserDto userDto, Model model) {
  User user = userService.findByEmail(userDto.getEmail());
  if (user != null) {
   model.addAttribute("Userexist", user);
   return "register";
  }
  userService.save(userDto);
  return "redirect:/register?success";
 }
}
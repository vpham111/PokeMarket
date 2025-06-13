package com.pokemarket.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.authentication.AuthenticationManager;

import com.pokemarket.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

 @Autowired
 CustomUserDetailsService customUserDetailsService;

 @Bean
 public static PasswordEncoder passwordEncoder() {
  return new BCryptPasswordEncoder();
 }

 @Bean
 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
     http.csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(requests -> requests
        .requestMatchers("/register").permitAll()
        .requestMatchers("/login").permitAll()
        .requestMatchers("/home").permitAll()
        .anyRequest().authenticated()
    )
    .formLogin(login -> login
        .loginPage("/login")
        .loginProcessingUrl("/login")
        .defaultSuccessUrl("/home", true)
        .permitAll()
    )
    .logout(logout -> logout
        .invalidateHttpSession(true)
        .clearAuthentication(true)
        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
        .logoutSuccessUrl("/login?logout")
        .permitAll()
    );

  return http.build();

 }

@Bean
public AuthenticationManager authManager(HttpSecurity http) throws Exception {
    AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);

    authBuilder.userDetailsService(customUserDetailsService)
               .passwordEncoder(passwordEncoder());

    return authBuilder.build();
}
}
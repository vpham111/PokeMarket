package com.pokemarket.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import java.io.IOException;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;

import io.jsonwebtoken.ExpiredJwtException;

import com.pokemarket.util.JwtUtil;
import com.pokemarket.service.CustomUserDetailsService;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);


    @Autowired
    private CustomUserDetailsService userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");
        logger.info("jwt authentication filter is being called");

        String email = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
        } else {
            // Try get token from cookie
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("jwt-token-cookie-name".equals(cookie.getName())) {  // Replace with your actual cookie name
                        jwtToken = cookie.getValue();
                        break;
                    }
                }
            }
            if (requestTokenHeader != null && !requestTokenHeader.startsWith("Bearer ")) {
                logger.warn("Authorization header does not start with Bearer");
            }
        }

        if (jwtToken != null) {
            try {
                email = this.jwtUtil.getEmailFromToken(jwtToken);
            } catch (ExpiredJwtException e) {
                logger.error("JWT token expired: {}", e.getMessage());
            } catch (Exception e) {
                logger.error("Error parsing JWT token: {}", e.getMessage());
            }
        } else {
            logger.debug("JWT Token not found in request header or cookie");
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            final UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(email);

            if (this.jwtUtil.validateJwtToken(jwtToken)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                logger.warn("Invalid JWT token");
            }
        }

        filterChain.doFilter(request, response);
    }

}

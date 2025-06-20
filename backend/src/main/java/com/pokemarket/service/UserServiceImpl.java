package com.pokemarket.service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pokemarket.model.PasswordResetToken;
import com.pokemarket.model.User;
import com.pokemarket.dto.UserDto;
import com.pokemarket.repository.UserRepository;
import com.pokemarket.repository.PasswordTokenRepository;

@Service
public class UserServiceImpl implements UserService {

    private static final int EXPIRATION = 60 * 24;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

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
        user.setId(UUID.randomUUID());
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken existingToken = passwordTokenRepository.findByUser(user);
        
        if (existingToken != null) {
            existingToken.setToken(token);
            existingToken.setExpiryDate(calculateExpiryDate(EXPIRATION));
            passwordTokenRepository.save(existingToken);
        } else {
            PasswordResetToken myToken = new PasswordResetToken(token, user);
            passwordTokenRepository.save(myToken);
        }
    }

    @Override
    public boolean checkIfSamePassword(User user, String newPassword) {
        return passwordEncoder.matches(newPassword, user.getPassword());
    }

    @Override
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetToken passToken = passwordTokenRepository.findByToken(token);
        if (passToken == null) {
            return "invalidToken";
        }

        if (passToken.getExpiryDate().before(new Date())) {
            return "expired";
        }

        return null; 
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }
}
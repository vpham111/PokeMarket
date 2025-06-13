package com.pokemarket.service;

import com.pokemarket.model.User;
import com.pokemarket.dto.UserDto;
import java.util.UUID;

public interface UserService {
    User findById(UUID id);
    User save(UserDto userDto);
    User findByEmail(String email);
}
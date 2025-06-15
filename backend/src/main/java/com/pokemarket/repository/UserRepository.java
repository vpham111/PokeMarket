package com.pokemarket.repository;

import com.pokemarket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail(String email);
}
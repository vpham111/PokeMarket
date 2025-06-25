package com.pokemarket.repository;

import com.pokemarket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail(String email);

    @Query(value= """
        SELECT email FROM user
        WHERE id = :userId
""", nativeQuery = true)
    String findEmailByUUID(UUID userId);
}
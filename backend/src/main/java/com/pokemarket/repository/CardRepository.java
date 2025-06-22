package com.pokemarket.repository;

import com.pokemarket.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CardRepository extends JpaRepository<Card, UUID> {

    @Query(value = """
            SELECT DISTINCT ON (id) *
        FROM (
            SELECT *, ts_rank(to_tsvector('english', name), to_tsquery('english', :keyword || ':*')) AS rank
            FROM card
            WHERE to_tsvector('english', name) @@ to_tsquery('english', :keyword || ':*')
           \s
            UNION ALL
           \s
            SELECT *, 0 AS rank
            FROM card
            WHERE name ILIKE :keyword || '%'
        ) combined
        ORDER BY id, rank DESC
        """, nativeQuery = true)
    List<Card> searchByNameFullText(@Param("keyword") String keyword);

    @Query(value = """
            SELECT DISTINCT ON (id) *
                FROM (
                    SELECT *, ts_rank(to_tsvector('english', name), to_tsquery('english', :keyword || ':*')) AS rank
                    FROM card
                    WHERE to_tsvector('english', name) @@ to_tsquery('english', :keyword || ':*')
                   \s
                    UNION ALL
                   \s
                    SELECT *, 0 AS rank
                    FROM card
                    WHERE name ILIKE :keyword || '%'
                ) combined
                ORDER BY id, rank DESC
                LIMIT 15
        """, nativeQuery = true)
    List<Card> searchByNameFullTextAuto(@Param("keyword") String keyword);
}

package com.pokemarket.service;

import com.pokemarket.dto.CardDto;
import com.pokemarket.model.Card;
import com.pokemarket.repository.CardRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public List<CardDto> getAllCards(Pageable pageable) {
        Page<Card> page = cardRepository.findAll(pageable);
        return page.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private CardDto toDto(Card card) {
            CardDto dto = new CardDto();
            dto.setId(card.getId());
            dto.setName(card.getName());
            dto.setRarity(card.getRarity());
            dto.setCard_number(card.getCard_number());
            dto.setLanguage(card.getLanguage());
            // dto.setPrice(card.getPrice());        
            // dto.setCurrency("usd");
            return dto;
    }

}

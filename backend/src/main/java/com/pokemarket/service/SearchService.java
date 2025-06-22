package com.pokemarket.service;

import com.pokemarket.model.Card;
import com.pokemarket.model.Set;
import com.pokemarket.repository.CardRepository;
import com.pokemarket.repository.SetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {
    private final CardRepository cardRepository;
    private final SetRepository setRepository;

    @Autowired
    public SearchService(CardRepository cardRepository, SetRepository setRepository) {
        this.cardRepository = cardRepository;
        this.setRepository = setRepository;
    }

    public List<Card> searchCards(String keyword) {
        return cardRepository.searchByNameFullText(keyword);
    }

    public List<Card> searchCardsAuto(String keyword) {
        return cardRepository.searchByNameFullTextAuto(keyword);
    }

    public List<Set> searchSets(String keyword) {
        return setRepository.searchByNameFullText(keyword);
    }

    public List<Set> searchSetsAuto(String keyword) {
        return setRepository.searchByNameFullTextAuto(keyword);
    }
}

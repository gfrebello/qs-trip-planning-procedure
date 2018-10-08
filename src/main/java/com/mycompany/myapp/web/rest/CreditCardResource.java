package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.CreditCard;
import com.mycompany.myapp.repository.CreditCardRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CreditCard.
 */
@RestController
@RequestMapping("/api")
public class CreditCardResource {

    private final Logger log = LoggerFactory.getLogger(CreditCardResource.class);

    private static final String ENTITY_NAME = "creditCard";

    private final CreditCardRepository creditCardRepository;

    public CreditCardResource(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    /**
     * POST  /credit-cards : Create a new creditCard.
     *
     * @param creditCard the creditCard to create
     * @return the ResponseEntity with status 201 (Created) and with body the new creditCard, or with status 400 (Bad Request) if the creditCard has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/credit-cards")
    @Timed
    public ResponseEntity<CreditCard> createCreditCard(@RequestBody CreditCard creditCard) throws URISyntaxException {
        log.debug("REST request to save CreditCard : {}", creditCard);
        if (creditCard.getId() != null) {
            throw new BadRequestAlertException("A new creditCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CreditCard result = creditCardRepository.save(creditCard);
        return ResponseEntity.created(new URI("/api/credit-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /credit-cards : Updates an existing creditCard.
     *
     * @param creditCard the creditCard to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated creditCard,
     * or with status 400 (Bad Request) if the creditCard is not valid,
     * or with status 500 (Internal Server Error) if the creditCard couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/credit-cards")
    @Timed
    public ResponseEntity<CreditCard> updateCreditCard(@RequestBody CreditCard creditCard) throws URISyntaxException {
        log.debug("REST request to update CreditCard : {}", creditCard);
        if (creditCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CreditCard result = creditCardRepository.save(creditCard);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, creditCard.getId().toString()))
            .body(result);
    }

    /**
     * GET  /credit-cards : get all the creditCards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of creditCards in body
     */
    @GetMapping("/credit-cards")
    @Timed
    public List<CreditCard> getAllCreditCards() {
        log.debug("REST request to get all CreditCards");
        return creditCardRepository.findAll();
    }

    /**
     * GET  /credit-cards/:id : get the "id" creditCard.
     *
     * @param id the id of the creditCard to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the creditCard, or with status 404 (Not Found)
     */
    @GetMapping("/credit-cards/{id}")
    @Timed
    public ResponseEntity<CreditCard> getCreditCard(@PathVariable Long id) {
        log.debug("REST request to get CreditCard : {}", id);
        Optional<CreditCard> creditCard = creditCardRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(creditCard);
    }

    /**
     * DELETE  /credit-cards/:id : delete the "id" creditCard.
     *
     * @param id the id of the creditCard to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/credit-cards/{id}")
    @Timed
    public ResponseEntity<Void> deleteCreditCard(@PathVariable Long id) {
        log.debug("REST request to delete CreditCard : {}", id);

        creditCardRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

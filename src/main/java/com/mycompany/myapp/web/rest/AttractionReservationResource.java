package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.AttractionReservation;
import com.mycompany.myapp.repository.AttractionReservationRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AttractionReservation.
 */
@RestController
@RequestMapping("/api")
public class AttractionReservationResource {

    private final Logger log = LoggerFactory.getLogger(AttractionReservationResource.class);

    private static final String ENTITY_NAME = "attractionReservation";

    private final AttractionReservationRepository attractionReservationRepository;

    public AttractionReservationResource(AttractionReservationRepository attractionReservationRepository) {
        this.attractionReservationRepository = attractionReservationRepository;
    }

    /**
     * POST  /attraction-reservations : Create a new attractionReservation.
     *
     * @param attractionReservation the attractionReservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attractionReservation, or with status 400 (Bad Request) if the attractionReservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attraction-reservations")
    @Timed
    public ResponseEntity<AttractionReservation> createAttractionReservation(@Valid @RequestBody AttractionReservation attractionReservation) throws URISyntaxException {
        log.debug("REST request to save AttractionReservation : {}", attractionReservation);
        if (attractionReservation.getId() != null) {
            throw new BadRequestAlertException("A new attractionReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttractionReservation result = attractionReservationRepository.save(attractionReservation);
        return ResponseEntity.created(new URI("/api/attraction-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attraction-reservations : Updates an existing attractionReservation.
     *
     * @param attractionReservation the attractionReservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attractionReservation,
     * or with status 400 (Bad Request) if the attractionReservation is not valid,
     * or with status 500 (Internal Server Error) if the attractionReservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attraction-reservations")
    @Timed
    public ResponseEntity<AttractionReservation> updateAttractionReservation(@Valid @RequestBody AttractionReservation attractionReservation) throws URISyntaxException {
        log.debug("REST request to update AttractionReservation : {}", attractionReservation);
        if (attractionReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AttractionReservation result = attractionReservationRepository.save(attractionReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attractionReservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attraction-reservations : get all the attractionReservations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of attractionReservations in body
     */
    @GetMapping("/attraction-reservations")
    @Timed
    public List<AttractionReservation> getAllAttractionReservations() {
        log.debug("REST request to get all AttractionReservations");
        return attractionReservationRepository.findAll();
    }

    /**
     * GET  /attraction-reservations/:id : get the "id" attractionReservation.
     *
     * @param id the id of the attractionReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attractionReservation, or with status 404 (Not Found)
     */
    @GetMapping("/attraction-reservations/{id}")
    @Timed
    public ResponseEntity<AttractionReservation> getAttractionReservation(@PathVariable Long id) {
        log.debug("REST request to get AttractionReservation : {}", id);
        Optional<AttractionReservation> attractionReservation = attractionReservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(attractionReservation);
    }

    /**
     * DELETE  /attraction-reservations/:id : delete the "id" attractionReservation.
     *
     * @param id the id of the attractionReservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attraction-reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttractionReservation(@PathVariable Long id) {
        log.debug("REST request to delete AttractionReservation : {}", id);

        attractionReservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

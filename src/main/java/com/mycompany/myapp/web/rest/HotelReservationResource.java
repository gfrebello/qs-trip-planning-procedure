package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.HotelReservation;
import com.mycompany.myapp.repository.HotelReservationRepository;
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
 * REST controller for managing HotelReservation.
 */
@RestController
@RequestMapping("/api")
public class HotelReservationResource {

    private final Logger log = LoggerFactory.getLogger(HotelReservationResource.class);

    private static final String ENTITY_NAME = "hotelReservation";

    private final HotelReservationRepository hotelReservationRepository;

    public HotelReservationResource(HotelReservationRepository hotelReservationRepository) {
        this.hotelReservationRepository = hotelReservationRepository;
    }

    /**
     * POST  /hotel-reservations : Create a new hotelReservation.
     *
     * @param hotelReservation the hotelReservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotelReservation, or with status 400 (Bad Request) if the hotelReservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotel-reservations")
    @Timed
    public ResponseEntity<HotelReservation> createHotelReservation(@RequestBody HotelReservation hotelReservation) throws URISyntaxException {
        log.debug("REST request to save HotelReservation : {}", hotelReservation);
        if (hotelReservation.getId() != null) {
            throw new BadRequestAlertException("A new hotelReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HotelReservation result = hotelReservationRepository.save(hotelReservation);
        return ResponseEntity.created(new URI("/api/hotel-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotel-reservations : Updates an existing hotelReservation.
     *
     * @param hotelReservation the hotelReservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotelReservation,
     * or with status 400 (Bad Request) if the hotelReservation is not valid,
     * or with status 500 (Internal Server Error) if the hotelReservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotel-reservations")
    @Timed
    public ResponseEntity<HotelReservation> updateHotelReservation(@RequestBody HotelReservation hotelReservation) throws URISyntaxException {
        log.debug("REST request to update HotelReservation : {}", hotelReservation);
        if (hotelReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HotelReservation result = hotelReservationRepository.save(hotelReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotelReservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotel-reservations : get all the hotelReservations.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of hotelReservations in body
     */
    @GetMapping("/hotel-reservations")
    @Timed
    public List<HotelReservation> getAllHotelReservations(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all HotelReservations");
        return hotelReservationRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /hotel-reservations/:id : get the "id" hotelReservation.
     *
     * @param id the id of the hotelReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotelReservation, or with status 404 (Not Found)
     */
    @GetMapping("/hotel-reservations/{id}")
    @Timed
    public ResponseEntity<HotelReservation> getHotelReservation(@PathVariable Long id) {
        log.debug("REST request to get HotelReservation : {}", id);
        Optional<HotelReservation> hotelReservation = hotelReservationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(hotelReservation);
    }

    /**
     * DELETE  /hotel-reservations/:id : delete the "id" hotelReservation.
     *
     * @param id the id of the hotelReservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotel-reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotelReservation(@PathVariable Long id) {
        log.debug("REST request to delete HotelReservation : {}", id);

        hotelReservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

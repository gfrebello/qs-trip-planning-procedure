package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.FlightReservation;
import com.mycompany.myapp.repository.FlightReservationRepository;
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
 * REST controller for managing FlightReservation.
 */
@RestController
@RequestMapping("/api")
public class FlightReservationResource {

    private final Logger log = LoggerFactory.getLogger(FlightReservationResource.class);

    private static final String ENTITY_NAME = "flightReservation";

    private final FlightReservationRepository flightReservationRepository;

    public FlightReservationResource(FlightReservationRepository flightReservationRepository) {
        this.flightReservationRepository = flightReservationRepository;
    }

    /**
     * POST  /flight-reservations : Create a new flightReservation.
     *
     * @param flightReservation the flightReservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightReservation, or with status 400 (Bad Request) if the flightReservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-reservations")
    @Timed
    public ResponseEntity<FlightReservation> createFlightReservation(@Valid @RequestBody FlightReservation flightReservation) throws URISyntaxException {
        log.debug("REST request to save FlightReservation : {}", flightReservation);
        if (flightReservation.getId() != null) {
            throw new BadRequestAlertException("A new flightReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightReservation result = flightReservationRepository.save(flightReservation);
        return ResponseEntity.created(new URI("/api/flight-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flight-reservations : Updates an existing flightReservation.
     *
     * @param flightReservation the flightReservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightReservation,
     * or with status 400 (Bad Request) if the flightReservation is not valid,
     * or with status 500 (Internal Server Error) if the flightReservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-reservations")
    @Timed
    public ResponseEntity<FlightReservation> updateFlightReservation(@Valid @RequestBody FlightReservation flightReservation) throws URISyntaxException {
        log.debug("REST request to update FlightReservation : {}", flightReservation);
        if (flightReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlightReservation result = flightReservationRepository.save(flightReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightReservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flight-reservations : get all the flightReservations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightReservations in body
     */
    @GetMapping("/flight-reservations")
    @Timed
    public List<FlightReservation> getAllFlightReservations() {
        log.debug("REST request to get all FlightReservations");
        return flightReservationRepository.findAll();
    }

    /**
     * GET  /flight-reservations/:id : get the "id" flightReservation.
     *
     * @param id the id of the flightReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightReservation, or with status 404 (Not Found)
     */
    @GetMapping("/flight-reservations/{id}")
    @Timed
    public ResponseEntity<FlightReservation> getFlightReservation(@PathVariable Long id) {
        log.debug("REST request to get FlightReservation : {}", id);
        Optional<FlightReservation> flightReservation = flightReservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flightReservation);
    }

    /**
     * GET  /flight-reservations/trip/:id : get the flightReservations by trip id.
     *
     * @param id the id of the flightReservation's trip to retrieve
     * @return the ResponseEntity with status 200 (OK) and the list of flightReservations in body
     */
    @GetMapping("/flight-reservations/trip/{id}")
    @Timed
    public List<FlightReservation> getFlightReservationsByTrip(@PathVariable Long id) {
        log.debug("REST request to get FlightReservations by Trip Id: {}", id);
        return flightReservationRepository.findByTrip(id);
    }

    /**
     * DELETE  /flight-reservations/:id : delete the "id" flightReservation.
     *
     * @param id the id of the flightReservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightReservation(@PathVariable Long id) {
        log.debug("REST request to delete FlightReservation : {}", id);

        flightReservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

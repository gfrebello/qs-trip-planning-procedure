package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Seat;
import com.mycompany.myapp.repository.SeatRepository;
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
 * REST controller for managing Seat.
 */
@RestController
@RequestMapping("/api")
public class SeatResource {

    private final Logger log = LoggerFactory.getLogger(SeatResource.class);

    private static final String ENTITY_NAME = "seat";

    private final SeatRepository seatRepository;

    public SeatResource(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    /**
     * POST  /seats : Create a new seat.
     *
     * @param seat the seat to create
     * @return the ResponseEntity with status 201 (Created) and with body the new seat, or with status 400 (Bad Request) if the seat has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/seats")
    @Timed
    public ResponseEntity<Seat> createSeat(@RequestBody Seat seat) throws URISyntaxException {
        log.debug("REST request to save Seat : {}", seat);
        if (seat.getId() != null) {
            throw new BadRequestAlertException("A new seat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Seat result = seatRepository.save(seat);
        return ResponseEntity.created(new URI("/api/seats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /seats : Updates an existing seat.
     *
     * @param seat the seat to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated seat,
     * or with status 400 (Bad Request) if the seat is not valid,
     * or with status 500 (Internal Server Error) if the seat couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/seats")
    @Timed
    public ResponseEntity<Seat> updateSeat(@RequestBody Seat seat) throws URISyntaxException {
        log.debug("REST request to update Seat : {}", seat);
        if (seat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Seat result = seatRepository.save(seat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, seat.getId().toString()))
            .body(result);
    }

    /**
     * GET  /seats : get all the seats.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of seats in body
     */
    @GetMapping("/seats")
    @Timed
    public List<Seat> getAllSeats() {
        log.debug("REST request to get all Seats");
        return seatRepository.findAll();
    }

    /**
     * GET  /seats/:id : get the "id" seat.
     *
     * @param id the id of the seat to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the seat, or with status 404 (Not Found)
     */
    @GetMapping("/seats/{id}")
    @Timed
    public ResponseEntity<Seat> getSeat(@PathVariable Long id) {
        log.debug("REST request to get Seat : {}", id);
        Optional<Seat> seat = seatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(seat);
    }

    /**
     * GET  /seats/flight-reservations/:id : get the flightReservations by trip id.
     *
     * @param id the id of the flightReservation's seats to retrieve
     * @return the ResponseEntity with status 200 (OK) and the list of flightReservations in body
     */
    @GetMapping("/seats/flight-reservations/{id}")
    @Timed
    public List<Seat> getSeatsByFlightReservation(@PathVariable Long id) {
        log.debug("REST request to get Seats by FlightReservation Id");
        return seatRepository.findByFlightReservation(id);
    }

    /**
     * DELETE  /seats/:id : delete the "id" seat.
     *
     * @param id the id of the seat to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/seats/{id}")
    @Timed
    public ResponseEntity<Void> deleteSeat(@PathVariable Long id) {
        log.debug("REST request to delete Seat : {}", id);

        seatRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

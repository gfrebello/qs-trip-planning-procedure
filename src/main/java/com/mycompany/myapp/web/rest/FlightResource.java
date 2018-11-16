package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Flight;
import com.mycompany.myapp.repository.FlightRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Flight.
 */
@RestController
@RequestMapping("/api")
public class FlightResource {

    private final Logger log = LoggerFactory.getLogger(FlightResource.class);

    private static final String ENTITY_NAME = "flight";

    private final FlightRepository flightRepository;

    public FlightResource(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    /**
     * POST  /flights : Create a new flight.
     *
     * @param flight the flight to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flight, or with status 400 (Bad Request) if the flight has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flights")
    @Timed
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) throws URISyntaxException {
        log.debug("REST request to save Flight : {}", flight);
        if (flight.getId() != null) {
            throw new BadRequestAlertException("A new flight cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Flight result = flightRepository.save(flight);
        return ResponseEntity.created(new URI("/api/flights/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flights : Updates an existing flight.
     *
     * @param flight the flight to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flight,
     * or with status 400 (Bad Request) if the flight is not valid,
     * or with status 500 (Internal Server Error) if the flight couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flights")
    @Timed
    public ResponseEntity<Flight> updateFlight(@RequestBody Flight flight) throws URISyntaxException {
        log.debug("REST request to update Flight : {}", flight);
        if (flight.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Flight result = flightRepository.save(flight);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flight.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flights : get all the flights.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flights in body
     */
    @GetMapping("/flights")
    @Timed
    public List<Flight> getAllFlights() {
        log.debug("REST request to get all Flights");
        return flightRepository.findAll();
    }

    /**
     * GET  /flights/:id : get the "id" flight.
     *
     * @param id the id of the flight to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flight, or with status 404 (Not Found)
     */
    @GetMapping("/flights/{id}")
    @Timed
    public ResponseEntity<Flight> getFlight(@PathVariable Long id) {
        log.debug("REST request to get Flight : {}", id);
        Optional<Flight> flight = flightRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flight);
    }

        /**
     * GET  /flights/:departureDate/:origin/:destination : get flights by departureDate, origin and destination.
     *
     * @param departureDate the departure date of the flight to retrieve
     * @param origin the origin city of the flight to retrieve
     * @param destination the destination city of the flight to retrieve
     * @return the ResponseEntity with status 200 (OK) and the list of flights in body
     */
    @GetMapping("/flights/{departureDate}/{origin}/{destination}")
    @Timed
    public List<Flight> getFlightByDepartureDateAndOriginAndDestination(@PathVariable String departureDate,@PathVariable String origin,@PathVariable String destination) {
        Instant startOfDay = Instant.parse(departureDate).truncatedTo(ChronoUnit.DAYS);
        Instant endOfDay = startOfDay.plus(Duration.ofDays(1));
        return flightRepository.findByDepartureDateAfterAndDepartureDateBeforeAndOriginAndDestination(startOfDay, endOfDay, origin, destination);
    }

    // public List<SaleOrder> findByDate(String date) {
    //     Instant startOfDay = Instant.parse(date).truncatedTo(ChronoUnit.DAYS);
    //     Instant endOfDay = startOfDay.plus(Duration.ofDays(1));
    
    //     return saleOrderRepository.findBySaleTimeAfterAndSaleTimeBefore(startOfDay, endOfDay);
    // }

    /**
     * DELETE  /flights/:id : delete the "id" flight.
     *
     * @param id the id of the flight to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flights/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        log.debug("REST request to delete Flight : {}", id);

        flightRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

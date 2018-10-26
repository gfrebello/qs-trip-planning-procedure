package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.CarRental;
import com.mycompany.myapp.repository.CarRentalRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing CarRental.
 */
@RestController
@RequestMapping("/api")
public class CarRentalResource {

    private final Logger log = LoggerFactory.getLogger(CarRentalResource.class);

    private static final String ENTITY_NAME = "carRental";

    private final CarRentalRepository carRentalRepository;

    public CarRentalResource(CarRentalRepository carRentalRepository) {
        this.carRentalRepository = carRentalRepository;
    }

    /**
     * POST  /car-rentals : Create a new carRental.
     *
     * @param carRental the carRental to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carRental, or with status 400 (Bad Request) if the carRental has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/car-rentals")
    @Timed
    public ResponseEntity<CarRental> createCarRental(@RequestBody CarRental carRental) throws URISyntaxException {
        log.debug("REST request to save CarRental : {}", carRental);
        if (carRental.getId() != null) {
            throw new BadRequestAlertException("A new carRental cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarRental result = carRentalRepository.save(carRental);
        return ResponseEntity.created(new URI("/api/car-rentals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /car-rentals : Updates an existing carRental.
     *
     * @param carRental the carRental to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carRental,
     * or with status 400 (Bad Request) if the carRental is not valid,
     * or with status 500 (Internal Server Error) if the carRental couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/car-rentals")
    @Timed
    public ResponseEntity<CarRental> updateCarRental(@RequestBody CarRental carRental) throws URISyntaxException {
        log.debug("REST request to update CarRental : {}", carRental);
        if (carRental.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarRental result = carRentalRepository.save(carRental);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carRental.getId().toString()))
            .body(result);
    }

    /**
     * GET  /car-rentals : get all the carRentals.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of carRentals in body
     */
    @GetMapping("/car-rentals")
    @Timed
    public List<CarRental> getAllCarRentals(@RequestParam(required = false) String filter) {
        if ("trip-is-null".equals(filter)) {
            log.debug("REST request to get all CarRentals where trip is null");
            return StreamSupport
                .stream(carRentalRepository.findAll().spliterator(), false)
                .filter(carRental -> carRental.getTrip() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CarRentals");
        return carRentalRepository.findAll();
    }

    /**
     * GET  /car-rentals/:id : get the "id" carRental.
     *
     * @param id the id of the carRental to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carRental, or with status 404 (Not Found)
     */
    @GetMapping("/car-rentals/{id}")
    @Timed
    public ResponseEntity<CarRental> getCarRental(@PathVariable Long id) {
        log.debug("REST request to get CarRental : {}", id);
        Optional<CarRental> carRental = carRentalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(carRental);
    }

    /**
     * DELETE  /car-rentals/:id : delete the "id" carRental.
     *
     * @param id the id of the carRental to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/car-rentals/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarRental(@PathVariable Long id) {
        log.debug("REST request to delete CarRental : {}", id);

        carRentalRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

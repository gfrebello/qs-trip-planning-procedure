package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.HotelRoom;
import com.mycompany.myapp.repository.HotelRoomRepository;
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
 * REST controller for managing HotelRoom.
 */
@RestController
@RequestMapping("/api")
public class HotelRoomResource {

    private final Logger log = LoggerFactory.getLogger(HotelRoomResource.class);

    private static final String ENTITY_NAME = "hotelRoom";

    private final HotelRoomRepository hotelRoomRepository;

    public HotelRoomResource(HotelRoomRepository hotelRoomRepository) {
        this.hotelRoomRepository = hotelRoomRepository;
    }

    /**
     * POST  /hotel-rooms : Create a new hotelRoom.
     *
     * @param hotelRoom the hotelRoom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotelRoom, or with status 400 (Bad Request) if the hotelRoom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotel-rooms")
    @Timed
    public ResponseEntity<HotelRoom> createHotelRoom(@Valid @RequestBody HotelRoom hotelRoom) throws URISyntaxException {
        log.debug("REST request to save HotelRoom : {}", hotelRoom);
        if (hotelRoom.getId() != null) {
            throw new BadRequestAlertException("A new hotelRoom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HotelRoom result = hotelRoomRepository.save(hotelRoom);
        return ResponseEntity.created(new URI("/api/hotel-rooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotel-rooms : Updates an existing hotelRoom.
     *
     * @param hotelRoom the hotelRoom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotelRoom,
     * or with status 400 (Bad Request) if the hotelRoom is not valid,
     * or with status 500 (Internal Server Error) if the hotelRoom couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotel-rooms")
    @Timed
    public ResponseEntity<HotelRoom> updateHotelRoom(@Valid @RequestBody HotelRoom hotelRoom) throws URISyntaxException {
        log.debug("REST request to update HotelRoom : {}", hotelRoom);
        if (hotelRoom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HotelRoom result = hotelRoomRepository.save(hotelRoom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotelRoom.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotel-rooms : get all the hotelRooms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotelRooms in body
     */
    @GetMapping("/hotel-rooms")
    @Timed
    public List<HotelRoom> getAllHotelRooms() {
        log.debug("REST request to get all HotelRooms");
        return hotelRoomRepository.findAll();
    }

    /**
     * GET  /hotel-rooms/:id : get the "id" hotelRoom.
     *
     * @param id the id of the hotelRoom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotelRoom, or with status 404 (Not Found)
     */
    @GetMapping("/hotel-rooms/{id}")
    @Timed
    public ResponseEntity<HotelRoom> getHotelRoom(@PathVariable Long id) {
        log.debug("REST request to get HotelRoom : {}", id);
        Optional<HotelRoom> hotelRoom = hotelRoomRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hotelRoom);
    }

    /**
     * DELETE  /hotel-rooms/:id : delete the "id" hotelRoom.
     *
     * @param id the id of the hotelRoom to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotel-rooms/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotelRoom(@PathVariable Long id) {
        log.debug("REST request to delete HotelRoom : {}", id);

        hotelRoomRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

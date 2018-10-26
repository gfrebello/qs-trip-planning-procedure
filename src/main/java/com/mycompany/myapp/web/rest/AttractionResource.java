package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Attraction;
import com.mycompany.myapp.repository.AttractionRepository;
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
 * REST controller for managing Attraction.
 */
@RestController
@RequestMapping("/api")
public class AttractionResource {

    private final Logger log = LoggerFactory.getLogger(AttractionResource.class);

    private static final String ENTITY_NAME = "attraction";

    private final AttractionRepository attractionRepository;

    public AttractionResource(AttractionRepository attractionRepository) {
        this.attractionRepository = attractionRepository;
    }

    /**
     * POST  /attractions : Create a new attraction.
     *
     * @param attraction the attraction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attraction, or with status 400 (Bad Request) if the attraction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attractions")
    @Timed
    public ResponseEntity<Attraction> createAttraction(@RequestBody Attraction attraction) throws URISyntaxException {
        log.debug("REST request to save Attraction : {}", attraction);
        if (attraction.getId() != null) {
            throw new BadRequestAlertException("A new attraction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Attraction result = attractionRepository.save(attraction);
        return ResponseEntity.created(new URI("/api/attractions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attractions : Updates an existing attraction.
     *
     * @param attraction the attraction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attraction,
     * or with status 400 (Bad Request) if the attraction is not valid,
     * or with status 500 (Internal Server Error) if the attraction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attractions")
    @Timed
    public ResponseEntity<Attraction> updateAttraction(@RequestBody Attraction attraction) throws URISyntaxException {
        log.debug("REST request to update Attraction : {}", attraction);
        if (attraction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Attraction result = attractionRepository.save(attraction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attraction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attractions : get all the attractions.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of attractions in body
     */
    @GetMapping("/attractions")
    @Timed
    public List<Attraction> getAllAttractions(@RequestParam(required = false) String filter) {
        if ("chosenattraction-is-null".equals(filter)) {
            log.debug("REST request to get all Attractions where chosenAttraction is null");
            return StreamSupport
                .stream(attractionRepository.findAll().spliterator(), false)
                .filter(attraction -> attraction.getChosenAttraction() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Attractions");
        return attractionRepository.findAll();
    }

    /**
     * GET  /attractions/:id : get the "id" attraction.
     *
     * @param id the id of the attraction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attraction, or with status 404 (Not Found)
     */
    @GetMapping("/attractions/{id}")
    @Timed
    public ResponseEntity<Attraction> getAttraction(@PathVariable Long id) {
        log.debug("REST request to get Attraction : {}", id);
        Optional<Attraction> attraction = attractionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(attraction);
    }

    /**
     * DELETE  /attractions/:id : delete the "id" attraction.
     *
     * @param id the id of the attraction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attractions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttraction(@PathVariable Long id) {
        log.debug("REST request to delete Attraction : {}", id);

        attractionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

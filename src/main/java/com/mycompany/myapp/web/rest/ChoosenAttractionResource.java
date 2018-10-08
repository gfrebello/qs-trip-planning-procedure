package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ChoosenAttraction;
import com.mycompany.myapp.repository.ChoosenAttractionRepository;
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
 * REST controller for managing ChoosenAttraction.
 */
@RestController
@RequestMapping("/api")
public class ChoosenAttractionResource {

    private final Logger log = LoggerFactory.getLogger(ChoosenAttractionResource.class);

    private static final String ENTITY_NAME = "choosenAttraction";

    private final ChoosenAttractionRepository choosenAttractionRepository;

    public ChoosenAttractionResource(ChoosenAttractionRepository choosenAttractionRepository) {
        this.choosenAttractionRepository = choosenAttractionRepository;
    }

    /**
     * POST  /choosen-attractions : Create a new choosenAttraction.
     *
     * @param choosenAttraction the choosenAttraction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new choosenAttraction, or with status 400 (Bad Request) if the choosenAttraction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/choosen-attractions")
    @Timed
    public ResponseEntity<ChoosenAttraction> createChoosenAttraction(@RequestBody ChoosenAttraction choosenAttraction) throws URISyntaxException {
        log.debug("REST request to save ChoosenAttraction : {}", choosenAttraction);
        if (choosenAttraction.getId() != null) {
            throw new BadRequestAlertException("A new choosenAttraction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChoosenAttraction result = choosenAttractionRepository.save(choosenAttraction);
        return ResponseEntity.created(new URI("/api/choosen-attractions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /choosen-attractions : Updates an existing choosenAttraction.
     *
     * @param choosenAttraction the choosenAttraction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated choosenAttraction,
     * or with status 400 (Bad Request) if the choosenAttraction is not valid,
     * or with status 500 (Internal Server Error) if the choosenAttraction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/choosen-attractions")
    @Timed
    public ResponseEntity<ChoosenAttraction> updateChoosenAttraction(@RequestBody ChoosenAttraction choosenAttraction) throws URISyntaxException {
        log.debug("REST request to update ChoosenAttraction : {}", choosenAttraction);
        if (choosenAttraction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChoosenAttraction result = choosenAttractionRepository.save(choosenAttraction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, choosenAttraction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /choosen-attractions : get all the choosenAttractions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of choosenAttractions in body
     */
    @GetMapping("/choosen-attractions")
    @Timed
    public List<ChoosenAttraction> getAllChoosenAttractions() {
        log.debug("REST request to get all ChoosenAttractions");
        return choosenAttractionRepository.findAll();
    }

    /**
     * GET  /choosen-attractions/:id : get the "id" choosenAttraction.
     *
     * @param id the id of the choosenAttraction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the choosenAttraction, or with status 404 (Not Found)
     */
    @GetMapping("/choosen-attractions/{id}")
    @Timed
    public ResponseEntity<ChoosenAttraction> getChoosenAttraction(@PathVariable Long id) {
        log.debug("REST request to get ChoosenAttraction : {}", id);
        Optional<ChoosenAttraction> choosenAttraction = choosenAttractionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(choosenAttraction);
    }

    /**
     * DELETE  /choosen-attractions/:id : delete the "id" choosenAttraction.
     *
     * @param id the id of the choosenAttraction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/choosen-attractions/{id}")
    @Timed
    public ResponseEntity<Void> deleteChoosenAttraction(@PathVariable Long id) {
        log.debug("REST request to delete ChoosenAttraction : {}", id);

        choosenAttractionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ChosenAttraction;
import com.mycompany.myapp.repository.ChosenAttractionRepository;
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
 * REST controller for managing ChosenAttraction.
 */
@RestController
@RequestMapping("/api")
public class ChosenAttractionResource {

    private final Logger log = LoggerFactory.getLogger(ChosenAttractionResource.class);

    private static final String ENTITY_NAME = "chosenAttraction";

    private final ChosenAttractionRepository chosenAttractionRepository;

    public ChosenAttractionResource(ChosenAttractionRepository chosenAttractionRepository) {
        this.chosenAttractionRepository = chosenAttractionRepository;
    }

    /**
     * POST  /chosen-attractions : Create a new chosenAttraction.
     *
     * @param chosenAttraction the chosenAttraction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chosenAttraction, or with status 400 (Bad Request) if the chosenAttraction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chosen-attractions")
    @Timed
    public ResponseEntity<ChosenAttraction> createChosenAttraction(@RequestBody ChosenAttraction chosenAttraction) throws URISyntaxException {
        log.debug("REST request to save ChosenAttraction : {}", chosenAttraction);
        if (chosenAttraction.getId() != null) {
            throw new BadRequestAlertException("A new chosenAttraction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChosenAttraction result = chosenAttractionRepository.save(chosenAttraction);
        return ResponseEntity.created(new URI("/api/chosen-attractions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chosen-attractions : Updates an existing chosenAttraction.
     *
     * @param chosenAttraction the chosenAttraction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chosenAttraction,
     * or with status 400 (Bad Request) if the chosenAttraction is not valid,
     * or with status 500 (Internal Server Error) if the chosenAttraction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chosen-attractions")
    @Timed
    public ResponseEntity<ChosenAttraction> updateChosenAttraction(@RequestBody ChosenAttraction chosenAttraction) throws URISyntaxException {
        log.debug("REST request to update ChosenAttraction : {}", chosenAttraction);
        if (chosenAttraction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChosenAttraction result = chosenAttractionRepository.save(chosenAttraction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chosenAttraction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chosen-attractions : get all the chosenAttractions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chosenAttractions in body
     */
    @GetMapping("/chosen-attractions")
    @Timed
    public List<ChosenAttraction> getAllChosenAttractions() {
        log.debug("REST request to get all ChosenAttractions");
        return chosenAttractionRepository.findAll();
    }

    /**
     * GET  /chosen-attractions/:id : get the "id" chosenAttraction.
     *
     * @param id the id of the chosenAttraction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chosenAttraction, or with status 404 (Not Found)
     */
    @GetMapping("/chosen-attractions/{id}")
    @Timed
    public ResponseEntity<ChosenAttraction> getChosenAttraction(@PathVariable Long id) {
        log.debug("REST request to get ChosenAttraction : {}", id);
        Optional<ChosenAttraction> chosenAttraction = chosenAttractionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chosenAttraction);
    }

    /**
     * DELETE  /chosen-attractions/:id : delete the "id" chosenAttraction.
     *
     * @param id the id of the chosenAttraction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chosen-attractions/{id}")
    @Timed
    public ResponseEntity<Void> deleteChosenAttraction(@PathVariable Long id) {
        log.debug("REST request to delete ChosenAttraction : {}", id);

        chosenAttractionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Paycheck;
import com.mycompany.myapp.repository.PaycheckRepository;
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
 * REST controller for managing Paycheck.
 */
@RestController
@RequestMapping("/api")
public class PaycheckResource {

    private final Logger log = LoggerFactory.getLogger(PaycheckResource.class);

    private static final String ENTITY_NAME = "paycheck";

    private final PaycheckRepository paycheckRepository;

    public PaycheckResource(PaycheckRepository paycheckRepository) {
        this.paycheckRepository = paycheckRepository;
    }

    /**
     * POST  /paychecks : Create a new paycheck.
     *
     * @param paycheck the paycheck to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paycheck, or with status 400 (Bad Request) if the paycheck has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/paychecks")
    @Timed
    public ResponseEntity<Paycheck> createPaycheck(@RequestBody Paycheck paycheck) throws URISyntaxException {
        log.debug("REST request to save Paycheck : {}", paycheck);
        if (paycheck.getId() != null) {
            throw new BadRequestAlertException("A new paycheck cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Paycheck result = paycheckRepository.save(paycheck);
        return ResponseEntity.created(new URI("/api/paychecks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /paychecks : Updates an existing paycheck.
     *
     * @param paycheck the paycheck to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paycheck,
     * or with status 400 (Bad Request) if the paycheck is not valid,
     * or with status 500 (Internal Server Error) if the paycheck couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/paychecks")
    @Timed
    public ResponseEntity<Paycheck> updatePaycheck(@RequestBody Paycheck paycheck) throws URISyntaxException {
        log.debug("REST request to update Paycheck : {}", paycheck);
        if (paycheck.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Paycheck result = paycheckRepository.save(paycheck);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paycheck.getId().toString()))
            .body(result);
    }

    /**
     * GET  /paychecks : get all the paychecks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of paychecks in body
     */
    @GetMapping("/paychecks")
    @Timed
    public List<Paycheck> getAllPaychecks() {
        log.debug("REST request to get all Paychecks");
        return paycheckRepository.findAll();
    }

    /**
     * GET  /paychecks/:id : get the "id" paycheck.
     *
     * @param id the id of the paycheck to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paycheck, or with status 404 (Not Found)
     */
    @GetMapping("/paychecks/{id}")
    @Timed
    public ResponseEntity<Paycheck> getPaycheck(@PathVariable Long id) {
        log.debug("REST request to get Paycheck : {}", id);
        Optional<Paycheck> paycheck = paycheckRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paycheck);
    }

    /**
     * DELETE  /paychecks/:id : delete the "id" paycheck.
     *
     * @param id the id of the paycheck to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/paychecks/{id}")
    @Timed
    public ResponseEntity<Void> deletePaycheck(@PathVariable Long id) {
        log.debug("REST request to delete Paycheck : {}", id);

        paycheckRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.CheckPayment;
import com.mycompany.myapp.repository.CheckPaymentRepository;
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
 * REST controller for managing CheckPayment.
 */
@RestController
@RequestMapping("/api")
public class CheckPaymentResource {

    private final Logger log = LoggerFactory.getLogger(CheckPaymentResource.class);

    private static final String ENTITY_NAME = "checkPayment";

    private final CheckPaymentRepository checkPaymentRepository;

    public CheckPaymentResource(CheckPaymentRepository checkPaymentRepository) {
        this.checkPaymentRepository = checkPaymentRepository;
    }

    /**
     * POST  /check-payments : Create a new checkPayment.
     *
     * @param checkPayment the checkPayment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new checkPayment, or with status 400 (Bad Request) if the checkPayment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/check-payments")
    @Timed
    public ResponseEntity<CheckPayment> createCheckPayment(@RequestBody CheckPayment checkPayment) throws URISyntaxException {
        log.debug("REST request to save CheckPayment : {}", checkPayment);
        if (checkPayment.getId() != null) {
            throw new BadRequestAlertException("A new checkPayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CheckPayment result = checkPaymentRepository.save(checkPayment);
        return ResponseEntity.created(new URI("/api/check-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /check-payments : Updates an existing checkPayment.
     *
     * @param checkPayment the checkPayment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated checkPayment,
     * or with status 400 (Bad Request) if the checkPayment is not valid,
     * or with status 500 (Internal Server Error) if the checkPayment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/check-payments")
    @Timed
    public ResponseEntity<CheckPayment> updateCheckPayment(@RequestBody CheckPayment checkPayment) throws URISyntaxException {
        log.debug("REST request to update CheckPayment : {}", checkPayment);
        if (checkPayment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CheckPayment result = checkPaymentRepository.save(checkPayment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, checkPayment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /check-payments : get all the checkPayments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of checkPayments in body
     */
    @GetMapping("/check-payments")
    @Timed
    public List<CheckPayment> getAllCheckPayments() {
        log.debug("REST request to get all CheckPayments");
        return checkPaymentRepository.findAll();
    }

    /**
     * GET  /check-payments/:id : get the "id" checkPayment.
     *
     * @param id the id of the checkPayment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the checkPayment, or with status 404 (Not Found)
     */
    @GetMapping("/check-payments/{id}")
    @Timed
    public ResponseEntity<CheckPayment> getCheckPayment(@PathVariable Long id) {
        log.debug("REST request to get CheckPayment : {}", id);
        Optional<CheckPayment> checkPayment = checkPaymentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(checkPayment);
    }

    /**
     * DELETE  /check-payments/:id : delete the "id" checkPayment.
     *
     * @param id the id of the checkPayment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/check-payments/{id}")
    @Timed
    public ResponseEntity<Void> deleteCheckPayment(@PathVariable Long id) {
        log.debug("REST request to delete CheckPayment : {}", id);

        checkPaymentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.AttractionReservation;
import com.mycompany.myapp.domain.Attraction;
import com.mycompany.myapp.repository.AttractionReservationRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AttractionReservationResource REST controller.
 *
 * @see AttractionReservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class AttractionReservationResourceIntTest {

    private static final Boolean DEFAULT_IS_RESERVED = false;
    private static final Boolean UPDATED_IS_RESERVED = true;

    private static final Instant DEFAULT_RESERVATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RESERVATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AttractionReservationRepository attractionReservationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAttractionReservationMockMvc;

    private AttractionReservation attractionReservation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AttractionReservationResource attractionReservationResource = new AttractionReservationResource(attractionReservationRepository);
        this.restAttractionReservationMockMvc = MockMvcBuilders.standaloneSetup(attractionReservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AttractionReservation createEntity(EntityManager em) {
        AttractionReservation attractionReservation = new AttractionReservation()
            .isReserved(DEFAULT_IS_RESERVED)
            .reservationDate(DEFAULT_RESERVATION_DATE);
        // Add required entity
        Attraction attraction = AttractionResourceIntTest.createEntity(em);
        em.persist(attraction);
        em.flush();
        attractionReservation.setAttraction(attraction);
        return attractionReservation;
    }

    @Before
    public void initTest() {
        attractionReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttractionReservation() throws Exception {
        int databaseSizeBeforeCreate = attractionReservationRepository.findAll().size();

        // Create the AttractionReservation
        restAttractionReservationMockMvc.perform(post("/api/attraction-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attractionReservation)))
            .andExpect(status().isCreated());

        // Validate the AttractionReservation in the database
        List<AttractionReservation> attractionReservationList = attractionReservationRepository.findAll();
        assertThat(attractionReservationList).hasSize(databaseSizeBeforeCreate + 1);
        AttractionReservation testAttractionReservation = attractionReservationList.get(attractionReservationList.size() - 1);
        assertThat(testAttractionReservation.isIsReserved()).isEqualTo(DEFAULT_IS_RESERVED);
        assertThat(testAttractionReservation.getReservationDate()).isEqualTo(DEFAULT_RESERVATION_DATE);
    }

    @Test
    @Transactional
    public void createAttractionReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attractionReservationRepository.findAll().size();

        // Create the AttractionReservation with an existing ID
        attractionReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttractionReservationMockMvc.perform(post("/api/attraction-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attractionReservation)))
            .andExpect(status().isBadRequest());

        // Validate the AttractionReservation in the database
        List<AttractionReservation> attractionReservationList = attractionReservationRepository.findAll();
        assertThat(attractionReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAttractionReservations() throws Exception {
        // Initialize the database
        attractionReservationRepository.saveAndFlush(attractionReservation);

        // Get all the attractionReservationList
        restAttractionReservationMockMvc.perform(get("/api/attraction-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attractionReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].isReserved").value(hasItem(DEFAULT_IS_RESERVED.booleanValue())))
            .andExpect(jsonPath("$.[*].reservationDate").value(hasItem(DEFAULT_RESERVATION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getAttractionReservation() throws Exception {
        // Initialize the database
        attractionReservationRepository.saveAndFlush(attractionReservation);

        // Get the attractionReservation
        restAttractionReservationMockMvc.perform(get("/api/attraction-reservations/{id}", attractionReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(attractionReservation.getId().intValue()))
            .andExpect(jsonPath("$.isReserved").value(DEFAULT_IS_RESERVED.booleanValue()))
            .andExpect(jsonPath("$.reservationDate").value(DEFAULT_RESERVATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAttractionReservation() throws Exception {
        // Get the attractionReservation
        restAttractionReservationMockMvc.perform(get("/api/attraction-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttractionReservation() throws Exception {
        // Initialize the database
        attractionReservationRepository.saveAndFlush(attractionReservation);

        int databaseSizeBeforeUpdate = attractionReservationRepository.findAll().size();

        // Update the attractionReservation
        AttractionReservation updatedAttractionReservation = attractionReservationRepository.findById(attractionReservation.getId()).get();
        // Disconnect from session so that the updates on updatedAttractionReservation are not directly saved in db
        em.detach(updatedAttractionReservation);
        updatedAttractionReservation
            .isReserved(UPDATED_IS_RESERVED)
            .reservationDate(UPDATED_RESERVATION_DATE);

        restAttractionReservationMockMvc.perform(put("/api/attraction-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAttractionReservation)))
            .andExpect(status().isOk());

        // Validate the AttractionReservation in the database
        List<AttractionReservation> attractionReservationList = attractionReservationRepository.findAll();
        assertThat(attractionReservationList).hasSize(databaseSizeBeforeUpdate);
        AttractionReservation testAttractionReservation = attractionReservationList.get(attractionReservationList.size() - 1);
        assertThat(testAttractionReservation.isIsReserved()).isEqualTo(UPDATED_IS_RESERVED);
        assertThat(testAttractionReservation.getReservationDate()).isEqualTo(UPDATED_RESERVATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingAttractionReservation() throws Exception {
        int databaseSizeBeforeUpdate = attractionReservationRepository.findAll().size();

        // Create the AttractionReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttractionReservationMockMvc.perform(put("/api/attraction-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attractionReservation)))
            .andExpect(status().isBadRequest());

        // Validate the AttractionReservation in the database
        List<AttractionReservation> attractionReservationList = attractionReservationRepository.findAll();
        assertThat(attractionReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAttractionReservation() throws Exception {
        // Initialize the database
        attractionReservationRepository.saveAndFlush(attractionReservation);

        int databaseSizeBeforeDelete = attractionReservationRepository.findAll().size();

        // Get the attractionReservation
        restAttractionReservationMockMvc.perform(delete("/api/attraction-reservations/{id}", attractionReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AttractionReservation> attractionReservationList = attractionReservationRepository.findAll();
        assertThat(attractionReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AttractionReservation.class);
        AttractionReservation attractionReservation1 = new AttractionReservation();
        attractionReservation1.setId(1L);
        AttractionReservation attractionReservation2 = new AttractionReservation();
        attractionReservation2.setId(attractionReservation1.getId());
        assertThat(attractionReservation1).isEqualTo(attractionReservation2);
        attractionReservation2.setId(2L);
        assertThat(attractionReservation1).isNotEqualTo(attractionReservation2);
        attractionReservation1.setId(null);
        assertThat(attractionReservation1).isNotEqualTo(attractionReservation2);
    }
}

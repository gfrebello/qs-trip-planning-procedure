package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.ChosenAttraction;
import com.mycompany.myapp.repository.ChosenAttractionRepository;
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
 * Test class for the ChosenAttractionResource REST controller.
 *
 * @see ChosenAttractionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class ChosenAttractionResourceIntTest {

    private static final Boolean DEFAULT_IS_RESERVED = false;
    private static final Boolean UPDATED_IS_RESERVED = true;

    private static final Instant DEFAULT_RESERVATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RESERVATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ChosenAttractionRepository chosenAttractionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChosenAttractionMockMvc;

    private ChosenAttraction chosenAttraction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChosenAttractionResource chosenAttractionResource = new ChosenAttractionResource(chosenAttractionRepository);
        this.restChosenAttractionMockMvc = MockMvcBuilders.standaloneSetup(chosenAttractionResource)
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
    public static ChosenAttraction createEntity(EntityManager em) {
        ChosenAttraction chosenAttraction = new ChosenAttraction()
            .isReserved(DEFAULT_IS_RESERVED)
            .reservationDate(DEFAULT_RESERVATION_DATE);
        return chosenAttraction;
    }

    @Before
    public void initTest() {
        chosenAttraction = createEntity(em);
    }

    @Test
    @Transactional
    public void createChosenAttraction() throws Exception {
        int databaseSizeBeforeCreate = chosenAttractionRepository.findAll().size();

        // Create the ChosenAttraction
        restChosenAttractionMockMvc.perform(post("/api/chosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chosenAttraction)))
            .andExpect(status().isCreated());

        // Validate the ChosenAttraction in the database
        List<ChosenAttraction> chosenAttractionList = chosenAttractionRepository.findAll();
        assertThat(chosenAttractionList).hasSize(databaseSizeBeforeCreate + 1);
        ChosenAttraction testChosenAttraction = chosenAttractionList.get(chosenAttractionList.size() - 1);
        assertThat(testChosenAttraction.isIsReserved()).isEqualTo(DEFAULT_IS_RESERVED);
        assertThat(testChosenAttraction.getReservationDate()).isEqualTo(DEFAULT_RESERVATION_DATE);
    }

    @Test
    @Transactional
    public void createChosenAttractionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chosenAttractionRepository.findAll().size();

        // Create the ChosenAttraction with an existing ID
        chosenAttraction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChosenAttractionMockMvc.perform(post("/api/chosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chosenAttraction)))
            .andExpect(status().isBadRequest());

        // Validate the ChosenAttraction in the database
        List<ChosenAttraction> chosenAttractionList = chosenAttractionRepository.findAll();
        assertThat(chosenAttractionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChosenAttractions() throws Exception {
        // Initialize the database
        chosenAttractionRepository.saveAndFlush(chosenAttraction);

        // Get all the chosenAttractionList
        restChosenAttractionMockMvc.perform(get("/api/chosen-attractions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chosenAttraction.getId().intValue())))
            .andExpect(jsonPath("$.[*].isReserved").value(hasItem(DEFAULT_IS_RESERVED.booleanValue())))
            .andExpect(jsonPath("$.[*].reservationDate").value(hasItem(DEFAULT_RESERVATION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getChosenAttraction() throws Exception {
        // Initialize the database
        chosenAttractionRepository.saveAndFlush(chosenAttraction);

        // Get the chosenAttraction
        restChosenAttractionMockMvc.perform(get("/api/chosen-attractions/{id}", chosenAttraction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chosenAttraction.getId().intValue()))
            .andExpect(jsonPath("$.isReserved").value(DEFAULT_IS_RESERVED.booleanValue()))
            .andExpect(jsonPath("$.reservationDate").value(DEFAULT_RESERVATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChosenAttraction() throws Exception {
        // Get the chosenAttraction
        restChosenAttractionMockMvc.perform(get("/api/chosen-attractions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChosenAttraction() throws Exception {
        // Initialize the database
        chosenAttractionRepository.saveAndFlush(chosenAttraction);

        int databaseSizeBeforeUpdate = chosenAttractionRepository.findAll().size();

        // Update the chosenAttraction
        ChosenAttraction updatedChosenAttraction = chosenAttractionRepository.findById(chosenAttraction.getId()).get();
        // Disconnect from session so that the updates on updatedChosenAttraction are not directly saved in db
        em.detach(updatedChosenAttraction);
        updatedChosenAttraction
            .isReserved(UPDATED_IS_RESERVED)
            .reservationDate(UPDATED_RESERVATION_DATE);

        restChosenAttractionMockMvc.perform(put("/api/chosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChosenAttraction)))
            .andExpect(status().isOk());

        // Validate the ChosenAttraction in the database
        List<ChosenAttraction> chosenAttractionList = chosenAttractionRepository.findAll();
        assertThat(chosenAttractionList).hasSize(databaseSizeBeforeUpdate);
        ChosenAttraction testChosenAttraction = chosenAttractionList.get(chosenAttractionList.size() - 1);
        assertThat(testChosenAttraction.isIsReserved()).isEqualTo(UPDATED_IS_RESERVED);
        assertThat(testChosenAttraction.getReservationDate()).isEqualTo(UPDATED_RESERVATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingChosenAttraction() throws Exception {
        int databaseSizeBeforeUpdate = chosenAttractionRepository.findAll().size();

        // Create the ChosenAttraction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChosenAttractionMockMvc.perform(put("/api/chosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chosenAttraction)))
            .andExpect(status().isBadRequest());

        // Validate the ChosenAttraction in the database
        List<ChosenAttraction> chosenAttractionList = chosenAttractionRepository.findAll();
        assertThat(chosenAttractionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChosenAttraction() throws Exception {
        // Initialize the database
        chosenAttractionRepository.saveAndFlush(chosenAttraction);

        int databaseSizeBeforeDelete = chosenAttractionRepository.findAll().size();

        // Get the chosenAttraction
        restChosenAttractionMockMvc.perform(delete("/api/chosen-attractions/{id}", chosenAttraction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ChosenAttraction> chosenAttractionList = chosenAttractionRepository.findAll();
        assertThat(chosenAttractionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChosenAttraction.class);
        ChosenAttraction chosenAttraction1 = new ChosenAttraction();
        chosenAttraction1.setId(1L);
        ChosenAttraction chosenAttraction2 = new ChosenAttraction();
        chosenAttraction2.setId(chosenAttraction1.getId());
        assertThat(chosenAttraction1).isEqualTo(chosenAttraction2);
        chosenAttraction2.setId(2L);
        assertThat(chosenAttraction1).isNotEqualTo(chosenAttraction2);
        chosenAttraction1.setId(null);
        assertThat(chosenAttraction1).isNotEqualTo(chosenAttraction2);
    }
}

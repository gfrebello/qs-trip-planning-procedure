package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.ChoosenAttraction;
import com.mycompany.myapp.repository.ChoosenAttractionRepository;
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
 * Test class for the ChoosenAttractionResource REST controller.
 *
 * @see ChoosenAttractionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class ChoosenAttractionResourceIntTest {

    private static final Boolean DEFAULT_IS_RESERVED = false;
    private static final Boolean UPDATED_IS_RESERVED = true;

    private static final Instant DEFAULT_RESERVATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RESERVATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ChoosenAttractionRepository choosenAttractionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChoosenAttractionMockMvc;

    private ChoosenAttraction choosenAttraction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChoosenAttractionResource choosenAttractionResource = new ChoosenAttractionResource(choosenAttractionRepository);
        this.restChoosenAttractionMockMvc = MockMvcBuilders.standaloneSetup(choosenAttractionResource)
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
    public static ChoosenAttraction createEntity(EntityManager em) {
        ChoosenAttraction choosenAttraction = new ChoosenAttraction()
            .isReserved(DEFAULT_IS_RESERVED)
            .reservationDate(DEFAULT_RESERVATION_DATE);
        return choosenAttraction;
    }

    @Before
    public void initTest() {
        choosenAttraction = createEntity(em);
    }

    @Test
    @Transactional
    public void createChoosenAttraction() throws Exception {
        int databaseSizeBeforeCreate = choosenAttractionRepository.findAll().size();

        // Create the ChoosenAttraction
        restChoosenAttractionMockMvc.perform(post("/api/choosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(choosenAttraction)))
            .andExpect(status().isCreated());

        // Validate the ChoosenAttraction in the database
        List<ChoosenAttraction> choosenAttractionList = choosenAttractionRepository.findAll();
        assertThat(choosenAttractionList).hasSize(databaseSizeBeforeCreate + 1);
        ChoosenAttraction testChoosenAttraction = choosenAttractionList.get(choosenAttractionList.size() - 1);
        assertThat(testChoosenAttraction.isIsReserved()).isEqualTo(DEFAULT_IS_RESERVED);
        assertThat(testChoosenAttraction.getReservationDate()).isEqualTo(DEFAULT_RESERVATION_DATE);
    }

    @Test
    @Transactional
    public void createChoosenAttractionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = choosenAttractionRepository.findAll().size();

        // Create the ChoosenAttraction with an existing ID
        choosenAttraction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChoosenAttractionMockMvc.perform(post("/api/choosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(choosenAttraction)))
            .andExpect(status().isBadRequest());

        // Validate the ChoosenAttraction in the database
        List<ChoosenAttraction> choosenAttractionList = choosenAttractionRepository.findAll();
        assertThat(choosenAttractionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChoosenAttractions() throws Exception {
        // Initialize the database
        choosenAttractionRepository.saveAndFlush(choosenAttraction);

        // Get all the choosenAttractionList
        restChoosenAttractionMockMvc.perform(get("/api/choosen-attractions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(choosenAttraction.getId().intValue())))
            .andExpect(jsonPath("$.[*].isReserved").value(hasItem(DEFAULT_IS_RESERVED.booleanValue())))
            .andExpect(jsonPath("$.[*].reservationDate").value(hasItem(DEFAULT_RESERVATION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getChoosenAttraction() throws Exception {
        // Initialize the database
        choosenAttractionRepository.saveAndFlush(choosenAttraction);

        // Get the choosenAttraction
        restChoosenAttractionMockMvc.perform(get("/api/choosen-attractions/{id}", choosenAttraction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(choosenAttraction.getId().intValue()))
            .andExpect(jsonPath("$.isReserved").value(DEFAULT_IS_RESERVED.booleanValue()))
            .andExpect(jsonPath("$.reservationDate").value(DEFAULT_RESERVATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChoosenAttraction() throws Exception {
        // Get the choosenAttraction
        restChoosenAttractionMockMvc.perform(get("/api/choosen-attractions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChoosenAttraction() throws Exception {
        // Initialize the database
        choosenAttractionRepository.saveAndFlush(choosenAttraction);

        int databaseSizeBeforeUpdate = choosenAttractionRepository.findAll().size();

        // Update the choosenAttraction
        ChoosenAttraction updatedChoosenAttraction = choosenAttractionRepository.findById(choosenAttraction.getId()).get();
        // Disconnect from session so that the updates on updatedChoosenAttraction are not directly saved in db
        em.detach(updatedChoosenAttraction);
        updatedChoosenAttraction
            .isReserved(UPDATED_IS_RESERVED)
            .reservationDate(UPDATED_RESERVATION_DATE);

        restChoosenAttractionMockMvc.perform(put("/api/choosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChoosenAttraction)))
            .andExpect(status().isOk());

        // Validate the ChoosenAttraction in the database
        List<ChoosenAttraction> choosenAttractionList = choosenAttractionRepository.findAll();
        assertThat(choosenAttractionList).hasSize(databaseSizeBeforeUpdate);
        ChoosenAttraction testChoosenAttraction = choosenAttractionList.get(choosenAttractionList.size() - 1);
        assertThat(testChoosenAttraction.isIsReserved()).isEqualTo(UPDATED_IS_RESERVED);
        assertThat(testChoosenAttraction.getReservationDate()).isEqualTo(UPDATED_RESERVATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingChoosenAttraction() throws Exception {
        int databaseSizeBeforeUpdate = choosenAttractionRepository.findAll().size();

        // Create the ChoosenAttraction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoosenAttractionMockMvc.perform(put("/api/choosen-attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(choosenAttraction)))
            .andExpect(status().isBadRequest());

        // Validate the ChoosenAttraction in the database
        List<ChoosenAttraction> choosenAttractionList = choosenAttractionRepository.findAll();
        assertThat(choosenAttractionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChoosenAttraction() throws Exception {
        // Initialize the database
        choosenAttractionRepository.saveAndFlush(choosenAttraction);

        int databaseSizeBeforeDelete = choosenAttractionRepository.findAll().size();

        // Get the choosenAttraction
        restChoosenAttractionMockMvc.perform(delete("/api/choosen-attractions/{id}", choosenAttraction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ChoosenAttraction> choosenAttractionList = choosenAttractionRepository.findAll();
        assertThat(choosenAttractionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChoosenAttraction.class);
        ChoosenAttraction choosenAttraction1 = new ChoosenAttraction();
        choosenAttraction1.setId(1L);
        ChoosenAttraction choosenAttraction2 = new ChoosenAttraction();
        choosenAttraction2.setId(choosenAttraction1.getId());
        assertThat(choosenAttraction1).isEqualTo(choosenAttraction2);
        choosenAttraction2.setId(2L);
        assertThat(choosenAttraction1).isNotEqualTo(choosenAttraction2);
        choosenAttraction1.setId(null);
        assertThat(choosenAttraction1).isNotEqualTo(choosenAttraction2);
    }
}

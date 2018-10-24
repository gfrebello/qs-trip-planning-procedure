package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.FlightReservation;
import com.mycompany.myapp.repository.FlightReservationRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FlightReservationResource REST controller.
 *
 * @see FlightReservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class FlightReservationResourceIntTest {

    private static final String DEFAULT_RESERVATION_ID = "AAAAAAAAAA";
    private static final String UPDATED_RESERVATION_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMBER_OF_PEOPLE = 1;
    private static final Integer UPDATED_NUMBER_OF_PEOPLE = 2;

    private static final String DEFAULT_CUSTOMER_CLASS = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_CLASS = "BBBBBBBBBB";

    @Autowired
    private FlightReservationRepository flightReservationRepository;

    @Mock
    private FlightReservationRepository flightReservationRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlightReservationMockMvc;

    private FlightReservation flightReservation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightReservationResource flightReservationResource = new FlightReservationResource(flightReservationRepository);
        this.restFlightReservationMockMvc = MockMvcBuilders.standaloneSetup(flightReservationResource)
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
    public static FlightReservation createEntity(EntityManager em) {
        FlightReservation flightReservation = new FlightReservation()
            .reservationId(DEFAULT_RESERVATION_ID)
            .numberOfPeople(DEFAULT_NUMBER_OF_PEOPLE)
            .customerClass(DEFAULT_CUSTOMER_CLASS);
        return flightReservation;
    }

    @Before
    public void initTest() {
        flightReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightReservation() throws Exception {
        int databaseSizeBeforeCreate = flightReservationRepository.findAll().size();

        // Create the FlightReservation
        restFlightReservationMockMvc.perform(post("/api/flight-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightReservation)))
            .andExpect(status().isCreated());

        // Validate the FlightReservation in the database
        List<FlightReservation> flightReservationList = flightReservationRepository.findAll();
        assertThat(flightReservationList).hasSize(databaseSizeBeforeCreate + 1);
        FlightReservation testFlightReservation = flightReservationList.get(flightReservationList.size() - 1);
        assertThat(testFlightReservation.getReservationId()).isEqualTo(DEFAULT_RESERVATION_ID);
        assertThat(testFlightReservation.getNumberOfPeople()).isEqualTo(DEFAULT_NUMBER_OF_PEOPLE);
        assertThat(testFlightReservation.getCustomerClass()).isEqualTo(DEFAULT_CUSTOMER_CLASS);
    }

    @Test
    @Transactional
    public void createFlightReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightReservationRepository.findAll().size();

        // Create the FlightReservation with an existing ID
        flightReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightReservationMockMvc.perform(post("/api/flight-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightReservation)))
            .andExpect(status().isBadRequest());

        // Validate the FlightReservation in the database
        List<FlightReservation> flightReservationList = flightReservationRepository.findAll();
        assertThat(flightReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlightReservations() throws Exception {
        // Initialize the database
        flightReservationRepository.saveAndFlush(flightReservation);

        // Get all the flightReservationList
        restFlightReservationMockMvc.perform(get("/api/flight-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].reservationId").value(hasItem(DEFAULT_RESERVATION_ID.toString())))
            .andExpect(jsonPath("$.[*].numberOfPeople").value(hasItem(DEFAULT_NUMBER_OF_PEOPLE)))
            .andExpect(jsonPath("$.[*].customerClass").value(hasItem(DEFAULT_CUSTOMER_CLASS.toString())));
    }
    
    public void getAllFlightReservationsWithEagerRelationshipsIsEnabled() throws Exception {
        FlightReservationResource flightReservationResource = new FlightReservationResource(flightReservationRepositoryMock);
        when(flightReservationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restFlightReservationMockMvc = MockMvcBuilders.standaloneSetup(flightReservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restFlightReservationMockMvc.perform(get("/api/flight-reservations?eagerload=true"))
        .andExpect(status().isOk());

        verify(flightReservationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllFlightReservationsWithEagerRelationshipsIsNotEnabled() throws Exception {
        FlightReservationResource flightReservationResource = new FlightReservationResource(flightReservationRepositoryMock);
            when(flightReservationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restFlightReservationMockMvc = MockMvcBuilders.standaloneSetup(flightReservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restFlightReservationMockMvc.perform(get("/api/flight-reservations?eagerload=true"))
        .andExpect(status().isOk());

            verify(flightReservationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFlightReservation() throws Exception {
        // Initialize the database
        flightReservationRepository.saveAndFlush(flightReservation);

        // Get the flightReservation
        restFlightReservationMockMvc.perform(get("/api/flight-reservations/{id}", flightReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightReservation.getId().intValue()))
            .andExpect(jsonPath("$.reservationId").value(DEFAULT_RESERVATION_ID.toString()))
            .andExpect(jsonPath("$.numberOfPeople").value(DEFAULT_NUMBER_OF_PEOPLE))
            .andExpect(jsonPath("$.customerClass").value(DEFAULT_CUSTOMER_CLASS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFlightReservation() throws Exception {
        // Get the flightReservation
        restFlightReservationMockMvc.perform(get("/api/flight-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightReservation() throws Exception {
        // Initialize the database
        flightReservationRepository.saveAndFlush(flightReservation);

        int databaseSizeBeforeUpdate = flightReservationRepository.findAll().size();

        // Update the flightReservation
        FlightReservation updatedFlightReservation = flightReservationRepository.findById(flightReservation.getId()).get();
        // Disconnect from session so that the updates on updatedFlightReservation are not directly saved in db
        em.detach(updatedFlightReservation);
        updatedFlightReservation
            .reservationId(UPDATED_RESERVATION_ID)
            .numberOfPeople(UPDATED_NUMBER_OF_PEOPLE)
            .customerClass(UPDATED_CUSTOMER_CLASS);

        restFlightReservationMockMvc.perform(put("/api/flight-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlightReservation)))
            .andExpect(status().isOk());

        // Validate the FlightReservation in the database
        List<FlightReservation> flightReservationList = flightReservationRepository.findAll();
        assertThat(flightReservationList).hasSize(databaseSizeBeforeUpdate);
        FlightReservation testFlightReservation = flightReservationList.get(flightReservationList.size() - 1);
        assertThat(testFlightReservation.getReservationId()).isEqualTo(UPDATED_RESERVATION_ID);
        assertThat(testFlightReservation.getNumberOfPeople()).isEqualTo(UPDATED_NUMBER_OF_PEOPLE);
        assertThat(testFlightReservation.getCustomerClass()).isEqualTo(UPDATED_CUSTOMER_CLASS);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightReservation() throws Exception {
        int databaseSizeBeforeUpdate = flightReservationRepository.findAll().size();

        // Create the FlightReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlightReservationMockMvc.perform(put("/api/flight-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightReservation)))
            .andExpect(status().isBadRequest());

        // Validate the FlightReservation in the database
        List<FlightReservation> flightReservationList = flightReservationRepository.findAll();
        assertThat(flightReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlightReservation() throws Exception {
        // Initialize the database
        flightReservationRepository.saveAndFlush(flightReservation);

        int databaseSizeBeforeDelete = flightReservationRepository.findAll().size();

        // Get the flightReservation
        restFlightReservationMockMvc.perform(delete("/api/flight-reservations/{id}", flightReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightReservation> flightReservationList = flightReservationRepository.findAll();
        assertThat(flightReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightReservation.class);
        FlightReservation flightReservation1 = new FlightReservation();
        flightReservation1.setId(1L);
        FlightReservation flightReservation2 = new FlightReservation();
        flightReservation2.setId(flightReservation1.getId());
        assertThat(flightReservation1).isEqualTo(flightReservation2);
        flightReservation2.setId(2L);
        assertThat(flightReservation1).isNotEqualTo(flightReservation2);
        flightReservation1.setId(null);
        assertThat(flightReservation1).isNotEqualTo(flightReservation2);
    }
}

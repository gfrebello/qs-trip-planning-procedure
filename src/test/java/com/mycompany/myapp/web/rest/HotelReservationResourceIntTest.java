package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.HotelReservation;
import com.mycompany.myapp.repository.HotelReservationRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HotelReservationResource REST controller.
 *
 * @see HotelReservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class HotelReservationResourceIntTest {

    private static final Integer DEFAULT_NUMBER_OF_PEOPLE = 1;
    private static final Integer UPDATED_NUMBER_OF_PEOPLE = 2;

    private static final LocalDate DEFAULT_CHECKIN_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CHECKIN_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_CHECKOUT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CHECKOUT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_TOTAL_PRICE = 1F;
    private static final Float UPDATED_TOTAL_PRICE = 2F;

    @Autowired
    private HotelReservationRepository hotelReservationRepository;

    @Mock
    private HotelReservationRepository hotelReservationRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHotelReservationMockMvc;

    private HotelReservation hotelReservation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HotelReservationResource hotelReservationResource = new HotelReservationResource(hotelReservationRepository);
        this.restHotelReservationMockMvc = MockMvcBuilders.standaloneSetup(hotelReservationResource)
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
    public static HotelReservation createEntity(EntityManager em) {
        HotelReservation hotelReservation = new HotelReservation()
            .numberOfPeople(DEFAULT_NUMBER_OF_PEOPLE)
            .checkinDate(DEFAULT_CHECKIN_DATE)
            .checkoutDate(DEFAULT_CHECKOUT_DATE)
            .totalPrice(DEFAULT_TOTAL_PRICE);
        return hotelReservation;
    }

    @Before
    public void initTest() {
        hotelReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createHotelReservation() throws Exception {
        int databaseSizeBeforeCreate = hotelReservationRepository.findAll().size();

        // Create the HotelReservation
        restHotelReservationMockMvc.perform(post("/api/hotel-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelReservation)))
            .andExpect(status().isCreated());

        // Validate the HotelReservation in the database
        List<HotelReservation> hotelReservationList = hotelReservationRepository.findAll();
        assertThat(hotelReservationList).hasSize(databaseSizeBeforeCreate + 1);
        HotelReservation testHotelReservation = hotelReservationList.get(hotelReservationList.size() - 1);
        assertThat(testHotelReservation.getNumberOfPeople()).isEqualTo(DEFAULT_NUMBER_OF_PEOPLE);
        assertThat(testHotelReservation.getCheckinDate()).isEqualTo(DEFAULT_CHECKIN_DATE);
        assertThat(testHotelReservation.getCheckoutDate()).isEqualTo(DEFAULT_CHECKOUT_DATE);
        assertThat(testHotelReservation.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void createHotelReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hotelReservationRepository.findAll().size();

        // Create the HotelReservation with an existing ID
        hotelReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHotelReservationMockMvc.perform(post("/api/hotel-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelReservation)))
            .andExpect(status().isBadRequest());

        // Validate the HotelReservation in the database
        List<HotelReservation> hotelReservationList = hotelReservationRepository.findAll();
        assertThat(hotelReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHotelReservations() throws Exception {
        // Initialize the database
        hotelReservationRepository.saveAndFlush(hotelReservation);

        // Get all the hotelReservationList
        restHotelReservationMockMvc.perform(get("/api/hotel-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hotelReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].numberOfPeople").value(hasItem(DEFAULT_NUMBER_OF_PEOPLE)))
            .andExpect(jsonPath("$.[*].checkinDate").value(hasItem(DEFAULT_CHECKIN_DATE.toString())))
            .andExpect(jsonPath("$.[*].checkoutDate").value(hasItem(DEFAULT_CHECKOUT_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.doubleValue())));
    }
    
    public void getAllHotelReservationsWithEagerRelationshipsIsEnabled() throws Exception {
        HotelReservationResource hotelReservationResource = new HotelReservationResource(hotelReservationRepositoryMock);
        when(hotelReservationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restHotelReservationMockMvc = MockMvcBuilders.standaloneSetup(hotelReservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restHotelReservationMockMvc.perform(get("/api/hotel-reservations?eagerload=true"))
        .andExpect(status().isOk());

        verify(hotelReservationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllHotelReservationsWithEagerRelationshipsIsNotEnabled() throws Exception {
        HotelReservationResource hotelReservationResource = new HotelReservationResource(hotelReservationRepositoryMock);
            when(hotelReservationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restHotelReservationMockMvc = MockMvcBuilders.standaloneSetup(hotelReservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restHotelReservationMockMvc.perform(get("/api/hotel-reservations?eagerload=true"))
        .andExpect(status().isOk());

            verify(hotelReservationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getHotelReservation() throws Exception {
        // Initialize the database
        hotelReservationRepository.saveAndFlush(hotelReservation);

        // Get the hotelReservation
        restHotelReservationMockMvc.perform(get("/api/hotel-reservations/{id}", hotelReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hotelReservation.getId().intValue()))
            .andExpect(jsonPath("$.numberOfPeople").value(DEFAULT_NUMBER_OF_PEOPLE))
            .andExpect(jsonPath("$.checkinDate").value(DEFAULT_CHECKIN_DATE.toString()))
            .andExpect(jsonPath("$.checkoutDate").value(DEFAULT_CHECKOUT_DATE.toString()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHotelReservation() throws Exception {
        // Get the hotelReservation
        restHotelReservationMockMvc.perform(get("/api/hotel-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHotelReservation() throws Exception {
        // Initialize the database
        hotelReservationRepository.saveAndFlush(hotelReservation);

        int databaseSizeBeforeUpdate = hotelReservationRepository.findAll().size();

        // Update the hotelReservation
        HotelReservation updatedHotelReservation = hotelReservationRepository.findById(hotelReservation.getId()).get();
        // Disconnect from session so that the updates on updatedHotelReservation are not directly saved in db
        em.detach(updatedHotelReservation);
        updatedHotelReservation
            .numberOfPeople(UPDATED_NUMBER_OF_PEOPLE)
            .checkinDate(UPDATED_CHECKIN_DATE)
            .checkoutDate(UPDATED_CHECKOUT_DATE)
            .totalPrice(UPDATED_TOTAL_PRICE);

        restHotelReservationMockMvc.perform(put("/api/hotel-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHotelReservation)))
            .andExpect(status().isOk());

        // Validate the HotelReservation in the database
        List<HotelReservation> hotelReservationList = hotelReservationRepository.findAll();
        assertThat(hotelReservationList).hasSize(databaseSizeBeforeUpdate);
        HotelReservation testHotelReservation = hotelReservationList.get(hotelReservationList.size() - 1);
        assertThat(testHotelReservation.getNumberOfPeople()).isEqualTo(UPDATED_NUMBER_OF_PEOPLE);
        assertThat(testHotelReservation.getCheckinDate()).isEqualTo(UPDATED_CHECKIN_DATE);
        assertThat(testHotelReservation.getCheckoutDate()).isEqualTo(UPDATED_CHECKOUT_DATE);
        assertThat(testHotelReservation.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingHotelReservation() throws Exception {
        int databaseSizeBeforeUpdate = hotelReservationRepository.findAll().size();

        // Create the HotelReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHotelReservationMockMvc.perform(put("/api/hotel-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelReservation)))
            .andExpect(status().isBadRequest());

        // Validate the HotelReservation in the database
        List<HotelReservation> hotelReservationList = hotelReservationRepository.findAll();
        assertThat(hotelReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHotelReservation() throws Exception {
        // Initialize the database
        hotelReservationRepository.saveAndFlush(hotelReservation);

        int databaseSizeBeforeDelete = hotelReservationRepository.findAll().size();

        // Get the hotelReservation
        restHotelReservationMockMvc.perform(delete("/api/hotel-reservations/{id}", hotelReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HotelReservation> hotelReservationList = hotelReservationRepository.findAll();
        assertThat(hotelReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HotelReservation.class);
        HotelReservation hotelReservation1 = new HotelReservation();
        hotelReservation1.setId(1L);
        HotelReservation hotelReservation2 = new HotelReservation();
        hotelReservation2.setId(hotelReservation1.getId());
        assertThat(hotelReservation1).isEqualTo(hotelReservation2);
        hotelReservation2.setId(2L);
        assertThat(hotelReservation1).isNotEqualTo(hotelReservation2);
        hotelReservation1.setId(null);
        assertThat(hotelReservation1).isNotEqualTo(hotelReservation2);
    }
}

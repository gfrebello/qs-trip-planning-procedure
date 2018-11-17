package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.CarRental;
import com.mycompany.myapp.repository.CarRentalRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CarRentalResource REST controller.
 *
 * @see CarRentalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class CarRentalResourceIntTest {

    private static final String DEFAULT_CAR_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_CAR_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_RENTAL_DAYS = 1;
    private static final Integer UPDATED_RENTAL_DAYS = 2;

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;

    private static final String DEFAULT_PICKUP_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_PICKUP_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_DROPOFF_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_DROPOFF_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    @Autowired
    private CarRentalRepository carRentalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCarRentalMockMvc;

    private CarRental carRental;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarRentalResource carRentalResource = new CarRentalResource(carRentalRepository);
        this.restCarRentalMockMvc = MockMvcBuilders.standaloneSetup(carRentalResource)
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
    public static CarRental createEntity(EntityManager em) {
        CarRental carRental = new CarRental()
            .carType(DEFAULT_CAR_TYPE)
            .rentalDays(DEFAULT_RENTAL_DAYS)
            .startDate(DEFAULT_START_DATE)
            .price(DEFAULT_PRICE)
            .pickupAddress(DEFAULT_PICKUP_ADDRESS)
            .dropoffAddress(DEFAULT_DROPOFF_ADDRESS)
            .color(DEFAULT_COLOR);
        return carRental;
    }

    @Before
    public void initTest() {
        carRental = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarRental() throws Exception {
        int databaseSizeBeforeCreate = carRentalRepository.findAll().size();

        // Create the CarRental
        restCarRentalMockMvc.perform(post("/api/car-rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carRental)))
            .andExpect(status().isCreated());

        // Validate the CarRental in the database
        List<CarRental> carRentalList = carRentalRepository.findAll();
        assertThat(carRentalList).hasSize(databaseSizeBeforeCreate + 1);
        CarRental testCarRental = carRentalList.get(carRentalList.size() - 1);
        assertThat(testCarRental.getCarType()).isEqualTo(DEFAULT_CAR_TYPE);
        assertThat(testCarRental.getRentalDays()).isEqualTo(DEFAULT_RENTAL_DAYS);
        assertThat(testCarRental.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCarRental.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testCarRental.getPickupAddress()).isEqualTo(DEFAULT_PICKUP_ADDRESS);
        assertThat(testCarRental.getDropoffAddress()).isEqualTo(DEFAULT_DROPOFF_ADDRESS);
        assertThat(testCarRental.getColor()).isEqualTo(DEFAULT_COLOR);
    }

    @Test
    @Transactional
    public void createCarRentalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carRentalRepository.findAll().size();

        // Create the CarRental with an existing ID
        carRental.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarRentalMockMvc.perform(post("/api/car-rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carRental)))
            .andExpect(status().isBadRequest());

        // Validate the CarRental in the database
        List<CarRental> carRentalList = carRentalRepository.findAll();
        assertThat(carRentalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCarRentals() throws Exception {
        // Initialize the database
        carRentalRepository.saveAndFlush(carRental);

        // Get all the carRentalList
        restCarRentalMockMvc.perform(get("/api/car-rentals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carRental.getId().intValue())))
            .andExpect(jsonPath("$.[*].carType").value(hasItem(DEFAULT_CAR_TYPE.toString())))
            .andExpect(jsonPath("$.[*].rentalDays").value(hasItem(DEFAULT_RENTAL_DAYS)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].pickupAddress").value(hasItem(DEFAULT_PICKUP_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].dropoffAddress").value(hasItem(DEFAULT_DROPOFF_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())));
    }
    
    @Test
    @Transactional
    public void getCarRental() throws Exception {
        // Initialize the database
        carRentalRepository.saveAndFlush(carRental);

        // Get the carRental
        restCarRentalMockMvc.perform(get("/api/car-rentals/{id}", carRental.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carRental.getId().intValue()))
            .andExpect(jsonPath("$.carType").value(DEFAULT_CAR_TYPE.toString()))
            .andExpect(jsonPath("$.rentalDays").value(DEFAULT_RENTAL_DAYS))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.pickupAddress").value(DEFAULT_PICKUP_ADDRESS.toString()))
            .andExpect(jsonPath("$.dropoffAddress").value(DEFAULT_DROPOFF_ADDRESS.toString()))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCarRental() throws Exception {
        // Get the carRental
        restCarRentalMockMvc.perform(get("/api/car-rentals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarRental() throws Exception {
        // Initialize the database
        carRentalRepository.saveAndFlush(carRental);

        int databaseSizeBeforeUpdate = carRentalRepository.findAll().size();

        // Update the carRental
        CarRental updatedCarRental = carRentalRepository.findById(carRental.getId()).get();
        // Disconnect from session so that the updates on updatedCarRental are not directly saved in db
        em.detach(updatedCarRental);
        updatedCarRental
            .carType(UPDATED_CAR_TYPE)
            .rentalDays(UPDATED_RENTAL_DAYS)
            .startDate(UPDATED_START_DATE)
            .price(UPDATED_PRICE)
            .pickupAddress(UPDATED_PICKUP_ADDRESS)
            .dropoffAddress(UPDATED_DROPOFF_ADDRESS)
            .color(UPDATED_COLOR);

        restCarRentalMockMvc.perform(put("/api/car-rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarRental)))
            .andExpect(status().isOk());

        // Validate the CarRental in the database
        List<CarRental> carRentalList = carRentalRepository.findAll();
        assertThat(carRentalList).hasSize(databaseSizeBeforeUpdate);
        CarRental testCarRental = carRentalList.get(carRentalList.size() - 1);
        assertThat(testCarRental.getCarType()).isEqualTo(UPDATED_CAR_TYPE);
        assertThat(testCarRental.getRentalDays()).isEqualTo(UPDATED_RENTAL_DAYS);
        assertThat(testCarRental.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCarRental.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testCarRental.getPickupAddress()).isEqualTo(UPDATED_PICKUP_ADDRESS);
        assertThat(testCarRental.getDropoffAddress()).isEqualTo(UPDATED_DROPOFF_ADDRESS);
        assertThat(testCarRental.getColor()).isEqualTo(UPDATED_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingCarRental() throws Exception {
        int databaseSizeBeforeUpdate = carRentalRepository.findAll().size();

        // Create the CarRental

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarRentalMockMvc.perform(put("/api/car-rentals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carRental)))
            .andExpect(status().isBadRequest());

        // Validate the CarRental in the database
        List<CarRental> carRentalList = carRentalRepository.findAll();
        assertThat(carRentalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarRental() throws Exception {
        // Initialize the database
        carRentalRepository.saveAndFlush(carRental);

        int databaseSizeBeforeDelete = carRentalRepository.findAll().size();

        // Get the carRental
        restCarRentalMockMvc.perform(delete("/api/car-rentals/{id}", carRental.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CarRental> carRentalList = carRentalRepository.findAll();
        assertThat(carRentalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarRental.class);
        CarRental carRental1 = new CarRental();
        carRental1.setId(1L);
        CarRental carRental2 = new CarRental();
        carRental2.setId(carRental1.getId());
        assertThat(carRental1).isEqualTo(carRental2);
        carRental2.setId(2L);
        assertThat(carRental1).isNotEqualTo(carRental2);
        carRental1.setId(null);
        assertThat(carRental1).isNotEqualTo(carRental2);
    }
}

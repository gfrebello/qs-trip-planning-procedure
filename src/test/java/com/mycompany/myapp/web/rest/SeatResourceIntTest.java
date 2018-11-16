package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.Seat;
import com.mycompany.myapp.repository.SeatRepository;
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
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SeatResource REST controller.
 *
 * @see SeatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class SeatResourceIntTest {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_ROW = "AAAAAAAAAA";
    private static final String UPDATED_ROW = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_EXECUTIVE = false;
    private static final Boolean UPDATED_IS_EXECUTIVE = true;

    private static final Boolean DEFAULT_IS_RESERVED = false;
    private static final Boolean UPDATED_IS_RESERVED = true;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSeatMockMvc;

    private Seat seat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeatResource seatResource = new SeatResource(seatRepository);
        this.restSeatMockMvc = MockMvcBuilders.standaloneSetup(seatResource)
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
    public static Seat createEntity(EntityManager em) {
        Seat seat = new Seat()
            .number(DEFAULT_NUMBER)
            .row(DEFAULT_ROW)
            .isExecutive(DEFAULT_IS_EXECUTIVE)
            .isReserved(DEFAULT_IS_RESERVED);
        return seat;
    }

    @Before
    public void initTest() {
        seat = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeat() throws Exception {
        int databaseSizeBeforeCreate = seatRepository.findAll().size();

        // Create the Seat
        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isCreated());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeCreate + 1);
        Seat testSeat = seatList.get(seatList.size() - 1);
        assertThat(testSeat.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testSeat.getRow()).isEqualTo(DEFAULT_ROW);
        assertThat(testSeat.isIsExecutive()).isEqualTo(DEFAULT_IS_EXECUTIVE);
        assertThat(testSeat.isIsReserved()).isEqualTo(DEFAULT_IS_RESERVED);
    }

    @Test
    @Transactional
    public void createSeatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seatRepository.findAll().size();

        // Create the Seat with an existing ID
        seat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSeats() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        // Get all the seatList
        restSeatMockMvc.perform(get("/api/seats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seat.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].row").value(hasItem(DEFAULT_ROW.toString())))
            .andExpect(jsonPath("$.[*].isExecutive").value(hasItem(DEFAULT_IS_EXECUTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].isReserved").value(hasItem(DEFAULT_IS_RESERVED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        // Get the seat
        restSeatMockMvc.perform(get("/api/seats/{id}", seat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(seat.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.row").value(DEFAULT_ROW.toString()))
            .andExpect(jsonPath("$.isExecutive").value(DEFAULT_IS_EXECUTIVE.booleanValue()))
            .andExpect(jsonPath("$.isReserved").value(DEFAULT_IS_RESERVED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSeat() throws Exception {
        // Get the seat
        restSeatMockMvc.perform(get("/api/seats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        int databaseSizeBeforeUpdate = seatRepository.findAll().size();

        // Update the seat
        Seat updatedSeat = seatRepository.findById(seat.getId()).get();
        // Disconnect from session so that the updates on updatedSeat are not directly saved in db
        em.detach(updatedSeat);
        updatedSeat
            .number(UPDATED_NUMBER)
            .row(UPDATED_ROW)
            .isExecutive(UPDATED_IS_EXECUTIVE)
            .isReserved(UPDATED_IS_RESERVED);

        restSeatMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeat)))
            .andExpect(status().isOk());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeUpdate);
        Seat testSeat = seatList.get(seatList.size() - 1);
        assertThat(testSeat.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testSeat.getRow()).isEqualTo(UPDATED_ROW);
        assertThat(testSeat.isIsExecutive()).isEqualTo(UPDATED_IS_EXECUTIVE);
        assertThat(testSeat.isIsReserved()).isEqualTo(UPDATED_IS_RESERVED);
    }

    @Test
    @Transactional
    public void updateNonExistingSeat() throws Exception {
        int databaseSizeBeforeUpdate = seatRepository.findAll().size();

        // Create the Seat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeatMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        int databaseSizeBeforeDelete = seatRepository.findAll().size();

        // Get the seat
        restSeatMockMvc.perform(delete("/api/seats/{id}", seat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seat.class);
        Seat seat1 = new Seat();
        seat1.setId(1L);
        Seat seat2 = new Seat();
        seat2.setId(seat1.getId());
        assertThat(seat1).isEqualTo(seat2);
        seat2.setId(2L);
        assertThat(seat1).isNotEqualTo(seat2);
        seat1.setId(null);
        assertThat(seat1).isNotEqualTo(seat2);
    }
}

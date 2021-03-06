package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.HotelRoom;
import com.mycompany.myapp.domain.Hotel;
import com.mycompany.myapp.repository.HotelRoomRepository;
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
 * Test class for the HotelRoomResource REST controller.
 *
 * @see HotelRoomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class HotelRoomResourceIntTest {

    private static final Integer DEFAULT_MAX_CAPACITY = 1;
    private static final Integer UPDATED_MAX_CAPACITY = 2;

    private static final Boolean DEFAULT_IS_RESERVED = false;
    private static final Boolean UPDATED_IS_RESERVED = true;

    private static final String DEFAULT_ROOM_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ROOM_TYPE = "BBBBBBBBBB";

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;

    @Autowired
    private HotelRoomRepository hotelRoomRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHotelRoomMockMvc;

    private HotelRoom hotelRoom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HotelRoomResource hotelRoomResource = new HotelRoomResource(hotelRoomRepository);
        this.restHotelRoomMockMvc = MockMvcBuilders.standaloneSetup(hotelRoomResource)
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
    public static HotelRoom createEntity(EntityManager em) {
        HotelRoom hotelRoom = new HotelRoom()
            .maxCapacity(DEFAULT_MAX_CAPACITY)
            .isReserved(DEFAULT_IS_RESERVED)
            .roomType(DEFAULT_ROOM_TYPE)
            .price(DEFAULT_PRICE);
        // Add required entity
        Hotel hotel = HotelResourceIntTest.createEntity(em);
        em.persist(hotel);
        em.flush();
        hotelRoom.setHotel(hotel);
        return hotelRoom;
    }

    @Before
    public void initTest() {
        hotelRoom = createEntity(em);
    }

    @Test
    @Transactional
    public void createHotelRoom() throws Exception {
        int databaseSizeBeforeCreate = hotelRoomRepository.findAll().size();

        // Create the HotelRoom
        restHotelRoomMockMvc.perform(post("/api/hotel-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelRoom)))
            .andExpect(status().isCreated());

        // Validate the HotelRoom in the database
        List<HotelRoom> hotelRoomList = hotelRoomRepository.findAll();
        assertThat(hotelRoomList).hasSize(databaseSizeBeforeCreate + 1);
        HotelRoom testHotelRoom = hotelRoomList.get(hotelRoomList.size() - 1);
        assertThat(testHotelRoom.getMaxCapacity()).isEqualTo(DEFAULT_MAX_CAPACITY);
        assertThat(testHotelRoom.isIsReserved()).isEqualTo(DEFAULT_IS_RESERVED);
        assertThat(testHotelRoom.getRoomType()).isEqualTo(DEFAULT_ROOM_TYPE);
        assertThat(testHotelRoom.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createHotelRoomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hotelRoomRepository.findAll().size();

        // Create the HotelRoom with an existing ID
        hotelRoom.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHotelRoomMockMvc.perform(post("/api/hotel-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelRoom)))
            .andExpect(status().isBadRequest());

        // Validate the HotelRoom in the database
        List<HotelRoom> hotelRoomList = hotelRoomRepository.findAll();
        assertThat(hotelRoomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHotelRooms() throws Exception {
        // Initialize the database
        hotelRoomRepository.saveAndFlush(hotelRoom);

        // Get all the hotelRoomList
        restHotelRoomMockMvc.perform(get("/api/hotel-rooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hotelRoom.getId().intValue())))
            .andExpect(jsonPath("$.[*].maxCapacity").value(hasItem(DEFAULT_MAX_CAPACITY)))
            .andExpect(jsonPath("$.[*].isReserved").value(hasItem(DEFAULT_IS_RESERVED.booleanValue())))
            .andExpect(jsonPath("$.[*].roomType").value(hasItem(DEFAULT_ROOM_TYPE.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getHotelRoom() throws Exception {
        // Initialize the database
        hotelRoomRepository.saveAndFlush(hotelRoom);

        // Get the hotelRoom
        restHotelRoomMockMvc.perform(get("/api/hotel-rooms/{id}", hotelRoom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hotelRoom.getId().intValue()))
            .andExpect(jsonPath("$.maxCapacity").value(DEFAULT_MAX_CAPACITY))
            .andExpect(jsonPath("$.isReserved").value(DEFAULT_IS_RESERVED.booleanValue()))
            .andExpect(jsonPath("$.roomType").value(DEFAULT_ROOM_TYPE.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHotelRoom() throws Exception {
        // Get the hotelRoom
        restHotelRoomMockMvc.perform(get("/api/hotel-rooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHotelRoom() throws Exception {
        // Initialize the database
        hotelRoomRepository.saveAndFlush(hotelRoom);

        int databaseSizeBeforeUpdate = hotelRoomRepository.findAll().size();

        // Update the hotelRoom
        HotelRoom updatedHotelRoom = hotelRoomRepository.findById(hotelRoom.getId()).get();
        // Disconnect from session so that the updates on updatedHotelRoom are not directly saved in db
        em.detach(updatedHotelRoom);
        updatedHotelRoom
            .maxCapacity(UPDATED_MAX_CAPACITY)
            .isReserved(UPDATED_IS_RESERVED)
            .roomType(UPDATED_ROOM_TYPE)
            .price(UPDATED_PRICE);

        restHotelRoomMockMvc.perform(put("/api/hotel-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHotelRoom)))
            .andExpect(status().isOk());

        // Validate the HotelRoom in the database
        List<HotelRoom> hotelRoomList = hotelRoomRepository.findAll();
        assertThat(hotelRoomList).hasSize(databaseSizeBeforeUpdate);
        HotelRoom testHotelRoom = hotelRoomList.get(hotelRoomList.size() - 1);
        assertThat(testHotelRoom.getMaxCapacity()).isEqualTo(UPDATED_MAX_CAPACITY);
        assertThat(testHotelRoom.isIsReserved()).isEqualTo(UPDATED_IS_RESERVED);
        assertThat(testHotelRoom.getRoomType()).isEqualTo(UPDATED_ROOM_TYPE);
        assertThat(testHotelRoom.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingHotelRoom() throws Exception {
        int databaseSizeBeforeUpdate = hotelRoomRepository.findAll().size();

        // Create the HotelRoom

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHotelRoomMockMvc.perform(put("/api/hotel-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelRoom)))
            .andExpect(status().isBadRequest());

        // Validate the HotelRoom in the database
        List<HotelRoom> hotelRoomList = hotelRoomRepository.findAll();
        assertThat(hotelRoomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHotelRoom() throws Exception {
        // Initialize the database
        hotelRoomRepository.saveAndFlush(hotelRoom);

        int databaseSizeBeforeDelete = hotelRoomRepository.findAll().size();

        // Get the hotelRoom
        restHotelRoomMockMvc.perform(delete("/api/hotel-rooms/{id}", hotelRoom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HotelRoom> hotelRoomList = hotelRoomRepository.findAll();
        assertThat(hotelRoomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HotelRoom.class);
        HotelRoom hotelRoom1 = new HotelRoom();
        hotelRoom1.setId(1L);
        HotelRoom hotelRoom2 = new HotelRoom();
        hotelRoom2.setId(hotelRoom1.getId());
        assertThat(hotelRoom1).isEqualTo(hotelRoom2);
        hotelRoom2.setId(2L);
        assertThat(hotelRoom1).isNotEqualTo(hotelRoom2);
        hotelRoom1.setId(null);
        assertThat(hotelRoom1).isNotEqualTo(hotelRoom2);
    }
}

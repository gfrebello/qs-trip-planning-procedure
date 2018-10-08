package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.Attraction;
import com.mycompany.myapp.repository.AttractionRepository;
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
 * Test class for the AttractionResource REST controller.
 *
 * @see AttractionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class AttractionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAttractionMockMvc;

    private Attraction attraction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AttractionResource attractionResource = new AttractionResource(attractionRepository);
        this.restAttractionMockMvc = MockMvcBuilders.standaloneSetup(attractionResource)
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
    public static Attraction createEntity(EntityManager em) {
        Attraction attraction = new Attraction()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .city(DEFAULT_CITY)
            .price(DEFAULT_PRICE);
        return attraction;
    }

    @Before
    public void initTest() {
        attraction = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttraction() throws Exception {
        int databaseSizeBeforeCreate = attractionRepository.findAll().size();

        // Create the Attraction
        restAttractionMockMvc.perform(post("/api/attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attraction)))
            .andExpect(status().isCreated());

        // Validate the Attraction in the database
        List<Attraction> attractionList = attractionRepository.findAll();
        assertThat(attractionList).hasSize(databaseSizeBeforeCreate + 1);
        Attraction testAttraction = attractionList.get(attractionList.size() - 1);
        assertThat(testAttraction.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAttraction.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAttraction.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testAttraction.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createAttractionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attractionRepository.findAll().size();

        // Create the Attraction with an existing ID
        attraction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttractionMockMvc.perform(post("/api/attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attraction)))
            .andExpect(status().isBadRequest());

        // Validate the Attraction in the database
        List<Attraction> attractionList = attractionRepository.findAll();
        assertThat(attractionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAttractions() throws Exception {
        // Initialize the database
        attractionRepository.saveAndFlush(attraction);

        // Get all the attractionList
        restAttractionMockMvc.perform(get("/api/attractions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attraction.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getAttraction() throws Exception {
        // Initialize the database
        attractionRepository.saveAndFlush(attraction);

        // Get the attraction
        restAttractionMockMvc.perform(get("/api/attractions/{id}", attraction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(attraction.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAttraction() throws Exception {
        // Get the attraction
        restAttractionMockMvc.perform(get("/api/attractions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttraction() throws Exception {
        // Initialize the database
        attractionRepository.saveAndFlush(attraction);

        int databaseSizeBeforeUpdate = attractionRepository.findAll().size();

        // Update the attraction
        Attraction updatedAttraction = attractionRepository.findById(attraction.getId()).get();
        // Disconnect from session so that the updates on updatedAttraction are not directly saved in db
        em.detach(updatedAttraction);
        updatedAttraction
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .city(UPDATED_CITY)
            .price(UPDATED_PRICE);

        restAttractionMockMvc.perform(put("/api/attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAttraction)))
            .andExpect(status().isOk());

        // Validate the Attraction in the database
        List<Attraction> attractionList = attractionRepository.findAll();
        assertThat(attractionList).hasSize(databaseSizeBeforeUpdate);
        Attraction testAttraction = attractionList.get(attractionList.size() - 1);
        assertThat(testAttraction.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAttraction.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAttraction.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testAttraction.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingAttraction() throws Exception {
        int databaseSizeBeforeUpdate = attractionRepository.findAll().size();

        // Create the Attraction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttractionMockMvc.perform(put("/api/attractions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attraction)))
            .andExpect(status().isBadRequest());

        // Validate the Attraction in the database
        List<Attraction> attractionList = attractionRepository.findAll();
        assertThat(attractionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAttraction() throws Exception {
        // Initialize the database
        attractionRepository.saveAndFlush(attraction);

        int databaseSizeBeforeDelete = attractionRepository.findAll().size();

        // Get the attraction
        restAttractionMockMvc.perform(delete("/api/attractions/{id}", attraction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Attraction> attractionList = attractionRepository.findAll();
        assertThat(attractionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attraction.class);
        Attraction attraction1 = new Attraction();
        attraction1.setId(1L);
        Attraction attraction2 = new Attraction();
        attraction2.setId(attraction1.getId());
        assertThat(attraction1).isEqualTo(attraction2);
        attraction2.setId(2L);
        assertThat(attraction1).isNotEqualTo(attraction2);
        attraction1.setId(null);
        assertThat(attraction1).isNotEqualTo(attraction2);
    }
}

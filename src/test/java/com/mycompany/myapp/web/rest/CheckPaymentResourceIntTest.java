package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.CheckPayment;
import com.mycompany.myapp.repository.CheckPaymentRepository;
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
 * Test class for the CheckPaymentResource REST controller.
 *
 * @see CheckPaymentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class CheckPaymentResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_ID = "AAAAAAAAAA";
    private static final String UPDATED_BANK_ID = "BBBBBBBBBB";

    @Autowired
    private CheckPaymentRepository checkPaymentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCheckPaymentMockMvc;

    private CheckPayment checkPayment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CheckPaymentResource checkPaymentResource = new CheckPaymentResource(checkPaymentRepository);
        this.restCheckPaymentMockMvc = MockMvcBuilders.standaloneSetup(checkPaymentResource)
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
    public static CheckPayment createEntity(EntityManager em) {
        CheckPayment checkPayment = new CheckPayment()
            .name(DEFAULT_NAME)
            .bankId(DEFAULT_BANK_ID);
        return checkPayment;
    }

    @Before
    public void initTest() {
        checkPayment = createEntity(em);
    }

    @Test
    @Transactional
    public void createCheckPayment() throws Exception {
        int databaseSizeBeforeCreate = checkPaymentRepository.findAll().size();

        // Create the CheckPayment
        restCheckPaymentMockMvc.perform(post("/api/check-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkPayment)))
            .andExpect(status().isCreated());

        // Validate the CheckPayment in the database
        List<CheckPayment> checkPaymentList = checkPaymentRepository.findAll();
        assertThat(checkPaymentList).hasSize(databaseSizeBeforeCreate + 1);
        CheckPayment testCheckPayment = checkPaymentList.get(checkPaymentList.size() - 1);
        assertThat(testCheckPayment.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCheckPayment.getBankId()).isEqualTo(DEFAULT_BANK_ID);
    }

    @Test
    @Transactional
    public void createCheckPaymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = checkPaymentRepository.findAll().size();

        // Create the CheckPayment with an existing ID
        checkPayment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckPaymentMockMvc.perform(post("/api/check-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkPayment)))
            .andExpect(status().isBadRequest());

        // Validate the CheckPayment in the database
        List<CheckPayment> checkPaymentList = checkPaymentRepository.findAll();
        assertThat(checkPaymentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCheckPayments() throws Exception {
        // Initialize the database
        checkPaymentRepository.saveAndFlush(checkPayment);

        // Get all the checkPaymentList
        restCheckPaymentMockMvc.perform(get("/api/check-payments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkPayment.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].bankId").value(hasItem(DEFAULT_BANK_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getCheckPayment() throws Exception {
        // Initialize the database
        checkPaymentRepository.saveAndFlush(checkPayment);

        // Get the checkPayment
        restCheckPaymentMockMvc.perform(get("/api/check-payments/{id}", checkPayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(checkPayment.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.bankId").value(DEFAULT_BANK_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCheckPayment() throws Exception {
        // Get the checkPayment
        restCheckPaymentMockMvc.perform(get("/api/check-payments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCheckPayment() throws Exception {
        // Initialize the database
        checkPaymentRepository.saveAndFlush(checkPayment);

        int databaseSizeBeforeUpdate = checkPaymentRepository.findAll().size();

        // Update the checkPayment
        CheckPayment updatedCheckPayment = checkPaymentRepository.findById(checkPayment.getId()).get();
        // Disconnect from session so that the updates on updatedCheckPayment are not directly saved in db
        em.detach(updatedCheckPayment);
        updatedCheckPayment
            .name(UPDATED_NAME)
            .bankId(UPDATED_BANK_ID);

        restCheckPaymentMockMvc.perform(put("/api/check-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCheckPayment)))
            .andExpect(status().isOk());

        // Validate the CheckPayment in the database
        List<CheckPayment> checkPaymentList = checkPaymentRepository.findAll();
        assertThat(checkPaymentList).hasSize(databaseSizeBeforeUpdate);
        CheckPayment testCheckPayment = checkPaymentList.get(checkPaymentList.size() - 1);
        assertThat(testCheckPayment.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCheckPayment.getBankId()).isEqualTo(UPDATED_BANK_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingCheckPayment() throws Exception {
        int databaseSizeBeforeUpdate = checkPaymentRepository.findAll().size();

        // Create the CheckPayment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckPaymentMockMvc.perform(put("/api/check-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkPayment)))
            .andExpect(status().isBadRequest());

        // Validate the CheckPayment in the database
        List<CheckPayment> checkPaymentList = checkPaymentRepository.findAll();
        assertThat(checkPaymentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCheckPayment() throws Exception {
        // Initialize the database
        checkPaymentRepository.saveAndFlush(checkPayment);

        int databaseSizeBeforeDelete = checkPaymentRepository.findAll().size();

        // Get the checkPayment
        restCheckPaymentMockMvc.perform(delete("/api/check-payments/{id}", checkPayment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CheckPayment> checkPaymentList = checkPaymentRepository.findAll();
        assertThat(checkPaymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckPayment.class);
        CheckPayment checkPayment1 = new CheckPayment();
        checkPayment1.setId(1L);
        CheckPayment checkPayment2 = new CheckPayment();
        checkPayment2.setId(checkPayment1.getId());
        assertThat(checkPayment1).isEqualTo(checkPayment2);
        checkPayment2.setId(2L);
        assertThat(checkPayment1).isNotEqualTo(checkPayment2);
        checkPayment1.setId(null);
        assertThat(checkPayment1).isNotEqualTo(checkPayment2);
    }
}

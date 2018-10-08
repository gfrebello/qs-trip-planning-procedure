package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TripPlanningApp;

import com.mycompany.myapp.domain.Paycheck;
import com.mycompany.myapp.repository.PaycheckRepository;
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
 * Test class for the PaycheckResource REST controller.
 *
 * @see PaycheckResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TripPlanningApp.class)
public class PaycheckResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_ID = "AAAAAAAAAA";
    private static final String UPDATED_BANK_ID = "BBBBBBBBBB";

    @Autowired
    private PaycheckRepository paycheckRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPaycheckMockMvc;

    private Paycheck paycheck;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaycheckResource paycheckResource = new PaycheckResource(paycheckRepository);
        this.restPaycheckMockMvc = MockMvcBuilders.standaloneSetup(paycheckResource)
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
    public static Paycheck createEntity(EntityManager em) {
        Paycheck paycheck = new Paycheck()
            .name(DEFAULT_NAME)
            .bankId(DEFAULT_BANK_ID);
        return paycheck;
    }

    @Before
    public void initTest() {
        paycheck = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaycheck() throws Exception {
        int databaseSizeBeforeCreate = paycheckRepository.findAll().size();

        // Create the Paycheck
        restPaycheckMockMvc.perform(post("/api/paychecks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paycheck)))
            .andExpect(status().isCreated());

        // Validate the Paycheck in the database
        List<Paycheck> paycheckList = paycheckRepository.findAll();
        assertThat(paycheckList).hasSize(databaseSizeBeforeCreate + 1);
        Paycheck testPaycheck = paycheckList.get(paycheckList.size() - 1);
        assertThat(testPaycheck.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPaycheck.getBankId()).isEqualTo(DEFAULT_BANK_ID);
    }

    @Test
    @Transactional
    public void createPaycheckWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paycheckRepository.findAll().size();

        // Create the Paycheck with an existing ID
        paycheck.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaycheckMockMvc.perform(post("/api/paychecks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paycheck)))
            .andExpect(status().isBadRequest());

        // Validate the Paycheck in the database
        List<Paycheck> paycheckList = paycheckRepository.findAll();
        assertThat(paycheckList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPaychecks() throws Exception {
        // Initialize the database
        paycheckRepository.saveAndFlush(paycheck);

        // Get all the paycheckList
        restPaycheckMockMvc.perform(get("/api/paychecks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paycheck.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].bankId").value(hasItem(DEFAULT_BANK_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getPaycheck() throws Exception {
        // Initialize the database
        paycheckRepository.saveAndFlush(paycheck);

        // Get the paycheck
        restPaycheckMockMvc.perform(get("/api/paychecks/{id}", paycheck.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paycheck.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.bankId").value(DEFAULT_BANK_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPaycheck() throws Exception {
        // Get the paycheck
        restPaycheckMockMvc.perform(get("/api/paychecks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaycheck() throws Exception {
        // Initialize the database
        paycheckRepository.saveAndFlush(paycheck);

        int databaseSizeBeforeUpdate = paycheckRepository.findAll().size();

        // Update the paycheck
        Paycheck updatedPaycheck = paycheckRepository.findById(paycheck.getId()).get();
        // Disconnect from session so that the updates on updatedPaycheck are not directly saved in db
        em.detach(updatedPaycheck);
        updatedPaycheck
            .name(UPDATED_NAME)
            .bankId(UPDATED_BANK_ID);

        restPaycheckMockMvc.perform(put("/api/paychecks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaycheck)))
            .andExpect(status().isOk());

        // Validate the Paycheck in the database
        List<Paycheck> paycheckList = paycheckRepository.findAll();
        assertThat(paycheckList).hasSize(databaseSizeBeforeUpdate);
        Paycheck testPaycheck = paycheckList.get(paycheckList.size() - 1);
        assertThat(testPaycheck.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPaycheck.getBankId()).isEqualTo(UPDATED_BANK_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingPaycheck() throws Exception {
        int databaseSizeBeforeUpdate = paycheckRepository.findAll().size();

        // Create the Paycheck

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaycheckMockMvc.perform(put("/api/paychecks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paycheck)))
            .andExpect(status().isBadRequest());

        // Validate the Paycheck in the database
        List<Paycheck> paycheckList = paycheckRepository.findAll();
        assertThat(paycheckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaycheck() throws Exception {
        // Initialize the database
        paycheckRepository.saveAndFlush(paycheck);

        int databaseSizeBeforeDelete = paycheckRepository.findAll().size();

        // Get the paycheck
        restPaycheckMockMvc.perform(delete("/api/paychecks/{id}", paycheck.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Paycheck> paycheckList = paycheckRepository.findAll();
        assertThat(paycheckList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paycheck.class);
        Paycheck paycheck1 = new Paycheck();
        paycheck1.setId(1L);
        Paycheck paycheck2 = new Paycheck();
        paycheck2.setId(paycheck1.getId());
        assertThat(paycheck1).isEqualTo(paycheck2);
        paycheck2.setId(2L);
        assertThat(paycheck1).isNotEqualTo(paycheck2);
        paycheck1.setId(null);
        assertThat(paycheck1).isNotEqualTo(paycheck2);
    }
}

package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Paycheck;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Paycheck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaycheckRepository extends JpaRepository<Paycheck, Long> {

}

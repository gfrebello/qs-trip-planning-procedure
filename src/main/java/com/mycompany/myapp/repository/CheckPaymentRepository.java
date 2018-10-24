package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CheckPayment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CheckPayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CheckPaymentRepository extends JpaRepository<CheckPayment, Long> {

}

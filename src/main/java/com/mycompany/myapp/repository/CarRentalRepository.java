package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CarRental;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CarRental entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarRentalRepository extends JpaRepository<CarRental, Long> {

}

package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AttractionReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AttractionReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttractionReservationRepository extends JpaRepository<AttractionReservation, Long> {

}

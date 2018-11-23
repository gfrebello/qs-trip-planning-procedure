package com.mycompany.myapp.repository;

import java.util.List;

import com.mycompany.myapp.domain.FlightReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlightReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightReservationRepository extends JpaRepository<FlightReservation, Long> {

    List<FlightReservation> findByTrip(Long id);
}

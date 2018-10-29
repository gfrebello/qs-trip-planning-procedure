package com.mycompany.myapp.repository;

import java.time.Instant;
import java.util.List;

import com.mycompany.myapp.domain.Flight;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Flight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

  List<Flight> findByDepartureDateAndOriginAndDestination(Instant departureDate, String origin, String destination);
}

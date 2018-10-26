package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FlightReservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FlightReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightReservationRepository extends JpaRepository<FlightReservation, Long> {

    @Query(value = "select distinct flight_reservation from FlightReservation flight_reservation left join fetch flight_reservation.flights",
        countQuery = "select count(distinct flight_reservation) from FlightReservation flight_reservation")
    Page<FlightReservation> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct flight_reservation from FlightReservation flight_reservation left join fetch flight_reservation.flights")
    List<FlightReservation> findAllWithEagerRelationships();

    @Query("select flight_reservation from FlightReservation flight_reservation left join fetch flight_reservation.flights where flight_reservation.id =:id")
    Optional<FlightReservation> findOneWithEagerRelationships(@Param("id") Long id);

}

package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HotelReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HotelReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelReservationRepository extends JpaRepository<HotelReservation, Long> {

}

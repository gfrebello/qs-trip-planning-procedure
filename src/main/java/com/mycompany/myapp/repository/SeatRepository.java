package com.mycompany.myapp.repository;

import java.util.List;

import com.mycompany.myapp.domain.Seat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Seat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

  List<Seat> findByFlightReservation(Long id);
}

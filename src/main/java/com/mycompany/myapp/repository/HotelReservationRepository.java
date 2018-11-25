package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HotelReservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the HotelReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelReservationRepository extends JpaRepository<HotelReservation, Long> {

    @Query(value = "select distinct hotel_reservation from HotelReservation hotel_reservation left join fetch hotel_reservation.hotelRooms",
        countQuery = "select count(distinct hotel_reservation) from HotelReservation hotel_reservation")
    Page<HotelReservation> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct hotel_reservation from HotelReservation hotel_reservation left join fetch hotel_reservation.hotelRooms")
    List<HotelReservation> findAllWithEagerRelationships();

    @Query("select hotel_reservation from HotelReservation hotel_reservation left join fetch hotel_reservation.hotelRooms where hotel_reservation.id =:id")
    Optional<HotelReservation> findOneWithEagerRelationships(@Param("id") Long id);

}

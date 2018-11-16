package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HotelRoom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HotelRoom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom, Long> {

}

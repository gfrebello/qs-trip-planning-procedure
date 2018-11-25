package com.mycompany.myapp.repository;

import java.util.List;

import com.mycompany.myapp.domain.Hotel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Hotel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

  List<Hotel> findByCity(String city);
}

package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Trip;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Trip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query("select trip from Trip trip where trip.user.login = ?#{principal.username}")
    List<Trip> findByUserIsCurrentUser();

}

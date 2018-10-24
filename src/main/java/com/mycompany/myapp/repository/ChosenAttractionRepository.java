package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChosenAttraction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ChosenAttraction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChosenAttractionRepository extends JpaRepository<ChosenAttraction, Long> {

}

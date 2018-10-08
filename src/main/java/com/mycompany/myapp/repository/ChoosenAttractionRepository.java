package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChoosenAttraction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ChoosenAttraction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoosenAttractionRepository extends JpaRepository<ChoosenAttraction, Long> {

}

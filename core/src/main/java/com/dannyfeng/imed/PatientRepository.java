package com.dannyfeng.imed;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PatientRepository extends PagingAndSortingRepository<Patient, Long> {
    Patient findByMedicareId(Long medicareId);
}

package com.dannyfeng.imed;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MedicalRecordRepository extends PagingAndSortingRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatient(Patient patient);
}

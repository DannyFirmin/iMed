package com.dannyfeng.imed;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DemoDbInit {

    @Bean
    public CommandLineRunner demoDatabase(PatientRepository patientRepository,
                                          MedicalRecordRepository medicalRecordRepository) {
        return args -> {
            Patient danny = new Patient(2823482852L, "Danny", "Feng");
            Patient tom = new Patient(2223482841L, "Tom", "Lee");
            Patient jack = new Patient(2393683199L, "Jack", "Smith");
            Patient marry = new Patient(1822422461L, "Marry", "Kennedy");
            Patient lily = new Patient(1239598399L, "Lily", "Von");
            Patient aha = new Patient(4858320196L, "Aha", "Bla");
            Patient joe = new Patient(3496494920L, "Joe", "Ketterman");
            Patient emily = new Patient(1352009489L, "Emily", "Bailey");

            patientRepository.save(danny);
            patientRepository.save(tom);
            patientRepository.save(jack);
            patientRepository.save(marry);
            patientRepository.save(lily);
            patientRepository.save(aha);
            patientRepository.save(joe);
            patientRepository.save(emily);

            medicalRecordRepository.save(new MedicalRecord("Healthy check passed", danny));
            medicalRecordRepository.save(new MedicalRecord("Flu, gave some med", tom));
            medicalRecordRepository.save(new MedicalRecord("Flu again, need some rest", tom));
            medicalRecordRepository.save(new MedicalRecord("Covid19, unwell for 7 days", jack));
            medicalRecordRepository.save(new MedicalRecord("Running stomach. food poisoning", marry));
            medicalRecordRepository.save(new MedicalRecord("Period. Need to drink warm water", marry));
            medicalRecordRepository.save(new MedicalRecord("Referred to a specialist", aha));


        };
    }
}

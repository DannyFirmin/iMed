package com.dannyfeng.imed;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "patients")
public class Patient implements Serializable {

    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(unique = true)
    private Long medicareId;
    private String firstName;
    private String lastName;
    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<MedicalRecord> medicalRecords;
    private @Version
    @JsonIgnore
    Long version;

    public Patient() {
    }

    public Patient(Long medicareId, String firstName, String lastName) {
        this.medicareId = medicareId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return Objects.equals(id, patient.id) &&
                Objects.equals(medicareId, patient.medicareId) &&
                Objects.equals(firstName, patient.firstName) &&
                Objects.equals(lastName, patient.lastName) &&
                Objects.equals(version, patient.version);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, medicareId, firstName, lastName, version);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMedicareId() {
        return medicareId;
    }

    public void setMedicareId(Long medicareId) {
        this.medicareId = medicareId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", medicareId='" + medicareId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", version=" + version +
                '}';
    }
}
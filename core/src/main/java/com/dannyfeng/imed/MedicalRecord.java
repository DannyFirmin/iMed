package com.dannyfeng.imed;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "medicalrecords")
public class MedicalRecord implements Serializable {

    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    private String content;
    private @Version
    @JsonIgnore
    Long version;

    public MedicalRecord() {
    }

    public MedicalRecord(String content, Patient patient) {
        this.content = content;
        this.patient = patient;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MedicalRecord medRecord = (MedicalRecord) o;
        return Objects.equals(id, medRecord.id) &&
                Objects.equals(patient, medRecord.patient) &&
                Objects.equals(content, medRecord.content) &&
                Objects.equals(version, medRecord.version);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, patient, content, version);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
                ", medicareId='" + patient.getMedicareId() + '\'' +
                ", content='" + content + '\'' +
                ", version=" + version +
                '}';
    }
}
package com.teekasarthi.teekasarthi.vaccination.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class VaccinationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String VaccinationType;
    private LocalDate VaccinationDate;
    private Long beneficiaryId; // Foreign key to Beneficiary entity
    private String photoUrl;// URL to the vaccination photo
    private double Lat;
    private double Lng;
    private boolean IsLocationValid;
    private double distaceFROMAddress;



}

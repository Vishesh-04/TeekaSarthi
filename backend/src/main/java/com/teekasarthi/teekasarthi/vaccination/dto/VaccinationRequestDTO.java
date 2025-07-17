package com.teekasarthi.teekasarthi.vaccination.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
public class VaccinationRequestDTO {
    private Long beneficiaryId;
    private String vaccineType;
    private LocalDate dateGiven;
    private double workerLat;
    private double workerLng;
}

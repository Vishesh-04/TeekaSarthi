package com.teekasarthi.teekasarthi.vaccination.controller;

import com.teekasarthi.teekasarthi.vaccination.dto.VaccinationRequestDTO;
import com.teekasarthi.teekasarthi.vaccination.dto.VaccinationResponseDTO;
import com.teekasarthi.teekasarthi.vaccination.service.VaccinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/vaccination")
@RequiredArgsConstructor
public class VaccinationController {
    private final VaccinationService vaccinationService;

    public ResponseEntity<?> submitVaccination(
            @RequestParam Long beneficiaryId,
            @RequestParam String vaccineType,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateGiven,
            @RequestParam double workerLat,
            @RequestParam double workerLng,
            @RequestParam MultipartFile photo

    ) {
        try {
            VaccinationRequestDTO dto = new VaccinationRequestDTO();
            dto.setBeneficiaryId(beneficiaryId);
            dto.setVaccineType(vaccineType);
            dto.setDateGiven(dateGiven);
            dto.setWorkerLat(workerLat);
            dto.setWorkerLng(workerLng);

            VaccinationResponseDTO response = vaccinationService.submitVaccination(dto, photo);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

}

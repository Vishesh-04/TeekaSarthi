package com.teekasarthi.teekasarthi.vaccination.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VaccinationResponseDTO {
    private boolean success;
    private String message;
    private String uploadedPhotoUrl;
    private String mapsLink;
}

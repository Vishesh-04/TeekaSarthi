package com.teekasarthi.teekasarthi.vaccination.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.repository.BeneficiaryRepo;
import com.teekasarthi.teekasarthi.vaccination.dto.VaccinationRequestDTO;
import com.teekasarthi.teekasarthi.vaccination.dto.VaccinationResponseDTO;
import com.teekasarthi.teekasarthi.vaccination.entity.VaccinationRecord;
import com.teekasarthi.teekasarthi.vaccination.repository.VaccinationRecordRepository;
import com.teekasarthi.teekasarthi.vaccination.util.HaversineUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VaccinationService {

    private final BeneficiaryRepo beneficiaryRepo;
    private final VaccinationRecordRepository vaccinationRecordRepository;

    private final GeoLocationService geoLocationService;
    private final Cloudinary cloudinary;

    public VaccinationResponseDTO submitVaccination(VaccinationRequestDTO vaccinationRequestDTO, MultipartFile photo) throws IOException {

        Beneficiary beneficiary = beneficiaryRepo.findById(vaccinationRequestDTO.getBeneficiaryId())
                .orElseThrow(() -> new RuntimeException("Beneficiary not found"));

        String fullAddress = beneficiary.getAddress() + ", " + beneficiary.getCity() + ", " + beneficiary.getPincode();
        double[] addressCoords = geoLocationService.getCoordinatesFromAddress(fullAddress);

        if (addressCoords == null) {
            return new VaccinationResponseDTO(false, "Unable to fetch beneficiary location", null, null);
        }

        double distance = HaversineUtil.calculateDistance(
                vaccinationRequestDTO.getWorkerLat(), vaccinationRequestDTO.getWorkerLng(),
                addressCoords[0], addressCoords[1]);

        boolean isValid = distance <= 10;

        if (!isValid) {
            return new VaccinationResponseDTO(
                    false,
                    "Location mismatch. Vaccination must be done at beneficiary address.",
                    null,
                    null
            );
        }

        // Upload image to Cloudinary
        Map<?, ?> result = cloudinary.uploader().upload(photo.getBytes(), ObjectUtils.emptyMap());
        String photoUrl = (String) result.get("secure_url");

        // Save record
        VaccinationRecord record = new VaccinationRecord();
        record.setBeneficiaryId(beneficiary.getId());
        record.setVaccinationType(vaccinationRequestDTO.getVaccineType());
        record.setVaccinationDate(vaccinationRequestDTO.getDateGiven());
        record.setLat(vaccinationRequestDTO.getWorkerLat());
        record.setLng(vaccinationRequestDTO.getWorkerLng());
        record.setDistaceFROMAddress(distance);
        record.setIsLocationValid(true);
        record.setPhotoUrl(photoUrl);

        vaccinationRecordRepository.save(record);

        String mapsLink = "https://maps.google.com/?q=" + vaccinationRequestDTO.getWorkerLat() + "," + vaccinationRequestDTO.getWorkerLng();

        return new VaccinationResponseDTO(true, "Vaccination submitted successfully", photoUrl, mapsLink);
    }
}

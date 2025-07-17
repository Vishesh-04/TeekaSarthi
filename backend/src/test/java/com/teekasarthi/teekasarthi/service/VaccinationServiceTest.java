package com.teekasarthi.teekasarthi.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.repository.BeneficiaryRepo;
import com.teekasarthi.teekasarthi.vaccination.dto.VaccinationRequestDTO;
import com.teekasarthi.teekasarthi.vaccination.dto.VaccinationResponseDTO;
import com.teekasarthi.teekasarthi.vaccination.entity.VaccinationRecord;
import com.teekasarthi.teekasarthi.vaccination.repository.VaccinationRecordRepository;
import com.teekasarthi.teekasarthi.vaccination.service.GeoLocationService;
import com.teekasarthi.teekasarthi.vaccination.service.VaccinationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.mock.web.MockMultipartFile;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VaccinationServiceTest {

    @Mock
    private BeneficiaryRepo beneficiaryRepo;

    @Mock
    private VaccinationRecordRepository vaccinationRecordRepository;

    @Mock
    private GeoLocationService geoLocationService;

    @Mock
    private Cloudinary cloudinary;

    @Mock
    private Uploader uploader;

    @InjectMocks
    private VaccinationService vaccinationService;

    private Beneficiary beneficiary;

    @BeforeEach
    void setUp() throws Exception {
        beneficiary = new Beneficiary();
        beneficiary.setId(1L);
        beneficiary.setAddress("Rajpath Area");
        beneficiary.setCity("New Delhi");
        beneficiary.setPincode(110011);

        lenient().when(cloudinary.uploader()).thenReturn(uploader);
    }

    @Test
    void testSubmitVaccination_Success() throws Exception {
        // Prepare input DTO
        VaccinationRequestDTO dto = new VaccinationRequestDTO();
        dto.setBeneficiaryId(1L);
        dto.setVaccineType("Covaxin");
        dto.setDateGiven(LocalDate.now());
        dto.setWorkerLat(28.6140);  // Near Rajpath
        dto.setWorkerLng(77.2090);

        MockMultipartFile photo = new MockMultipartFile("file", "photo.jpg", "image/jpeg", "test image content".getBytes());

        // Mock dependencies
        when(beneficiaryRepo.findById(1L)).thenReturn(Optional.of(beneficiary));
        when(geoLocationService.getCoordinatesFromAddress(anyString()))
                .thenReturn(new double[]{28.6140, 77.2090});  // Same coordinates

        when(uploader.upload(any(), any())).thenReturn(Map.of("secure_url", "https://cloudinary.com/photo.jpg"));

        // Call service
        VaccinationResponseDTO response = vaccinationService.submitVaccination(dto, photo);

        // Assertions
        assertTrue(response.isSuccess());
        assertEquals("https://cloudinary.com/photo.jpg", response.getUploadedPhotoUrl());
        assertTrue(response.getMessage().contains("successfully"));
        verify(vaccinationRecordRepository, times(1)).save(any(VaccinationRecord.class));
    }

    @Test
    void testSubmitVaccination_LocationMismatch() throws Exception {
        VaccinationRequestDTO dto = new VaccinationRequestDTO();
        dto.setBeneficiaryId(1L);
        dto.setVaccineType("Covishield");
        dto.setDateGiven(LocalDate.now());
        dto.setWorkerLat(28.0000);  // Far
        dto.setWorkerLng(76.0000);

        MockMultipartFile photo = new MockMultipartFile("file", "photo.jpg", "image/jpeg", "test image content".getBytes());

        when(beneficiaryRepo.findById(1L)).thenReturn(Optional.of(beneficiary));
        when(geoLocationService.getCoordinatesFromAddress(anyString()))
                .thenReturn(new double[]{28.6140, 77.2090});  // Different

        VaccinationResponseDTO response = vaccinationService.submitVaccination(dto, photo);

        assertFalse(response.isSuccess());
        assertEquals("Location mismatch. Vaccination must be done at beneficiary address.", response.getMessage());
        verify(vaccinationRecordRepository, never()).save(any());
    }
}

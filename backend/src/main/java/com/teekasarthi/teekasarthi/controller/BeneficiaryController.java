package com.teekasarthi.teekasarthi.controller;

import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.service.BeneficiaryService;
import com.teekasarthi.teekasarthi.service.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {
    @Autowired
    private BeneficiaryService beneficiaryService;

    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping(path = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Beneficiary> addBeneficiary(
            @RequestParam("membertype") String membertype,
            @RequestParam("name") String name,
            @RequestParam("guardian_name") String guardian_name,
            @RequestParam("dob") String dob,
            @RequestParam("gender") String gender,
            @RequestParam("idproof") String idproof,
            @RequestParam("idnumber") String idnumber,
            @RequestParam("email") String email,
            @RequestParam("phoneNo") String phoneNo,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("pincode") String pincode,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            Beneficiary beneficiary = new Beneficiary();
            beneficiary.setMembertype(membertype);
            beneficiary.setName(name);
            beneficiary.setGuardian_name(guardian_name);
            beneficiary.setDob(dob); // ya LocalDate.parse(dob) agar type LocalDate ho
            beneficiary.setGender(gender);
            beneficiary.setIdproof(idproof);
            beneficiary.setEmail(email);
            beneficiary.setIdnumber(idnumber);
            beneficiary.setPhoneNo(phoneNo);
            beneficiary.setAddress(address);
            beneficiary.setCity(city);
            beneficiary.setPincode(Integer.parseInt(pincode));

            if (photo != null && !photo.isEmpty()) {
                String imageUrl = imageUploadService.uploadImage(photo);
                beneficiary.setPhoto(imageUrl);
            }

            Beneficiary saved = beneficiaryService.saveBeneficiary(beneficiary);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}

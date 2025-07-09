package com.teekasarthi.teekasarthi.service;

import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.repository.BeneficiaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BeneficiaryService {
    @Autowired
    private BeneficiaryRepo beneficiaryRepo;
    @Autowired
    private NotificationService notificationService;

    public Beneficiary saveBeneficiary(Beneficiary beneficiary) {
        notificationService.sendAddBeneficiaryNotification(beneficiary);
        return beneficiaryRepo.save(beneficiary);
    }

    public List<Beneficiary> getAllBeneficiaries() {
        return beneficiaryRepo.findAll();
    }

    public Beneficiary getBeneficiaryById(Long id) {
        return beneficiaryRepo.findById(id).orElse(null);
    }

    public Beneficiary getBeneficiaryByPhoneNo(String phoneNo) {
        return beneficiaryRepo.findByPhoneNo(phoneNo).orElse(null);
    }

    public void deleteBeneficiary(Long id) {
        beneficiaryRepo.deleteById(id);
    }
}
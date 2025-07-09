package com.teekasarthi.teekasarthi.service;

import com.teekasarthi.teekasarthi.dto.VerifyBeneficiary;
import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.repository.BeneficiaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerService {
    @Autowired
    BeneficiaryRepo beneficiaryRepo;

    public void beneficiaryVerification(Long id, VerifyBeneficiary dto) {
        Beneficiary b = beneficiaryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Beneficiary not found with id: " + id));

        b.setStatus("ACTIVE");
        b.setVerified(true);
        b.setVerifiedBy(dto.getWorkerName());

        beneficiaryRepo.save(b);
    }
    public Object getPendingBeneficiaries() {
        return beneficiaryRepo.findByStatus("PENDING");
    }
}
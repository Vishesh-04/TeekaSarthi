package com.teekasarthi.teekasarthi.controller;


import com.teekasarthi.teekasarthi.dto.VerifyBeneficiary;
import com.teekasarthi.teekasarthi.service.WorkerService;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/worker")
public class WorkerController {

    WorkerService workerService;
    @PostMapping("/verify/{id}")
    public ResponseEntity<?> verify(@PathVariable Long id,
                                    @RequestBody VerifyBeneficiary dto) {
        workerService.beneficiaryVerification(id, dto);
        return ResponseEntity.ok("Beneficiary verified successfully");
    }

    @PostMapping("/pending-beneficiaries")
    public ResponseEntity<?> getPendingBeneficiaries() {
        return ResponseEntity.ok(workerService.getPendingBeneficiaries());
    }

}

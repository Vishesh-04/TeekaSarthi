package com.teekasarthi.teekasarthi.controller;

import com.teekasarthi.teekasarthi.entity.VaccinationSchedule;
import com.teekasarthi.teekasarthi.service.ScheduleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    // Ek endpoint jo beneficiary id le ke uska schedule de
    @GetMapping("/beneficiary/{beneficiaryId}")
    public ResponseEntity<List<VaccinationSchedule>> getSchedulesByBeneficiary(@PathVariable Long beneficiaryId) {
        List<VaccinationSchedule> schedules = scheduleService.getSchedulesByBeneficiaryId(beneficiaryId);
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    // Agar chaho to aur bhi schedule related endpoints bana sakte ho yahan
}


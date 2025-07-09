package com.teekasarthi.teekasarthi.service;

import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.entity.VaccinationSchedule;
import com.teekasarthi.teekasarthi.repository.VaccinationScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private VaccinationScheduleRepository vaccinationScheduleRepository;

    private static final int MAX_SCHEDULES_PER_DAY = 10;

    public void createScheduleForBeneficiary(Beneficiary beneficiary) {
        boolean scheduleExists = vaccinationScheduleRepository.existsByBeneficiary(beneficiary);
        if (scheduleExists) return;

        LocalDate scheduledDate = LocalDate.now().plusDays(3);

        while (true) {
            int count = vaccinationScheduleRepository.countByDoseDate(scheduledDate);
            if (count < MAX_SCHEDULES_PER_DAY) {
                VaccinationSchedule schedule = new VaccinationSchedule();
                schedule.setBeneficiary(beneficiary);
                schedule.setDoseDate(scheduledDate);
                schedule.setDoseNumber(1);
                vaccinationScheduleRepository.save(schedule);
                break;
            } else {
                scheduledDate = scheduledDate.plusDays(1);
            }
        }
    }

    // Naya method schedule fetch karne ke liye
    public List<VaccinationSchedule> getSchedulesByBeneficiaryId(Long beneficiaryId) {
        return vaccinationScheduleRepository.findByBeneficiaryId(beneficiaryId);
    }
}

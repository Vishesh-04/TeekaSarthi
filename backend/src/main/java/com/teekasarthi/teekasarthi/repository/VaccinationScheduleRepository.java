package com.teekasarthi.teekasarthi.repository;

import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.entity.VaccinationSchedule;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface VaccinationScheduleRepository extends JpaRepository<VaccinationSchedule, Long> {

    boolean existsByBeneficiary(Beneficiary beneficiary);

    // Given date pe kitne schedules hai count karo
    int countByDoseDate(LocalDate doseDate);

    List<VaccinationSchedule> findByBeneficiaryId(Long beneficiaryId);
}


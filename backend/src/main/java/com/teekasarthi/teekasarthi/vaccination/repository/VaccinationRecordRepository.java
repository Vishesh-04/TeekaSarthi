package com.teekasarthi.teekasarthi.vaccination.repository;

import com.teekasarthi.teekasarthi.vaccination.entity.VaccinationRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccinationRecordRepository extends JpaRepository<VaccinationRecord, Long> {
}

package com.teekasarthi.teekasarthi.repository;

import com.teekasarthi.teekasarthi.entity.Beneficiary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

// Repository
@Repository
public interface BeneficiaryRepo extends JpaRepository<Beneficiary, Long> {
    Optional<Beneficiary> findByPhoneNo(String phoneNo);
}

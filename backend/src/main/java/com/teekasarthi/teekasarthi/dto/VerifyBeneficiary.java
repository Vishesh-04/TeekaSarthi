package com.teekasarthi.teekasarthi.dto;

import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyBeneficiary {
    private boolean adharVerified;
    private String remarks;
    private String workerName;


}

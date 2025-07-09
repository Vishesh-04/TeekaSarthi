package com.teekasarthi.teekasarthi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Beneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String membertype;     // Pregnant, Child, etc.
    private String name;

    private String dob;         // ✅ Changed from String to LocalDate

    private String gender;
    private String idproof;        // e.g., Aadhar
    private String idnumber;

    private String phoneNo;
    private String address;
    private String city;
    private int pincode;


    // Optional: Center info (autofilled from frontend)
    private String centerName;

    private String guardian_name;
    private String email;

    // Optional: Image as BLOB (store padhar photo)
    @Column(name = "photo", length = 1000)
    private String photo;

}

package com.teekasarthi.teekasarthi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String name;
    private String phone;
    private String email;
}
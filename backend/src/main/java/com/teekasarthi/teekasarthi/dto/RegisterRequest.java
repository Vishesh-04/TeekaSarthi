package com.teekasarthi.teekasarthi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String name;
    private String phone;
    private String email;
    private String password;
}

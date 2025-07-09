package com.teekasarthi.teekasarthi.controller;

import com.teekasarthi.teekasarthi.dto.*;
import com.teekasarthi.teekasarthi.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.sendOtpForRegistration(request);
        return ResponseEntity.ok("OTP sent to phone");
    }

    @PostMapping("/verify-register")
    public ResponseEntity<String> verifyRegister(@RequestBody OtpRequest request) {
        authService.verifyRegistrationOtp(request);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        authService.sendOtpForLogin(request);
        return ResponseEntity.ok("OTP sent for login");
    }

    @PostMapping("/verify-login")
    public ResponseEntity<AuthResponse> verifyLogin(@RequestBody OtpRequest request) {
        return ResponseEntity.ok(authService.verifyLoginOtp(request));
    }
}

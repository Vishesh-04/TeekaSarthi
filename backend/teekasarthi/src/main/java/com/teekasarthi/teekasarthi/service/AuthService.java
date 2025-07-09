package com.teekasarthi.teekasarthi.service;

import com.teekasarthi.teekasarthi.dto.*;
import com.teekasarthi.teekasarthi.entity.User;
import com.teekasarthi.teekasarthi.repository.UserRepository;
import com.teekasarthi.teekasarthi.util.JwtUtil;
import com.teekasarthi.teekasarthi.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final OtpUtil otpUtil;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public void sendOtpForRegistration(RegisterRequest request) {
        if (userRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = User.builder()
                .phone(request.getPhone())
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .verified(false)
                .build();

        userRepository.save(user);
        otpUtil.generateOtp(request.getPhone(), request.getEmail());
    }

    public void verifyRegistrationOtp(OtpRequest otpRequest) {
        if (!otpUtil.verifyOtp(otpRequest.getPhone(), otpRequest.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = userRepository.findByPhone(otpRequest.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setVerified(true);
        userRepository.save(user);
        otpUtil.clearOtp(otpRequest.getPhone());
    }

    public void sendOtpForLogin(LoginRequest request) {
        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("Phone not registered"));

        if (!user.getName().equalsIgnoreCase(request.getName())) {
            throw new RuntimeException("Name doesn't match");
        }

        otpUtil.generateOtp(request.getPhone(), request.getEmail());
    }

    public AuthResponse verifyLoginOtp(OtpRequest request) {
        if (!otpUtil.verifyOtp(request.getPhone(), request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getPhone());
        otpUtil.clearOtp(request.getPhone());

        return new AuthResponse(token, "Login Successful");
    }
}

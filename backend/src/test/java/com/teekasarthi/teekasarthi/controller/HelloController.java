package com.teekasarthi.teekasarthi.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @GetMapping("/test")
    public String helloTest() {
        System.out.println("✅ /hello/test endpoint hit");
        return "Hello test successful!";
    }
}

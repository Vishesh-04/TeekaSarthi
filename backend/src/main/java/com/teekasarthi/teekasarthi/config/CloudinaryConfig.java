package com.teekasarthi.teekasarthi.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dgytk48bx",
                "api_key", "735493924324536",
                "api_secret", "v6vvKsswGym7dh8HIBZahwYnm8Y",
                "secure", true
        ));
    }
}

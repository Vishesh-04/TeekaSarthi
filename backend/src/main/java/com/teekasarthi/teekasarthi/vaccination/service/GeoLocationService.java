package com.teekasarthi.teekasarthi.vaccination.service;

import lombok.AllArgsConstructor;
import org.cloudinary.json.JSONArray;
import org.cloudinary.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;

@Service
@AllArgsConstructor
public class GeoLocationService {
    private final RestTemplate restTemplate = new RestTemplate();

   public double[] getCoordinatesFromAddress(String fullAddress) {
        String url = "https://nominatim.openstreetmap.org/search?format=json&q=" + UriUtils.encode(fullAddress, StandardCharsets.UTF_8);
        ResponseEntity<String> response = restTemplate.getForEntity(url,String.class);
        try{
            JSONArray json = new JSONArray(response.getBody());
            if (json.length() != 0) {
                JSONObject obj = json.getJSONObject(0);
                return new double[]{
                        obj.getDouble("lat"),
                        obj.getDouble("lon")
                };
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

}

package com.teekasarthi.teekasarthi.controller;

import com.teekasarthi.teekasarthi.entity.Beneficiary;
import com.teekasarthi.teekasarthi.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/new-beneficiary")
    public String sendNotificationNewBeneficiary(@RequestBody Beneficiary beneficiary) {
        return notificationService.sendAddBeneficiaryNotification(beneficiary);
    }
}

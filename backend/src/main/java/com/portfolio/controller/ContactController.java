package com.portfolio.controller;

import com.portfolio.model.Contact;
import com.portfolio.service.ContactService;
import com.portfolio.dto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> submitContact(@RequestBody Contact contact) {
        contactService.submitContact(contact);
        return ResponseEntity.ok(new MessageResponse("Message sent successfully!"));
    }
}

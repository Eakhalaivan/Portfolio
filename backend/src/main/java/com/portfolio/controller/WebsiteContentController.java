package com.portfolio.controller;

import com.portfolio.model.WebsiteContent;
import com.portfolio.service.WebsiteContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = "*") // Remove in production!
public class WebsiteContentController {

    @Autowired
    private WebsiteContentService websiteContentService;

    // Public endpoint to fetch website content
    @GetMapping
    public ResponseEntity<WebsiteContent> getContent() {
        return ResponseEntity.ok(websiteContentService.getContent());
    }

    // Protected endpoint (can be configured in SecurityConfig or under /api/admin/content)
    @PutMapping
    public ResponseEntity<WebsiteContent> updateContent(@RequestBody WebsiteContent content) {
        return ResponseEntity.ok(websiteContentService.updateContent(content));
    }
}

package com.portfolio.service;

import com.portfolio.model.WebsiteContent;
import com.portfolio.repository.WebsiteContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebsiteContentService {

    @Autowired
    private WebsiteContentRepository websiteContentRepository;

    public WebsiteContent getContent() {
        return websiteContentRepository.findById("1").orElseGet(() -> {
            WebsiteContent defaultContent = new WebsiteContent();
            defaultContent.setId("1");
            defaultContent.setHomeTitle("Hi, I'm Eakhalaivan");
            defaultContent.setHomeSubtitle("Java Backend Developer | Spring Boot | React | Full Stack Developer");
            defaultContent.setHomeImage(""); // Default image or user's existing image URL
            defaultContent.setBrandName("Eakhalaivan");
            defaultContent.setAboutTitle("About Me");
            defaultContent.setAboutDescription("I am a Java developer specializing in backend and full-stack web application development...");
            defaultContent.setAboutImage("");
            
            defaultContent.setSkillsTitle("Technical Skills");
            defaultContent.setSkillsSubtitle("My Toolkit");
            
            defaultContent.setProjectsTitle("Featured Projects");
            defaultContent.setProjectsSubtitle("Portfolio");
            
            defaultContent.setContactTitle("Let's Work Together");
            defaultContent.setContactSubtitle("Get In Touch");
            defaultContent.setContactDescription("Have a project in mind or just want to say hi? Feel free to send me a message and I'll get back to you as soon as possible.");
            
            defaultContent.setContactEmail("eakhalaivan@example.com");
            defaultContent.setContactPhone("+1 234 567 890");
            defaultContent.setLocation("India");
            defaultContent.setLinkedinUrl("https://linkedin.com");
            defaultContent.setGithubUrl("https://github.com/Eakhalaivan");
            return websiteContentRepository.save(defaultContent);
        });
    }

    public WebsiteContent updateContent(WebsiteContent newContent) {
        WebsiteContent existing = getContent();
        existing.setHomeTitle(newContent.getHomeTitle());
        existing.setHomeSubtitle(newContent.getHomeSubtitle());
        existing.setHomeImage(newContent.getHomeImage());
        existing.setBrandName(newContent.getBrandName());
        existing.setAboutDescription(newContent.getAboutDescription());
        existing.setAboutImage(newContent.getAboutImage());
        existing.setContactEmail(newContent.getContactEmail());
        existing.setContactPhone(newContent.getContactPhone());
        existing.setLocation(newContent.getLocation());
        existing.setLinkedinUrl(newContent.getLinkedinUrl());
        existing.setGithubUrl(newContent.getGithubUrl());
        
        existing.setAboutTitle(newContent.getAboutTitle());
        existing.setSkillsTitle(newContent.getSkillsTitle());
        existing.setSkillsSubtitle(newContent.getSkillsSubtitle());
        existing.setProjectsTitle(newContent.getProjectsTitle());
        existing.setProjectsSubtitle(newContent.getProjectsSubtitle());
        existing.setContactTitle(newContent.getContactTitle());
        existing.setContactSubtitle(newContent.getContactSubtitle());
        existing.setContactDescription(newContent.getContactDescription());
        
        return websiteContentRepository.save(existing);
    }
}

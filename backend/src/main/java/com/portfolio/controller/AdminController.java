package com.portfolio.controller;

import com.portfolio.model.Contact;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.dto.MessageResponse;
import com.portfolio.service.ContactService;
import com.portfolio.service.ProjectService;
import com.portfolio.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProjectService projectService;
    private final SkillService skillService;
    private final ContactService contactService;

    public AdminController(ProjectService projectService, SkillService skillService, ContactService contactService) {
        this.projectService = projectService;
        this.skillService = skillService;
        this.contactService = contactService;
    }

    // Project Admin Endpoints
    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project project) {
        return ResponseEntity.ok(projectService.updateProject(id, project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<MessageResponse> deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(new MessageResponse("Project deleted successfully"));
    }

    // Skill Admin Endpoints
    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.createSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<MessageResponse> deleteSkill(@PathVariable String id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(new MessageResponse("Skill deleted successfully"));
    }

    // Contact Admin Endpoints
    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<MessageResponse> deleteContact(@PathVariable String id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok(new MessageResponse("Contact message deleted successfully"));
    }
}

package com.portfolio.service;

import com.portfolio.model.Skill;
import com.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill getSkillById(String id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));
    }

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public void deleteSkill(String id) {
        Skill existingSkill = getSkillById(id);
        skillRepository.delete(existingSkill);
    }
}

package com.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category; // e.g., Languages, Frameworks, Tools

    @Column(name = "skill_name", nullable = false)
    private String skillName;

    private Integer level; // e.g., 1-100 or 1-5

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
}

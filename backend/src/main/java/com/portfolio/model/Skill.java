package com.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "skills")
public class Skill {

    @Id
    private String id;

    private String category; // e.g., Languages, Frameworks, Tools

    private String skillName;

    private Integer level; // e.g., 1-100 or 1-5

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
}

package com.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "website_content")
public class WebsiteContent {

    @Id
    private Long id = 1L;

    @Column(length = 255)
    private String homeTitle;
    @Column(length = 500)
    private String homeSubtitle;
    private String homeImage;
    private String brandName;

    @Column(length = 2000)
    private String aboutDescription;
    private String aboutImage;

    private String contactEmail;
    private String contactPhone;
    private String location;
    
    private String linkedinUrl;
    private String githubUrl;
    
    private String aboutTitle;
    private String skillsTitle;
    private String skillsSubtitle;
    private String projectsTitle;
    private String projectsSubtitle;
    private String contactTitle;
    private String contactSubtitle;
    @Column(length = 1000)
    private String contactDescription;
    
    private String resumeUrl;

    // Default constructor
    public WebsiteContent() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHomeTitle() { return homeTitle; }
    public void setHomeTitle(String homeTitle) { this.homeTitle = homeTitle; }

    public String getHomeSubtitle() { return homeSubtitle; }
    public void setHomeSubtitle(String homeSubtitle) { this.homeSubtitle = homeSubtitle; }

    public String getBrandName() { return brandName; }
    public void setBrandName(String brandName) { this.brandName = brandName; }

    public String getHomeImage() { return homeImage; }
    public void setHomeImage(String homeImage) { this.homeImage = homeImage; }

    public String getAboutDescription() { return aboutDescription; }
    public void setAboutDescription(String aboutDescription) { this.aboutDescription = aboutDescription; }

    public String getAboutImage() { return aboutImage; }
    public void setAboutImage(String aboutImage) { this.aboutImage = aboutImage; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getAboutTitle() { return aboutTitle; }
    public void setAboutTitle(String aboutTitle) { this.aboutTitle = aboutTitle; }

    public String getSkillsTitle() { return skillsTitle; }
    public void setSkillsTitle(String skillsTitle) { this.skillsTitle = skillsTitle; }

    public String getSkillsSubtitle() { return skillsSubtitle; }
    public void setSkillsSubtitle(String skillsSubtitle) { this.skillsSubtitle = skillsSubtitle; }

    public String getProjectsTitle() { return projectsTitle; }
    public void setProjectsTitle(String projectsTitle) { this.projectsTitle = projectsTitle; }

    public String getProjectsSubtitle() { return projectsSubtitle; }
    public void setProjectsSubtitle(String projectsSubtitle) { this.projectsSubtitle = projectsSubtitle; }

    public String getContactTitle() { return contactTitle; }
    public void setContactTitle(String contactTitle) { this.contactTitle = contactTitle; }

    public String getContactSubtitle() { return contactSubtitle; }
    public void setContactSubtitle(String contactSubtitle) { this.contactSubtitle = contactSubtitle; }

    public String getContactDescription() { return contactDescription; }
    public void setContactDescription(String contactDescription) { this.contactDescription = contactDescription; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    private String cloudinaryCloudName;
    private String cloudinaryUploadPreset;

    public String getCloudinaryCloudName() { return cloudinaryCloudName; }
    public void setCloudinaryCloudName(String cloudinaryCloudName) { this.cloudinaryCloudName = cloudinaryCloudName; }

    public String getCloudinaryUploadPreset() { return cloudinaryUploadPreset; }
    public void setCloudinaryUploadPreset(String cloudinaryUploadPreset) { this.cloudinaryUploadPreset = cloudinaryUploadPreset; }
}



package com.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "website_content")
public class WebsiteContent {

    @Id
    private String id = "1";

    private String homeTitle;
    private String homeSubtitle;
    private String homeImage;
    private String brandName;

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
    private String contactDescription;

    // Default constructor
    public WebsiteContent() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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
}

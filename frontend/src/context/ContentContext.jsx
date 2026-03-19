import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWebsiteContent } from '../api/api';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadContent = async () => {
        try {
            setLoading(true);
            const data = await fetchWebsiteContent();
            setContent(data);
            setError(null);
        } catch (err) {
            console.error('Failed to load website content:', err);
            setError('Failed to load website content. Using fallback data.');
            // Fallback content to ensure the site isn't totally broken
            setContent({
                brandName: "Portfolio",
                homeTitle: "Welcome to My Portfolio",
                homeSubtitle: "Full Stack Developer",
                homeImage: "",
                aboutTitle: "About Me",
                aboutDescription: "I am a passionate developer dedicated to creating high-quality software solutions.",
                aboutImage: "",
                skillsTitle: "Technical Skills",
                skillsSubtitle: "My Toolkit",
                projectsTitle: "Featured Projects",
                projectsSubtitle: "Portfolio",
                contactTitle: "Let's Work Together",
                contactSubtitle: "Get In Touch",
                contactDescription: "Have a project in mind? Feel free to reach out!",
                contactEmail: "contact@example.com",
                contactPhone: "Not provided",
                location: "India",
                linkedinUrl: "https://linkedin.com",
                githubUrl: "https://github.com",
                resumeUrl: ""
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContent();
    }, []);

    // Allows forcing a refresh from other components (like after an admin save)
    const refreshContent = () => {
        return loadContent();
    };

    return (
        <ContentContext.Provider value={{ content, loading, error, refreshContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => useContext(ContentContext);

const API_URL = '/api';

export const fetchProjects = async () => {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
};

export const fetchSkills = async () => {
    const response = await fetch(`${API_URL}/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
};

export const submitContact = async (formData) => {
    const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Failed to submit contact');
    return response.json();
};

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};

// Admin Operations
export const fetchAdminContacts = async (token) => {
    const response = await fetch(`${API_URL}/admin/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch admin contacts');
    return response.json();
};

export const createProject = async (token, projectData) => {
    const response = await fetch(`${API_URL}/admin/projects`, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
};

export const updateProject = async (token, id, projectData) => {
    const response = await fetch(`${API_URL}/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
};

export const deleteProject = async (token, id) => {
    const response = await fetch(`${API_URL}/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete project');
};

export const createSkill = async (token, skillData) => {
    const response = await fetch(`${API_URL}/admin/skills`, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(skillData)
    });
    if (!response.ok) throw new Error('Failed to create skill');
    return response.json();
};

export const deleteSkill = async (token, id) => {
    const response = await fetch(`${API_URL}/admin/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete skill');
};

export const deleteContact = async (token, id) => {
    const response = await fetch(`${API_URL}/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete contact');
};

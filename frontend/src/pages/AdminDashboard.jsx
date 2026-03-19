import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    fetchProjects, 
    fetchSkills, 
    fetchAdminContacts, 
    deleteProject, 
    deleteSkill, 
    deleteContact,
    createProject,
    updateProject,
    createSkill,
    updateWebsiteContent
} from '../api/api';
import { 
    LayoutDashboard, 
    Briefcase, 
    Zap, 
    Mail, 
    LogOut, 
    Plus, 
    Trash2, 
    Edit3, 
    ExternalLink, 
    Github,
    ChevronRight,
    Settings,
    Save,
    Code
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import ProjectModal from '../components/ProjectModal';
import SkillModal from '../components/SkillModal';

const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) {
        return url;
    }
    return `https://${url}`;
};

const AdminDashboard = () => {
    const { token, logout } = useAuth();
    const { content: globalContent, refreshContent } = useContent();
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState({ projects: [], skills: [], contacts: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Content Form State
    const [contentForm, setContentForm] = useState({
        homeTitle: '',
        homeSubtitle: '',
        homeImage: '',
        brandName: '',
        aboutDescription: '',
        aboutImage: '',
        contactEmail: '',
        contactPhone: '',
        linkedinUrl: '',
        githubUrl: '',
        location: '',
        aboutTitle: '',
        skillsTitle: '',
        skillsSubtitle: '',
        projectsTitle: '',
        projectsSubtitle: '',
        contactTitle: '',
        contactSubtitle: '',
        contactDescription: ''
    });
    const [isSavingContent, setIsSavingContent] = useState(false);

    // Modal State
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [isSavingProject, setIsSavingProject] = useState(false);
    const [isSavingSkill, setIsSavingSkill] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        loadAllData();
    }, [token]);

    useEffect(() => {
        if (globalContent) {
            setContentForm({
                homeTitle: globalContent.homeTitle || '',
                homeSubtitle: globalContent.homeSubtitle || '',
                homeImage: globalContent.homeImage || '',
                brandName: globalContent.brandName || '',
                aboutDescription: globalContent.aboutDescription || '',
                aboutImage: globalContent.aboutImage || '',
                contactEmail: globalContent.contactEmail || '',
                contactPhone: globalContent.contactPhone || '',
                linkedinUrl: globalContent.linkedinUrl || '',
                githubUrl: globalContent.githubUrl || '',
                location: globalContent.location || '',
                aboutTitle: globalContent.aboutTitle || '',
                skillsTitle: globalContent.skillsTitle || '',
                skillsSubtitle: globalContent.skillsSubtitle || '',
                projectsTitle: globalContent.projectsTitle || '',
                projectsSubtitle: globalContent.projectsSubtitle || '',
                contactTitle: globalContent.contactTitle || '',
                contactSubtitle: globalContent.contactSubtitle || '',
                contactDescription: globalContent.contactDescription || ''
            });
        }
    }, [globalContent]);

    const loadAllData = async () => {
        setLoading(true);
        try {
            const [projects, skills, contacts] = await Promise.all([
                fetchProjects(),
                fetchSkills(),
                fetchAdminContacts(token)
            ]);
            setData({ projects, skills, contacts });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProject = async (projectData) => {
        setIsSavingProject(true);
        try {
            if (editingProject) {
                await updateProject(token, editingProject.id, projectData);
            } else {
                await createProject(token, projectData);
            }
            setIsProjectModalOpen(false);
            setEditingProject(null);
            showNotification('Project saved successfully!');
            // Refresh in background to keep UI snappy
            loadAllData();
        } catch (err) {
            console.error('Save error:', err);
            alert(`Error saving project: ${err.message}`);
        } finally {
            setIsSavingProject(false);
        }
    };

    const handleSaveSkill = async (skillData) => {
        setIsSavingSkill(true);
        try {
            await createSkill(token, skillData);
            setIsSkillModalOpen(false);
            showNotification('Skill added successfully!');
            loadAllData();
        } catch (err) {
            alert('Error saving skill: ' + err.message);
        } finally {
            setIsSavingSkill(false);
        }
    };

    const handleSaveContent = async (e) => {
        e.preventDefault();
        setIsSavingContent(true);
        try {
            await updateWebsiteContent(token, contentForm);
            await refreshContent();
            showNotification('Website content updated successfully!');
        } catch (err) {
            alert('Error updating content: ' + err.message);
        } finally {
            setIsSavingContent(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        try {
            if (type === 'project') await deleteProject(token, id);
            else if (type === 'skill') await deleteSkill(token, id);
            else if (type === 'contact') await deleteContact(token, id);
            
            // Refresh local state
            setData(prev => ({
                ...prev,
                [type + 's']: prev[type + 's'].filter(item => item.id !== id)
            }));
        } catch (err) {
            alert('Failed to delete: ' + err.message);
        }
    };

    const sidebarItems = [
        { id: 'projects', name: 'Projects', icon: <Briefcase size={20} /> },
        { id: 'skills', name: 'Skills', icon: <Zap size={20} /> },
        { id: 'contacts', name: 'Messages', icon: <Mail size={20} /> },
        { id: 'content', name: 'Website Content', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 relative">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 ${
                    notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white border border-slate-800'
                }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${notification.type === 'error' ? 'bg-white/20' : 'bg-blue-500/20'}`}>
                        {notification.type === 'error' ? <X size={18} /> : <Zap size={18} className="text-blue-400" />}
                    </div>
                    <div>
                        <p className="font-bold text-sm tracking-tight">{notification.message}</p>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-20">
                <div className="p-6">
                    <div className="flex items-center gap-3 text-white mb-8">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <LayoutDashboard size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Admin CMS</span>
                    </div>
                    
                    <nav className="space-y-1">
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                    activeTab === item.id 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                    : 'hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center gap-3 font-medium">
                                    {item.icon}
                                    {item.name}
                                </div>
                                {activeTab === item.id && <ChevronRight size={16} />}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="mt-auto p-6 border-t border-slate-800">
                    <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 capitalize">{activeTab}</h1>
                        <p className="text-slate-500">Manage your portfolio's {activeTab} information</p>
                    </div>
                    
                    {activeTab === 'projects' && (
                        <button 
                            onClick={() => { setEditingProject(null); setIsProjectModalOpen(true); }}
                            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
                        >
                            <Plus size={20} />
                            Add Project
                        </button>
                    )}
                    {activeTab === 'skills' && (
                        <button 
                            onClick={() => setIsSkillModalOpen(true)}
                            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
                        >
                            <Plus size={20} />
                            Add Skill
                        </button>
                    )}
                </header>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 font-medium">
                        Error: {error}
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-slate-400 animate-pulse">Loading data...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            {activeTab === 'projects' && (
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Tech Stack</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Links</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {data.projects.map(p => (
                                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                            {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400"><Briefcase size={20} /></div>}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900">{p.title}</p>
                                                            <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">{p.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 hidden md:table-cell">
                                                    <div className="flex flex-wrap gap-1.5 font-medium">
                                                        {p.techStack?.split(',').map(tag => (
                                                            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] uppercase tracking-wide border border-slate-200">
                                                                {tag.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-center gap-4 text-slate-400">
                                                        {p.githubUrl && <a href={formatUrl(p.githubUrl)} target="_blank" className="hover:text-slate-900 transition-colors"><Github size={18} /></a>}
                                                        {p.demoUrl && <a href={formatUrl(p.demoUrl)} target="_blank" className="hover:text-blue-600 transition-colors"><ExternalLink size={18} /></a>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button 
                                                            onClick={() => { setEditingProject(p); setIsProjectModalOpen(true); }}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button onClick={() => handleDelete('project', p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {activeTab === 'skills' && (
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Skill Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {data.skills.map(s => (
                                            <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-5 font-bold text-slate-900">{s.skillName}</td>
                                                <td className="px-6 py-5">
                                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                                                        {s.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button onClick={() => handleDelete('skill', s.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {activeTab === 'contacts' && (
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {data.contacts.map(c => (
                                        <div key={c.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black uppercase tracking-tight">
                                                        {c.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900">{c.name}</h4>
                                                        <a href={`mailto:${c.email}`} className="text-xs font-medium text-blue-600 hover:underline">{c.email}</a>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDelete('contact', c.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed shadow-sm">
                                                {c.message}
                                            </div>
                                            <div className="mt-4 text-[10px] uppercase tracking-widest font-black text-slate-400">
                                                {new Date(c.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                    {data.contacts.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-slate-400">No messages yet.</div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'content' && (
                                <form onSubmit={handleSaveContent} className="p-8 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Home Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><LayoutDashboard size={18} /></div>
                                                Home / Hero Section
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Main Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.homeTitle}
                                                        onChange={(e) => setContentForm({...contentForm, homeTitle: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                        placeholder="e.g. Hi, I'm Eakhalaivan"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Subtitle / Role</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.homeSubtitle}
                                                        onChange={(e) => setContentForm({...contentForm, homeSubtitle: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                        placeholder="e.g. Java Backend Developer"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Hero Image URL</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.homeImage}
                                                        onChange={(e) => setContentForm({...contentForm, homeImage: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                        placeholder="Cloudinary or image link"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Brand/Logo Name</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.brandName}
                                                        onChange={(e) => setContentForm({...contentForm, brandName: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                        placeholder="e.g. My Portfolio"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* About Section */}
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center"><Briefcase size={18} /></div>
                                                About Section
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">About Section Title</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.aboutTitle}
                                                        onChange={(e) => setContentForm({...contentForm, aboutTitle: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                        placeholder="e.g. About Me"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">About Description</label>
                                                    <textarea 
                                                        rows="4"
                                                        value={contentForm.aboutDescription}
                                                        onChange={(e) => setContentForm({...contentForm, aboutDescription: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                                                        placeholder="Tell something about yourself..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">About Image URL</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.aboutImage}
                                                        onChange={(e) => setContentForm({...contentForm, aboutImage: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                        placeholder="Cloudinary or image link"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skills & Projects Headers */}
                                        <div className="space-y-6 md:col-span-2 border-t pt-8">
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><Code size={18} /></div>
                                                Skills & Projects Headers
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-700 mb-1">Skills Section Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={contentForm.skillsTitle}
                                                            onChange={(e) => setContentForm({...contentForm, skillsTitle: e.target.value})}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                            placeholder="Technical Skills"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-700 mb-1">Skills Section Subtitle</label>
                                                        <input 
                                                            type="text" 
                                                            value={contentForm.skillsSubtitle}
                                                            onChange={(e) => setContentForm({...contentForm, skillsSubtitle: e.target.value})}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                            placeholder="My Toolkit"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-700 mb-1">Projects Section Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={contentForm.projectsTitle}
                                                            onChange={(e) => setContentForm({...contentForm, projectsTitle: e.target.value})}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                            placeholder="Featured Projects"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-700 mb-1">Projects Section Subtitle</label>
                                                        <input 
                                                            type="text" 
                                                            value={contentForm.projectsSubtitle}
                                                            onChange={(e) => setContentForm({...contentForm, projectsSubtitle: e.target.value})}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                            placeholder="Portfolio"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact & Social */}
                                        <div className="space-y-6 md:col-span-2">
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-t pt-8">
                                                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center"><Mail size={18} /></div>
                                                Contact Section & Social
                                            </h3>
                                            <div className="space-y-4 mb-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-700 mb-1">Contact Section Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={contentForm.contactTitle}
                                                            onChange={(e) => setContentForm({...contentForm, contactTitle: e.target.value})}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                            placeholder="e.g. Let's Work Together"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-slate-700 mb-1">Contact Section Subtitle</label>
                                                        <input 
                                                            type="text" 
                                                            value={contentForm.contactSubtitle}
                                                            onChange={(e) => setContentForm({...contentForm, contactSubtitle: e.target.value})}
                                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                            placeholder="e.g. Get In Touch"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Contact Description</label>
                                                    <textarea 
                                                        rows="3"
                                                        value={contentForm.contactDescription}
                                                        onChange={(e) => setContentForm({...contentForm, contactDescription: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                                                        placeholder="Contact CTA text..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                                    <input 
                                                        type="email" 
                                                        value={contentForm.contactEmail}
                                                        onChange={(e) => setContentForm({...contentForm, contactEmail: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.contactPhone}
                                                        onChange={(e) => setContentForm({...contentForm, contactPhone: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">LinkedIn URL</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.linkedinUrl}
                                                        onChange={(e) => setContentForm({...contentForm, linkedinUrl: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">GitHub URL</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.githubUrl}
                                                        onChange={(e) => setContentForm({...contentForm, githubUrl: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                                                    <input 
                                                        type="text" 
                                                        value={contentForm.location}
                                                        onChange={(e) => setContentForm({...contentForm, location: e.target.value})}
                                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6 border-t font-bold">
                                        <button 
                                            type="submit"
                                            disabled={isSavingContent}
                                            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50"
                                        >
                                            <Save size={20} />
                                            {isSavingContent ? 'Saving...' : 'Update Website Content'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Modals */}
            <ProjectModal 
                isOpen={isProjectModalOpen} 
                onClose={() => setIsProjectModalOpen(false)} 
                onSave={handleSaveProject} 
                project={editingProject} 
                isSaving={isSavingProject}
            />
            <SkillModal 
                isOpen={isSkillModalOpen} 
                onClose={() => setIsSkillModalOpen(false)} 
                onSave={handleSaveSkill} 
                isSaving={isSavingSkill}
            />
        </div>
    );
};

export default AdminDashboard;

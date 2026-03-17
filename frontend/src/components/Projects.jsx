import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../api/api';
import { Github, ExternalLink, FolderOpen, AlertCircle } from 'lucide-react';

const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) {
        return url;
    }
    return `https://${url}`;
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="py-24 bg-white dark:bg-slate-950 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-24 mx-auto mb-2"></div>
                        <div className="h-10 bg-slate-200 rounded w-48 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
                                <div className="w-full h-48 bg-slate-200"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
                                    <div className="space-y-2 mb-4">
                                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                                        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                                    </div>
                                    <div className="h-8 bg-slate-100 rounded-full w-1/3 mt-6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-24 bg-white dark:bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Portfolio</h2>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project) => {
                        const techTags = project.techStack ? project.techStack.split(',').map(tag => tag.trim()) : [];
                        const imageUrl = project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop';

                        return (
                            <div key={project.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:border-blue-500/30">
                                <div className="relative h-48 sm:h-56 overflow-hidden">
                                    <img src={imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="flex gap-3 w-full justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            {project.githubUrl && (
                                                <a href={formatUrl(project.githubUrl)} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors">
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            {project.demoUrl && (
                                                <a href={formatUrl(project.demoUrl)} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg">
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm flex-grow line-clamp-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                                        {techTags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800/50">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {projects.length === 0 && !error && (
                        <div className="col-span-full text-center py-12">
                            <FolderOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h4 className="text-xl font-medium text-slate-600">No projects found.</h4>
                            <p className="text-slate-500 mt-2">Check back later or add some via the admin panel.</p>
                        </div>
                    )}
                </div>
                {error && (
                    <div className="col-span-full bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-center mt-8">
                        <AlertCircle className="mr-3" />
                        Could not load projects from the server. Please ensure the backend is running.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;

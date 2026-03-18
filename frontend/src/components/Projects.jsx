import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../api/api';
import { Github, ExternalLink, FolderOpen, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) {
        return url;
    }
    return `https://${url}`;
};

import BorderGlow from './BorderGlow';
import { fetchSkills } from '../api/api';
import GradientText from './GradientText';

const Projects = () => {
    const { content } = useContent();
    const [projects, setProjects] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { projectsTitle = "Featured Projects", projectsSubtitle = "Portfolio" } = content || {};

    useEffect(() => {
        const getProjects = async () => {
            try {
                const [pData, sData] = await Promise.all([
                    fetchProjects(),
                    fetchSkills()
                ]);
                setProjects(pData);
                setAllSkills(sData);
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
            <section id="projects" className="py-24 bg-[#030014] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-pulse">
                        <div className="h-4 bg-slate-800 rounded w-24 mx-auto mb-2"></div>
                        <div className="h-10 bg-slate-800 rounded w-48 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white/5 rounded-3xl overflow-hidden shadow-sm border border-white/5 animate-pulse h-[450px]"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-24 bg-[#030014] relative overflow-hidden">
             {/* Background Gradients */}
             <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
             <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 text-white">
                    <h2 className="text-sm font-bold text-blue-400 tracking-[0.3em] uppercase mb-4">{projectsSubtitle}</h2>
                    <GradientText
                        colors={["#00e5ff", "#c084fc", "#00e5ff"]}
                        animationSpeed={4}
                        showBorder={false}
                        className="text-5xl font-extrabold tracking-tight"
                    >
                        {projectsTitle}
                    </GradientText>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 mx-auto mt-8 rounded-full shadow-lg shadow-blue-500/20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project) => {
                        const techTags = project.techStack ? project.techStack.split(',').map(tag => tag.trim()) : [];
                        const imageUrl = project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop';

                        return (
                            <BorderGlow
                                key={project.id}
                                edgeSensitivity={20}
                                glowColor="220 100% 60%"
                                backgroundColor="rgba(255, 255, 255, 0.02)"
                                borderRadius={32}
                                glowRadius={60}
                                glowIntensity={0.6}
                                animated={true}
                                colors={['#3b82f6', '#6366f1', '#3b82f6']}
                                className="transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 h-full"
                            >
                                <div className="flex flex-col h-full group overflow-hidden">
                                    <div className="relative h-56 overflow-hidden">
                                        <img 
                                            src={imageUrl} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60"></div>
                                        <div className="absolute inset-0 bg-[#030014]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                            <div className="flex gap-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                                {project.githubUrl && (
                                                    <a 
                                                        href={formatUrl(project.githubUrl)} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-[#030014] transition-all duration-300 shadow-2xl"
                                                        title="View Code"
                                                    >
                                                        <Github size={24} />
                                                    </a>
                                                )}
                                                {project.demoUrl && (
                                                    <a 
                                                        href={formatUrl(project.demoUrl)} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="w-12 h-12 bg-blue-600 border border-blue-400/50 rounded-2xl flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                                        title="Live Demo"
                                                    >
                                                        <ExternalLink size={24} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow bg-white/[0.01] backdrop-blur-3xl">
                                        <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors tracking-tight">{project.title}</h4>
                                        <p className="text-slate-400 mb-8 text-sm leading-relaxed flex-grow line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2.5 mt-auto pt-6 border-t border-white/5">
                                            {techTags.map((tag, idx) => {
                                                const skillInfo = allSkills.find(s => s.skillName.toLowerCase() === tag.toLowerCase());
                                                const description = skillInfo ? `${skillInfo.category} • Proficiency: ${skillInfo.level}%` : 'Technical Skill';
                                                
                                                const variants = [
                                                    "bg-blue-500/10 text-blue-300 border-blue-500/20",
                                                    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
                                                    "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
                                                    "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
                                                    "bg-purple-500/10 text-purple-300 border-purple-500/20"
                                                ];
                                                const variant = variants[idx % variants.length];
                                                
                                                return (
                                                    <div 
                                                        key={tag} 
                                                        className="group/skill relative transition-all duration-500"
                                                        style={{ 
                                                            transitionDelay: `${idx * 50}ms`,
                                                            transform: 'translateY(var(--tw-translate-y))',
                                                        }}
                                                    >
                                                        <span 
                                                            className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md transition-all duration-300 hover:bg-white/10 cursor-default translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center ${variant}`}
                                                        >
                                                            {tag}
                                                        </span>
                                                        {/* Tooltip */}
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-lg text-[10px] text-white whitespace-nowrap opacity-0 group-hover/skill:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                                                            {description}
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-slate-900/90"></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </BorderGlow>
                        );
                    })}
                    {projects.length === 0 && !error && (
                        <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                            <FolderOpen className="w-20 h-20 text-slate-700 mx-auto mb-6" />
                            <h4 className="text-2xl font-bold text-white mb-2">No projects discovered yet.</h4>
                            <p className="text-slate-500 font-medium">Add some amazing work via the management console.</p>
                        </div>
                    )}
                </div>
                {error && (
                    <div className="col-span-full bg-red-950/20 border border-red-500/30 text-red-400 p-6 rounded-3xl flex items-center mt-12 backdrop-blur-xl">
                        <AlertCircle className="mr-3 text-red-500" />
                        <span className="font-semibold text-sm">Synchronizing failed. Please ensure your core services are active.</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;

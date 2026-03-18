import React, { useState, useEffect } from 'react';
import { fetchSkills } from '../api/api';
import { Server, Database, Wrench, Code, Layers } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import BorderGlow from './BorderGlow';
import GradientText from './GradientText';

const Skills = () => {
    const { content } = useContent();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { skillsTitle = "Technical Skills", skillsSubtitle = "My Toolkit" } = content || {};

    useEffect(() => {
        const getSkills = async () => {
            try {
                const data = await fetchSkills();
                setSkills(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getSkills();
    }, []);

    const iconMap = {
        'Frontend': <Code className="text-orange-400" />,
        'Backend': <Server className="text-emerald-400" />,
        'Database': <Database className="text-blue-400" />,
        'Tools': <Wrench className="text-slate-400" />,
        'Languages': <Code className="text-purple-400" />
    };

    const defaultIcon = <Layers className="text-blue-400" />;

    if (loading) {
        return (
            <section id="skills" className="py-24 bg-[#030014] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-pulse">
                        <div className="h-4 bg-slate-800 rounded w-24 mx-auto mb-2"></div>
                        <div className="h-10 bg-slate-800 rounded w-48 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white/5 rounded-3xl p-8 shadow-sm border border-white/5 animate-pulse h-64"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="py-24 bg-[#030014] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 text-white">
                    <h2 className="text-sm font-bold text-blue-400 tracking-[0.3em] uppercase mb-4">{skillsSubtitle}</h2>
                    <GradientText
                        colors={["#00e5ff", "#0047ff", "#00e5ff"]}
                        animationSpeed={3.5}
                        showBorder={false}
                        className="text-5xl font-extrabold tracking-tight"
                    >
                        {skillsTitle}
                    </GradientText>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto mt-8 rounded-full shadow-lg shadow-blue-500/20"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                        <BorderGlow
                            key={category}
                            edgeSensitivity={20}
                            glowColor="220 100% 50%"
                            backgroundColor="rgba(255, 255, 255, 0.03)"
                            borderRadius={32}
                            glowRadius={50}
                            glowIntensity={0.8}
                            animated={true}
                            colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
                            className="transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                        >
                            <div className="p-8 h-full">
                                <div className="flex items-center gap-5 mb-8 relative">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-2xl border border-white/10 shadow-inner">
                                        {iconMap[category] || defaultIcon}
                                    </div>
                                    <h4 className="text-2xl font-bold text-white tracking-tight">{category}</h4>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {categorySkills.map((skill, index) => {
                                        const colorVariants = [
                                            "from-blue-500/20 to-blue-600/5 text-blue-300 border-blue-500/20",
                                            "from-emerald-500/20 to-emerald-600/5 text-emerald-300 border-emerald-500/20",
                                            "from-purple-500/20 to-purple-600/5 text-purple-300 border-purple-500/20",
                                            "from-cyan-500/20 to-cyan-600/5 text-cyan-300 border-cyan-500/20",
                                            "from-indigo-500/20 to-indigo-600/5 text-indigo-300 border-indigo-500/20",
                                            "from-rose-500/20 to-rose-600/5 text-rose-300 border-rose-500/20",
                                        ];
                                        const barColors = [
                                            "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-cyan-500", "bg-indigo-500", "bg-rose-500"
                                        ];
                                        const variant = colorVariants[index % colorVariants.length];
                                        const barColor = barColors[index % barColors.length];
                                        
                                        return (
                                            <div 
                                                key={skill.id} 
                                                className={`group/item flex flex-col gap-3 p-4 rounded-2xl border bg-gradient-to-br backdrop-blur-md transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] cursor-default flex-grow min-w-[140px] ${variant}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-bold tracking-tight uppercase">{skill.skillName}</span>
                                                    <span className="text-[10px] font-black opacity-60">{skill.level}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-1000 ease-out delay-300 ${barColor}`}
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </BorderGlow>
                    ))}
                    {Object.keys(skillsByCategory).length === 0 && (
                        <p className="col-span-full text-center text-slate-500 py-12 text-lg font-medium">No skills found.</p>
                    )}
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </section>
    );
};

export default Skills;

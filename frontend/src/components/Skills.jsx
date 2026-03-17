import React, { useState, useEffect } from 'react';
import { fetchSkills } from '../api/api';
import { Server, Database, Wrench, Code, Layers } from 'lucide-react';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        'Frontend': <Code className="text-orange-500" />,
        'Backend': <Server className="text-green-500" />,
        'Database': <Database className="text-blue-500" />,
        'Tools': <Wrench className="text-gray-500" />,
        'Languages': <Code className="text-purple-500" />
    };

    const defaultIcon = <Layers className="text-blue-600" />;

    if (loading) {
        return (
            <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-900 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-24 mx-auto mb-2"></div>
                        <div className="h-10 bg-slate-200 rounded w-48 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 animate-pulse">
                                <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                                    <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                                </div>
                            </div>
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
        <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">My Toolkit</h2>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Technical Skills</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-6 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                        <div key={category} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-4 mb-6 relative">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-2xl border border-slate-100 dark:border-slate-600">
                                    {iconMap[category] || defaultIcon}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{category}</h4>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {categorySkills.map((skill, index) => {
                                    const colors = [
                                        "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
                                        "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
                                        "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
                                        "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
                                        "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700",
                                        "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700",
                                    ];
                                    const colorClass = colors[index % colors.length];
                                    return (
                                        <span key={skill.id} className={`px-4 py-2 rounded-lg text-sm font-medium border cursor-default ${colorClass}`}>
                                            {skill.skillName}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {Object.keys(skillsByCategory).length === 0 && (
                        <p className="col-span-full text-center text-slate-500 py-8">No skills found.</p>
                    )}
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </section>
    );
};

export default Skills;

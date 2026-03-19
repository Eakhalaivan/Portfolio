import React, { useState, useEffect } from 'react';
import { fetchSkills } from '../api/api';
import { Server, Database, Wrench, Code, Layers } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { GlareCard } from './ui/glare-card';
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
                        <GlareCard
                            key={category}
                            className="flex flex-col items-start justify-start p-8"
                        >
                            <div className="w-full h-full relative z-10">
                                <div className="flex items-center gap-5 mb-8 relative">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-2xl border border-white/10 shadow-inner">
                                        {iconMap[category] || defaultIcon}
                                    </div>
                                    <h4 className="text-2xl font-bold text-white tracking-tight">{category}</h4>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {categorySkills.map((skill) => {
                                        const allThemes = [
                                            { bg: "from-[#020816] via-[#143e8c] to-[#020816]", border: "border-blue-500/30", base: "bg-[#06102b]", bar: "from-[#4facfe] to-[#00f2fe]", glow: "shadow-[0_0_10px_rgba(0,242,254,0.8)]", text: "text-blue-100" },
                                            { bg: "from-[#021008] via-[#0b5b33] to-[#021008]", border: "border-emerald-500/30", base: "bg-[#061a10]", bar: "from-[#34d399] to-[#059669]", glow: "shadow-[0_0_10px_rgba(52,211,153,0.8)]", text: "text-emerald-100" },
                                            { bg: "from-[#0a0216] via-[#4c1d95] to-[#0a0216]", border: "border-purple-500/30", base: "bg-[#10062b]", bar: "from-[#c084fc] to-[#e879f9]", glow: "shadow-[0_0_10px_rgba(192,132,252,0.8)]", text: "text-purple-100" },
                                            { bg: "from-[#1a0500] via-[#9a3412] to-[#1a0500]", border: "border-orange-500/30", base: "bg-[#2c0a00]", bar: "from-[#fb923c] to-[#fdba74]", glow: "shadow-[0_0_10px_rgba(251,146,60,0.8)]", text: "text-orange-100" },
                                            { bg: "from-[#160206] via-[#881337] to-[#160206]", border: "border-rose-500/30", base: "bg-[#2b0610]", bar: "from-[#fb7185] to-[#fda4af]", glow: "shadow-[0_0_10px_rgba(251,113,133,0.8)]", text: "text-rose-100" },
                                            { bg: "from-[#160b02] via-[#78350f] to-[#160b02]", border: "border-amber-500/30", base: "bg-[#2b1606]", bar: "from-[#fbbf24] to-[#fcd34d]", glow: "shadow-[0_0_10px_rgba(251,191,36,0.8)]", text: "text-amber-100" },
                                            { bg: "from-[#021016] via-[#164e63] to-[#021016]", border: "border-cyan-500/30", base: "bg-[#061621]", bar: "from-[#22d3ee] to-[#67e8f9]", glow: "shadow-[0_0_10px_rgba(34,211,238,0.8)]", text: "text-cyan-100" },
                                            { bg: "from-[#100216] via-[#701a75] to-[#100216]", border: "border-fuchsia-500/30", base: "bg-[#260635]", bar: "from-[#e879f9] to-[#f0abfc]", glow: "shadow-[0_0_10px_rgba(232,121,249,0.8)]", text: "text-fuchsia-100" },
                                            { bg: "from-[#021606] via-[#166534] to-[#021606]", border: "border-green-500/30", base: "bg-[#052b12]", bar: "from-[#4ade80] to-[#86efac]", glow: "shadow-[0_0_10px_rgba(74,222,128,0.8)]", text: "text-green-100" },
                                            { bg: "from-[#16020c] via-[#9f1239] to-[#16020c]", border: "border-pink-500/30", base: "bg-[#35061b]", bar: "from-[#f472b6] to-[#fbcfe8]", glow: "shadow-[0_0_10px_rgba(244,114,182,0.8)]", text: "text-pink-100" },
                                            { bg: "from-[#0b0c10] via-[#1f2833] to-[#0b0c10]", border: "border-cyan-800/30", base: "bg-[#101318]", bar: "from-[#45a29e] to-[#66fcf1]", glow: "shadow-[0_0_10px_rgba(102,252,241,0.8)]", text: "text-cyan-100" },
                                            { bg: "from-[#180f1e] via-[#4d3664] to-[#180f1e]", border: "border-violet-500/30", base: "bg-[#21152a]", bar: "from-[#a78bfa] to-[#ddd6fe]", glow: "shadow-[0_0_10px_rgba(167,139,250,0.8)]", text: "text-violet-100" }
                                        ];
                                        
                                        // Use skill name to deterministically pick a completely unique color for each skill
                                        let hash = 0;
                                        const nameStr = skill.skillName || "skill";
                                        for (let i = 0; i < nameStr.length; i++) {
                                            hash = nameStr.charCodeAt(i) + ((hash << 5) - hash);
                                        }
                                        const theme = allThemes[Math.abs(hash) % allThemes.length];

                                        return (
                                            <div 
                                                key={skill.id} 
                                                className={`group/item flex flex-col gap-3 px-6 py-5 rounded-full border ${theme.border} ${theme.base} bg-gradient-to-tr ${theme.bg} backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] cursor-default flex-grow w-full relative overflow-hidden`}
                                            >
                                                {/* Glossy highlight effect */}
                                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none"></div>
                                                
                                                <div className="flex justify-between items-center relative z-10 w-full px-2">
                                                    <span className="text-base font-extrabold tracking-wide text-white uppercase drop-shadow-md">{skill.skillName}</span>
                                                    <span className="text-sm font-bold text-gray-200">{skill.level}%</span>
                                                </div>
                                                <div className="relative z-10 mx-2 mb-1 h-2 w-full bg-black/40 rounded-full overflow-hidden shadow-inner border border-white/5">
                                                    <div 
                                                        className={`h-full rounded-full bg-gradient-to-r ${theme.bar} ${theme.glow} transition-all duration-1000 ease-out delay-300`}
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </GlareCard>
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

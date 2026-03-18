import { Download } from 'lucide-react';
import profileImg from '../assets/protifl.png';
import { useContent } from '../context/ContentContext';
import GradientText from './GradientText';

const About = () => {
    const { content, loading } = useContent();

    if (loading) return null;

    const { 
        aboutDescription = "I am a Java developer specializing in backend and full-stack web application development...", 
        aboutTitle = "About Me",
        aboutImage,
        brandName = "Developer"
    } = content || {};

    const displayImg = aboutImage || profileImg;

    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <GradientText
                        colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={3}
                        showBorder={false}
                        className="text-2xl font-bold tracking-[0.3em] uppercase mb-4"
                    >
                        Discover
                    </GradientText>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white">{aboutTitle}</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-6 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden relative shadow-inner flex items-center justify-center border border-slate-100 dark:border-slate-800">
                            <img 
                                src={displayImg} 
                                alt={brandName} 
                                className="w-full h-full object-cover rounded-2xl"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-4 py-2 rounded-lg shadow-md border border-slate-100 dark:border-slate-700">
                                 <span className="font-bold text-blue-600 text-xl">Backend </span>
                                 <span className="text-sm text-slate-500 block">Developer</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-6">
                        <h4 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Passionate & Driven Developer</h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                            {aboutDescription}
                        </p>
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-8">
                            <a 
                                href="/resume.pdf" 
                                target="_blank" 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-xl"
                            >
                                <Download size={20} /> Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

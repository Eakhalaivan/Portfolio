import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import Hyperspeed from './Hyperspeed';
import { useContent } from '../context/ContentContext';
import defaultProfileImg from '../assets/protifl.png';

const Hero = () => {
    const { content, loading } = useContent();

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }

    const { 
        homeTitle = "Hi, I'm Eakhalaivan", 
        homeSubtitle = "Java Backend Developer | Spring Boot | React | Full Stack Developer", 
        homeImage 
    } = content || {};

    const profileImg = homeImage || defaultProfileImg;

    return (
        <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-screen bg-black">
            <div className="absolute inset-0 z-0">
                <Hyperspeed
                    effectOptions={{
                        "distortion": "xyDistortion",
                        "length": 400,
                        "roadWidth": 9,
                        "islandWidth": 2,
                        "lanesPerRoad": 3,
                        "fov": 90,
                        "fovSpeedUp": 150,
                        "speedUp": 3,
                        "carLightsFade": 0.4,
                        "totalSideLightSticks": 50,
                        "lightPairsPerRoadWay": 30,
                        "shoulderLinesWidthPercentage": 0.05,
                        "brokenLinesWidthPercentage": 0.1,
                        "brokenLinesLengthPercentage": 0.5,
                        "lightStickWidth": [0.02, 0.05],
                        "lightStickHeight": [0.3, 0.7],
                        "movingAwaySpeed": [20, 50],
                        "movingCloserSpeed": [-150, -230],
                        "carLightsLength": [20, 80],
                        "carLightsRadius": [0.03, 0.08],
                        "carWidthPercentage": [0.1, 0.5],
                        "carShiftX": [-0.5, 0.5],
                        "carFloorSeparation": [0, 0.1],
                        "colors": {
                            "roadColor": 0x080808,
                            "islandColor": 0x000000,
                            "background": 0x000000,
                            "shoulderLines": 0xffffff,
                            "brokenLines": 0xffffff,
                            "leftCars": [0xff0000, 0xff8800, 0xff00ff],
                            "rightCars": [0x00ff00, 0x00ffff, 0xffff00],
                            "sticks": 0x00ffff
                        }
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-4 border border-blue-100">
                            👋 Welcome to my portfolio
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                            {homeTitle.split(',').map((part, i) => (
                                <React.Fragment key={i}>
                                    {i === 0 ? part : <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 relative inline-block">
                                        {part}
                                        <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-200/50 -z-10 transform -rotate-2"></span>
                                    </span>}
                                    {i === 0 && <br className="hidden md:block"/>}
                                </React.Fragment>
                            ))}
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-200 font-medium mt-4">{homeSubtitle}</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-10">
                            <a href="#projects" className="px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                                View My Work
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </a>
                            <a href="#contact" className="px-8 py-4 bg-transparent text-white border-2 border-gray-500 rounded-lg font-medium hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                                <Mail className="text-gray-300" size={20} /> Contact Me
                            </a>
                        </div>
                    </div>
                    
                    <div className="hidden md:block relative animate-in fade-in duration-1000">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-emerald-500/20 rounded-[2rem] transform rotate-3 scale-105 z-0"></div>
                        <div className="absolute -inset-4 bg-white rounded-[2rem] border-2 border-slate-100 transform -rotate-2 z-0"></div>
                        <img 
                            src={profileImg} 
                            alt="Developer Profile" 
                            className="relative z-10 w-full h-[500px] object-cover rounded-[1.5rem] shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

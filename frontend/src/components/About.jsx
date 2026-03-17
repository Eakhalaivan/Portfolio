import React from 'react';
import { Download } from 'lucide-react';
import profileImg from '../assets/protifl.png';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Discover</h2>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white">About Me</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-6 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden relative shadow-inner flex items-center justify-center border border-slate-100 dark:border-slate-800">
                            <img 
                                src={profileImg} 
                                alt="Eakhalaivan P" 
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
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
Eakhalaivan P is a developer focused on building backend and full-stack web applications using modern technologies such as Java, Spring Boot, SQL, JavaScript, React, HTML, and CSS. With a strong foundation in programming and problem-solving from a mathematics background, he specializes in developing scalable backend systems and integrating them with responsive user interfaces. His primary expertise lies in designing and implementing RESTful APIs using Spring Boot, managing relational databases with SQL, and creating dynamic frontend experiences with React. Eakhalaivan has built and deployed multiple projects that demonstrate his ability to develop real-world applications. One of his key projects is a Vertex Banking System, a full-stack banking application that allows users to create accounts, perform deposits and withdrawals, and view transaction history through a secure and structured backend API. Another project is an HR Management System, a web application designed to manage employee information, departments, and administrative operations through a centralized platform with full CRUD functionality. Through these projects, he has gained practical experience in backend architecture, database design, and integrating frontend interfaces with backend services. Eakhalaivan actively maintains his work on GitHub, showcasing his development practices, code structure, and continuous learning. His goal is to grow as a Java backend or full-stack developer, contributing to the development of scalable and reliable software systems while continuously expanding his technical expertise in modern web technologies.
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

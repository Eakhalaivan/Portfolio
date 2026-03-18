import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Navbar = () => {
    const { content, loading } = useContent();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return null;
    const { brandName = "Portfolio" } = content || {};

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About Me', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-2 border-b border-slate-100 dark:border-slate-800' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">
                           {brandName}<span className="text-blue-600">.</span>
                        </a>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="#contact" 
                            className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                        >
                            Hire Me
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none p-2"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-950 shadow-xl absolute w-full rounded-b-2xl border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top duration-300">
                    <div className="px-4 py-6 space-y-4 flex flex-col">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-lg font-medium py-2 border-b border-slate-50 dark:border-slate-800"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-center px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 mt-4 shadow-md"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

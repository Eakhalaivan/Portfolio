import React, { useState } from 'react';
import { submitContact } from '../api/api';
import { Mail, MapPin, Github, Linkedin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) {
        return url;
    }
    return `https://${url}`;
};

const Contact = () => {
    const { content, loading } = useContent();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (loading) return null;

    const { 
        contactEmail = "eakhalaivanp@gmail.com", 
        contactPhone = "Not provided",
        location = "India",
        linkedinUrl = "",
        githubUrl = "",
        contactTitle = "Let's Work Together",
        contactSubtitle = "Get In Touch",
        contactDescription = "Have a project in mind or just want to say hi? Feel free to send me a message and I'll get back to you as soon as possible."
    } = content || {};

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            await submitContact(formData);
            setFormData({ name: '', email: '', message: '' });
            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 bg-slate-900 relative text-white">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[100px] rounded-full transform translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-sm font-bold text-emerald-500 tracking-widest uppercase mb-2">{contactSubtitle}</h2>
                            <h3 className="text-4xl font-bold mb-6">{contactTitle}</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                {contactDescription}
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Email</h4>
                                    <a href={`mailto:${contactEmail}`} className="text-slate-400 hover:text-white transition-colors">{contactEmail}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Phone</h4>
                                    <span className="text-slate-400">{contactPhone}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Location</h4>
                                    <span className="text-slate-400">{location}</span>
                                </div>
                            </div>
                        </div>
                        
                        <h4 className="text-white font-medium mb-4">Follow Me</h4>
                        <div className="flex gap-4">
                            {githubUrl && (
                                <a 
                                    href={formatUrl(githubUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Github size={20} />
                                </a>
                            )}
                            {linkedinUrl && (
                                <a 
                                    href={formatUrl(linkedinUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Linkedin size={20} />
                                </a>
                            )}
                        </div>
                        
                    </div>
                    
                    <div className="lg:col-span-3">
                        <div className="bg-slate-900/50 backdrop-blur rounded-2xl p-8 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-slate-300">Your Name</label>
                                        <input 
                                            type="text" id="name" required 
                                            value={formData.name} onChange={handleChange}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-slate-500" 
                                            placeholder="John Doe" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                                        <input 
                                            type="email" id="email" required 
                                            value={formData.email} onChange={handleChange}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-slate-500" 
                                            placeholder="john@example.com" 
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                                    <textarea 
                                        id="message" rows="5" required 
                                        value={formData.message} onChange={handleChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-slate-500 resize-none" 
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" disabled={isSubmitting}
                                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                    {!isSubmitting && <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />}
                                </button>
                                
                                {status.message && (
                                    <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                        <p className="text-sm font-medium">{status.message}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

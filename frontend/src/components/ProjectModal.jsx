import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, onSave, project, isSaving, cloudinaryCloudName, cloudinaryUploadPreset }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        demoUrl: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (project) {
            setFormData(project);
        } else {
            setFormData({
                title: '',
                description: '',
                techStack: '',
                githubUrl: '',
                demoUrl: '',
                imageUrl: ''
            });
        }
    }, [project, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
            alert('Please configure Cloudinary settings in the "Website Content" tab first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryUploadPreset);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/auto/upload`,
                { method: 'POST', body: formData }
            );

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
        } catch (err) {
            console.error('Upload error:', err);
            alert('Upload failed: ' + err.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900">{project ? 'Edit Project' : 'New Project'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>
                
                <form id="project-form" onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="title" className="text-sm font-bold text-slate-700">Project Title</label>
                            <input 
                                type="text" id="title" required
                                value={formData.title} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="My Awesome Project"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="techStack" className="text-sm font-bold text-slate-700">Tech Stack (comma separated)</label>
                            <input 
                                type="text" id="techStack"
                                value={formData.techStack} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="React, Node.js, Tailwind"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="description" className="text-sm font-bold text-slate-700">Description</label>
                        <textarea 
                            id="description" rows="3" required
                            value={formData.description} onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                            placeholder="Tell more about your project..."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="githubUrl" className="text-sm font-bold text-slate-700">GitHub URL</label>
                            <input 
                                type="url" id="githubUrl"
                                value={formData.githubUrl} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="demoUrl" className="text-sm font-bold text-slate-700">Demo URL</label>
                            <input 
                                type="url" id="demoUrl"
                                value={formData.demoUrl} onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="https://my-demo.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="imageUrl" className="text-sm font-bold text-slate-700">Image URL</label>
                        <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                                <ImageIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" id="imageUrl"
                                    value={formData.imageUrl} onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="Unsplash URL, etc."
                                />
                            </div>
                            <label className="flex flex-col items-center justify-center p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 cursor-pointer transition-all border border-blue-100 shadow-sm" title="Upload Photo">
                                <ImageIcon size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                            </label>
                            {formData.imageUrl && (
                                <div className="relative group">
                                    <img src={formData.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, imageUrl: ''})}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
                    <button 
                        form="project-form"
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Save size={18} className={isSaving ? 'animate-spin' : ''} />
                        {isSaving ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const SkillModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        skillName: '',
        category: 'Frontend',
        level: 80
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ skillName: '', category: 'Frontend', level: 80 });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900">Add New Skill</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="skillName" className="text-sm font-bold text-slate-700">Skill Name</label>
                        <input 
                            type="text" id="skillName" required
                            value={formData.skillName} onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            placeholder="e.g. React, Java, AWS"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="category" className="text-sm font-bold text-slate-700">Category</label>
                        <select 
                            id="category"
                            value={formData.category} onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Database">Database</option>
                            <option value="Languages">Languages</option>
                            <option value="Tools">Tools</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="level" className="text-sm font-bold text-slate-700">Proficiency Level (%)</label>
                        <input 
                            type="range" id="level" min="1" max="100"
                            value={formData.level} onChange={handleChange}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="text-right text-xs font-bold text-blue-600">{formData.level}%</div>
                    </div>
                </form>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2">
                        <Save size={18} />
                        Save Skill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillModal;

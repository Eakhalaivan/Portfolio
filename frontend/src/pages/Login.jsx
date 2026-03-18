import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/api';
import { Shield, Key, User as UserIcon, LogIn, AlertCircle } from 'lucide-react';
import Ballpit from '../components/Ballpit';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = await apiLogin(credentials);
            login(data.token);
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials or server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0c] overflow-hidden px-4">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-radial-[at_50%_50%] from-blue-900/20 via-transparent to-transparent"></div>
            
            {/* Ballpit Background */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <Ballpit
                    count={80}
                    gravity={0}
                    friction={0.998}
                    wallBounce={0.98}
                    followCursor={true}
                    colors={[0x3b82f6, 0x6366f1, 0x8b5cf6]}
                />
            </div>

            <div className="relative max-w-md w-full z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl shadow-2xl shadow-blue-500/20 mb-6 transform hover:scale-105 transition-transform duration-300">
                        <Shield size={40} className="drop-shadow-lg" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Admin Portal</h1>
                    <p className="text-slate-400 font-medium">Secure access to portfolio management</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden group">
                    {/* Subtle inner glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                    
                    <form onSubmit={handleSubmit} className="relative space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-semibold text-slate-300 ml-1">Username</label>
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    type="text" id="username" required 
                                    value={credentials.username} onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300" 
                                    placeholder="Enter username" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-semibold text-slate-300 ml-1">Password</label>
                            <div className="relative">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    type="password" id="password" required 
                                    value={credentials.password} onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300" 
                                    placeholder="••••••••" 
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border border-red-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" disabled={loading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/25 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] ${loading ? 'opacity-70' : ''}`}
                        >
                            <span className="text-lg">{loading ? 'Authenticating...' : 'Sign In'}</span>
                            {!loading && <LogIn className="group-hover:translate-x-1 transition-transform duration-300" size={22} />}
                        </button>
                    </form>
                </div>
                
                <p className="text-center mt-10 text-slate-500 text-sm font-medium">
                    Protected by <span className="text-blue-500/80">DevPortfolio</span> Security System
                </p>
            </div>
        </div>
    );
};

export default Login;

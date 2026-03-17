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
        <div className="relative min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden px-4">
            {/* Ballpit Background */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                <Ballpit
                    count={120}
                    gravity={0.02}
                    friction={0.9975}
                    wallBounce={0.95}
                    followCursor={true}
                    colors={[0x2563eb, 0x059669, 0x4f46e5]}
                />
            </div>
            <div className="relative max-w-md w-full z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-xl mb-4">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
                    <p className="text-slate-500 mt-2">Sign in to manage your portfolio</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-slate-700 ml-1">Username</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="text" id="username" required 
                                    value={credentials.username} onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" 
                                    placeholder="Enter username" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="password" id="password" required 
                                    value={credentials.password} onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" 
                                    placeholder="••••••••" 
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm font-medium border border-red-100">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-70' : ''}`}
                        >
                            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                            {!loading && <LogIn className="group-hover:translate-x-1 transition-transform" size={20} />}
                        </button>
                    </form>
                </div>
                
                <p className="text-center mt-8 text-slate-400 text-sm">
                    Protected by DevPortfolio Security System
                </p>
            </div>
        </div>
    );
};

export default Login;

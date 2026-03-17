import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 py-12 text-center border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Eakhalaivan . All rights reserved.
                </p>
                <div className="mt-4 flex justify-center gap-6 text-slate-400 text-xs">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

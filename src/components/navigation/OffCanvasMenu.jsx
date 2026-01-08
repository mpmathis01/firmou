import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, BookOpen, ShieldCheck, FileText, Menu } from 'lucide-react';

const OffCanvasMenu = ({ isOpen, onClose, onOpenPrivacy }) => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for transition
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const navItems = [
        { path: '/', label: 'Editor', icon: <Home size={20} /> },
        { path: '/blog', label: 'Blog & Dicas', icon: <BookOpen size={20} /> },
    ];

    const handlePrivacyClick = () => {
        onClose();
        onOpenPrivacy();
    }

    return (
        <div className={`fixed inset-0 z-[100] flex ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Panel */}
            <div className={`relative w-[300px] h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Header */}
                <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <span className="font-outfit font-black text-2xl tracking-tighter">firmou</span>
                        <span className="font-outfit font-black text-2xl text-amber-400">.</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${location.pathname === item.path ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            <span className={`${location.pathname === item.path ? 'bg-white dark:bg-slate-800 shadow-sm p-2 rounded-xl text-amber-500' : 'p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors'}`}>
                                {item.icon}
                            </span>
                            <span className="font-bold tracking-wide">{item.label}</span>
                        </Link>
                    ))}

                    <div className="my-6 border-t border-slate-100 dark:border-slate-800 mx-4"></div>

                    <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Legal</p>

                    <button
                        onClick={handlePrivacyClick}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                        <ShieldCheck size={18} /> Política de Privacidade
                    </button>
                    <button
                        onClick={handlePrivacyClick}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                        <FileText size={18} /> Termos de Uso
                    </button>
                </nav>

                {/* Footer */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="bg-slate-900 dark:bg-white rounded-2xl p-5 text-center shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-2xl opacity-20 -mr-10 -mt-10 group-hover:opacity-40 transition-opacity"></div>
                        <h4 className="text-white dark:text-slate-900 font-black text-lg mb-1 relative z-10">Versão Pro</h4>
                        <p className="text-slate-400 dark:text-slate-500 text-xs mb-4 relative z-10">Em breve novidades exclusivas.</p>
                        <button className="w-full bg-white/10 dark:bg-slate-900/10 text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest py-3 rounded-xl hover:bg-white/20 transition-colors relative z-10">
                            Aguarde
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const HamburgerTrigger = ({ onClick }) => (
    <button
        onClick={onClick}
        className="mr-2 md:mr-3 p-2 md:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 group"
    >
        <Menu size={20} className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
    </button>
);

export default OffCanvasMenu;

import React, { useState } from 'react';
import { Menu, Home, FileText, PlusCircle, Settings, X, Search } from 'lucide-react';

import { ReceiptsList } from '../../features/receipts/ReceiptsList';
import { SettingsPage } from '../../features/settings/SettingsPage';

const MobileShell = ({ children }) => {
    const [activeTab, setActiveTab] = useState('home');

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return children;
            case 'receipts': return <ReceiptsList />;
            case 'search': return <div className="p-8 text-center text-slate-500">Busca em breve...</div>;
            case 'menu': return <SettingsPage />;
            default: return children;
        }
    };

    return (
        <div className="flex flex-col h-[100dvh] bg-slate-950 text-white overflow-hidden">
            {/* Native App Header */}
            <header className="px-5 pt-12 pb-4 glass sticky top-0 z-20 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        Firmou
                    </h1>
                    <p className="text-xs text-slate-400">Premium Mobile</p>
                </div>
                <button
                    onClick={() => setActiveTab('menu')}
                    className="p-2 bg-slate-800 rounded-full active:scale-95 transition-transform"
                >
                    <Settings size={20} className="text-slate-300" />
                </button>
            </header>

            {/* Main Content Area - Scrollable */}
            <main className="flex-1 overflow-y-auto p-4 content-start pb-24 animate-fade-in">
                {renderContent()}
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 w-full glass border-t border-slate-800 pb-safe pt-2 px-6 z-30">
                <div className="flex justify-between items-center h-16">
                    <NavButton
                        icon={<Home size={24} />}
                        label="Início"
                        isActive={activeTab === 'home'}
                        onClick={() => setActiveTab('home')}
                    />
                    <NavButton
                        icon={<FileText size={24} />}
                        label="Recibos"
                        isActive={activeTab === 'receipts'}
                        onClick={() => setActiveTab('receipts')}
                    />
                    {/* FAB (Floating Action Button) Center */}
                    <div className="-mt-8">
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 transition-transform active:scale-95 border-4 border-slate-950">
                            <PlusCircle size={32} />
                        </button>
                    </div>

                    <NavButton
                        icon={<Search size={24} />}
                        label="Buscar"
                        isActive={activeTab === 'search'}
                        onClick={() => setActiveTab('search')}
                    />
                    <NavButton
                        icon={<Menu size={24} />}
                        label="Ajustes"
                        isActive={activeTab === 'menu'}
                        onClick={() => setActiveTab('menu')}
                    />
                </div>
            </nav>
        </div>
    );
};

const NavButton = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center space-y-1 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
    >
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default MobileShell;

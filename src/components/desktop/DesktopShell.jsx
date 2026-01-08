import React, { useState } from 'react';
import { LayoutDashboard, FileText, Settings, User, Plus, Search, Bell } from 'lucide-react';

import { ReceiptsList } from '../../features/receipts/ReceiptsList';
import { SettingsPage } from '../../features/settings/SettingsPage';

const DesktopShell = ({ children }) => {
    const [activeItem, setActiveItem] = useState('dashboard');

    // Simple Router Logic for Desktop
    const renderContent = () => {
        switch (activeItem) {
            case 'dashboard': return children; // Default Dashboard passed as child
            case 'receipts': return <ReceiptsList />; // Dynamic Import would be better, but this works strictly
            case 'settings': return <SettingsPage />;
            default: return children;
        }
    };

    return (
        <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 glass-card border-r border-slate-800 flex flex-col z-20">
                <div className="p-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        Firmou<span className="text-white">.</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Gestão Premium</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={activeItem === 'dashboard'}
                        onClick={() => setActiveItem('dashboard')}
                    />
                    <SidebarItem
                        icon={<FileText size={20} />}
                        label="Meus Recibos"
                        active={activeItem === 'receipts'}
                        onClick={() => setActiveItem('receipts')}
                    />
                    <SidebarItem
                        icon={<User size={20} />}
                        label="Clientes"
                        active={activeItem === 'clients'}
                        onClick={() => setActiveItem('clients')}
                    />
                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Configurações</p>
                    </div>
                    <SidebarItem
                        icon={<Settings size={20} />}
                        label="Ajustes"
                        active={activeItem === 'settings'}
                        onClick={() => setActiveItem('settings')}
                    />
                </nav>

                {/* User Profile Snippet */}
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                            US
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-200">Usuário Pro</p>
                            <p className="text-xs text-slate-500">Premium Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Top Header */}
                <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-sm z-10">
                    <div className="text-slate-400 text-sm">
                        Bem-vindo de volta, <span className="text-white font-medium">Usuário</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 w-64 transition-all"
                            />
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button
                            onClick={() => setActiveItem('receipts')}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-lg shadow-indigo-500/20 transition-all"
                        >
                            <Plus size={16} className="mr-2" /> Novo Recibo
                        </button>
                    </div>
                </header>

                {/* Content View */}
                <main className="flex-1 overflow-y-auto p-8 relative z-10">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${active
            ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
    >
        <span className={active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}>
            {icon}
        </span>
        <span className="font-medium text-sm">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>}
    </button>
);

export default DesktopShell;

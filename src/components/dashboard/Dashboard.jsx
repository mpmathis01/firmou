import React from 'react';
import { db } from '../../db';
import { TrendingUp, Users, FileCheck, Clock, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Faturado"
                    value="R$ 12.450"
                    trend="+15%"
                    icon={<TrendingUp className="text-emerald-400" />}
                    color="emerald"
                />
                <StatCard
                    title="Recibos Emitidos"
                    value="142"
                    trend="+8"
                    icon={<FileCheck className="text-indigo-400" />}
                    color="indigo"
                />
                <StatCard
                    title="Clientes Ativos"
                    value="84"
                    trend="+12%"
                    icon={<Users className="text-purple-400" />}
                    color="purple"
                />
                <StatCard
                    title="Pendentes"
                    value="3"
                    trend="-2"
                    icon={<Clock className="text-amber-400" />}
                    color="amber"
                />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Receipts - Wide Column */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Recibos Recentes</h3>
                        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center">
                            Ver todos <ArrowRight size={14} className="ml-1" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700/50 group cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                        <FileCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-200">Serviço de Consultoria #{1000 + i}</h4>
                                        <p className="text-xs text-slate-500">Cliente Exemplo LTDA • 12 Jan, 2026</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white">R$ 1.200,00</p>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Pago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Tips - Narrow Column */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
                        <h3 className="text-lg font-semibold text-white mb-2">Novo Recibo Rápido</h3>
                        <p className="text-sm text-indigo-200 mb-4">Crie um recibo profissional em segundos.</p>
                        <button className="w-full py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                            Criar Agora
                        </button>
                    </div>

                    <div className="glass-card rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Status do Sistema</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-300">Banco de Dados</span>
                                <span className="text-emerald-400 font-mono text-xs bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">{db.name} (Online)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-300">Sincronização</span>
                                <span className="text-slate-500">Aguardando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, trend, icon, color }) => (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
        <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}>
            {icon}
        </div>
        <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {trend} vs mês anterior
            </span>
        </div>
    </div>
);

export default Dashboard;

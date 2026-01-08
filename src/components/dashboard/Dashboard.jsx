import React from 'react';
import { db } from '../../db';

const Dashboard = () => {
    return (
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Firmou
            </h1>
            <p className="text-lg text-slate-600">
                Banco de dados offline configurado no navegador:
                <span className="font-mono text-blue-600 ml-2">{db.name}</span>
            </p>
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-slate-800">Pronto para começar 001</h2>
                <p className="mt-2 text-slate-500">O projeto está reconstruído e organizado.</p>
            </div>
        </div>
    );
};

export default Dashboard;

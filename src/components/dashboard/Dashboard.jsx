import React from 'react';
import { db } from '../../db';

const Dashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-800">
                Painel Financeiro - Firmou
            </h1>
            <p className="mt-4 text-slate-600">
                Banco de dados offline configurado: {db.name}
            </p>
        </div>
    );
};

export default Dashboard;

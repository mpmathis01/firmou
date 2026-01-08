import React, { useState, useEffect } from 'react';
import { Shield, Cookie, X } from 'lucide-react';
import { initGA, initPostHog } from '../../utils/analytics';

const CookieConsent = ({ onOpenPrivacy }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === null) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else if (consent === 'true') {
            // Initialize analytics if already consented
            activateAnalytics();
        }
    }, []);

    const activateAnalytics = () => {
        // You should check if IDs are present before init
        console.log('Analytics Activated');
        // Example IDs - Replace with actual ENVs or Constants
        // initGA('G-XXXXXXXXXX'); 
        // initPostHog('phc_xxxxxxxxxxxxxxxx');
    };

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
        activateAnalytics();
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 flex justify-center animate-fade-in-up md:p-6 no-print">
            <div className="bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)] rounded-3xl p-6 max-w-4xl w-full flex flex-col md:flex-row items-start md:items-center gap-6">

                {/* Icon & Text */}
                <div className="flex gap-5 flex-1">
                    <div className="hidden md:flex w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl items-center justify-center flex-shrink-0">
                        <Cookie size={24} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-md">
                            <span className="md:hidden text-amber-500"><Cookie size={18} /></span>
                            Nós respeitamos sua privacidade
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-balance">
                            Utilizamos cookies apenas para entender como você usa nossa ferramenta e melhorar sua experiência.
                            Nenhum dado pessoal dos seus orçamentos é coletado — tudo fica no seu dispositivo.
                            <button onClick={onOpenPrivacy} className="ml-1 text-blue-600 hover:underline font-bold">
                                Ler Política
                            </button>.
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                    <button
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-6 py-3 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-bold text-sm transition-colors"
                    >
                        Recusar
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
                    >
                        Aceitar e Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;

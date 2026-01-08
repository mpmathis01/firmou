import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from './blogData';

// Helper to get image path (assuming they are in public/assets/blog or imported)
// For simplicity in this environment, referencing public path directly or checking imported map
const getImagePath = (imageName) => {
    return `/assets/blog/${imageName}`;
};

const BlogList = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-inter text-slate-900 dark:text-slate-100 pb-20">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                        <span className="font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Voltar ao Editor</span>
                    </Link>
                    <div className="flex items-center gap-1">
                        <span className="font-outfit font-black text-2xl tracking-tighter">firmou</span>
                        <span className="font-outfit font-black text-2xl text-amber-400">.</span>
                        <span className="ml-2 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black uppercase tracking-widest text-slate-500">Blog</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-white dark:bg-slate-900 pt-16 pb-24 px-4 border-b dark:border-slate-800">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-8">
                        Dicas para quem <span className="text-amber-500">cresce.</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Tudo o que você precisa saber sobre orçamentos, produtividade e gestão para prestadores de serviços autônomos.
                    </p>
                </div>
            </section>

            {/* Featured Post (First one) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 mb-20">
                {BLOG_POSTS.slice(0, 1).map(post => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                        <div className="bg-white dark:bg-slate-800 rounded-[40px] shadow-2xl overflow-hidden grid md:grid-cols-2 gap-0 border border-slate-100 dark:border-slate-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-[1.01]">
                            <div className="h-[400px] md:h-auto overflow-hidden relative">
                                <img
                                    src={getImagePath(post.image)}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-amber-600 shadow-lg">
                                    Destaque
                                </div>
                            </div>
                            <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight group-hover:text-amber-500 transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <span className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                                    Ler artigo completo <ChevronRight size={16} />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Post Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.slice(1).map(post => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="h-64 overflow-hidden relative">
                            <img
                                src={getImagePath(post.image)}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h3 className="text-xl font-black tracking-tight mb-4 group-hover:text-amber-500 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                {post.excerpt}
                            </p>
                            <span className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                Ler agora <ChevronRight size={14} />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <footer className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-slate-400 text-sm">Firmou.com Blog © 2026</p>
            </footer>
        </div>
    );
};

export default BlogList;

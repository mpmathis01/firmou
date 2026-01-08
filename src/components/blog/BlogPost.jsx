import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { BLOG_POSTS } from './blogData';

// Helper to get image path
const getImagePath = (imageName) => {
    return `/assets/blog/${imageName}`;
};

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!post) {
            navigate('/blog');
        }
    }, [post, navigate]);

    if (!post) return null;

    // Simple markdown-like parser for content
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('## ')) return <h2 key={index} className="text-3xl font-black mt-12 mb-6 tracking-tight text-slate-900 dark:text-white">{line.replace('## ', '')}</h2>;
            if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-200">{line.replace('### ', '')}</h3>;
            if (line.startsWith('- ')) return <li key={index} className="ml-4 mb-2 list-disc text-slate-600 dark:text-slate-300 pl-2">{line.replace('- ', '')}</li>;
            if (line.trim() === '') return <br key={index} />;
            return <p key={index} className="mb-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{line}</p>;
        });
    };

    return (
        <article className="min-h-screen bg-white dark:bg-slate-950 font-inter text-slate-900 dark:text-slate-100 pb-20">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-amber-400 z-50 w-full origin-left scale-x-0 animate-scroll-progress"></div>

            {/* Header */}
            <header className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b dark:border-slate-800 z-40 transition-all duration-300">
                <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/blog" className="flex items-center gap-2 group p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="text-slate-900 dark:text-white" size={20} />
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors" title="Compartilhar">
                            <Share2 size={20} />
                        </button>
                        <Link to="/" className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                            Criar Orçamento
                        </Link>
                    </div>
                </div>
            </header>

            {/* Header Image */}
            <div className="h-[60vh] w-full relative mt-20">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent z-10" />
                <img
                    src={getImagePath(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Container */}
            <div className="max-w-3xl mx-auto px-6 -mt-32 relative z-20">
                <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl p-8 md:p-12 mb-12 border border-slate-100 dark:border-slate-800">
                    {/* Meta */}
                    <div className="flex items-center gap-6 text-xs font-black text-amber-500 uppercase tracking-widest mb-8">
                        <span className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full"><Clock size={14} /> {post.readTime}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-[1.1]">
                        {post.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium leading-relaxed border-l-4 border-amber-400 pl-6 italic">
                        {post.excerpt}
                    </p>

                    <div className="prose dark:prose-invert prose-lg max-w-none prose-a:text-amber-500 prose-headings:font-black prose-img:rounded-3xl">
                        {renderContent(post.content)}
                    </div>
                </div>

                {/* Author Box */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-2xl">
                        F
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Escrito por</p>
                        <h4 className="font-bold text-lg dark:text-white">Equipe Firmou</h4>
                        <p className="text-sm text-slate-500">Especialistas em produtividade para prestadores de serviços.</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;

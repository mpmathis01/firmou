import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Loader2 } from 'lucide-react';
import { BloggerService } from '../../services/BloggerService';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadPost = async () => {
            const data = await BloggerService.fetchPostBySlug(slug);
            if (!data) {
                navigate('/blog');
            } else {
                setPost(data);
            }
            setLoading(false);
        };
        loadPost();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Lendo postagem...</p>
            </div>
        );
    }

    if (!post) return null;

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
                    src={post.image}
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

                    <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium leading-relaxed border-l-4 border-amber-400 pl-6 italic line-clamp-3">
                        {post.excerpt}
                    </p>

                    <div
                        className="blogger-content prose dark:prose-invert prose-lg max-w-none prose-a:text-amber-500 prose-headings:font-black prose-img:rounded-3xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                {/* Author Box */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-2xl">
                        {post.author.charAt(0)}
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Escrito por</p>
                        <h4 className="font-bold text-lg dark:text-white">{post.author}</h4>
                        <p className="text-sm text-slate-500">Especialistas em produtividade para prestadores de serviços.</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;

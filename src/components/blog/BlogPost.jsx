import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { BLOG_POSTS } from './blogData';

// Helper to get image path
// Helper to get image path using Vite's BASE_URL
const getImagePath = (imageName) => {
    if (!imageName) return '';
    if (imageName.startsWith('http')) return imageName;
    const base = import.meta.env.BASE_URL;
    return `${base}assets/blog/${imageName}`;
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

    // Advanced parser for content
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine === '') return <br key={index} />;

            // Headlines
            if (trimmedLine.startsWith('## ')) return <h2 key={index} className="text-3xl font-black mt-12 mb-6 tracking-tight text-slate-900 dark:text-white">{trimmedLine.replace('## ', '')}</h2>;
            if (trimmedLine.startsWith('### ')) return <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-200">{trimmedLine.replace('### ', '')}</h3>;

            // List items
            if (trimmedLine.startsWith('- ')) return <li key={index} className="ml-4 mb-2 list-disc text-slate-600 dark:text-slate-300 pl-2">{trimmedLine.replace('- ', '')}</li>;

            // Video Tag: v[ID]
            const videoMatch = trimmedLine.match(/^v\[(.*?)\]$/);
            if (videoMatch) {
                const videoId = videoMatch[1];
                return (
                    <div key={index} className="my-10 aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            }

            // Image Tag: ![alt](url)
            const imgMatch = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (imgMatch) {
                const alt = imgMatch[1];
                const src = imgMatch[2];
                return (
                    <figure key={index} className="my-10">
                        <img src={getImagePath(src)} alt={alt} className="w-full rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800" />
                        {alt && <figcaption className="text-center text-sm text-slate-400 mt-4 italic">{alt}</figcaption>}
                    </figure>
                );
            }

            // Text with bold and internal links
            // Simple replacement for **text** -> <strong>text</strong>
            // Simple replacement for [label](slug) -> <Link to="/blog/slug">label</Link>
            let parts = [trimmedLine];

            // Handle [label](link)
            const linkRegex = /\[(.*?)\]\((.*?)\)/g;
            let lastIndex = 0;
            let resultParts = [];
            let match;

            while ((match = linkRegex.exec(trimmedLine)) !== null) {
                // Text before match
                if (match.index > lastIndex) {
                    resultParts.push(trimmedLine.substring(lastIndex, match.index));
                }

                const label = match[1];
                const target = match[2];

                if (target.startsWith('http') || target.includes('.')) {
                    resultParts.push(<a key={`link-${match.index}`} href={target} target="_blank" rel="noopener noreferrer" className="text-amber-500 font-bold hover:underline">{label}</a>);
                } else {
                    // Internal blog link
                    resultParts.push(<Link key={`link-${match.index}`} to={`/blog/${target}`} className="text-amber-500 font-bold hover:underline">{label}</Link>);
                }
                lastIndex = linkRegex.lastIndex;
            }

            if (lastIndex < trimmedLine.length) {
                resultParts.push(trimmedLine.substring(lastIndex));
            }

            // Final rendering of parts, optionally handling **bold**
            const finalElements = resultParts.map((part, i) => {
                if (typeof part === 'string') {
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    const boldParts = [];
                    let boldLastIndex = 0;
                    let boldMatch;

                    while ((boldMatch = boldRegex.exec(part)) !== null) {
                        if (boldMatch.index > boldLastIndex) {
                            boldParts.push(part.substring(boldLastIndex, boldMatch.index));
                        }
                        boldParts.push(<strong key={boldMatch.index} className="font-bold text-slate-900 dark:text-white">{boldMatch[1]}</strong>);
                        boldLastIndex = boldRegex.lastIndex;
                    }
                    if (boldLastIndex < part.length) {
                        boldParts.push(part.substring(boldLastIndex));
                    }
                    return boldParts;
                }
                return part;
            });

            return <p key={index} className="mb-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{finalElements}</p>;
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

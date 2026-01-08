const BLOG_URL = 'https://www.firmou.com';

/**
 * Blogger JSON Feed Service
 */
export const BloggerService = {
    /**
     * Fetches all posts from Blogger
     */
    async fetchPosts() {
        try {
            // Using the default Blogger JSON feed
            // We use alt=json to get the JSON object
            const response = await fetch(`${BLOG_URL}/feeds/posts/default?alt=json&max-results=50`);
            if (!response.ok) throw new Error('Falha ao buscar posts do Blogger');

            const data = await response.json();
            return this.mapEntries(data.feed.entry || []);
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            return [];
        }
    },

    /**
     * Fetches a single post by slug
     */
    async fetchPostBySlug(slug) {
        try {
            // Blogger public feed doesn't support easy slug lookup, 
            // so we fetch the list and find the match.
            const posts = await this.fetchPosts();
            return posts.find(p => p.slug === slug);
        } catch (error) {
            console.error('Erro ao buscar post por slug:', error);
            return null;
        }
    },

    /**
     * Maps Blogger entry to our App structure
     */
    mapEntries(entries) {
        return entries.map(entry => {
            const id = entry.id.$t;
            const title = entry.title.$t;
            const content = entry.content.$t;
            const published = new Date(entry.published.$t);

            // Extract Slug from link
            const alternateLink = entry.link.find(l => l.rel === 'alternate')?.href || '';
            const slug = alternateLink.split('/').pop().replace('.html', '');

            // Extract First Image from content
            const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
            const firstImage = imgMatch ? imgMatch[1] : 'https://images.unsplash.com/photo-1554224155-169641357599?q=80&w=1000&auto=format&fit=crop';

            // Create Excerpt (strip HTML and take first 150 chars)
            const excerpt = content.replace(/<[^>]*>?/gm, ' ').substring(0, 160).trim() + '...';

            return {
                id,
                slug,
                title,
                excerpt,
                published,
                date: published.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
                readTime: Math.max(2, Math.ceil(content.split(' ').length / 200)) + ' min',
                image: firstImage,
                content: content, // HTML original
                author: entry.author[0]?.name?.$t || 'Equipe Firmou'
            };
        });
    }
};

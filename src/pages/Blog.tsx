import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '../services/api';
import { BlogPost } from '../types';
import { Clock, Calendar, ChevronRight, BookOpen, Search, Star } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filtered, setFiltered] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    blogApi.getAll().then(res => {
      setPosts(res.data);
      setFiltered(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = posts;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [activeCategory, searchQuery, posts]);

  const categories = ['All', ...new Set(posts.map(p => p.category))];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary-400 font-mono text-sm">{'// Blog'}</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-4">
            Technical <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development, architecture, and best practices.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input pl-12"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'glass-light text-dark-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-light rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-dark-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-dark-800 rounded w-1/4" />
                  <div className="h-6 bg-dark-800 rounded w-3/4" />
                  <div className="h-4 bg-dark-800 rounded w-full" />
                  <div className="h-4 bg-dark-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-dark-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="glass-light rounded-2xl overflow-hidden card-hover group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                  {post.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-dark-500 text-xs mb-3">
                    <span className="px-2 py-1 rounded bg-primary-500/10 text-primary-400 font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time} min
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-dark-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-primary-400 text-sm font-medium">
                    Read More <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

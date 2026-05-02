import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogApi } from '../services/api';
import { BlogPost } from '../types';
import { ArrowLeft, Clock, Calendar, User, ChevronRight } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      blogApi.getBySlug(slug).then(res => {
        setPost(res.data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
          <Link to="/blog" className="text-primary-400 hover:text-primary-300">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-3xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-semibold text-white mt-5 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('```')) {
        return null;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-dark-300 ml-6 list-disc">{line.slice(2)}</li>
        );
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      if (line.includes('`')) {
        const parts = line.split('`');
        return (
          <p key={i} className="text-dark-300 leading-relaxed mb-2">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <code key={j} className="px-1.5 py-0.5 bg-dark-800 text-primary-300 rounded text-sm font-mono">{part}</code>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }
      return <p key={i} className="text-dark-300 leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-dark-400 mb-8">
          <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark-300 truncate max-w-[200px]">{post.title}</span>
        </div>

        <Link to="/blog" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover Image */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <img src={post.cover_image} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-dark-400 text-sm mb-6">
          <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 font-medium">{post.category}</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(post.published_at)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.read_time} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-8">{post.title}</h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Content */}
        <div className="glass-light rounded-2xl p-8">
          {renderContent(post.content)}
        </div>
      </div>
    </div>
  );
}

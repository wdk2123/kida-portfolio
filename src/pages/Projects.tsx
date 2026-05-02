import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectApi } from '../services/api';
import { Project } from '../types';
import { ExternalLink, FolderGit2, Search, Filter, Star, ChevronRight } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    projectApi.getAll().then(res => {
      setProjects(res.data);
      setFiltered(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = projects;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [activeCategory, searchQuery, projects]);

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary-400 font-mono text-sm">{'// Portfolio'}</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-4">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my skills in full-stack development,
            from web applications to cloud infrastructure.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input pl-12"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter className="w-5 h-5 text-dark-500 flex-shrink-0" />
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

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass-light rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-dark-800" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-dark-800 rounded w-3/4" />
                  <div className="h-4 bg-dark-800 rounded w-full" />
                  <div className="h-4 bg-dark-800 rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-dark-800 rounded-full w-16" />
                    <div className="h-6 bg-dark-800 rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <FolderGit2 className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-dark-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="glass-light rounded-2xl overflow-hidden card-hover group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                  {project.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full glass text-white text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tag">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-dark-800">
                    <span className="flex items-center gap-1 text-primary-400 text-sm font-medium">
                      Details <ChevronRight className="w-3 h-3" />
                    </span>
                    <div className="ml-auto flex items-center gap-3">
                      {project.live_url && (
                        <ExternalLink className="w-4 h-4 text-dark-400 hover:text-primary-400 transition-colors" />
                      )}
                      {project.github_url && (
                        <FolderGit2 className="w-4 h-4 text-dark-400 hover:text-primary-400 transition-colors" />
                      )}
                    </div>
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

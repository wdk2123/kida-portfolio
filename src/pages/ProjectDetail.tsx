import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectApi } from '../services/api';
import { Project } from '../types';
import { ArrowLeft, ExternalLink, FolderGit2, Calendar, Star, ChevronRight } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      projectApi.getById(parseInt(id)).then(res => {
        setProject(res.data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
          <Link to="/projects" className="text-primary-400 hover:text-primary-300">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-dark-400 mb-8">
          <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/projects" className="hover:text-primary-400 transition-colors">Projects</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark-300">{project.title}</span>
        </div>

        {/* Back button */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            {project.featured && (
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium mb-3">
                <Star className="w-3 h-3 fill-yellow-400" />
                Featured Project
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-black text-white">{project.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="glass-light rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
              <p className="text-dark-300 leading-relaxed mb-6">{project.long_description}</p>

              <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map(tech => (
                  <span key={tech} className="tag text-sm">{tech}</span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Category</h3>
              <span className="tag">{project.category}</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-light rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Project Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-dark-300 text-sm">
                  <Calendar className="w-4 h-4 text-primary-400" />
                  <span>{new Date(project.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </span>
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full flex items-center justify-center gap-2"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

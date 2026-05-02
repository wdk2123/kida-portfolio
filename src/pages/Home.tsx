import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ExternalLink, Code2, Database, Cloud, Sparkles, ChevronRight, Star, Camera, Download } from 'lucide-react';
import { projectApi } from '../services/api';
import { useProfile } from '../context/ProfileContext';
import { Project } from '../types';

export default function Home() {
  const { profile } = useProfile();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectApi.getFeatured().then(res => {
      setFeaturedProjects(res.data);
      setLoading(false);
    });
  }, []);

  const stats = [
    { label: 'Projects', value: '5+' },
    { label: 'Technologies', value: '12+' },
    { label: 'Education', value: 'BSc' },
    { label: 'Passion Level', value: '∞' },
  ];

  const services = [
    {
      icon: <Code2 className="w-7 h-7" />,
      title: 'Web Development',
      description: 'Building responsive, modern websites and web applications with React and Django.',
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: 'Backend & APIs',
      description: 'Developing RESTful APIs and server-side applications with Django and Python.',
    },
    {
      icon: <Cloud className="w-7 h-7" />,
      title: 'IT Solutions',
      description: 'Providing IT consulting and technical solutions for businesses and organizations.',
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: 'Engineering Projects',
      description: 'Combining electrical and computer engineering knowledge with software development.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern noise-overlay">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8">
                  <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                  <span className="text-sm text-dark-300">Available for new projects</span>
                </div>
              </div>

              <h1 className="animate-fade-in-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
                <span className="block text-2xl sm:text-3xl text-dark-400 font-medium mb-2">
                  Hello, I'm
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-3">
                  <span className="gradient-text">{profile.name}</span>
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-300 mt-4">
                  {profile.title}
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-dark-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                {profile.tagline}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300 opacity-0 justify-center lg:justify-start" style={{ animationFillMode: 'forwards' }}>
                <Link to="/projects" className="btn-primary">
                  <span className="flex items-center gap-2">
                    View My Work
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link to="/contact" className="btn-outline">
                  Get In Touch
                </Link>
                <a href="#" className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </div>

            {/* Right: Profile Photo */}
            <div className="flex-shrink-0 animate-fade-in-right delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary-500 via-accent-500 to-primary-400 opacity-60 blur-sm animate-pulse-glow" />
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary-500 via-accent-500 to-primary-400" />
                
                {/* Photo container */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-dark-900 border-4 border-dark-950">
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* Default placeholder avatar */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center mb-3">
                        <span className="text-5xl sm:text-6xl font-black gradient-text">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-dark-500 text-xs">
                        <Camera className="w-3 h-3" />
                        <span>Upload your photo</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 glass-light rounded-xl px-3 py-2 animate-float" style={{ animationDelay: '0.5s' }}>
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <div className="absolute -bottom-2 -left-2 glass-light rounded-xl px-3 py-2 animate-float" style={{ animationDelay: '1.5s' }}>
                  <span className="text-sm font-bold text-accent-400">ECE</span>
                </div>
                <div className="absolute top-1/2 -right-6 glass-light rounded-xl px-3 py-2 animate-float hidden sm:block" style={{ animationDelay: '2.5s' }}>
                  <span className="text-sm font-bold text-primary-400">Full-Stack</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-dark-500" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-black gradient-text">{stat.value}</div>
                <div className="text-dark-400 text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white">What I <span className="gradient-text">Do</span></h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              I offer end-to-end development services, from initial concept to production deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="glass-light rounded-2xl p-6 card-hover group">
                <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 relative bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white">Featured <span className="gradient-text">Projects</span></h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              A selection of my recent work. Each project is a unique piece of development.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-light rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-dark-800" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-dark-800 rounded w-3/4" />
                    <div className="h-4 bg-dark-800 rounded w-full" />
                    <div className="h-4 bg-dark-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="glass-light rounded-2xl overflow-hidden card-hover group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tag">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Project <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
              View All Projects <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-light rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Let's Build Something <span className="gradient-text">Amazing</span>
              </h2>
              <p className="text-dark-400 text-lg mb-8 max-w-xl mx-auto">
                Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                <span>Start a Conversation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

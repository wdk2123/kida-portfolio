import { Link } from 'react-router-dom';
import { Mail, Heart, Code2, MapPin, ExternalLink } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function Footer() {
  const { profile } = useProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-dark-800">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                {profile.name.split(' ')[0]}<span className="text-primary-400">.dev</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-4">
              {profile.name} — {profile.title} crafting elegant solutions to complex problems. Passionate about clean code and great user experiences.
            </p>
            <div className="flex items-center gap-1 text-dark-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              {['Home', 'About', 'Projects', 'Blog', 'Contact'].map(item => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block text-dark-400 hover:text-primary-400 text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-white font-semibold mb-4">Technologies</h3>
            <div className="space-y-3">
              {['React & Next.js', 'Django & DRF', 'PostgreSQL', 'Docker & K8s', 'AWS & GCP'].map(tech => (
                <span key={tech} className="block text-dark-400 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-dark-400 hover:text-primary-400 text-sm transition-colors group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-dark-400 hover:text-primary-400 text-sm transition-colors group">
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-dark-400 hover:text-primary-400 text-sm transition-colors group">
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm flex items-center gap-1">
            &copy; {currentYear} Kidan Dibekulu. Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> and React + Django
          </p>
          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-400 transition-colors text-sm">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-400 transition-colors text-sm">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { projectApi, blogApi, skillApi } from '../services/api';
import { Project, BlogPost, ContactMessage, Skill } from '../types';
import {
  LayoutDashboard, FolderGit2, BookOpen, Mail, LogOut,
  Plus, Edit, Trash2, Eye, BarChart3, TrendingUp, ArrowLeft,
  X, Check, Loader2, Star, Camera, User, Upload, Save
} from 'lucide-react';

type AdminTab = 'overview' | 'profile' | 'projects' | 'blog' | 'messages' | 'skills';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { profile, updateProfile, updatePhoto, removePhoto } = useProfile();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileForm, setProfileForm] = useState(profile);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'blog' | 'skill' | null>(null);
  const [editingItem, setEditingItem] = useState<unknown>(null);

  useEffect(() => {
    Promise.all([
      projectApi.getAll(),
      blogApi.getAll(),
      skillApi.getAll(),
    ]).then(([projRes, blogRes, skillRes]) => {
      setProjects(projRes.data);
      setBlogPosts(blogRes.data);
      setSkills(skillRes.data);
      setLoading(false);
    });

    // Simulate some contact messages
    setMessages([
      { id: 1, name: 'John Smith', email: 'john@example.com', subject: 'Project Inquiry', message: 'I have a project I\'d like to discuss. Can we schedule a call?', created_at: '2024-09-10T10:00:00Z' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', subject: 'Collaboration', message: 'Would love to collaborate on an open-source project.', created_at: '2024-09-08T14:30:00Z' },
      { id: 3, name: 'Mike Chen', email: 'mike@example.com', subject: 'Job Opportunity', message: 'We have an exciting full-stack position at our startup.', created_at: '2024-09-05T09:15:00Z' },
    ]);
  }, []);

  const handleOpenModal = (type: 'project' | 'blog' | 'skill', item?: unknown) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    setEditingItem(null);
  };

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: <FolderGit2 className="w-5 h-5" />, color: 'from-primary-500 to-primary-600' },
    { label: 'Blog Posts', value: blogPosts.length, icon: <BookOpen className="w-5 h-5" />, color: 'from-accent-500 to-accent-600' },
    { label: 'Messages', value: messages.length, icon: <Mail className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
    { label: 'Skills', value: skills.length, icon: <BarChart3 className="w-5 h-5" />, color: 'from-amber-500 to-amber-600' },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      updatePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'overview' as AdminTab, label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile' as AdminTab, label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'projects' as AdminTab, label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'blog' as AdminTab, label: 'Blog Posts', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'messages' as AdminTab, label: 'Messages', icon: <Mail className="w-4 h-4" /> },
    { id: 'skills' as AdminTab, label: 'Skills', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Top Bar */}
      <header className="glass border-b border-dark-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">View Site</span>
              </Link>
              <div className="h-6 w-px bg-dark-700" />
              <h1 className="text-white font-semibold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-dark-400 text-sm hidden sm:inline">{user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'glass-light text-dark-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl">
            <h2 className="text-xl font-bold text-white mb-6">Edit Your Profile</h2>

            {saveSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center gap-3">
                <Check className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <p className="text-accent-300 text-sm">Profile updated successfully!</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Photo Upload */}
              <div className="lg:col-span-1">
                <div className="glass-light rounded-2xl p-6 text-center">
                  <h3 className="text-white font-semibold mb-4">Profile Photo</h3>
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden bg-dark-800 border-4 border-primary-500/30 mb-4 group cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}>
                    {(profile.photoUrl || photoPreview) ? (
                      <img
                        src={photoPreview || profile.photoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <Camera className="w-10 h-10 text-dark-500 mb-2" />
                        <span className="text-dark-500 text-xs">No photo</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-dark-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <p className="text-dark-500 text-xs mb-3">Click photo to upload. Max 5MB.</p>
                  {profile.photoUrl && (
                    <button
                      onClick={removePhoto}
                      className="text-red-400 text-xs hover:text-red-300 transition-colors"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2 space-y-4">
                <div className="glass-light rounded-2xl p-6 space-y-4">
                  <h3 className="text-white font-semibold mb-2">Personal Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-400 text-sm mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-400 text-sm mb-1">Job Title</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={e => setProfileForm(p => ({ ...p, title: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-dark-400 text-sm mb-1">Tagline</label>
                    <textarea
                      value={profileForm.tagline}
                      onChange={e => setProfileForm(p => ({ ...p, tagline: e.target.value }))}
                      rows={3}
                      className="form-input resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-400 text-sm mb-1">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-400 text-sm mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={e => setProfileForm(p => ({ ...p, location: e.target.value }))}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-dark-400 text-sm mb-1">Phone</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="glass-light rounded-2xl p-6 space-y-4">
                  <h3 className="text-white font-semibold mb-2">Social Links</h3>
                  <div>
                    <label className="block text-dark-400 text-sm mb-1">GitHub</label>
                    <input
                      type="url"
                      value={profileForm.github}
                      onChange={e => setProfileForm(p => ({ ...p, github: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-400 text-sm mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={profileForm.linkedin}
                      onChange={e => setProfileForm(p => ({ ...p, linkedin: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-400 text-sm mb-1">Twitter / X</label>
                    <input
                      type="url"
                      value={profileForm.twitter}
                      onChange={e => setProfileForm(p => ({ ...p, twitter: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="btn-primary flex items-center gap-2"
                >
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Profile
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="glass-light rounded-2xl p-6 card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-dark-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-light rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-400" />
                  Recent Messages
                </h3>
                <div className="space-y-4">
                  {messages.slice(0, 3).map(msg => (
                    <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl bg-dark-800/50">
                      <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-xs font-bold flex-shrink-0">
                        {msg.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{msg.name}</p>
                        <p className="text-dark-400 text-xs truncate">{msg.subject}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-light rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-accent-400" />
                  Recent Projects
                </h3>
                <div className="space-y-4">
                  {projects.slice(0, 3).map(proj => (
                    <div key={proj.id} className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/50">
                      <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-400 text-xs flex-shrink-0">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-sm font-medium truncate">{proj.title}</p>
                        <p className="text-dark-400 text-xs">{proj.category}</p>
                      </div>
                      {proj.featured && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Manage Projects</h2>
              <button onClick={() => handleOpenModal('project')} className="btn-primary flex items-center gap-2">
                <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Project</span>
              </button>
            </div>
            <div className="glass-light rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Project</th>
                      <th className="text-left text-dark-400 text-sm font-medium px-6 py-4 hidden md:table-cell">Category</th>
                      <th className="text-left text-dark-400 text-sm font-medium px-6 py-4 hidden lg:table-cell">Technologies</th>
                      <th className="text-left text-dark-400 text-sm font-medium px-6 py-4 hidden sm:table-cell">Featured</th>
                      <th className="text-right text-dark-400 text-sm font-medium px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(proj => (
                      <tr key={proj.id} className="border-b border-dark-800 hover:bg-dark-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-white font-medium text-sm">{proj.title}</p>
                          <p className="text-dark-500 text-xs truncate max-w-[200px]">{proj.description}</p>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="tag text-xs">{proj.category}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {proj.technologies.slice(0, 2).map(t => <span key={t} className="tag text-xs">{t}</span>)}
                            {proj.technologies.length > 2 && <span className="tag text-xs">+{proj.technologies.length - 2}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          {proj.featured ? <Check className="w-4 h-4 text-accent-400" /> : <X className="w-4 h-4 text-dark-600" />}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/projects/${proj.id}`} className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button onClick={() => handleOpenModal('project', proj)} className="p-2 rounded-lg text-dark-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Manage Blog Posts</h2>
              <button onClick={() => handleOpenModal('blog')} className="btn-primary flex items-center gap-2">
                <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> New Post</span>
              </button>
            </div>
            <div className="space-y-4">
              {blogPosts.map(post => (
                <div key={post.id} className="glass-light rounded-2xl p-6 card-hover flex flex-col sm:flex-row gap-4">
                  <img src={post.cover_image} alt={post.title} className="w-full sm:w-32 h-24 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="tag text-xs">{post.category}</span>
                      {post.featured && <span className="tag text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Featured</span>}
                    </div>
                    <h3 className="text-white font-semibold truncate">{post.title}</h3>
                    <p className="text-dark-400 text-sm truncate mt-1">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link to={`/blog/${post.slug}`} className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleOpenModal('blog', post)} className="p-2 rounded-lg text-dark-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Contact Messages</h2>
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className="glass-light rounded-2xl p-6 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold flex-shrink-0">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h3 className="text-white font-semibold">{msg.name}</h3>
                        <span className="text-dark-500 text-xs font-mono">
                          {msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                        </span>
                      </div>
                      <p className="text-dark-400 text-sm">{msg.email}</p>
                      <p className="text-dark-300 text-sm mt-2"><span className="text-primary-400 font-medium">Subject:</span> {msg.subject}</p>
                      <p className="text-dark-300 text-sm mt-1">{msg.message}</p>
                    </div>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="btn-outline flex items-center gap-2 flex-shrink-0"
                    >
                      <Mail className="w-4 h-4" />
                      Reply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Manage Skills</h2>
              <button onClick={() => handleOpenModal('skill')} className="btn-primary flex items-center gap-2">
                <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Skill</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map(skill => (
                <div key={skill.id} className="glass-light rounded-xl p-4 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium flex items-center gap-2">
                      <span>{skill.icon}</span>
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenModal('skill', skill)} className="p-1 rounded text-dark-400 hover:text-amber-400 transition-colors">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="p-1 rounded text-dark-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-500" style={{ width: `${skill.level}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="tag text-xs">{skill.category}</span>
                    <span className="text-primary-400 text-xs font-mono">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <div className="glass-light rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? `Edit ${modalType === 'project' ? 'Project' : modalType === 'blog' ? 'Blog Post' : 'Skill'}` : `Add ${modalType === 'project' ? 'Project' : modalType === 'blog' ? 'Blog Post' : 'Skill'}`}
              </h3>
              <button onClick={handleCloseModal} className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalType === 'project' && (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleCloseModal(); }}>
                <input type="text" placeholder="Project Title" className="form-input" defaultValue={editingItem ? (editingItem as Project).title : ''} />
                <textarea placeholder="Description" rows={3} className="form-input resize-none" defaultValue={editingItem ? (editingItem as Project).description : ''} />
                <input type="text" placeholder="Category" className="form-input" defaultValue={editingItem ? (editingItem as Project).category : ''} />
                <input type="text" placeholder="Technologies (comma-separated)" className="form-input" defaultValue={editingItem ? (editingItem as Project).technologies.join(', ') : ''} />
                <input type="url" placeholder="Live URL" className="form-input" defaultValue={editingItem ? (editingItem as Project).live_url : ''} />
                <input type="url" placeholder="GitHub URL" className="form-input" defaultValue={editingItem ? (editingItem as Project).github_url : ''} />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured" className="rounded" defaultChecked={editingItem ? (editingItem as Project).featured : false} />
                  <label htmlFor="featured" className="text-dark-300 text-sm">Featured Project</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1"><span>Save</span></button>
                  <button type="button" onClick={handleCloseModal} className="btn-outline flex-1">Cancel</button>
                </div>
              </form>
            )}

            {modalType === 'blog' && (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleCloseModal(); }}>
                <input type="text" placeholder="Post Title" className="form-input" defaultValue={editingItem ? (editingItem as BlogPost).title : ''} />
                <textarea placeholder="Excerpt" rows={2} className="form-input resize-none" defaultValue={editingItem ? (editingItem as BlogPost).excerpt : ''} />
                <textarea placeholder="Content (Markdown supported)" rows={6} className="form-input resize-none font-mono text-sm" defaultValue={editingItem ? (editingItem as BlogPost).content : ''} />
                <input type="text" placeholder="Category" className="form-input" defaultValue={editingItem ? (editingItem as BlogPost).category : ''} />
                <input type="text" placeholder="Tags (comma-separated)" className="form-input" defaultValue={editingItem ? (editingItem as BlogPost).tags.join(', ') : ''} />
                <input type="number" placeholder="Read time (minutes)" className="form-input" defaultValue={editingItem ? (editingItem as BlogPost).read_time : 5} />
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1"><span>Save</span></button>
                  <button type="button" onClick={handleCloseModal} className="btn-outline flex-1">Cancel</button>
                </div>
              </form>
            )}

            {modalType === 'skill' && (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleCloseModal(); }}>
                <input type="text" placeholder="Skill Name" className="form-input" defaultValue={editingItem ? (editingItem as Skill).name : ''} />
                <input type="number" placeholder="Level (0-100)" min={0} max={100} className="form-input" defaultValue={editingItem ? (editingItem as Skill).level : 80} />
                <input type="text" placeholder="Category" className="form-input" defaultValue={editingItem ? (editingItem as Skill).category : ''} />
                <input type="text" placeholder="Icon (emoji)" className="form-input" defaultValue={editingItem ? (editingItem as Skill).icon : '⚡'} />
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1"><span>Save</span></button>
                  <button type="button" onClick={handleCloseModal} className="btn-outline flex-1">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



import { useEffect, useState, useRef } from 'react';
import { skillApi, experienceApi, educationApi } from '../services/api';
import { useProfile } from '../context/ProfileContext';
import { Skill, Experience, Education } from '../types';
import { Briefcase, GraduationCap, Award, Code2, ChevronRight, Download } from 'lucide-react';


export default function About() {
  const { profile } = useProfile();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [animatedSkills, setAnimatedSkills] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      skillApi.getAll(),
      experienceApi.getAll(),
      educationApi.getAll(),
    ]).then(([skillsRes, expRes, eduRes]) => {
      setSkills(skillsRes.data);
      setExperiences(expRes.data);
      setEducation(eduRes.data);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedSkills(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, [skills.length]);

  const categories = [...new Set(skills.map(s => s.category))];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary-400 font-mono text-sm">{'// About Me'}</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-6">
              Passionate about building <span className="gradient-text">great software</span>
            </h1>
            <div className="space-y-4 text-dark-300 leading-relaxed">
              <p>
                I'm {profile.name}, an Electrical and Computer Engineering student passionate about
                web development and IT-related fields. I combine my engineering background with modern
                software development practices to build full-stack web applications.
              </p>
              <p>
                I specialize in React, Django, and modern web technologies. I believe in writing clean,
                maintainable code and creating great user experiences. I'm constantly learning and
                expanding my skills in both frontend and backend development.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies, working on personal projects,
                and staying up-to-date with the latest trends in web development and IT.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#" className="btn-primary inline-flex items-center gap-2">
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Resume
                </span>
              </a>
            </div>
          </div>

          {/* Profile Image / Code Block */}
          <div className="relative">
            <div className="glass-light rounded-2xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-dark-500 text-xs ml-2">about.tsx</span>
              </div>
              <div className="space-y-1">
                <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
                <p className="pl-4"><span className="text-green-400">name</span>: <span className="text-amber-300">'{profile.name}'</span>,</p>
                <p className="pl-4"><span className="text-green-400">role</span>: <span className="text-amber-300">'{profile.title}'</span>,</p>
                <p className="pl-4"><span className="text-green-400">location</span>: <span className="text-amber-300">'{profile.location}'</span>,</p>
                <p className="pl-4"><span className="text-green-400">education</span>: <span className="text-amber-300">'BSc ECE, 2021-2026'</span>,</p>
                <p className="pl-4"><span className="text-green-400">passions</span>: [</p>
                <p className="pl-8"><span className="text-amber-300">'Web Development'</span>,</p>
                <p className="pl-8"><span className="text-amber-300">'IT Solutions'</span>,</p>
                <p className="pl-8"><span className="text-amber-300">'Full-Stack'</span>,</p>
                <p className="pl-8"><span className="text-amber-300">'Engineering'</span>,</p>
                <p className="pl-4">],</p>
                <p className="pl-4"><span className="text-green-400">available</span>: <span className="text-blue-400">true</span>,</p>
                <p>{'}'}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-600/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Technical <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A comprehensive toolkit built over years of professional experience.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary-400" />
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter(s => s.category === category)
                  .map((skill, i) => (
                    <div key={skill.id} className="glass-light rounded-xl p-4 card-hover">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium flex items-center gap-2">
                          <span>{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-primary-400 text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-500 skill-bar-fill"
                          style={{ width: animatedSkills ? `${skill.level}%` : '0%', transitionDelay: `${i * 0.1}s` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Education */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Experience & <span className="gradient-text">Education</span></h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'experience'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                : 'glass-light text-dark-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'education'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                : 'glass-light text-dark-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Education
          </button>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto space-y-6">
          {activeTab === 'experience' &&
            experiences.map((exp, i) => (
              <div key={exp.id} className="glass-light rounded-2xl p-6 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{exp.role}</h3>
                    <p className="text-primary-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {exp.current && (
                      <span className="px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 text-xs font-medium">
                        Current
                      </span>
                    )}
                    <span className="text-dark-400 text-sm font-mono">
                      {formatDate(exp.start_date)} — {exp.current ? 'Present' : formatDate(exp.end_date!)}
                    </span>
                  </div>
                </div>
                <p className="text-dark-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}

          {activeTab === 'education' &&
            education.map((edu, i) => (
              <div key={edu.id} className="glass-light rounded-2xl p-6 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{edu.degree} in {edu.field}</h3>
                        <p className="text-primary-400 font-medium">{edu.institution}</p>
                      </div>
                      <span className="text-dark-400 text-sm font-mono">
                        {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                      </span>
                    </div>
                    <p className="text-dark-300 text-sm leading-relaxed mb-3">{edu.description}</p>
                    {edu.gpa && (
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-accent-400" />
                        <span className="text-dark-300 text-sm">GPA: <span className="text-accent-400 font-medium">{edu.gpa}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

import axios from 'axios';
import { Project, Skill, Experience, Education, BlogPost, ContactMessage, ApiResponse } from '../types';
import { projects, skills, experiences, education, blogPosts } from '../data/mockData';

/**
 * API Service Layer — Real Django REST Framework Connection
 * 
 * Set VITE_API_URL environment variable to your backend URL:
 *   - Development: VITE_API_URL=http://localhost:8000/api
 *   - Production:  VITE_API_URL=https://your-api.onrender.com/api
 * 
 * If VITE_API_URL is not set, it falls back to mock data automatically.
 */

const API_BASE = import.meta.env.VITE_API_URL || '';
const USE_REAL_API = !!API_BASE;

// Axios instance with JWT interceptor
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 (token expired) — redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper: wrap DRF paginated response
function wrapResponse<T>(response: { data: { results?: T[]; count?: number } | T }): ApiResponse<T extends unknown[] ? T : T> {
  const data = response.data;
  if (data && typeof data === 'object' && 'results' in data) {
    return {
      data: data.results as unknown as (T extends unknown[] ? T : T),
      count: data.count,
    };
  }
  return { data: data as unknown as (T extends unknown[] ? T : T) };
}

// ---- Projects API ----
export const projectApi = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    if (!USE_REAL_API) {
      await delay(400);
      return { data: projects, count: projects.length };
    }
    const response = await api.get('/projects/');
    return wrapResponse<Project[]>(response);
  },

  getById: async (id: number): Promise<ApiResponse<Project>> => {
    if (!USE_REAL_API) {
      await delay(300);
      const project = projects.find(p => p.id === id);
      if (!project) throw new Error('Project not found');
      return { data: project };
    }
    const response = await api.get(`/projects/${id}/`);
    return { data: response.data };
  },

  getFeatured: async (): Promise<ApiResponse<Project[]>> => {
    if (!USE_REAL_API) {
      await delay(300);
      const featured = projects.filter(p => p.featured);
      return { data: featured, count: featured.length };
    }
    const response = await api.get('/projects/featured/');
    return wrapResponse<Project[]>(response);
  },

  // Admin: Create project
  create: async (data: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await api.post('/projects/', data);
    return { data: response.data };
  },

  // Admin: Update project
  update: async (id: number, data: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await api.patch(`/projects/${id}/`, data);
    return { data: response.data };
  },

  // Admin: Delete project
  remove: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}/`);
  },
};

// ---- Skills API ----
export const skillApi = {
  getAll: async (): Promise<ApiResponse<Skill[]>> => {
    if (!USE_REAL_API) {
      await delay(300);
      return { data: skills, count: skills.length };
    }
    const response = await api.get('/skills/');
    return wrapResponse<Skill[]>(response);
  },

  create: async (data: Partial<Skill>): Promise<ApiResponse<Skill>> => {
    const response = await api.post('/skills/', data);
    return { data: response.data };
  },

  update: async (id: number, data: Partial<Skill>): Promise<ApiResponse<Skill>> => {
    const response = await api.patch(`/skills/${id}/`, data);
    return { data: response.data };
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/skills/${id}/`);
  },
};

// ---- Experience API ----
export const experienceApi = {
  getAll: async (): Promise<ApiResponse<Experience[]>> => {
    if (!USE_REAL_API) {
      await delay(300);
      return { data: experiences, count: experiences.length };
    }
    const response = await api.get('/experience/');
    return wrapResponse<Experience[]>(response);
  },

  create: async (data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    const response = await api.post('/experience/', data);
    return { data: response.data };
  },

  update: async (id: number, data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    const response = await api.patch(`/experience/${id}/`, data);
    return { data: response.data };
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/experience/${id}/`);
  },
};

// ---- Education API ----
export const educationApi = {
  getAll: async (): Promise<ApiResponse<Education[]>> => {
    if (!USE_REAL_API) {
      await delay(300);
      return { data: education, count: education.length };
    }
    const response = await api.get('/education/');
    return wrapResponse<Education[]>(response);
  },

  create: async (data: Partial<Education>): Promise<ApiResponse<Education>> => {
    const response = await api.post('/education/', data);
    return { data: response.data };
  },

  update: async (id: number, data: Partial<Education>): Promise<ApiResponse<Education>> => {
    const response = await api.patch(`/education/${id}/`, data);
    return { data: response.data };
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/education/${id}/`);
  },
};

// ---- Blog API ----
export const blogApi = {
  getAll: async (): Promise<ApiResponse<BlogPost[]>> => {
    if (!USE_REAL_API) {
      await delay(400);
      return { data: blogPosts, count: blogPosts.length };
    }
    const response = await api.get('/blog/');
    return wrapResponse<BlogPost[]>(response);
  },

  getBySlug: async (slug: string): Promise<ApiResponse<BlogPost>> => {
    if (!USE_REAL_API) {
      await delay(300);
      const post = blogPosts.find(p => p.slug === slug);
      if (!post) throw new Error('Blog post not found');
      return { data: post };
    }
    const response = await api.get(`/blog/?search=${slug}`);
    const results = response.data.results || response.data;
    const post = Array.isArray(results) ? results[0] : results;
    if (!post) throw new Error('Blog post not found');
    return { data: post };
  },

  getFeatured: async (): Promise<ApiResponse<BlogPost[]>> => {
    if (!USE_REAL_API) {
      await delay(300);
      const featured = blogPosts.filter(p => p.featured);
      return { data: featured, count: featured.length };
    }
    const response = await api.get('/blog/featured/');
    return wrapResponse<BlogPost[]>(response);
  },

  create: async (data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    const response = await api.post('/blog/', data);
    return { data: response.data };
  },

  update: async (id: number, data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    const response = await api.patch(`/blog/${id}/`, data);
    return { data: response.data };
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/blog/${id}/`);
  },
};

// ---- Contact API ----
export const contactApi = {
  submit: async (message: ContactMessage): Promise<ApiResponse<ContactMessage>> => {
    if (!USE_REAL_API) {
      await delay(600);
      const saved: ContactMessage = {
        ...message,
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      return { data: saved, message: 'Message sent successfully!' };
    }
    const response = await api.post('/contact/', message);
    return { data: response.data.data || response.data, message: response.data.message || 'Message sent successfully!' };
  },

  getAll: async (): Promise<ApiResponse<ContactMessage[]>> => {
    const response = await api.get('/contact/');
    return wrapResponse<ContactMessage[]>(response);
  },
};

// ---- Auth API ----
export const authApi = {
  login: async (username: string, password: string) => {
    if (!USE_REAL_API) {
      await delay(500);
      if (username === 'admin' && password === 'admin123') {
        return {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token',
          user: { id: 1, username: 'admin', email: 'kidandibekulu0@gmail.com', is_admin: true },
        };
      }
      throw new Error('Invalid credentials');
    }
    // Real Django JWT login
    const response = await api.post('/auth/login/', { username, password });
    const { access, refresh, user } = response.data;
    if (refresh) localStorage.setItem('refreshToken', refresh);
    return {
      token: access,
      user: user || { id: 1, username, email: '', is_admin: true },
    };
  },

  verify: async (token: string) => {
    if (!USE_REAL_API) {
      await delay(200);
      if (token) return { valid: true };
      throw new Error('Invalid token');
    }
    await api.post('/auth/verify/', { token });
    return { valid: true };
  },

  refresh: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');
    const response = await api.post('/auth/refresh/', { refresh: refreshToken });
    return { token: response.data.access };
  },
};

// Mock delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

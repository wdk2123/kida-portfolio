export interface Project {
  id: number;
  title: string;
  description: string;
  long_description: string;
  image: string;
  technologies: string[];
  live_url: string;
  github_url: string;
  category: string;
  featured: boolean;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  technologies: string[];
  current: boolean;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  description: string;
  gpa?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  tags: string[];
  published_at: string;
  read_time: number;
  featured: boolean;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  count?: number;
  next?: string | null;
  previous?: string | null;
}

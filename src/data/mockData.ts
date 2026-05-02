import { Project, Skill, Experience, Education, BlogPost } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A full-stack professional portfolio web application with React frontend and Django REST Framework backend.',
    long_description: 'Built a comprehensive portfolio website using React with Vite for the frontend and Django REST Framework for the backend. Features include a dynamic project showcase, blog section, contact form with database storage, admin dashboard for content management, JWT authentication, and a fully responsive modern dark-themed UI. The entire application follows best practices in both frontend component architecture and backend MVC patterns.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=500&fit=crop',
    technologies: ['React', 'Django', 'Tailwind CSS', 'PostgreSQL', 'TypeScript'],
    live_url: 'https://github.com/wdk2123',
    github_url: 'https://github.com/wdk2123',
    category: 'Web Application',
    featured: true,
    created_at: '2025-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    long_description: 'Developed a task management application that allows teams to create, assign, and track tasks in real-time. Features include drag-and-drop task boards, priority levels, due dates, team collaboration, notifications, and progress tracking. Built with React for the frontend and Django REST Framework for the backend API.',
    image: 'https://images.unsplash.com/photo-1611224923853-84b031e05919?w=800&h=500&fit=crop',
    technologies: ['React', 'Django', 'PostgreSQL', 'WebSocket', 'Tailwind CSS'],
    live_url: 'https://github.com/wdk2123',
    github_url: 'https://github.com/wdk2123',
    category: 'Web Application',
    featured: true,
    created_at: '2024-12-01T10:00:00Z',
  },
];

export const skills: Skill[] = [
  { id: 1, name: 'React', level: 85, category: 'Frontend', icon: '⚛️' },
  { id: 2, name: 'JavaScript', level: 88, category: 'Frontend', icon: '🟨' },
  { id: 3, name: 'HTML / CSS', level: 90, category: 'Frontend', icon: '🎨' },
  { id: 4, name: 'Tailwind CSS', level: 85, category: 'Frontend', icon: '💨' },
  { id: 5, name: 'Python', level: 85, category: 'Backend', icon: '🐍' },
  { id: 6, name: 'Django', level: 80, category: 'Backend', icon: '🌐' },
  { id: 7, name: 'PostgreSQL', level: 75, category: 'Database', icon: '🐘' },
  { id: 8, name: 'Git / GitHub', level: 85, category: 'DevOps', icon: '🔧' },
  { id: 9, name: 'REST APIs', level: 85, category: 'Backend', icon: '🔗' },
  { id: 10, name: 'TypeScript', level: 70, category: 'Frontend', icon: '🔷' },
  { id: 11, name: 'C / C++', level: 70, category: 'Backend', icon: '⚡' },
  { id: 12, name: 'Linux', level: 75, category: 'DevOps', icon: '🐧' },
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Freelance',
    role: 'Web Developer',
    start_date: '2023-01-01',
    end_date: null,
    description: 'Building modern web applications for clients using React, Django, and modern web technologies. Developing responsive websites, web apps, and IT solutions. Continuously learning and improving skills in full-stack development.',
    technologies: ['React', 'Django', 'Python', 'JavaScript', 'Tailwind CSS'],
    current: true,
  },
];

export const education: Education[] = [
  {
    id: 1,
    institution: 'University',
    degree: 'Bachelor of Science',
    field: 'Electrical and Computer Engineering',
    start_date: '2021-09-01',
    end_date: '2026-06-30',
    description: 'Studying Electrical and Computer Engineering with a focus on software development, web technologies, and IT systems. Combining hardware knowledge with modern software engineering practices to build full-stack applications.',
    gpa: '',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable APIs with Django REST Framework',
    slug: 'building-scalable-apis-drf',
    excerpt: 'A comprehensive guide to designing and implementing production-ready REST APIs using Django REST Framework with best practices for performance and security.',
    content: `# Building Scalable APIs with Django REST Framework

Django REST Framework (DRF) is one of the most powerful toolkits for building Web APIs. In this guide, we'll explore best practices for creating scalable, maintainable, and secure APIs.

## 1. Project Structure

A well-organized project structure is crucial for maintainability:

\`\`\`
project/
├── apps/
│   ├── users/
│   ├── products/
│   └── orders/
├── core/
│   ├── permissions.py
│   ├── pagination.py
│   └── exceptions.py
└── config/
    └── settings/
\`\`\`

## 2. Serializer Optimization

Use \`select_related\` and \`prefetch_related\` to avoid N+1 queries:

\`\`\`python
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('tags')
    serializer_class = ProductSerializer
\`\`\`

## 3. Pagination & Filtering

Always implement pagination for list endpoints:

\`\`\`python
class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
\`\`\`

## 4. Caching Strategy

Implement caching at multiple levels - view-level, queryset-level, and template-level.

## 5. Security Best Practices

- Use throttling to prevent abuse
- Implement proper authentication (JWT)
- Validate all input data
- Use HTTPS everywhere
- Implement CORS properly

## Conclusion

Building scalable APIs requires attention to architecture, performance, and security. Follow these practices and your DRF APIs will serve millions of requests reliably.`,
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    author: 'Kidan Dibekulu',
    category: 'Backend',
    tags: ['Django', 'REST API', 'Python', 'Scalability'],
    published_at: '2024-09-15T10:00:00Z',
    read_time: 8,
    featured: true,
  },
  {
    id: 2,
    title: 'React Performance: From Good to Great',
    slug: 'react-performance-optimization',
    excerpt: 'Advanced techniques to optimize your React applications for maximum performance, including code splitting, memoization, and virtual scrolling.',
    content: `# React Performance: From Good to Great

Performance is not just a technical metric — it's a user experience feature. Here's how to make your React apps blazing fast.

## 1. Code Splitting with React.lazy

\`\`\`jsx
const Dashboard = React.lazy(() => import('./Dashboard'));
\`\`\`

## 2. Memoization with useMemo and useCallback

Avoid unnecessary re-renders by memoizing expensive computations and callback functions.

## 3. Virtual Scrolling for Large Lists

Use react-window or react-virtualized for rendering large lists efficiently.

## 4. Bundle Analysis

Regularly analyze your bundle size with webpack-bundle-analyzer or vite-bundle-analyzer.

## 5. Image Optimization

Use modern formats like WebP and implement lazy loading for images below the fold.

## Conclusion

Performance optimization is an ongoing process. Measure, optimize, and repeat.`,
    cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: 'Kidan Dibekulu',
    category: 'Frontend',
    tags: ['React', 'Performance', 'JavaScript', 'Optimization'],
    published_at: '2024-08-20T10:00:00Z',
    read_time: 6,
    featured: true,
  },
  {
    id: 3,
    title: 'Docker & Kubernetes for Frontend Developers',
    slug: 'docker-kubernetes-frontend-devs',
    excerpt: 'A beginner-friendly guide to containerization and orchestration, specifically tailored for frontend developers who want to understand DevOps.',
    content: `# Docker & Kubernetes for Frontend Developers

As frontend developers, understanding deployment and infrastructure makes us more valuable and helps us debug production issues faster.

## Why Should Frontend Devs Care?

- Debug production issues faster
- Understand the full deployment pipeline
- Set up your own projects independently
- Communicate better with DevOps teams

## Docker Basics

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
\`\`\`

## Kubernetes for Beginners

Kubernetes orchestrates your containers, handling scaling, self-healing, and service discovery.

## Conclusion

Learning DevOps concepts makes you a more complete developer and opens up new career opportunities.`,
    cover_image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    author: 'Kidan Dibekulu',
    category: 'DevOps',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Deployment'],
    published_at: '2024-07-10T10:00:00Z',
    read_time: 10,
    featured: false,
  },
  {
    id: 4,
    title: 'The Art of Clean Code: Practical Tips',
    slug: 'art-of-clean-code',
    excerpt: 'Practical tips and principles for writing clean, maintainable code that your future self and teammates will thank you for.',
    content: `# The Art of Clean Code: Practical Tips

Clean code is not just about aesthetics — it's about maintainability, readability, and reducing bugs.

## 1. Meaningful Names

Variables, functions, and classes should reveal their intent.

## 2. Single Responsibility

Each function should do one thing and do it well.

## 3. DRY but Not Too DRY

Don't repeat yourself, but also don't over-abstract.

## 4. Comments Explain Why, Not What

Good code is self-documenting. Use comments to explain decisions.

## 5. Test-Driven Development

Write tests first to ensure your code works and to drive better design.

## Conclusion

Clean code is a habit. Practice it daily and it will become second nature.`,
    cover_image: 'https://images.unsplash.com/photo-1516321318423-f06f79c9615a?w=800&h=400&fit=crop',
    author: 'Kidan Dibekulu',
    category: 'Best Practices',
    tags: ['Clean Code', 'Software Engineering', 'Best Practices'],
    published_at: '2024-06-05T10:00:00Z',
    read_time: 5,
    featured: false,
  },
];

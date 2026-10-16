export const INITIAL_COURSES = [
  {
    id: 'course-101',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Master modern frontend and backend web development using React, Node.js, Express, and modern database architectures.',
    category: 'Software Engineering',
    level: 'Intermediate',
    status: 'Published',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
    learningObjectives: [
      'Build responsive web interfaces with React and Tailwind CSS',
      'Design RESTful APIs with Node.js and Express',
      'Understand database modeling and asynchronous JavaScript',
      'Deploy applications to production cloud environments'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Frontend Fundamentals',
        description: 'Deep dive into HTML5, modern CSS layouts, and modern JavaScript syntax.',
        lessons: [
          {
            id: 'les-1',
            title: 'HTML5 Semantic Structure & Accessibility',
            contentType: 'video',
            duration: '15 mins',
            contentUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            textContent: 'Semantic HTML forms the backbone of web accessibility. Use semantic tags like <header>, <main>, <article>, and <footer> to structure documents.',
            isPreview: true,
            resources: ['HTML5 Cheat Sheet (PDF)', 'W3C Accessibility Guidelines']
          },
          {
            id: 'les-2',
            title: 'Tailwind CSS Essentials & Flexbox Layouts',
            contentType: 'text',
            duration: '20 mins',
            contentUrl: '',
            textContent: 'Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design directly in your markup.',
            isPreview: false,
            resources: ['Tailwind CSS Config Template']
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: React State & Components',
        description: 'Master component architecture, React hooks, and state management.',
        lessons: [
          {
            id: 'les-3',
            title: 'Understanding React Hooks (useState & useEffect)',
            contentType: 'video',
            duration: '25 mins',
            contentUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            textContent: 'Hooks allow functional components to maintain state and handle lifecycle events cleanly.',
            isPreview: true,
            resources: ['React Hooks Reference Guide']
          },
          {
            id: 'les-4',
            title: 'Quiz: Component Lifecycle and State',
            contentType: 'quiz',
            duration: '10 mins',
            contentUrl: '',
            textContent: 'Test your knowledge on state updates, re-renders, and dependency arrays in useEffect.',
            isPreview: false,
            resources: []
          }
        ]
      }
    ],
    updatedAt: '2026-03-15'
  },
  {
    id: 'course-102',
    title: 'Introduction to Artificial Intelligence & Machine Learning',
    description: 'Learn fundamental concepts of AI, neural networks, supervised learning algorithms, and practical Python ML applications.',
    category: 'Data Science & AI',
    level: 'Beginner',
    status: 'Draft',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=60',
    learningObjectives: [
      'Understand foundational linear algebra and calculus concepts for ML',
      'Implement regression and classification models using scikit-learn',
      'Build basic deep neural networks with PyTorch',
      'Evaluate machine learning model metrics and avoid overfitting'
    ],
    modules: [
      {
        id: 'mod-101',
        title: 'Module 1: Machine Learning Foundations',
        description: 'Core principles of supervised vs unsupervised machine learning.',
        lessons: [
          {
            id: 'les-101',
            title: 'What is Machine Learning?',
            contentType: 'video',
            duration: '12 mins',
            contentUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            textContent: 'Overview of supervised, unsupervised, and reinforcement learning paradigms.',
            isPreview: true,
            resources: ['AI & ML Glossary (PDF)']
          }
        ]
      }
    ],
    updatedAt: '2026-03-18'
  }
];

export const CATEGORIES = [
  'Software Engineering',
  'Data Science & AI',
  'Design & UX',
  'Business & Management',
  'Cybersecurity',
  'DevOps & Cloud'
];

export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels'
];

export const CONTENT_TYPES = [
  { id: 'video', label: 'Video Lecture' },
  { id: 'text', label: 'Text / Reading' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'assignment', label: 'Assignment' }
];

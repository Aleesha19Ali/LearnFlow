import type {
  PresetSampleText,
  CourseCompletionStat,
  LearnerProgressRecord,
  QuizScoreDistribution,
  ActivitySummary,
  LessonOutline,
  QuizDraft,
} from './types';

export const PRESET_SAMPLE_TEXTS: PresetSampleText[] = [
  {
    id: 'ai-ml-intro',
    title: 'Introduction to Machine Learning Fundamentals',
    description: 'Overview of supervised vs unsupervised learning, model training, and evaluation metrics.',
    text: `Machine learning (ML) is a branch of artificial intelligence (AI) focused on building applications that learn from data and improve their accuracy over time without being explicitly programmed. In data science, algorithm optimization is key to making predictive analytics useful across various applications.

Supervised learning algorithms build a mathematical model of a set of data that contains both the inputs and the desired outputs. The data is known as training data, and consists of a set of training examples. Common supervised learning algorithms include Linear Regression, Logistic Regression, Decision Trees, and Neural Networks. Evaluation metrics like Precision, Recall, and F1-Score are vital for determining model performance.

Unsupervised learning algorithms take a set of data that contains only inputs, and find structure in the data, like grouping or clustering of data points. Examples include K-Means clustering and Principal Component Analysis (PCA). Reinforcement learning differs by training an agent to make decisions through rewards and penalties in a dynamic environment.`
  },
  {
    id: 'ux-design-principles',
    title: 'Modern UI/UX Design & Usability Standards',
    description: 'Foundational guidelines for visual hierarchy, interaction design, accessibility, and user feedback.',
    text: `User Experience (UX) design focuses on the total experience of a user when interacting with a digital product or website. Key design principles include clarity, consistency, feedback, and user control. Visual hierarchy guides users through content effortlessly using scale, contrast, and layout alignment.

Accessibility (a11y) ensures digital products are usable by people of all abilities. Web Content Accessibility Guidelines (WCAG) outline four main principles: Perceivable, Operable, Understandable, and Robust (POUR). Design systems and component libraries maintain standard visual patterns and interaction behaviors across complex multi-page applications.

User testing and iterative prototyping are critical to validating assumptions. UX designers collect qualitative feedback via usability tests and quantitative data via engagement metrics to refine interface flows before production deployment.`
  },
  {
    id: 'cloud-computing-basics',
    title: 'Cloud Architecture & Infrastructure Services',
    description: 'Key concepts covering IaaS, PaaS, SaaS, serverless computing, and security best practices.',
    text: `Cloud computing delivers computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.

The main service models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Serverless computing allows developers to build and run applications without managing infrastructure, charging only for resources consumed during execution.

Security and compliance are shared responsibilities between the cloud provider and the client. Core concepts include Identity and Access Management (IAM), data encryption at rest and in transit, and continuous disaster recovery planning.`
  }
];

export const INITIAL_LESSON_OUTLINE: LessonOutline = {
  title: 'Introduction to Machine Learning Fundamentals',
  overview: 'Comprehensive guide to core AI & ML concepts, learning models, and evaluation techniques.',
  estimatedHours: 4,
  targetAudience: 'Software Engineers, Data Enthusiasts, Tech Leads',
  prerequisites: ['Basic Python programming', 'Fundamental algebra and statistics'],
  modules: [
    {
      id: 'mod-1',
      title: 'Module 1: Foundations of Machine Learning',
      description: 'Understand the difference between traditional programming and machine learning, plus core terminology.',
      topics: [
        {
          id: 'top-101',
          title: 'What is Machine Learning?',
          durationMinutes: 30,
          summary: 'Defines ML as a subset of AI enabling data-driven automated decision making.',
          keyTakeaways: [
            'Difference between traditional logic-based code and data-trained models',
            'Role of features, training datasets, and predictions'
          ]
        },
        {
          id: 'top-102',
          title: 'Supervised vs Unsupervised Learning',
          durationMinutes: 45,
          summary: 'Explore labeled vs unlabeled data workflows and real-world application examples.',
          keyTakeaways: [
            'Labeled data enables classification and regression models',
            'Unlabeled data powers clustering and dimensionality reduction'
          ]
        }
      ]
    },
    {
      id: 'mod-2',
      title: 'Module 2: Model Evaluation & Practical Metrics',
      description: 'Learn how to benchmark model performance accurately using standard industry metrics.',
      topics: [
        {
          id: 'top-201',
          title: 'Precision, Recall, and F1-Score',
          durationMinutes: 45,
          summary: 'In-depth review of classification metrics beyond simple accuracy.',
          keyTakeaways: [
            'Understanding confusion matrix outputs (TP, FP, TN, FN)',
            'Balancing false positives and false negatives based on domain priority'
          ]
        }
      ]
    }
  ]
};

export const INITIAL_QUIZ_DRAFT: QuizDraft = {
  title: 'Machine Learning Fundamentals Concept Check',
  totalQuestions: 3,
  durationMinutes: 15,
  passingScorePercentage: 80,
  questions: [
    {
      id: 'q-1',
      question: 'Which machine learning paradigm uses labeled training data consisting of inputs and known target outputs?',
      options: [
        'Unsupervised Learning',
        'Supervised Learning',
        'Reinforcement Learning',
        'Clustering'
      ],
      correctAnswerIndex: 1,
      explanation: 'Supervised learning algorithms require labeled datasets containing known inputs and desired output targets to learn mapping functions.',
      difficulty: 'Beginner'
    },
    {
      id: 'q-2',
      question: 'Which technique is commonly used in unsupervised learning to discover hidden groupings in unlabeled datasets?',
      options: [
        'Logistic Regression',
        'Decision Tree Classifier',
        'K-Means Clustering',
        'Linear Regression'
      ],
      correctAnswerIndex: 2,
      explanation: 'K-Means clustering groups unlabeled data points into K clusters based on feature similarity.',
      difficulty: 'Intermediate'
    },
    {
      id: 'q-3',
      question: 'In a medical diagnostic classifier where missing a true illness is critical, which metric should be prioritized?',
      options: [
        'Accuracy',
        'Recall (Sensitivity)',
        'Precision',
        'L1 Regularization'
      ],
      correctAnswerIndex: 1,
      explanation: 'Recall measures the proportion of actual positive cases correctly identified, minimizing dangerous false negatives.',
      difficulty: 'Advanced'
    }
  ]
};

export const SAMPLE_COURSE_COMPLETION_STATS: CourseCompletionStat[] = [
  {
    courseId: 'crs-101',
    courseTitle: 'Introduction to Machine Learning',
    category: 'Data Science & AI',
    enrolledStudents: 142,
    completionRatePercentage: 84.5,
    averageScorePercentage: 88.2,
    activeLearnersCount: 38,
    status: 'Active'
  },
  {
    courseId: 'crs-102',
    courseTitle: 'Modern UI/UX & Design Systems',
    category: 'Design & Frontend',
    enrolledStudents: 98,
    completionRatePercentage: 91.0,
    averageScorePercentage: 92.4,
    activeLearnersCount: 22,
    status: 'Active'
  },
  {
    courseId: 'crs-103',
    courseTitle: 'Cloud Architecture & Microservices',
    category: 'DevOps & Engineering',
    enrolledStudents: 115,
    completionRatePercentage: 76.2,
    averageScorePercentage: 81.5,
    activeLearnersCount: 45,
    status: 'Active'
  },
  {
    courseId: 'crs-104',
    courseTitle: 'Full-Stack React & TypeScript BootCamp',
    category: 'Web Development',
    enrolledStudents: 210,
    completionRatePercentage: 89.8,
    averageScorePercentage: 89.0,
    activeLearnersCount: 64,
    status: 'Active'
  },
  {
    courseId: 'crs-105',
    courseTitle: 'Cybersecurity Principles & Ethical Hacking',
    category: 'Security',
    enrolledStudents: 75,
    completionRatePercentage: 68.0,
    averageScorePercentage: 78.4,
    activeLearnersCount: 19,
    status: 'Draft'
  }
];

export const SAMPLE_LEARNER_PROGRESS_RECORDS: LearnerProgressRecord[] = [
  {
    learnerId: 'lrn-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    courseTitle: 'Introduction to Machine Learning',
    progressPercentage: 92,
    lastActiveDate: '2025-02-18',
    quizScoreAvg: 94,
    completedModules: 11,
    totalModules: 12,
    status: 'On Track'
  },
  {
    learnerId: 'lrn-002',
    name: 'Alex Rivera',
    email: 'a.rivera@example.com',
    courseTitle: 'Modern UI/UX & Design Systems',
    progressPercentage: 100,
    lastActiveDate: '2025-02-17',
    quizScoreAvg: 98,
    completedModules: 8,
    totalModules: 8,
    status: 'Completed'
  },
  {
    learnerId: 'lrn-003',
    name: 'Marcus Johnson',
    email: 'mjohnson@example.com',
    courseTitle: 'Cloud Architecture & Microservices',
    progressPercentage: 45,
    lastActiveDate: '2025-02-10',
    quizScoreAvg: 72,
    completedModules: 4,
    totalModules: 10,
    status: 'Needs Attention'
  },
  {
    learnerId: 'lrn-004',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    courseTitle: 'Full-Stack React & TypeScript BootCamp',
    progressPercentage: 85,
    lastActiveDate: '2025-02-18',
    quizScoreAvg: 91,
    completedModules: 12,
    totalModules: 14,
    status: 'On Track'
  },
  {
    learnerId: 'lrn-005',
    name: 'David Kim',
    email: 'david.kim@example.com',
    courseTitle: 'Introduction to Machine Learning',
    progressPercentage: 60,
    lastActiveDate: '2025-02-15',
    quizScoreAvg: 83,
    completedModules: 7,
    totalModules: 12,
    status: 'On Track'
  },
  {
    learnerId: 'lrn-006',
    name: 'Jessica Taylor',
    email: 'j.taylor@example.com',
    courseTitle: 'Cybersecurity Principles & Ethical Hacking',
    progressPercentage: 30,
    lastActiveDate: '2025-02-08',
    quizScoreAvg: 68,
    completedModules: 3,
    totalModules: 10,
    status: 'Needs Attention'
  }
];

export const SAMPLE_QUIZ_SCORE_DISTRIBUTION: QuizScoreDistribution[] = [
  { range: '90 - 100%', count: 185, percentage: 42 },
  { range: '80 - 89%', count: 140, percentage: 32 },
  { range: '70 - 79%', count: 70, percentage: 16 },
  { range: '60 - 69%', count: 30, percentage: 7 },
  { range: 'Below 60%', count: 15, percentage: 3 }
];

export const SAMPLE_RECENT_ACTIVITIES: ActivitySummary[] = [
  {
    id: 'act-101',
    learnerName: 'Sarah Chen',
    action: 'Completed Quiz: Supervised Learning Methods',
    courseTitle: 'Introduction to Machine Learning',
    timestamp: '10 minutes ago',
    score: 96
  },
  {
    id: 'act-102',
    learnerName: 'Elena Rostova',
    action: 'Submitted Assignment: Custom React Hook Design',
    courseTitle: 'Full-Stack React & TypeScript BootCamp',
    timestamp: '35 minutes ago',
    score: 90
  },
  {
    id: 'act-103',
    learnerName: 'Alex Rivera',
    action: 'Finished Course Certification Requirements',
    courseTitle: 'Modern UI/UX & Design Systems',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-104',
    learnerName: 'David Kim',
    action: 'Completed Module 6: Neural Network Basics',
    courseTitle: 'Introduction to Machine Learning',
    timestamp: '4 hours ago'
  },
  {
    id: 'act-105',
    learnerName: 'Marcus Johnson',
    action: 'Retook Quiz: Kubernetes Container Deployment',
    courseTitle: 'Cloud Architecture & Microservices',
    timestamp: '1 day ago',
    score: 84
  }
];

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  }
}

export type UserRole = 'Student' | 'Mentor';
export type Language = 'French' | 'Arabic' | 'Tamazight';
export type Skill = {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  verified: boolean;
};

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: UserRole;
  skills: Skill[];
  location: string;
  studyLevel?: string;
  bio?: string;
  knowledgePoints: number;
  preferredLanguage: Language;
  createdAt: Date;
}

// Virtual Classrooms
export interface Classroom {
  id: string;
  name: string;
  description: string;
  subject: string;
  teacherId: string;
  students: string[];
  assignments: Assignment[];
  resources: Resource[];
  createdAt: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  classroomId: string;
  resourceLinks: string[];
  submissions: Submission[];
}

export interface Submission {
  id: string;
  studentId: string;
  assignmentId: string;
  content: string;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
}

// Study Groups & Collaboration
export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  members: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  language: Language;
  location?: string;
  meetingLinks?: string[];
  resources: Resource[];
}

// Resource Library
export type ResourceType = 'Textbook' | 'Exam' | 'Video' | 'Note' | 'Article' | 'Exercise';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  subject: string;
  language: Language;
  url: string;
  createdBy: string;
  downloadable: boolean;
  tags: string[];
  createdAt: Date;
}

// Workspace
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  userId: string;
}

// Expert Access
export interface ExpertSession {
  id: string;
  expertId: string;
  studentId: string;
  subject: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  rating?: number;
  feedback?: string;
}

// Progress Tracking
export interface Assessment {
  id: string;
  title: string;
  subject: string;
  userId: string;
  score: number;
  maxScore: number;
  completedAt: Date;
}

// Community Hub
export interface ForumThread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  topic: string;
  upvotes: number;
  downvotes: number;
  replies: ForumReply[];
  createdAt: Date;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  threadId: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

// AI-Powered Tools
export interface GeneratedExercise {
  id: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  content: string;
  solution?: string;
  language: Language;
}

export interface VideoSummary {
  id: string;
  videoUrl: string;
  title: string;
  duration: number; // in seconds
  keyPoints: string[];
  timestamps: Record<string, number>; // key point -> timestamp in seconds
  language: Language;
}
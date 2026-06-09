import React from 'react';

export interface ProjectDetails {
  headline: string;
  sections: {
    icon: string;
    title: string;
    content: string;
  }[];
  cta?: {
    label: string;
    url: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  demoUrl?: string;
  details?: ProjectDetails;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum SectionId {
  HERO = 'home',
  ABOUT = 'about',
  SKILLS = 'skills', // Mantido o ID 'skills' para preservar a navegação existente
  PROJECTS = 'projects',
  FAQ = 'faq',
  CONTACT = 'contact',
}
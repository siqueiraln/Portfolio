import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  demoUrl?: string;
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
  CONTACT = 'contact',
}
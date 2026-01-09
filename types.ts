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

export interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 1-100
  category: 'No-Code' | 'AI & Automation' | 'Design';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum SectionId {
  HERO = 'home',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CONTACT = 'contact',
}
import React from 'react';
import { Layers, Zap, Database, Bot, Layout, Smartphone } from 'lucide-react';
import { Project, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Jhonatan Lopes",
  role: "Desenvolvedor No-Code & Especialista em Automação IA",
  bio: "Desenvolvimento de MVPs, SaaS, automações e integrações focadas em eficiência, redução de custos e crescimento sustentável.",
  email: "contato@jhonatanlopes.pro",
  socials: {
    linkedin: "#",
    instagram: "#",
    github: "#",
    whatsapp: "https://wa.me/5511999999999" // Substitua pelo seu link do WhatsApp
  }
};

export const SKILLS: Skill[] = [
  { name: 'Bubble.io', icon: <Layers className="w-5 h-5" />, level: 85, category: 'No-Code' },
  { name: 'FlutterFlow', icon: <Smartphone className="w-5 h-5" />, level: 70, category: 'No-Code' },
  { name: 'Make (Integromat)', icon: <Zap className="w-5 h-5" />, level: 90, category: 'AI & Automation' },
  { name: 'n8n', icon: <Zap className="w-5 h-5" />, level: 80, category: 'AI & Automation' },
  { name: 'OpenAI/Gemini API', icon: <Bot className="w-5 h-5" />, level: 85, category: 'AI & Automation' },
  { name: 'Supabase', icon: <Database className="w-5 h-5" />, level: 75, category: 'No-Code' },
  { name: 'UI/UX Design', icon: <Layout className="w-5 h-5" />, level: 65, category: 'Design' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SaaS de Gestão de Leads',
    category: 'Web App',
    description: 'Um CRM completo construído no Bubble.io com automações via Make para enriquecimento de dados usando IA.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    techStack: ['Bubble', 'Make', 'OpenAI'],
    demoUrl: '#'
  },
  {
    id: '2',
    title: 'Marketplace de Serviços',
    category: 'Mobile App',
    description: 'Aplicativo estilo Uber para serviços locais. Desenvolvido em FlutterFlow com backend em Supabase.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    techStack: ['FlutterFlow', 'Supabase', 'Stripe'],
    demoUrl: '#'
  },
  {
    id: '3',
    title: 'Chatbot de Atendimento IA',
    category: 'Automation',
    description: 'Agente de IA treinado com base de conhecimento da empresa, capaz de agendar reuniões e tirar dúvidas.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    techStack: ['n8n', 'Gemini API', 'WhatsApp API'],
    demoUrl: '#'
  }
];
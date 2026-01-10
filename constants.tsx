import React from 'react';
import { Zap, Rocket, Link } from 'lucide-react';
import { Project, Solution } from './types';

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

export const SOLUTIONS: Solution[] = [
  {
    id: 'automation',
    title: 'Automação de Processos',
    description: 'Elimine tarefas repetitivas. Conecte sistemas, dispare ações automáticas e libere sua equipe para o que realmente importa.',
    icon: <Zap className="w-8 h-8 text-yellow-400" />
  },
  {
    id: 'mvp',
    title: 'MVP e SaaS Rápido',
    description: 'Valide sua ideia em semanas, não meses. Lance seu produto digital com velocidade e qualidade profissional.',
    icon: <Rocket className="w-8 h-8 text-blue-400" />
  },
  {
    id: 'integrations',
    title: 'Integrações Inteligentes',
    description: 'WhatsApp, CRMs, pagamentos, APIs. Faça seus sistemas conversarem e trabalharem juntos sem fricção.',
    icon: <Link className="w-8 h-8 text-white" />
  }
];

export const ABOUT_TEXT = [
  "Atuo com foco total na entrega de valor e resultados tangíveis para o negócio. Minha abordagem estratégica visa identificar gargalos operacionais e transformá-los em vantagens competitivas, garantindo que cada solução desenvolvida tenha um impacto direto na eficiência e na receita da sua empresa.",
  "Especialista em tecnologias No-Code e automação com Inteligência Artificial, reduzo drasticamente o tempo de desenvolvimento tradicional. Isso permite validar hipóteses, lançar MVPs e escalar produtos digitais com uma velocidade incomparável, mantendo a robustez e a segurança necessárias para operações críticas.",
  "Combinando agilidade técnica com uma visão de alta performance, entrego softwares e automações que não apenas funcionam, mas que impulsionam o crescimento. Meu compromisso é com a excelência na execução e a criação de ecossistemas digitais sustentáveis e escaláveis."
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Agendamento Online',
    category: 'Bubble App',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    techStack: ['Bubble', 'SaaS'],
    demoUrl: 'https://aplicativoagendamento.bubbleapps.io/version-test/agendamento'
  },
  {
    id: '2',
    title: 'Marketplace de Serviços',
    category: 'Bubble App',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    techStack: ['Bubble', 'Marketplace'],
    demoUrl: 'https://marketplace---aula-91638.bubbleapps.io/version-test'
  },
  {
    id: '3',
    title: 'SVG to JSON Converter',
    category: 'Tool',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://picsum.photos/800/600?random=12',
    techStack: ['Lovable', 'React'],
    demoUrl: 'https://svgtojson.lovable.app'
  },
  {
    id: '4',
    title: 'InfoEduc',
    category: 'EdTech',
    description: 'Atuação profissional na InfoEduc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://picsum.photos/800/600?random=13',
    techStack: ['Plataforma Web', 'Educação'],
    demoUrl: 'https://infoeduc.com.br/'
  }
];
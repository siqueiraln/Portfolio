import React from 'react';
import { Zap, Rocket, Link } from 'lucide-react';
import { Project, Solution } from './types';

export const PERSONAL_INFO = {
  name: "Lucas Siqueira",
  role: "Desenvolvedor No-Code & Especialista em Automação IA",
  bio: "Desenvolvedor No-Code focado em performance e escalabilidade. Mantenho uma rotina de estudos constantes para entregar soluções que resolvem problemas reais, sem 'gambiarras'. Busco integrar um time onde possa somar com minha técnica, aprender com novos desafios e contribuir para o crescimento sólido do negócio.",
  email: "lucas.sikeira78@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/lucas-siqueira-1a5bb51b2/",
    instagram: "https://www.instagram.com/siqueiraln/",
    github: "https://github.com/siqueiraln",
    whatsapp: "https://wa.me/5579998974970",
    facebook: "https://www.facebook.com/lsikeira?locale=pt_BR"
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
  "Embora eu tenha uma preferência clara pelo Bubble, consigo desenvolver com autonomia na maioria das plataformas No-Code e Vibe Coding. Encaro a IA como um amplificador que me confere verdadeiros superpoderes: com ela, sinto que não há barreira técnica que me impeça de construir qualquer coisa que a criatividade mandar. Para mim, a ferramenta é um meio, e a capacidade de entrega é o que define o jogo.",
  "Minha trajetória profissional é diversificada, e considero isso minha maior força. Antes de me tornar desenvolvedor, atuei como técnico em informática, técnico em agronegócio e fui técnico e analista de times profissionais de esports, com experiência internacional. Essa vivência multidisciplinar me ensinou a ter adaptabilidade, visão estratégica e foco em resultados sob pressão.",
  "Hoje, já inserido no mercado de tecnologia, mantenho a mentalidade de constante evolução. Não me limito apenas ao universo No-Code; sigo estudando novas arquiteturas e me aprofundando em High-Code, como JavaScript e Python. Meu objetivo é ter um arsenal completo para resolver problemas complexos da forma mais eficiente possível."
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
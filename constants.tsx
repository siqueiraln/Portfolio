import React from 'react';
import { Zap, Rocket, Link } from 'lucide-react';
import { Project, Solution } from './types';

export const PERSONAL_INFO = {
  name: "Lucas Siqueira",
  role: "Desenvolvedor No-Code & Especialista em Automação com n8n e IA",
  bio: "Desenvolvedor No-Code especialista em Bubble e automação com n8n. Construo soluções digitais que eliminam processos manuais, integram sistemas e escalam negócios — sem gambiarras. Atendo presencial em Simão Dias/SE e remoto em todo o Brasil.",
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
    title: 'Automação com n8n e IA',
    description: 'Elimine tarefas repetitivas com automações no n8n, Make e IA. Conecte sistemas, dispare ações automáticas e libere sua equipe para o que realmente importa.',
    icon: <Zap className="w-7 h-7 text-white" />
  },
  {
    id: 'mvp',
    title: 'MVP e SaaS no Bubble',
    description: 'Valide sua ideia em semanas com Bubble. Lance seu produto digital com velocidade, qualidade profissional e sem precisar de uma equipe de devs.',
    icon: <Rocket className="w-7 h-7 text-white" />
  },
  {
    id: 'integrations',
    title: 'Integrações Inteligentes',
    description: 'WhatsApp API, CRMs, gateways de pagamento e APIs externas. Faço seus sistemas conversarem com n8n e entregarem resultados automaticamente.',
    icon: <Link className="w-7 h-7 text-white" />
  }
];

export const ABOUT_TEXT = [
  "Sou desenvolvedor No-Code especialista em Bubble e automação com n8n, baseado em Simão Dias/SE e disponível para projetos remotos em todo o Brasil. Utilizo IA como amplificador do meu trabalho — com ela, não existe barreira técnica que me impeça de entregar qualquer solução que o negócio exija. Para mim, a ferramenta é o meio. O resultado é o que define o jogo.",
  "Antes de entrar para o desenvolvimento, atuei como técnico em informática, técnico em agronegócio e analista de times profissionais de esports com experiência internacional. Essa trajetória multidisciplinar me deu algo raro: adaptabilidade real, visão estratégica e capacidade de entregar sob pressão — habilidades que levo direto para cada projeto.",
  "Hoje atuo no mercado de tecnologia com foco em automações com n8n, desenvolvimento de aplicações no Bubble, integrações com WhatsApp API, CRMs e gateways de pagamento. Estou sempre evoluindo: estudo arquiteturas No-Code e High-Code, como JavaScript e Python, para ter um arsenal completo na hora de resolver problemas complexos."
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'NOX',
    category: 'SaaS',
    description: 'Plataforma de agendamento online para barbearias e profissionais de serviço. Resolve o caos de agenda por WhatsApp: o profissional compartilha um link único e o cliente agenda em 3 cliques, sem baixar app nem criar conta.',
    imageUrl: '/nox.jpeg',
    techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'SaaS', 'Agendamento'],
    demoUrl: 'https://noxapp.vercel.app'
  },
  {
    id: '2',
    title: 'AdMetrics',
    category: 'MarTech',
    description: 'Ferramenta para analistas de tráfego calcularem CPM, CPC, CPA, CTR e ROAS automaticamente. Compara campanhas com benchmarks de Meta, Google e TikTok e gera diagnósticos via IA — sem planilhas.',
    imageUrl: '/admetrics.png',
    techStack: ['React', 'Vite', 'Recharts', 'Groq AI', 'Tailwind CSS', 'JavaScript'],
    demoUrl: 'https://admetrics-phi.vercel.app'
  },
  {
    id: '4',
    title: 'InfoEduc',
    category: 'EdTech',
    description: 'Atuo diretamente no desenvolvimento da plataforma, construindo integrações sólidas, criando novas funcionalidades e otimizando fluxos antigos para deixar o sistema mais performático e escalável.',
    imageUrl: '/infoeduc.png',
    techStack: ['Plataforma Web', 'Educação'],
    demoUrl: 'https://infoeduc.com.br/'
  }
];
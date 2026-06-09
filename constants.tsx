import React from 'react';
import { Zap, Globe, Wrench, Cpu, LayoutGrid } from 'lucide-react';
import { Project, Solution } from './types';

export const PERSONAL_INFO = {
  name: "Lucas Siqueira",
  role: "Parceiro de Tecnologia para Empresas em Simão Dias, SE",
  bio: "Parceiro de tecnologia completo para empresas em Simão Dias/SE e região. Resolvo tudo que é tecnologia do seu negócio: sites, automações com n8n e IA, manutenção de computadores, consultoria de hardware e serviços online. Atendimento presencial e remoto em todo o Brasil.",
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
    id: 'web',
    title: 'Desenvolvimento Web',
    description: 'Sites, landing pages, sistemas e MVPs para sua empresa. Do projeto simples ao sistema completo — entrego com qualidade profissional e sem enrolação.',
    icon: <Globe className="w-7 h-7 text-white" />
  },
  {
    id: 'automation',
    title: 'Automação com n8n e IA',
    description: 'Elimine tarefas repetitivas. Conecto sistemas, automatizo fluxos de WhatsApp, e-mail, CRM e muito mais — sua equipe livre para o que realmente importa.',
    icon: <Zap className="w-7 h-7 text-white" />
  },
  {
    id: 'saas-consulting',
    title: 'Consultoria de Serviços Online',
    description: 'Não sabe quais ferramentas e assinaturas valem para sua empresa? Analiso seu negócio e indico o que realmente faz sentido — sem pagar por o que não usa.',
    icon: <LayoutGrid className="w-7 h-7 text-white" />
  },
  {
    id: 'hardware',
    title: 'Consultoria de Hardware',
    description: 'Precisa de computador, impressora ou equipamento para a empresa? Indico o ideal para seu orçamento e busco os melhores preços nos maiores marketplaces do Brasil.',
    icon: <Cpu className="w-7 h-7 text-white" />
  },
  {
    id: 'maintenance',
    title: 'Manutenção de Computadores',
    description: 'Formatação, limpeza, troca de peças, aumento de memória e suporte técnico. Computador lento ou com problema? Resolvo presencialmente em Simão Dias e região.',
    icon: <Wrench className="w-7 h-7 text-white" />
  },
];

export const ABOUT_TEXT = [
  "Sou o parceiro de tecnologia para empresas que não têm — e não precisam ter — um setor de TI interno. Baseado em Simão Dias/SE, atendo presencialmente na região e remotamente em todo o Brasil. Resolvo tudo que é tecnologia do seu negócio: do site ao computador, da automação à escolha do software certo. Uma pessoa, solução completa.",
  "Minha trajetória é multidisciplinar por escolha. Atuei como técnico em informática, técnico em agronegócio e analista de times profissionais de esports com experiência internacional. Essa base me deu algo raro: capacidade de entender o negócio antes de propor solução tecnológica — não vendo ferramenta, entrego resultado.",
  "Hoje trabalho com desenvolvimento web, automações com n8n e IA, manutenção de computadores, consultoria de hardware e orientação na escolha de serviços online. Uso IA como amplificador: com ela, não existe barreira técnica que me impeça de entregar qualquer solução que seu negócio exija. A tecnologia é o meio. O crescimento da sua empresa é o objetivo."
];

export const PROJECTS: Project[] = [
  {
    id: '5',
    title: 'Afiliados ML + Shopee',
    category: 'Automação',
    description: 'Sistema n8n que captura ofertas do Mercado Livre e Shopee, gera links de afiliado e publica automaticamente no Telegram e WhatsApp — com copy gerada por IA a cada execução.',
    imageUrl: '/afiliados.webp',
    techStack: ['n8n', 'Docker', 'Supabase', 'Redis', 'Evolution API', 'Groq AI'],
    details: {
      headline: 'Automação completa que captura ofertas do Mercado Livre e Shopee e publica no Telegram e WhatsApp com copy gerada por IA — enquanto você dorme.',
      sections: [
        {
          icon: '🐳',
          title: 'Stack Docker pronta em 1 comando',
          content: 'n8n, Redis, Evolution API e Postgres sobem juntos com docker compose up -d. Sem instalar dependências na mão, sem configurar servidor do zero. Em menos de 10 minutos você tem toda a infraestrutura rodando na sua VPS.'
        },
        {
          icon: '🕷️',
          title: 'Scraping cirúrgico do Mercado Livre',
          content: 'O sistema acessa o ML Afiliados autenticado via cookie de sessão real e varre as melhores ofertas do dia automaticamente. Um workflow dedicado renova o cookie de forma autônoma — depois do setup inicial, zero intervenção manual.'
        },
        {
          icon: '📱',
          title: 'WhatsApp real via Evolution API',
          content: 'Conecta um número dedicado ao grupo via QR Code. Sem custo por mensagem, sem API oficial cara. As ofertas chegam com formatação nativa, como se um humano tivesse enviado — porque a Evolution roda em container próprio dentro da sua stack.'
        },
        {
          icon: '🤖',
          title: 'IA que escreve o hook de cada oferta',
          content: 'Nenhuma mensagem sai genérica. Groq (Llama 3.3 70B) e Google Gemini processam cada oferta e geram título de impacto, preço formatado, CTA e link de afiliado — copy diferente a cada execução, calibrada pra converter.'
        },
        {
          icon: '💰',
          title: 'Quer essa automação trabalhando pra você?',
          content: 'O pacote completo está à venda — workflows prontos, Docker Compose, schema SQL e documentação detalhada. Entra no canal ou no grupo pra ver as ofertas chegando em tempo real, ou fala comigo pra montar na sua infraestrutura.'
        }
      ],
      cta: [
        { label: 'Canal no Telegram', url: 'https://t.me/primodaspromo' },
        { label: 'Grupo no WhatsApp', url: 'https://chat.whatsapp.com/LUSqY1Fap8PFQZyw3n3SKa?mode=gi_t' }
      ]
    }
  },
  {
    id: '1',
    title: 'NOX',
    category: 'SaaS',
    description: 'Plataforma de agendamento online para barbearias e profissionais de serviço. Resolve o caos de agenda por WhatsApp: o profissional compartilha um link único e o cliente agenda em 3 cliques, sem baixar app nem criar conta.',
    imageUrl: '/nox.webp',
    techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'SaaS', 'Agendamento'],
    demoUrl: 'https://noxapp.vercel.app/barbearia-exemplar'
  },
  {
    id: '3',
    title: 'Aura Extension',
    category: 'Chrome Extension',
    description: 'Extensão Chrome com Side Panel para atendimento inteligente a estudantes e colaboradores. Base de conhecimento no Pinecone com n8n como intermediador de IA e autenticação via Xano. Responde dúvidas em tempo real sem sair do navegador.',
    imageUrl: '/aura.webp',
    techStack: ['TypeScript', 'Vite', 'Chrome Extension', 'n8n', 'Xano', 'Pinecone'],
    details: {
      headline: 'Assistente de atendimento inteligente no Side Panel do Chrome — responde dúvidas de estudantes e colaboradores em tempo real, sem sair do navegador.',
      sections: [
        {
          icon: '🧩',
          title: 'Side Panel nativo do Chrome',
          content: 'A Aura roda diretamente no painel lateral do Chrome, sem abrir novas abas, sem popup, sem atrapalhar o fluxo. O usuário continua navegando enquanto tira dúvidas — a experiência é fluida e integrada ao navegador.'
        },
        {
          icon: '🔐',
          title: 'Autenticação com trava de falhas via Xano',
          content: 'O login é gerenciado pelo Xano como backend cloud. Tentativas mal-sucedidas são contadas e o acesso é bloqueado automaticamente na 5ª falha — sem precisar de servidor próprio, sem gambiarras.'
        },
        {
          icon: '🧠',
          title: 'Base de conhecimento no Pinecone',
          content: 'Todo o conteúdo de suporte fica indexado no Pinecone como embeddings vetoriais. Quando alguém pergunta, o n8n faz a busca semântica na base, encontra a resposta mais relevante e devolve via IA — sem depender de correspondência exata de palavras.'
        },
        {
          icon: '⚡',
          title: 'n8n como motor de IA',
          content: 'O n8n recebe a pergunta, consulta o Pinecone, monta o contexto e dispara o modelo de linguagem. Toda a lógica de orquestração fica no workflow — fácil de atualizar, fácil de escalar, sem tocar no código da extensão.'
        },
        {
          icon: '🏗️',
          title: 'Arquitetura TypeScript modular',
          content: 'Construída com TypeScript em OOP puro, compilada pelo Vite. Cada interface — Chat, Login, Feedback — é uma classe isolada. Sem React, sem peso desnecessário: apenas DOM manipulado com precisão cirúrgica.'
        }
      ]
    }
  },
  {
    id: '2',
    title: 'AdMetrics',
    category: 'MarTech',
    description: 'Ferramenta para analistas de tráfego calcularem CPM, CPC, CPA, CTR e ROAS automaticamente. Compara campanhas com benchmarks de Meta, Google e TikTok e gera diagnósticos via IA — sem planilhas.',
    imageUrl: '/admetrics.webp',
    techStack: ['React', 'Vite', 'Recharts', 'Groq AI', 'Tailwind CSS', 'JavaScript'],
    demoUrl: 'https://admetrics-phi.vercel.app'
  },
  {
    id: '4',
    title: 'InfoEduc',
    category: 'EdTech',
    description: 'Atuo diretamente no desenvolvimento da plataforma, construindo integrações sólidas, criando novas funcionalidades e otimizando fluxos antigos para deixar o sistema mais performático e escalável.',
    imageUrl: '/infoeduc.webp',
    techStack: ['Plataforma Web', 'Educação'],
    demoUrl: 'https://infoeduc.com.br/'
  }
];
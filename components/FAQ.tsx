import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionId } from '../types';

const faqs = [
  {
    q: 'O que é um parceiro de tecnologia para empresas?',
    a: 'Um parceiro de tecnologia é um profissional que resolve tudo que é tecnologia do seu negócio sem você precisar contratar um setor de TI interno. Isso inclui criar sites e sistemas, automatizar processos repetitivos, dar suporte técnico, orientar na compra de equipamentos e indicar quais ferramentas e assinaturas realmente valem para sua empresa.',
  },
  {
    q: 'Quais serviços de tecnologia você oferece para empresas?',
    a: 'Ofereço cinco serviços: (1) Desenvolvimento web — sites, landing pages e sistemas; (2) Automação de processos com n8n e IA — elimina tarefas manuais e integra sistemas; (3) Consultoria de serviços online — orientação sobre quais ferramentas e assinaturas SaaS fazem sentido para seu negócio; (4) Consultoria de hardware — indicação de equipamentos e busca de melhores preços nos maiores marketplaces; (5) Manutenção de computadores — formatação, limpeza, upgrades e suporte técnico.',
  },
  {
    q: 'Você atende presencialmente em Simão Dias, SE?',
    a: 'Sim. Faço atendimento presencial em Simão Dias e região — ideal para manutenção de computadores, instalação de equipamentos e reuniões de briefing para projetos web ou de automação. Para projetos que não exigem presença física, atendo remotamente em todo o Brasil.',
  },
  {
    q: 'Quanto custa criar um site para minha empresa?',
    a: 'O valor depende do escopo: uma landing page simples custa menos do que um sistema completo de agendamento ou e-commerce. Para dar um orçamento preciso, preciso entender o que você precisa — qual o objetivo do site, se precisa de formulários, área de membros, integração com WhatsApp etc. Entre em contato pelo WhatsApp e me conta o projeto; respondo com prazo e valor no mesmo dia.',
  },
  {
    q: 'Como a automação de processos pode ajudar minha empresa?',
    a: 'Automação elimina tarefas repetitivas que consomem tempo da sua equipe. Exemplos práticos: envio automático de confirmações e cobranças por WhatsApp, sincronização de pedidos entre sistemas, geração de relatórios sem intervenção manual, respostas automáticas a clientes fora do horário, e publicação de conteúdo em redes sociais. Uso n8n e inteligência artificial para montar esses fluxos — você configura uma vez e a máquina trabalha enquanto você cuida do negócio.',
  },
  {
    q: 'Você faz manutenção de computadores em Simão Dias?',
    a: 'Sim. Faço formatação, limpeza de vírus, troca de pasta térmica, upgrade de memória RAM e SSD, recuperação de dados e diagnóstico geral de hardware e software. Atendo em Simão Dias e municípios da região. Para empresas com mais de um computador, também ofereço suporte técnico recorrente.',
  },
  {
    q: 'Como funciona a consultoria de hardware?',
    a: 'Você me conta o que precisa — computador, impressora, roteador, câmera de segurança, ou qualquer outro equipamento — e qual é o seu orçamento. Eu analiso as opções disponíveis, indico o modelo com melhor custo-benefício para o seu uso específico e faço a busca de preço nos maiores marketplaces do Brasil (Mercado Livre, Amazon, Magalu, etc.) para garantir que você pague menos. Evita compra errada e dinheiro desperdiçado.',
  },
  {
    q: 'O que é consultoria de serviços online e como pode me ajudar?',
    a: 'Muitas empresas pagam por ferramentas que não usam corretamente ou contratam vários sistemas que fazem a mesma coisa. A consultoria de serviços online analisa o que você já usa, o que realmente precisa e recomenda as melhores opções — seja para gestão, comunicação, vendas, finanças ou marketing. O objetivo é reduzir custos com assinaturas desnecessárias e garantir que cada ferramenta trabalhe a favor do seu negócio.',
  },
  {
    q: 'Qual o prazo para entregar um site ou sistema?',
    a: 'Uma landing page simples fica pronta em 3 a 5 dias úteis. Um site institucional completo leva entre 1 e 2 semanas. Sistemas mais complexos — como plataformas de agendamento, áreas de membros ou integrações com múltiplos serviços — têm prazo definido no briefing, geralmente entre 2 e 6 semanas. Sempre trabalho com entregas parciais para você acompanhar o progresso.',
  },
  {
    q: 'Como entro em contato para solicitar um serviço?',
    a: 'A forma mais rápida é pelo WhatsApp — clique no botão "Falar no WhatsApp" no topo da página. Me conta o que você precisa, eu respondo no mesmo dia com prazo e valor. Também pode enviar e-mail ou mensagem pelo formulário de contato abaixo.',
  },
];

// Nota: o JSON-LD do FAQPage agora vive estaticamente no <head> de index.html,
// garantindo que crawlers e motores de IA sem execução de JS o enxerguem.
// Ao editar as perguntas/respostas acima, atualize também o bloco em index.html.

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section id={SectionId.FAQ} className="py-24 bg-bg relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-left mb-14 reveal from-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Perguntas frequentes</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight leading-tight">
            Dúvidas comuns<br />
            <span className="text-accent">respondidas.</span>
          </h2>
          <p className="text-muted text-base mt-4 max-w-2xl">
            Se a sua dúvida não estiver aqui, manda mensagem no WhatsApp — respondo no mesmo dia.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 max-w-4xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`reveal delay-${Math.min((i % 5 + 1) * 100, 500)} relative rounded-xl bg-card border transition-all duration-300 ${
                  isOpen ? 'border-line-strong shadow-card' : 'border-line'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-all duration-300 ${isOpen ? 'text-accent rotate-180' : 'text-subtle group-hover:text-accent'}`}
                  />
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? '400px' : '0px' }}
                >
                  <p className="px-6 pb-6 text-muted text-sm leading-relaxed border-t border-line pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;

import React from 'react';
import { SOLUTIONS } from '../constants';
import { SectionId } from '../types';

const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-24 bg-surface relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/[0.07] rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-left mb-16 reveal from-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Serviços</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight leading-tight">
            Tudo de tecnologia<br />
            <span className="text-accent">que sua empresa precisa.</span>
          </h2>
          <p className="text-muted text-base mt-4 max-w-2xl">
            Do site ao suporte técnico — atendimento completo, presencial em Simão Dias/SE e remoto em todo o Brasil.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((solution, index) => (
            <div
              key={solution.id}
              className={`reveal delay-${(index + 1) * 100} group relative rounded-2xl p-8 flex flex-col bg-card border border-line shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover`}
            >
              {/* Icon tile */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-6 bg-accent">
                {solution.icon}
              </div>

              {/* Number */}
              <span className="text-xs font-bold text-subtle mb-3 tracking-widest">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="font-display text-lg text-ink mb-3 uppercase tracking-wide leading-tight group-hover:text-accent transition-colors">
                {solution.title}
              </h3>

              <p className="text-muted text-sm leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

import React from 'react';
import { SOLUTIONS } from '../constants';
import { SectionId } from '../types';

const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-24 bg-[#0d1535] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-800/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-brand-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-400">// O que eu resolvo</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
            Não vendo código.<br />
            <span className="text-brand-400">Entrego soluções.</span>
          </h2>
          <p className="text-slate-400 text-base mt-4 max-w-2xl">
            Soluções estratégicas que economizam tempo e geram receita.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SOLUTIONS.map((solution, index) => (
            <div
              key={solution.id}
              className="group relative clip-notch p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#070f2b',
                border: '1px solid rgba(83,92,145,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 0 rgba(146,144,195,0)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(146,144,195,0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(146,144,195,0.35)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(83,92,145,0.2)';
              }}
            >
              {/* Icon container — bordered square like na inspiração */}
              <div
                className="w-14 h-14 flex items-center justify-center rounded-xl mb-6"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {solution.icon}
              </div>

              {/* Number badge */}
              <div className="clip-badge inline-flex items-center justify-center w-8 h-6 bg-brand-800 text-brand-300 text-[10px] font-black mb-4 self-start">
                {String(index + 1).padStart(2, '0')}
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-3 uppercase tracking-wide leading-tight group-hover:text-brand-300 transition-colors">
                {solution.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {solution.description}
              </p>

              {/* Corner accent */}
              <div
                className="absolute bottom-0 right-0 w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: '#9290c3', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

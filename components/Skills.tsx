import React from 'react';
import { SOLUTIONS } from '../constants';
import { SectionId } from '../types';

const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-24 bg-slate-950 relative overflow-hidden">
       {/* Decorative subtle background element */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-900/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <span className="text-brand-500 mr-2">/</span>
            O QUE EU RESOLVO
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Não vendo apenas código ou telas. Entrego soluções estratégicas que economizam tempo e geram receita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution) => (
            <div 
              key={solution.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-brand-500/50 hover:bg-slate-900/80 transition-all duration-300 group hover:-translate-y-2 flex flex-col items-start"
            >
              <div className="mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors shadow-lg">
                {solution.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors">
                {solution.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed text-base">
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
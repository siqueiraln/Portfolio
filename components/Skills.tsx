import React from 'react';
import { SKILLS } from '../constants';
import { SectionId } from '../types';

const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ferramentas & Habilidades</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Utilizo as melhores ferramentas do mercado para criar soluções escaláveis, integradas e modernas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-brand-500/50 hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-500/10 rounded-lg text-brand-400 group-hover:text-brand-300 transition-colors">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-lg text-white">{skill.name}</h3>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-brand-600 to-indigo-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>{skill.category}</span>
                <span>{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
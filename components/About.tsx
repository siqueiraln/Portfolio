import React from 'react';
import { SectionId } from '../types';
import { ABOUT_TEXT } from '../constants';

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
            <span className="text-brand-500 mr-2">/</span>
            Sobre Mim
          </h2>
        </div>

        {/* Content Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 hover:border-brand-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 shadow-2xl relative overflow-hidden group">
            {/* Subtle glow effect on hover inside the card */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-600/5 rounded-full blur-[80px] -z-10 group-hover:bg-brand-600/10 transition-colors duration-500"></div>

            <div className="space-y-6">
                {ABOUT_TEXT.map((paragraph, index) => (
                    <p key={index} className="text-lg text-slate-300 leading-relaxed text-justify md:text-left">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;
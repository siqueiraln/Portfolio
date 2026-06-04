import React from 'react';
import { ABOUT_TEXT } from '../constants';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-[#0d1535] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-800/15 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-left mb-12 reveal from-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-brand-400"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-400">// Sobre mim</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
            Sobre Mim
          </h2>
        </div>

        {/* Content card — notch */}
        <div className="reveal delay-200 relative clip-notch p-8 md:p-12 group transition-all duration-300" style={{ background: '#070f2b', border: '1px solid rgba(83,92,145,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-700 group-hover:bg-brand-400 transition-colors duration-300"></div>

          <div className="space-y-6">
            {ABOUT_TEXT.map((paragraph, index) => (
              <p key={index} className="text-base text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Corner accent */}
          <div
            className="absolute bottom-0 right-0 w-5 h-5 bg-brand-500 opacity-40"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          ></div>
        </div>

      </div>
    </section>
  );
};

export default About;

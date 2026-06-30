import React from 'react';
import { ABOUT_TEXT } from '../constants';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-bg relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/[0.06] rounded-full blur-[80px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-left mb-12 reveal from-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-accent"></div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sobre mim</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight">
            Sobre Mim
          </h2>
        </div>

        {/* Content card */}
        <div className="reveal delay-200 relative rounded-2xl p-8 md:p-12 group bg-card border border-line shadow-card transition-all duration-300 hover:shadow-card-hover overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-line group-hover:bg-accent transition-colors duration-300"></div>

          <div className="space-y-6">
            {ABOUT_TEXT.map((paragraph, index) => (
              <p key={index} className="text-base text-muted leading-relaxed">
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

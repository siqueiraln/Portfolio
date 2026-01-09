import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Text */}
          <div className="flex-1 text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              {PERSONAL_INFO.name}
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-300 mb-6 leading-tight">
              Soluções digitais sob medida para{' '}
              <span className="text-brand-400">escalar seu negócio</span>
            </h2>

            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Desenvolvimento de <span className="text-brand-400 font-medium">MVPs</span>,{' '}
              <span className="text-brand-400 font-medium">SaaS</span>,{' '}
              <span className="text-brand-400 font-medium">automações</span> e{' '}
              <span className="text-brand-400 font-medium">integrações</span> focadas 
              em eficiência, redução de custos e crescimento sustentável.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
              >
                {/* WhatsApp SVG Icon */}
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current stroke-none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar no WhatsApp
              </a>
              <button 
                onClick={scrollToProjects}
                className="px-6 py-3.5 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 rounded-lg font-medium text-base transition-all flex items-center justify-center gap-2"
              >
                Ver projetos
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full max-w-[260px] lg:max-w-[320px] relative mx-auto md:mr-0">
            {/* Blue Glow Effect */}
            <div className="absolute inset-0 bg-brand-500 rounded-2xl blur-2xl opacity-30 transform translate-y-4 scale-95"></div>
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-900/50">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Jhonatan Lopes" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
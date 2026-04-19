import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { PERSONAL_INFO } from '../constants';

const tools = [
  { name: 'Bubble',     abbr: 'Bu',  float: 'float-a', top: '5%',    left: '0%'   },
  { name: 'n8n',        abbr: 'n8n', float: 'float-b', top: '20%',   right: '-6%' },
  { name: 'WhatsApp',   abbr: 'WA',  float: 'float-c', top: '54%',   right: '-6%' },
  { name: 'JavaScript', abbr: 'JS',  float: 'float-d', bottom: '20%', left: '0%'  },
  { name: 'IA',         abbr: 'IA',  float: 'float-e', bottom: '4%',  right: '-4%' },
];

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#070f2b]">

      {/* Background grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.035]" style={{
        backgroundImage: 'linear-gradient(#9290c3 1px, transparent 1px), linear-gradient(90deg, #9290c3 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Ambient glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[140px] -z-10"
        style={{ background: 'radial-gradient(circle, rgba(83,92,145,0.35) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] -z-10"
        style={{ background: 'radial-gradient(circle, rgba(27,26,85,0.4) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">

          {/* ── LEFT ── */}
          <div className="flex-shrink-0 w-full md:max-w-[480px] text-left z-10">

            <div className="flex items-center gap-3 mb-5"
              style={{ animation: 'heroSlideUp 0.6s ease both', animationDelay: '0.1s' }}>
              <div className="w-6 h-px bg-brand-400" />
              <span className="text-sm text-slate-400 tracking-wide">
                Hey, eu sou <span className="text-brand-300 font-semibold">Lucas Siqueira</span>
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.95] tracking-tight mb-1"
              style={{ animation: 'heroSlideUp 0.6s ease both', animationDelay: '0.25s' }}>
              Desenvolvedor
            </h1>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-tight mb-1"
              style={{ color: '#9290c3', animation: 'heroSlideUp 0.6s ease both', animationDelay: '0.4s' }}>
              No-Code
            </h1>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.95] tracking-tight mb-8"
              style={{ animation: 'heroSlideUp 0.6s ease both', animationDelay: '0.55s' }}>
              &amp; IA
            </h1>

            <div className="flex items-center gap-3 mb-6"
              style={{ animation: 'heroSlideUp 0.6s ease both', animationDelay: '0.65s' }}>
              <div className="w-10 h-px bg-brand-600" />
              <div className="w-2 h-2 rotate-45 bg-brand-400" />
            </div>

            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md"
              style={{ animation: 'heroSlideUp 0.6s ease both', animationDelay: '0.75s' }}>
              {PERSONAL_INFO.bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4"
              style={{ animation: 'heroSlideUp 0.6s ease both', animationDelay: '0.9s' }}>
              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-chamfer px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar no WhatsApp
              </a>
              <button
                onClick={scrollToProjects}
                className="clip-chamfer px-6 py-3.5 bg-brand-800/60 hover:bg-brand-800 text-brand-300 hover:text-white border border-brand-600/50 hover:border-brand-500 font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                Ver projetos <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="relative flex-shrink-0 w-[320px] lg:w-[380px]"
            style={{ height: '460px', animation: 'heroSlideRight 0.8s ease both', animationDelay: '0.3s' }}>

            {/* Glow behind photo */}
            <div className="absolute inset-0 rounded-full blur-[80px] -z-10"
              style={{ background: 'radial-gradient(circle, rgba(83,92,145,0.45) 0%, rgba(27,26,85,0.25) 45%, transparent 70%)' }} />

            {/* Corner brackets */}
            <div className="absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 border-brand-400 z-20" />
            <div className="absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 border-brand-400 z-20" />

            {/* Photo */}
            <div className="absolute inset-0 m-6 clip-notch overflow-hidden border border-brand-700/50 shadow-2xl bg-brand-900/50">
              <img
                src="/headshot.png"
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070f2b]/70 via-transparent to-transparent" />
            </div>

            {/* Floating tool badges */}
            {tools.map((tool) => (
              <div key={tool.name} className={`${tool.float} absolute z-20`}
                style={{ top: tool.top, bottom: tool.bottom, left: tool.left, right: tool.right }}>
                <div className="clip-chamfer flex flex-col items-center justify-center w-13 h-13 border shadow-lg"
                  style={{ width: '52px', height: '52px', background: 'rgba(11,16,48,0.9)', borderColor: 'rgba(146,144,195,0.3)', backdropFilter: 'blur(8px)' }}>
                  <span className="font-display text-[11px] font-bold text-brand-300 leading-none">{tool.abbr}</span>
                  <span className="text-[8px] text-slate-500 mt-0.5 leading-none">{tool.name}</span>
                </div>
              </div>
            ))}

            {/* Stat card */}
            <div className="float-b absolute -bottom-5 -left-8 z-20">
              <div className="clip-chamfer px-4 py-3 border shadow-xl flex items-center gap-3"
                style={{ background: 'rgba(7,15,43,0.95)', borderColor: 'rgba(83,92,145,0.5)', backdropFilter: 'blur(12px)' }}>
                <div className="w-1 h-8 bg-brand-400 flex-shrink-0" />
                <div>
                  <div className="font-display text-brand-300 text-xl font-bold leading-none">4+</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Projetos entregues</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

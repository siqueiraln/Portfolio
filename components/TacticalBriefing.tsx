import React from 'react';

const CHAMFER_CLIP = "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)";

const VIOLET = "#8B5CF6";

const objectives = [
  'Automatizar processos repetitivos e liberar sua equipe para o que importa',
  'Lançar seu MVP em semanas, não meses, com qualidade profissional',
  'Integrar sistemas e escalar operações com performance real e sem fricção',
];

const stats = [
  { num: '4+', label: 'Projetos' },
  { num: '100%', label: 'Entregues' },
  { num: '2+', label: 'Anos' },
  { num: '0', label: 'Gambiarras' },
];

const TacticalBriefing: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#08080f] py-20 px-6 lg:px-16">
      {/* Purple glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${VIOLET}15 0%, transparent 65%)`,
        }}
      />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(${VIOLET} 1px, transparent 1px), linear-gradient(90deg, ${VIOLET} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-3xl">
        {/* Briefing header line */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-px" style={{ background: VIOLET }} />
          <span
            className="text-xs font-black uppercase tracking-[0.35em]"
            style={{ color: VIOLET }}
          >
            // Briefing
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to right, ${VIOLET}60, transparent)`,
            }}
          />
          <span className="text-xs font-mono text-slate-600">SEC-01</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl lg:text-7xl font-black text-white uppercase leading-none tracking-tight mb-2">
          MISSÃO:
        </h2>
        <h2
          className="text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight mb-12"
          style={{ color: VIOLET }}
        >
          SOBREVIVER
        </h2>

        {/* Objectives */}
        <div className="flex flex-col gap-4 mb-12">
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <div
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center font-black text-xs mt-0.5 transition-all group-hover:brightness-125"
                style={{
                  clipPath: CHAMFER_CLIP,
                  background: VIOLET,
                  color: '#08080f',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                {obj}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="flex gap-8 mb-12 pt-8"
          style={{ borderTop: `1px solid ${VIOLET}30` }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-2xl font-black leading-none mb-1"
                style={{ color: VIOLET }}
              >
                {s.num}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="px-8 py-4 font-black text-sm uppercase tracking-[0.2em] transition-all hover:brightness-125 active:scale-[0.98]"
          style={{
            clipPath: CHAMFER_CLIP,
            background: VIOLET,
            color: '#08080f',
          }}
        >
          Aceitar Missão →
        </button>
      </div>
    </section>
  );
};

export default TacticalBriefing;

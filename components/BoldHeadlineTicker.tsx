import React from 'react';

const CHAMFER_CLIP = "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)";

const ORANGE = "#F97316";

const tickerItems = [
  '128 Players',
  '342 Matches',
  '99.9% Uptime',
  'Season 3',
  '128 Players',
  '342 Matches',
  '99.9% Uptime',
  'Season 3',
  '128 Players',
  '342 Matches',
  '99.9% Uptime',
  'Season 3',
];

const BoldHeadlineTicker: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0a06]">
      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerScroll 22s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Orange ambient glow */}
      <div
        className="absolute top-0 left-0 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 15% 40%, ${ORANGE}18 0%, transparent 65%)`,
        }}
      />

      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            ${ORANGE},
            ${ORANGE} 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-16">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px" style={{ background: ORANGE }} />
          <span
            className="text-xs font-black uppercase tracking-[0.3em]"
            style={{ color: ORANGE }}
          >
            // Arena ativa
          </span>
        </div>

        {/* Massive headline */}
        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white uppercase leading-none tracking-tight mb-3">
          O ULTIMO
        </h1>
        <h1
          className="text-6xl sm:text-7xl lg:text-9xl font-black uppercase leading-none tracking-tight mb-3"
          style={{
            WebkitTextStroke: `2px ${ORANGE}`,
            color: 'transparent',
          }}
        >
          DE PÉ
        </h1>
        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white uppercase leading-none tracking-tight mb-10">
          VENCE.
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed">
          Soluções digitais que eliminam concorrência. Seu negócio no topo, com performance real.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap">
          <button
            className="px-8 py-4 font-black text-sm uppercase tracking-[0.15em] transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              clipPath: CHAMFER_CLIP,
              background: ORANGE,
              color: '#0d0a06',
            }}
          >
            Começar Agora →
          </button>
          <button
            className="px-8 py-4 font-black text-sm uppercase tracking-[0.15em] transition-all hover:brightness-125 active:scale-[0.98]"
            style={{
              clipPath: CHAMFER_CLIP,
              background: `${ORANGE}18`,
              border: `1px solid ${ORANGE}50`,
              color: ORANGE,
            }}
          >
            Ver Projetos
          </button>
        </div>
      </div>

      {/* Live Ticker Bar */}
      <div
        className="relative w-full overflow-hidden py-3"
        style={{ background: ORANGE }}
      >
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <div key={i} className="flex items-center gap-0">
              <span className="px-6 text-xs font-black uppercase tracking-[0.2em] text-black whitespace-nowrap">
                {item}
              </span>
              <span className="text-black opacity-40 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoldHeadlineTicker;

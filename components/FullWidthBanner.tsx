import React from 'react';

const BUTTON_CLIP = "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)";
const STAT_CLIP = "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))";

const PINK = "#EC4899";
const VIOLET = "#8B5CF6";

const stats = [
  { num: '128', label: 'Online' },
  { num: '24/7', label: 'Uptime' },
  { num: '5K+', label: 'Players' },
];

const FullWidthBanner: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #130325 0%, #0d0d1a 50%, #130325 100%)',
      }}
    >
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 25% 50%, ${VIOLET}28 0%, transparent 55%),
                       radial-gradient(ellipse at 75% 50%, ${PINK}20 0%, transparent 55%)`,
        }}
      />

      {/* Diagonal divider line */}
      <div
        className="absolute inset-y-0 left-1/2 w-px hidden lg:block"
        style={{ background: `linear-gradient(to bottom, transparent, ${VIOLET}40, transparent)` }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

        {/* LEFT */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-16">
          {/* Accent bar */}
          <div
            className="w-1 h-16 mb-6"
            style={{ background: `linear-gradient(to bottom, ${PINK}, ${VIOLET})` }}
          />

          <div className="text-xs font-black uppercase tracking-[0.3em] mb-3" style={{ color: PINK }}>
            // Arena principal
          </div>

          <h2 className="text-5xl lg:text-7xl font-black text-white uppercase leading-none tracking-tight mb-8">
            SEJA O<br />
            <span
              style={{
                WebkitTextStroke: `2px ${PINK}`,
                color: 'transparent',
              }}
            >
              ULTIMO
            </span>
          </h2>

          <div className="flex gap-4 flex-wrap">
            <button
              className="px-6 py-3 font-black text-sm uppercase tracking-widest text-white transition-all hover:brightness-125 active:scale-95"
              style={{
                clipPath: BUTTON_CLIP,
                background: `linear-gradient(135deg, ${PINK}, ${VIOLET})`,
              }}
            >
              Entrar Agora
            </button>
            <button
              className="px-6 py-3 font-black text-sm uppercase tracking-widest transition-all hover:brightness-125 active:scale-95"
              style={{
                clipPath: BUTTON_CLIP,
                background: 'transparent',
                border: `1px solid ${VIOLET}80`,
                color: VIOLET,
              }}
            >
              Ver Projetos →
            </button>
          </div>
        </div>

        {/* RIGHT — Stats */}
        <div className="flex flex-col justify-center items-start lg:items-start px-10 lg:px-16 py-16 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="w-full max-w-xs px-6 py-4 flex items-center gap-5 transition-all duration-300 hover:brightness-125"
              style={{
                clipPath: STAT_CLIP,
                background: i === 0
                  ? `${VIOLET}22`
                  : i === 1
                  ? `${PINK}18`
                  : `${VIOLET}15`,
                border: `1px solid ${i % 2 === 0 ? VIOLET : PINK}44`,
              }}
            >
              <span
                className="text-3xl font-black w-20"
                style={{ color: i % 2 === 0 ? VIOLET : PINK }}
              >
                {stat.num}
              </span>
              <div>
                <div className="text-sm font-black uppercase tracking-widest text-white">
                  {stat.label}
                </div>
                <div
                  className="w-8 h-0.5 mt-1"
                  style={{ background: i % 2 === 0 ? VIOLET : PINK }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullWidthBanner;

import React from 'react';

const CARD_CLIP = "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)";
const BADGE_CLIP = "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)";
const BUTTON_CLIP = "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)";

const ACCENT = "#FF4655";

const ZonaDeDropCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-[#0f0f0f] p-12">
      <div
        className="relative bg-[#0d0d0d] p-6 max-w-sm w-full"
        style={{
          clipPath: CARD_CLIP,
          border: `1px solid ${ACCENT}33`,
          boxShadow: `0 0 40px ${ACCENT}18, inset 0 0 40px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Corner accent fill */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4"
          style={{ background: ACCENT }}
        />
        {/* Corner inner shadow */}
        <div
          className="absolute bottom-0 right-0 w-px h-8 origin-bottom"
          style={{ background: `linear-gradient(to top, ${ACCENT}, transparent)` }}
        />

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-black tracking-[0.2em] uppercase"
          style={{
            clipPath: BADGE_CLIP,
            background: ACCENT,
            color: '#0d0d0d',
          }}
        >
          ⚡ DROP ZONE
        </div>

        {/* Icon */}
        <div className="text-4xl mb-4">🎯</div>

        {/* Title */}
        <h3
          className="text-2xl font-black text-white uppercase tracking-wide mb-3 leading-tight"
        >
          ZONA DE DROP
        </h3>

        {/* Accent underline */}
        <div className="w-12 h-0.5 mb-4" style={{ background: ACCENT }} />

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          Implanto sistemas que eliminam gargalos e colocam seu negócio em modo de alta performance. Sem gambiarras, com resultado real.
        </p>

        {/* CTA Button */}
        <button
          className="w-full py-3 font-black text-sm uppercase tracking-[0.15em] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          style={{
            clipPath: BUTTON_CLIP,
            background: ACCENT,
            color: '#0d0d0d',
          }}
        >
          Entrar na Zona →
        </button>
      </div>
    </div>
  );
};

export default ZonaDeDropCard;

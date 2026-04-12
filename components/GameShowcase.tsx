import React from 'react';
import BoldHeadlineTicker from './BoldHeadlineTicker';
import FullWidthBanner from './FullWidthBanner';
import TacticalBriefing from './TacticalBriefing';
import ZonaDeDropCard from './ZonaDeDropCard';

const Divider: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div
    className="flex items-center gap-4 px-6 lg:px-16 py-4"
    style={{ background: '#050505', borderTop: '1px solid #1a1a1a' }}
  >
    <div className="w-2 h-2" style={{ background: color, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
    <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color }}>
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
  </div>
);

const GameShowcase: React.FC = () => {
  return (
    <div className="bg-[#050505] min-h-screen">

      <Divider label="01 — Bold Headline + Live Ticker" color="#F97316" />
      <BoldHeadlineTicker />

      <Divider label="02 — Full Width Banner" color="#EC4899" />
      <FullWidthBanner />

      <Divider label="03 — Tactical Briefing" color="#8B5CF6" />
      <TacticalBriefing />

      <Divider label="04 — Zona de Drop Card" color="#FF4655" />
      <ZonaDeDropCard />

    </div>
  );
};

export default GameShowcase;

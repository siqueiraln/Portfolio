import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { details } = project;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!details) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#070f2b] border border-purple-500/60 clip-notch animate-[modalIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.2s ease-out' }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-purple-500 z-10"></div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070f2b] via-[#070f2b]/50 to-transparent"></div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-purple-900/80 border border-purple-500/40 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title */}
          <div className="absolute bottom-4 left-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1 block">
              {project.category}
            </span>
            <h2 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Headline */}
          <p className="text-slate-200 text-sm leading-relaxed font-medium">
            {details.headline}
          </p>

          {/* Sections */}
          <div className="space-y-4">
            {details.sections.map((section, i) => (
              <div key={i} className="border-l-2 border-purple-500/40 pl-4">
                <h4 className="text-purple-300 text-[10px] font-black uppercase tracking-widest mb-1">
                  {section.icon} {section.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="clip-chamfer-sm px-2.5 py-1 bg-purple-900/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider border border-purple-700/50"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA links */}
          {details.cta && details.cta.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-3 border-t border-purple-800/40">
              {details.cta.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-purple-500/50 text-purple-300 hover:bg-purple-900/40 hover:text-white transition-all"
                >
                  {link.label} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4"
          style={{ background: '#a855f7', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectModal;

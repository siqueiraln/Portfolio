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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-line shadow-card-hover animate-modalIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 border border-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1 block">
              {project.category}
            </span>
            <h2 className="font-display text-xl text-white uppercase tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Headline */}
          <p className="text-ink text-sm leading-relaxed font-medium">
            {details.headline}
          </p>

          {/* Sections */}
          <div className="space-y-4">
            {details.sections.map((section, i) => (
              <div key={i} className="border-l-2 border-accent/50 pl-4">
                <h4 className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">
                  {section.icon} {section.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed">
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
                className="rounded-md px-2.5 py-1 bg-accent-soft text-accent text-[10px] font-semibold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA links */}
          {details.cta && details.cta.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-3 border-t border-line">
              {details.cta.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest bg-accent hover:bg-accent-hover text-on-accent transition-colors"
                >
                  {link.label} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

import React, { useState, useEffect } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section className="py-24 relative bg-[#070f2b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
          <div className="reveal from-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-brand-400"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-400">// Trabalhos selecionados</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              Projetos que<br />
              <span className="text-brand-400">resolvem problemas reais.</span>
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => {
            const hasDetails = !!project.details;

            const cardInner = (
              <>
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 transition-colors duration-300 z-10 ${
                    hasDetails ? 'bg-purple-500' : 'bg-brand-700 group-hover:bg-brand-400'
                  }`}
                ></div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent"></div>

                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`clip-badge px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur ${
                      hasDetails ? 'bg-purple-900/90 text-purple-300' : 'bg-brand-800/90 text-brand-300'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`font-display text-lg font-bold mb-3 transition-colors uppercase tracking-wide ${
                    hasDetails ? 'text-white group-hover:text-purple-300' : 'text-white group-hover:text-brand-300'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`clip-chamfer-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                          hasDetails
                            ? 'bg-purple-900/30 text-purple-300 border-purple-700/50'
                            : 'bg-brand-800/60 text-brand-300 border-brand-700/50'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className={`pt-4 border-t mt-auto ${
                    hasDetails ? 'border-purple-800/40' : 'border-brand-800/60'
                  }`}>
                    {hasDetails ? (
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 group-hover:text-white transition-colors">
                        Ver Detalhes <Info className="w-3.5 h-3.5" />
                      </span>
                    ) : project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-400 hover:text-white transition-colors"
                      >
                        Ver Projeto <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: hasDetails ? '#a855f7' : '#9290c3',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                  }}
                ></div>
              </>
            );

            return (
              <div
                key={project.id}
                onClick={hasDetails ? () => setSelectedProject(project) : undefined}
                className={`reveal delay-${(index + 1) * 100} group relative bg-brand-900/40 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full clip-notch overflow-hidden ${
                  hasDetails
                    ? 'border-purple-500/50 hover:border-purple-400 hover:shadow-purple-900/30 cursor-pointer'
                    : 'border-brand-700/30 hover:border-brand-500/60 hover:shadow-brand-800/30'
                }`}
              >
                {cardInner}
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;

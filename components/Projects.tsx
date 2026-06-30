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
    <section className="py-24 relative bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
          <div className="reveal from-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-accent"></div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Trabalhos selecionados</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight leading-tight">
              Projetos que<br />
              <span className="text-accent">resolvem problemas reais.</span>
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => {
            const hasDetails = !!project.details;

            const cardInner = (
              <>
                {/* Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={project.imageUrl}
                    alt={`Projeto ${project.title} — ${project.category}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span className="rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-accent text-on-accent">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display text-lg text-ink mb-3 transition-colors uppercase tracking-wide group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mb-5 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-accent-soft text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-line mt-auto">
                    {hasDetails ? (
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent group-hover:text-ink transition-colors">
                        Ver detalhes <Info className="w-3.5 h-3.5" />
                      </span>
                    ) : project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-ink transition-colors"
                      >
                        Ver projeto <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </>
            );

            return (
              <div
                key={project.id}
                onClick={hasDetails ? () => setSelectedProject(project) : undefined}
                className={`reveal delay-${(index + 1) * 100} group relative rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover flex flex-col h-full overflow-hidden ${
                  hasDetails
                    ? 'border-line-strong hover:border-accent cursor-pointer'
                    : 'border-line hover:border-line-strong'
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

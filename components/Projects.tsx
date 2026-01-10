import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId } from '../types';

const Projects: React.FC = () => {
  return (
    <section id={SectionId.PROJECTS} className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              <span className="text-brand-500 mr-2">/</span>
              PROJETOS SELECIONADOS
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Uma seleção de trabalhos desenvolvidos com foco em performance e usabilidade.
            </p>
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-500 hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-slate-300 border border-slate-700">
                  {project.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-slate-800 text-brand-100 text-xs font-medium rounded-md border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-slate-800 mt-auto">
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-400 transition-colors"
                  >
                    Ver Projeto <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
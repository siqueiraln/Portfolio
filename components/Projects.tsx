import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId } from '../types';

const Projects: React.FC = () => {
  return (
    <section id={SectionId.PROJECTS} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projetos em Destaque</h2>
            <p className="text-slate-400">Uma seleção de trabalhos desenvolvidos no último ano.</p>
          </div>
          <a href="#" className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-2">
            Ver todos <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-all hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-slate-300 border border-slate-700">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <a 
                    href={project.demoUrl} 
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-brand-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </button>
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
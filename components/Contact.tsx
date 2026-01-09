import React from 'react';
import { Mail, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { SectionId } from '../types';
import { PERSONAL_INFO } from '../constants';

const Contact: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id={SectionId.CONTACT} className="bg-slate-900 pt-24 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Vamos construir algo incrível juntos?</h2>
            <p className="text-slate-400 mb-8 max-w-md">
              Estou disponível para projetos freelance e consultorias. Se você tem uma ideia e quer tirá-la do papel rapidamente com No-Code e IA, entre em contato.
            </p>
            
            <div className="space-y-4">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 w-fit">
                <Mail className="w-5 h-5 text-brand-400" />
                {PERSONAL_INFO.email}
              </a>
              <div className="flex gap-4 mt-4">
                <a href={PERSONAL_INFO.socials.linkedin} className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-brand-600 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={PERSONAL_INFO.socials.instagram} className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-pink-600 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Nome</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="Seu nome" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Mensagem</label>
                <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Conte-me sobre seu projeto..." />
              </div>
              <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-lg transition-colors">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Todos os direitos reservados.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm"
          >
            Voltar ao topo <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
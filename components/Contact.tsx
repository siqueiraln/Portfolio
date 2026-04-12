import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, ArrowUp, Github, Facebook } from 'lucide-react';
import { SectionId } from '../types';
import { PERSONAL_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = formData;
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Contato pelo Portfólio&body=Nome: ${encodeURIComponent(name)}%0D%0AMensagem: ${encodeURIComponent(message)}`;
  };

  return (
    <footer id={SectionId.CONTACT} className="bg-[#0d1535] pt-24 pb-12 border-t border-brand-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-2 gap-12 mb-16">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-brand-400"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-400">// Contato</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white mb-5 uppercase tracking-tight leading-tight">
              Vamos construir<br />
              <span className="text-brand-400">algo incrível juntos?</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-md text-sm leading-relaxed">
              Estou pronto para integrar sua equipe e elevar o nível das entregas. Se sua empresa valoriza performance e escalabilidade, vamos conversar.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors p-3 bg-brand-900/40 border border-brand-700/30 hover:border-brand-500/50 w-fit clip-chamfer-sm"
              >
                <Mail className="w-4 h-4 text-brand-400" />
                <span className="text-sm">{PERSONAL_INFO.email}</span>
              </a>

              <div className="flex gap-3 mt-4">
                {[
                  { href: PERSONAL_INFO.socials.linkedin,  Icon: Linkedin,  hover: 'hover:bg-brand-600' },
                  { href: PERSONAL_INFO.socials.instagram, Icon: Instagram, hover: 'hover:bg-pink-600' },
                  { href: PERSONAL_INFO.socials.github,    Icon: Github,    hover: 'hover:bg-slate-600' },
                  { href: PERSONAL_INFO.socials.facebook,  Icon: Facebook,  hover: 'hover:bg-blue-600' },
                ].map(({ href, Icon, hover }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`clip-chamfer-sm p-3 bg-brand-800/60 border border-brand-700/40 text-slate-400 hover:text-white ${hover} hover:border-transparent transition-all`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="relative bg-brand-900/30 border border-brand-700/30 p-8 clip-notch">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-700"></div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { label: 'Nome',      name: 'name',    type: 'text',  placeholder: 'Seu nome',          multiline: false },
                { label: 'Email',     name: 'email',   type: 'email', placeholder: 'seu@email.com',     multiline: false },
                { label: 'Mensagem', name: 'message', type: 'text',  placeholder: 'Conte sobre seu projeto...', multiline: true },
              ].map(({ label, name, type, placeholder, multiline }) => (
                <div key={name}>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-1.5">{label}</label>
                  {multiline ? (
                    <textarea
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={placeholder}
                      required
                      className="w-full bg-brand-950/60 border border-brand-700/40 focus:border-brand-500 text-white px-4 py-3 text-sm outline-none transition-colors resize-none placeholder-slate-600"
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      required
                      className="w-full bg-brand-950/60 border border-brand-700/40 focus:border-brand-500 text-white px-4 py-3 text-sm outline-none transition-colors placeholder-slate-600"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="clip-chamfer w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-3 uppercase tracking-widest transition-all mt-2"
              >
                Enviar Mensagem
              </button>
            </form>

            {/* Corner accent */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-brand-500 opacity-50"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            ></div>
          </div>

        </div>

        {/* Footer bar */}
        <div className="border-t border-brand-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="clip-chamfer-sm flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-brand-400 border border-brand-800/50 hover:border-brand-600/50 transition-colors text-xs uppercase tracking-widest"
          >
            Voltar ao topo <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Contact;

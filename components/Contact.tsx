import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, ArrowUp, Github, Facebook } from 'lucide-react';
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
    <footer className="bg-surface pt-24 pb-12 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-2 gap-12 mb-16 reveal fade-only">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-accent"></div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contato</span>
            </div>
            <h2 className="font-display text-3xl text-ink mb-5 uppercase tracking-tight leading-tight">
              Vamos resolver a<br />
              <span className="text-accent">tecnologia da sua empresa?</span>
            </h2>
            <p className="text-muted mb-8 max-w-md text-sm leading-relaxed">
              Me conta o que você precisa pelo WhatsApp — respondo no mesmo dia com prazo e valor. Sem enrolação, sem jargão técnico.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-muted hover:text-ink transition-colors p-3 rounded-lg bg-card border border-line hover:border-line-strong w-fit"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm">{PERSONAL_INFO.email}</span>
              </a>

              <div className="flex gap-3 mt-4">
                {[
                  { href: PERSONAL_INFO.socials.linkedin,  Icon: Linkedin,  label: 'LinkedIn' },
                  { href: PERSONAL_INFO.socials.instagram, Icon: Instagram, label: 'Instagram' },
                  { href: PERSONAL_INFO.socials.github,    Icon: Github,    label: 'GitHub' },
                  { href: PERSONAL_INFO.socials.facebook,  Icon: Facebook,  label: 'Facebook' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 rounded-lg bg-card border border-line text-muted hover:text-on-accent hover:bg-accent hover:border-accent transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="relative rounded-2xl bg-card border border-line shadow-card p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { label: 'Nome',     name: 'name',    type: 'text',  placeholder: 'Seu nome',                   multiline: false },
                { label: 'Email',    name: 'email',   type: 'email', placeholder: 'seu@email.com',              multiline: false },
                { label: 'Mensagem', name: 'message', type: 'text',  placeholder: 'Conte sobre seu projeto...', multiline: true },
              ].map(({ label, name, type, placeholder, multiline }) => (
                <div key={name}>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">{label}</label>
                  {multiline ? (
                    <textarea
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={placeholder}
                      required
                      className="w-full rounded-lg bg-surface border border-line focus:border-accent text-ink px-4 py-3 text-sm outline-none transition-colors resize-none placeholder:text-subtle"
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      required
                      className="w-full rounded-lg bg-surface border border-line focus:border-accent text-ink px-4 py-3 text-sm outline-none transition-colors placeholder:text-subtle"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full rounded-lg bg-accent hover:bg-accent-hover text-on-accent font-semibold text-sm py-3 uppercase tracking-widest transition-colors mt-2"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

        </div>

        {/* Footer bar */}
        <div className="border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-subtle text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-subtle hover:text-accent border border-line hover:border-line-strong transition-colors text-xs uppercase tracking-widest"
          >
            Voltar ao topo <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Contact;

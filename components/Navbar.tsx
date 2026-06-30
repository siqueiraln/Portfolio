import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';
import { PERSONAL_INFO } from '../constants';
import useTheme from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  // Antes de montar, espelha o tema do servidor ('light') para evitar mismatch de hidratação.
  const displayTheme = mounted ? theme : 'light';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Soluções', id: SectionId.SKILLS },
    { name: 'Sobre', id: SectionId.ABOUT },
    { name: 'Projetos', id: SectionId.PROJECTS },
    { name: 'Contato', id: SectionId.CONTACT },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollToSection(SectionId.HERO)}
            aria-label="Voltar ao topo"
          >
            <span className="font-display text-lg tracking-widest text-ink uppercase">
              Lucas<span className="text-accent"> Siqueira</span>
            </span>
          </button>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="text-muted hover:text-ink px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <ThemeToggle theme={displayTheme} onToggle={toggle} />
              <a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent hover:bg-accent-hover text-on-accent px-5 py-2 text-sm font-semibold transition-colors shadow-card"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="-mr-2 flex items-center gap-2 md:hidden">
            <ThemeToggle theme={displayTheme} onToggle={toggle} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted hover:text-ink hover:bg-surface focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-line">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-muted hover:text-ink hover:bg-surface block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
              >
                {link.name}
              </button>
            ))}
            <a
              href={PERSONAL_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-accent hover:bg-accent-hover text-on-accent px-3 py-2 mt-2 text-base font-semibold text-center transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

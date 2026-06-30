import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Projects from './components/Projects';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import useScrollReveal from './hooks/useScrollReveal';
import { SectionId } from './types';

const App: React.FC = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <div id={SectionId.ABOUT}>
          <About />
        </div>
        <div id={SectionId.PROJECTS}>
          <Projects />
        </div>
        <div id={SectionId.FAQ}>
          <FAQ />
        </div>
      </main>
      <div id={SectionId.CONTACT}>
        <Contact />
      </div>
      <ChatWidget />
    </div>
  );
};

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import useScrollReveal from './hooks/useScrollReveal';

const App: React.FC = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#070f2b] text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <About />
        <Projects />
      </main>
      <Contact />
      <ChatWidget />
    </div>
  );
};

export default App;
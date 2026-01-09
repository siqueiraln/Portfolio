import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Contact />
      <ChatWidget />
    </div>
  );
};

export default App;
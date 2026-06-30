import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import useScrollReveal from './hooks/useScrollReveal';
import { SectionId } from './types';

const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Contact = React.lazy(() => import('./components/Contact'));
const ChatWidget = React.lazy(() => import('./components/ChatWidget'));

const ComponentFallback = () => <div className="h-96 bg-surface" />;

const App: React.FC = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <div id={SectionId.ABOUT}>
          <Suspense fallback={<ComponentFallback />}>
            <About />
          </Suspense>
        </div>
        <div id={SectionId.PROJECTS}>
          <Suspense fallback={<ComponentFallback />}>
            <Projects />
          </Suspense>
        </div>
        <div id={SectionId.FAQ}>
          <Suspense fallback={<ComponentFallback />}>
            <FAQ />
          </Suspense>
        </div>
      </main>
      <div id={SectionId.CONTACT}>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default App;

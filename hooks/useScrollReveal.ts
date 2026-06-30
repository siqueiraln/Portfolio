import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('visible');
            // Não desanima ao sair da viewport — efeito one-shot
            observer.unobserve(el);
            // Libera a camada de composição (will-change) quando a transição termina,
            // evitando segurar memória de GPU em dezenas de elementos pela sessão toda.
            const release = () => { el.style.willChange = 'auto'; };
            el.addEventListener('transitionend', release, { once: true });
            // Fallback caso transitionend não dispare (ex.: prefers-reduced-motion)
            window.setTimeout(release, 1200);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Função para observar novos elementos que aparecerem
    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal:not(.visible)');
      elements.forEach((el) => observer.observe(el));
    };

    // Observação inicial
    observeElements();

    // Observa mudanças no DOM para detectar quando seções Lazy-loaded são montadas
    let debounceTimer: ReturnType<typeof setTimeout>;
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(observeElements, 100);
    });

    const root = document.getElementById('root') ?? document.body;
    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};

export default useScrollReveal;

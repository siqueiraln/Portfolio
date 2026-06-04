import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Não desanima ao sair da viewport — efeito one-shot
            observer.unobserve(entry.target);
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
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
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

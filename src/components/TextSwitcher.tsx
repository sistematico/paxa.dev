'use client';

import { useState, useEffect, useRef } from 'react';

export default function TextSwitcher() {
  const [isTechnical, setIsTechnical] = useState(false);
  const [containerHeight, setContainerHeight] = useState('auto');
  const leigosRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const activeRef = isTechnical ? technicalRef : leigosRef;
      if (activeRef.current) {
        const height = activeRef.current.scrollHeight;
        setContainerHeight(`${height}px`);
      }
    };

    // Pequeno delay para garantir que o DOM foi atualizado
    const timer = setTimeout(updateHeight, 50);
    
    return () => clearTimeout(timer);
  }, [isTechnical]);

  const leigosText = (
    <>
      <p className="mb-2">
        Olá! Sou o Lucas e transformo ideias em sites incríveis. Já imaginou ter um 
        site que funciona perfeitamente no celular, tablet e computador? Eu faço isso 
        acontecer! Crio desde sites simples até lojas online completas.
      </p>
      <p className="mb-2">
        Trabalho há mais de 20 anos com internet e computadores, então sei exatamente 
        como fazer seu site aparecer no Google e carregar super rápido. Seus clientes 
        vão adorar navegar no seu site!
      </p>
      <p className="mb-2">
        Que tal tirarmos sua ideia do papel e colocarmos na internet?
      </p>
    </>
  );

  const technicalText = (
    <>
      <p className="mb-2">
        Sou Lucas, especialista em TypeScript com expertise em frameworks modernos 
        como React, Next.js, Vue.js, Astro e runtimes como Bun e Node.js. 
        Desenvolvo aplicações web de alta performance com arquitetura escalável.
      </p>
      <p className="mb-2">
        Usuário Linux desde 1999, possuo vasta experiência em DevOps, administração 
        de sistemas, containerização e deployment automatizado, garantindo soluções 
        robustas em produção.
      </p>
      <p className="mb-2">
        Vamos construir soluções tecnológicas inovadoras e de alto impacto!
      </p>
    </>
  );

  return (
    <div>
      <div className="mode-toggle">
        <button
          className={`mode-button ${!isTechnical ? 'active' : ''}`}
          onClick={() => setIsTechnical(false)}
          type="button"
        >
          Simples
        </button>
        <button
          className={`mode-button ${isTechnical ? 'active' : ''}`}
          onClick={() => setIsTechnical(true)}
          type="button"
        >
          Técnico
        </button>
      </div>
      
      <div className="text-switcher" style={{ height: containerHeight }}>
        <div 
          ref={leigosRef}
          className={`text-content ${!isTechnical ? 'active' : ''}`}
        >
          {leigosText}
        </div>
        <div 
          ref={technicalRef}
          className={`text-content ${isTechnical ? 'active' : ''}`}
        >
          {technicalText}
        </div>
      </div>
    </div>
  );
}
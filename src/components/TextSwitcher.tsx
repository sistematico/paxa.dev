"use client";

import { useState } from "react";

export default function TextSwitcher() {
  const [isTechnical, setIsTechnical] = useState(false);

  const leigosText = (
    <>
      <p>
        Olá! Sou o Lucas e transformo ideias em sites incríveis. Já imaginou ter
        um site que funciona perfeitamente no celular, tablet e computador? Eu
        faço isso acontecer! Crio desde sites simples até lojas online
        completas.
      </p>
      <p>
        Trabalho há mais de 20 anos com internet e computadores, então sei
        exatamente como fazer seu site aparecer no Google e carregar super
        rápido. Seus clientes vão adorar navegar no seu site!
      </p>
      <p>
        Que tal tirarmos sua ideia do papel e colocarmos na internet?
      </p>
    </>
  );

  const technicalText = (
    <>
      <p>
        Sou Lucas, especialista em TypeScript com expertise em frameworks
        modernos como React, Next.js, Vue.js, Astro e runtimes como Bun e
        Node.js. Desenvolvo aplicações web de alta performance com arquitetura
        escalável.
      </p>
      <p>
        Usuário Linux desde 1999, possuo vasta experiência em DevOps,
        administração de sistemas, containerização e deployment automatizado,
        garantindo soluções robustas em produção.
      </p>
      <p>
        Vamos construir soluções tecnológicas inovadoras e de alto impacto!
      </p>
    </>
  );

  return (
    <div>
      <div className="mode-toggle">
        <button
          className={`mode-button ${!isTechnical ? "active" : ""}`}
          onClick={() => setIsTechnical(false)}
          type="button"
        >
          Simples
        </button>
        <button
          className={`mode-button ${isTechnical ? "active" : ""}`}
          onClick={() => setIsTechnical(true)}
          type="button"
        >
          Técnico
        </button>
      </div>

      <div className="text-switcher-natural">
        <div className={`text-content-natural ${!isTechnical ? "active" : ""}`}>
          {leigosText}
        </div>
        <div className={`text-content-natural ${isTechnical ? "active" : ""}`}>
          {technicalText}
        </div>
      </div>

      <div>
        <a href="mailto:" className="synthwave-glow inline-block text-xl">
          Entre em contato
        </a>
      </div>
    </div>
  );
}

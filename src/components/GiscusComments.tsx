"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export default function GiscusComments() {
  const [theme, setTheme] = useState("dark_tritanopia");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light_tritanopia" : "dark_tritanopia");

    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme");
      setTheme(t === "light" ? "light_tritanopia" : "dark_tritanopia");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <Giscus
        repo="lucaspaxa/paxa.dev"
        repoId={process.env.GISCUS_REPO_ID!}
        category={process.env.GISCUS_CATEGORY!}
        categoryId={process.env.GISCUS_CATEGORY_ID!}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="pt"
        loading="lazy"
      />
    </div>
  );
}

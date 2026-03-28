"use client";

import { useEffect } from "react";
import NProgress from "nprogress";

interface TopLoaderProps {
  color?: string;
  height?: number;
  showSpinner?: boolean;
  speed?: number;
  zIndex?: number;
}

export default function TopLoader({
  color = "#29d",
  height = 3,
  showSpinner = true,
  speed = 200,
  zIndex = 1600,
}: TopLoaderProps) {
  useEffect(() => {
    NProgress.configure({
      showSpinner,
      speed,
      minimum: 0.08,
      trickleSpeed: 200,
      template:
        '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    });

    function findClosestAnchor(
      el: HTMLElement | null,
    ): HTMLAnchorElement | null {
      while (el && el.tagName.toLowerCase() !== "a") {
        el = el.parentElement;
      }
      return el as HTMLAnchorElement | null;
    }

    function handleClick(e: MouseEvent) {
      try {
        const anchor = findClosestAnchor(e.target as HTMLElement);
        if (!anchor?.href) return;

        const current = window.location.href;
        const target = new URL(anchor.href, current);

        if (target.origin !== window.location.origin) return;
        if (target.href === current) return;
        if (anchor.target === "_blank") return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

        const isSamePath =
          target.pathname === window.location.pathname &&
          target.search === window.location.search;

        if (isSamePath) return;

        NProgress.start();
      } catch {
        NProgress.start();
        NProgress.done();
      }
    }

    const origPush = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      NProgress.done();
      return origPush(...args);
    };

    const origReplace = window.history.replaceState.bind(window.history);
    window.history.replaceState = (...args) => {
      NProgress.done();
      return origReplace(...args);
    };

    function handlePopState() {
      NProgress.done();
    }

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
      window.history.pushState = origPush;
      window.history.replaceState = origReplace;
    };
  }, [showSpinner, speed]);

  return (
    <style>{`
      #nprogress { pointer-events: none }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: ${zIndex};
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: ${zIndex};
        top: 15px;
        right: 15px;
      }
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: 2px solid transparent;
        border-top-color: ${color};
        border-left-color: ${color};
        border-radius: 50%;
        animation: nprogress-spinner 400ms linear infinite;
      }
      @keyframes nprogress-spinner {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
      }
    `}</style>
  );
}

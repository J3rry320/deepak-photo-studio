'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Global Smooth Scroll Provider powered by Lenis.
 * Delivers refined, momentum-based scrolling across the editorial experience.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

/**
 * Higher-Order Component (HOC) to wrap any page or layout component with smooth scroll behavior.
 */
export function withSmoothScroll<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WithSmoothScrollComponent(props: P) {
    return (
      <SmoothScrollProvider>
        <Component {...props} />
      </SmoothScrollProvider>
    );
  };
}

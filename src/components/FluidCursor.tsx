'use client';
import { useEffect, useRef } from 'react';

import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    hasInitialized.current = true;

    const frame = window.requestAnimationFrame(() => {
      fluidCursor();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas
        id="fluid"
        className="h-screen w-screen opacity-80 [filter:saturate(130%)_blur(1px)] dark:opacity-45"
      />
    </div>
  );
};
export default FluidCursor;

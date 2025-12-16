'use client';

import React, { useEffect, useRef, useState } from 'react';

// Define types for Vanta effect
interface VantaEffect {
  destroy: () => void;
  setOptions: (options: Record<string, unknown>) => void;
  resize: () => void;
}

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);

  useEffect(() => {
    // Guard for client-side only
    if (typeof window === 'undefined') return;

    let effect: VantaEffect | null = null;

    const loadVanta = async () => {
      try {
        // Dynamically import p5 and vanta topology
        const p5Module = await import('p5');
        const p5 = p5Module.default;

        // Make p5 available globally (required by vanta)
        (window as unknown as { p5: typeof p5 }).p5 = p5;

        // Import vanta topology
        const TOPOLOGY = (await import('vanta/dist/vanta.topology.min')).default;

        if (vantaRef.current && !vantaEffect) {
          effect = TOPOLOGY({
            el: vantaRef.current,
            p5: p5,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xffffff,
            backgroundColor: 0x000000,
          }) as VantaEffect;

          setVantaEffect(effect);
        }
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };

    loadVanta();

    return () => {
      if (effect) {
        try {
          effect.destroy();
        } catch (e) {
          console.error('Error destroying Vanta:', e);
        }
      }
    };
  }, []);

  // Cleanup when vantaEffect changes
  useEffect(() => {
    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (e) {
          console.error('Error destroying Vanta:', e);
        }
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.3 }}
      aria-hidden="true"
    />
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = React.useState(false);

  useEffect(() => {
    if (!scriptsLoaded || !vantaRef.current || vantaEffect.current) return;

    const initVanta = () => {
      try {
        const VANTA = (window as any).VANTA;
        const THREE = (window as any).THREE;

        if (!VANTA || !THREE) {
          console.log('Waiting for VANTA and THREE...');
          return;
        }

        vantaEffect.current = VANTA.TOPOLOGY({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xffffff,
          backgroundColor: 0x000000,
        });
      } catch (error) {
        console.error('Vanta init error:', error);
      }
    };

    // Small delay to ensure scripts are fully ready
    setTimeout(initVanta, 100);

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (e) {
          console.error('Error destroying Vanta:', e);
        }
      }
    };
  }, [scriptsLoaded]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('THREE loaded')}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('VANTA loaded');
          setScriptsLoaded(true);
        }}
      />
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{ opacity: 0.25 }}
      />
    </>
  );
}

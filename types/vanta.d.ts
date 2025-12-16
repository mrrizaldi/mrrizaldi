// Type declarations for vanta.js effects
declare module 'vanta/dist/vanta.topology.min' {
  interface VantaTopologyOptions {
    el: HTMLElement | null;
    p5?: unknown;
    THREE?: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
  }

  interface VantaEffect {
    destroy: () => void;
    setOptions: (options: Partial<VantaTopologyOptions>) => void;
    resize: () => void;
  }

  function TOPOLOGY(options: VantaTopologyOptions): VantaEffect;
  export default TOPOLOGY;
}

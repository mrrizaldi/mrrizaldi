'use client';

import React, { useReducer, useEffect } from 'react';

// Define the shape of a ripple object
interface Ripple {
  id: string;
  x: number;
  y: number;
}

// Props for the RippleCursor component
interface RippleCursorProps {
  maxSize?: number;
  duration?: number;
  blur?: boolean;
  color?: string;
}

// Type for the reducer's state
type RippleState = Ripple[];

// Type for the reducer's actions
type RippleAction =
  | { type: 'ADD_RIPPLE'; payload: Ripple }
  | { type: 'REMOVE_RIPPLE'; payload: string };

// Reducer function
const rippleReducer = (
  state: RippleState,
  action: RippleAction
): RippleState => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-30);
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    default:
      return state;
  }
};

// Component definition
const RippleCursor: React.FC<RippleCursorProps> = ({
  maxSize = 40,
  duration = 800,
  blur = true,
  color = 'white',
}) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);

  const handleMouseMove = (e: MouseEvent): void => {
    const ripple: Ripple = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
    };

    dispatch({ type: 'ADD_RIPPLE', payload: ripple });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
    }, duration);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [duration]);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden z-[9999]'>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className='absolute rounded-full animate-ripple'
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${maxSize}px`,
            height: `${maxSize}px`,
            animationDuration: `${duration}ms`,
            filter: blur ? 'blur(3px)' : 'none',
            background: color === 'white'
              ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
              : `radial-gradient(circle, ${color} 0%, transparent 100%)`,
            boxShadow: color === 'white'
              ? '0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1)'
              : `0 0 15px ${color}`,
          }}
        />
      ))}
    </div>
  );
};

export default RippleCursor;

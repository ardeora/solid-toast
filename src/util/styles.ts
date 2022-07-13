import { JSX } from 'solid-js';
import { keyframes } from 'goober';

export const toastBarBase: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  background: 'white',
  color: '#363636',
  'box-shadow': '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)',
  'max-width': '350px',
  'pointer-events': 'auto',
  padding: '8px 10px',
  'border-radius': '4px',
  'line-height': '1.3',
  'will-change': 'transform',
};

export const entranceAnimation = (direction: number): string => `
0% {transform: translate3d(0,${direction * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`;
export const exitAnimation = (direction: number): string => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${direction * -150}%,-1px) scale(.4); opacity:0;}
`;
export const messageContainer: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  flex: '1 1 auto',
  margin: '4px 10px',
  'white-space': 'pre-line',
};

export const iconContainer: JSX.CSSProperties = {
  'flex-shrink': 0,
  'min-width': '20px',
  'min-height': '20px',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'text-align': 'center',
};

export const rotate = keyframes`from{transform: rotate(0deg);}to{transform: rotate(360deg);}`;

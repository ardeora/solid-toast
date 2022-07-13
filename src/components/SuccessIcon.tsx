import { iconCircle, pingCircle, icon } from '../util';
import { IconProps } from '../types';

export const Success = (props: IconProps) => {
  const mainCircle = `${iconCircle} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
  const secondaryCircle = `${pingCircle} 1s cubic-bezier(0, 0, 0.2, 1) forwards`;
  const check = `${icon} 0.2s ease-out forwards`;

  return (
    <svg style={{ overflow: 'visible' }} viewBox="0 0 32 32" width="1.25rem" height="1.25rem">
      <circle
        style={{
          animation: mainCircle,
          'transform-origin': '50% 50%',
          'animation-delay': '100ms',
          opacity: 0,
        }}
        fill={props.primary || '#34C759'}
        cx="16"
        cy="16"
        r="16"
      />
      <circle
        style={{
          animation: secondaryCircle,
          'transform-origin': '50% 50%',
          'animation-delay': '250ms',
        }}
        fill={props.primary || '#34C759'}
        cx="16"
        cy="16"
        r="12"
      />
      <path
        style={{
          animation: check,
          'stroke-dasharray': 22,
          'stroke-dashoffset': 22,
          'animation-delay': '250ms',
        }}
        fill="none"
        stroke={props.secondary || '#FCFCFC'}
        stroke-width="4"
        stroke-linecap="round"
        stroke-miterlimit="10"
        d="M9.8,17.2l3.8,3.6c0.1,0.1,0.3,0.1,0.4,0l9.6-9.7"
      />
    </svg>
  );
};

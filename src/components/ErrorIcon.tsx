import { IconProps } from '../types';

export const Error = (props: IconProps) => (
  <svg style={{ overflow: 'visible' }} viewBox="0 0 32 32" width="1.25rem" height="1.25rem">
    <circle fill={props.primary || '#FF3B30'} cx="16" cy="16" r="16">
      <animate attributeName="opacity" values="0;1" dur="0.3s" begin="100ms" fill="freeze" />
      <animate attributeName="r" values="0;16" dur="0.3s" begin="100ms" fill="freeze" />
    </circle>
    <circle fill={props.primary || '#FF3B30'} cx="16" cy="16" r="12">
      <animate attributeName="opacity" values="1;0" dur="0.25s" begin="320ms" fill="freeze" />
      <animate attributeName="r" values="12;36" dur="0.25s" begin="320ms" fill="freeze" />
    </circle>
    <path
      stroke-dasharray="9"
      stroke-dashoffset="9"
      fill="none"
      stroke={props.secondary || '#FFFFFF'}
      stroke-width="4"
      stroke-linecap="round"
      d="M16,7l0,9"
    >
      <animate attributeName="stroke-dashoffset" values="9;0" dur="0.1s" begin="200ms" fill="freeze" />
    </path>
    <circle fill={props.secondary || '#FFFFFF'} cx="16" r="2.5" opacity="0">
      <animate attributeName="opacity" values="0;1" dur="0.2s" begin="320ms" fill="freeze" />
      <animate attributeName="cy" values="16;23" dur="0.2s" begin="320ms" fill="freeze" />
    </circle>
  </svg>
);

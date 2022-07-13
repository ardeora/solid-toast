import { Component } from 'solid-js';

export const MainCircle: Component<{ fill: string }> = (props) => (
  <circle fill={props.fill} cx="16" cy="16" r="16">
    <animate attributeName="opacity" values="0;1" dur="0.3s" begin="100ms" fill="freeze" />
    <animate attributeName="r" values="0;16" dur="0.3s" begin="100ms" fill="freeze" />
  </circle>
);

export const SecondaryCircle: Component<{ fill: string }> = (props) => (
  <circle fill={props.fill} cx="16" cy="16" r="12">
    <animate attributeName="opacity" values="1;0" dur="0.25s" begin="320ms" fill="freeze" />
    <animate attributeName="r" values="12;36" dur="0.25s" begin="320ms" fill="freeze" />
  </circle>
);

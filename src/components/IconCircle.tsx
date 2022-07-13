import { Component } from 'solid-js';
import type { JSX } from 'solid-js';
import { genSVGCubicBezier } from '../util';

export const MainCircle: Component<{ fill: string }> = (props) => {
  const publicProps: JSX.AnimateSVGAttributes<SVGAnimateElement> = {
    dur: '0.3s',
    begin: '100ms',
    fill: 'freeze',
    ...genSVGCubicBezier('0.137 0.69 0.25 1'),
  };
  return (
    <circle fill={props.fill} cx="16" cy="16" r="16">
      <animate attributeName="opacity" values="0;1" {...publicProps} />
      <animate attributeName="r" values="0;16" {...publicProps} />
    </circle>
  );
};

export const SecondaryCircle: Component<{ fill: string; begin?: string }> = (props) => {
  const publicProps: JSX.AnimateSVGAttributes<SVGAnimateElement> = {
    dur: '1s',
    begin: props.begin || '320ms',
    fill: 'freeze',
    ...genSVGCubicBezier('0.0 0.0 0.2 1'),
  };
  return (
    <circle fill={props.fill} cx="16" cy="16" r="12">
      <animate attributeName="opacity" values="1; 0" {...publicProps} />
      <animate attributeName="r" values="12; 36" {...publicProps} />
    </circle>
  );
};

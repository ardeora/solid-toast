import { ToastContainerProps } from '../';
import { getToastWrapperStyles, updateToastHeight, getWrapperYAxisOffset } from '../util';
import { createEffect, createSignal, onMount } from 'solid-js';
import { defaultToastOptions, dispatch } from '../core';
import { ActionType, resolveValue } from '../types';
import { ToastBar } from './ToastBar';
import { css } from 'goober';

{/* prettier-ignore */}
const activeClass = css`z-index: 9999;> * {pointer-events: auto;}`;

export const ToastContainer = (props: ToastContainerProps) => {
  const calculatePosition = () => {
    const position = props.toast.position || defaultToastOptions.position;
    const offset = getWrapperYAxisOffset(props.toast, position);
    const positionStyle = getToastWrapperStyles(position, offset);

    return positionStyle;
  };

  const [positionStyle, setPositionStyle] = createSignal(calculatePosition());

  createEffect(() => {
    const newStyles = calculatePosition();
    setPositionStyle(newStyles);
  });

  let el: HTMLDivElement | undefined = undefined;
  onMount(() => {
    if (el) {
      updateToastHeight(el, props.toast);
    }
  });

  return (
    <div
      ref={el}
      style={positionStyle()}
      class={props.toast.visible ? activeClass : ''}
      onMouseEnter={() =>
        dispatch({
          type: ActionType.START_PAUSE,
          time: Date.now(),
        })
      }
      onMouseLeave={() =>
        dispatch({
          type: ActionType.END_PAUSE,
          time: Date.now(),
        })
      }
    >
      {props.toast.type === 'custom' ? (
        resolveValue(props.toast.message, props.toast)
      ) : (
        <ToastBar toast={props.toast} position={props.toast.position || defaultToastOptions.position} />
      )}
    </div>
  );
};

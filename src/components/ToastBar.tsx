import { createEffect, Match, Switch } from 'solid-js';
import { resolveValue, ToastBarProps } from '../types';
import { getToastYDirection as d, iconContainer, messageContainer, toastBarBase } from '../util';
import { Error, Loader, Success } from './';

export const ToastBar = (props: ToastBarProps) => {
  let el: HTMLDivElement | undefined;

  createEffect(() => {
    if (!el) return;
    const direction = d(props.toast, props.position);
    if (props.toast.visible) {
      el.animate(
        [
          { transform: `translate3d(0,${direction * -200}%,0) scale(.6)`, opacity: 0.5 },
          { transform: 'translate3d(0,0,0) scale(1)', opacity: 1 },
        ],
        {
          duration: 250,
          fill: 'forwards',
        }
      );
    } else {
      el.animate(
        [
          { transform: 'translate3d(0,0,-1px) scale(1)', opacity: 1 },
          { transform: `translate3d(0,${direction * -150}%,-1px) scale(.4)`, opacity: 0 },
        ],
        {
          duration: 400,
          fill: 'forwards',
        }
      );
    }
  });

  return (
    <div
      ref={el}
      class={props.toast.className}
      style={{
        ...toastBarBase,
        // animation: animation(),
        ...props.toast.style,
      }}
    >
      <Switch>
        <Match when={props.toast.icon}>
          <div style={iconContainer}>{props.toast.icon}</div>
        </Match>
        <Match when={props.toast.type === 'loading'}>
          <div style={iconContainer}>
            <Loader {...props.toast.iconTheme} />
          </div>
        </Match>
        <Match when={props.toast.type === 'success'}>
          <div style={iconContainer}>
            <Success {...props.toast.iconTheme} />
          </div>
        </Match>
        <Match when={props.toast.type === 'error'}>
          <div style={iconContainer}>
            <Error {...props.toast.iconTheme} />
          </div>
        </Match>
      </Switch>

      <div style={messageContainer} {...props.toast.ariaProps}>
        {resolveValue(props.toast.message, props.toast)}
      </div>
    </div>
  );
};

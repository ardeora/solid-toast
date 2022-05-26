import { keyframes } from 'goober'
import { createEffect, createSignal, Match, Switch  } from 'solid-js'
import { ToastBarProps } from '../types'
import { resolveValue } from '../types'
import { 
  toastBarBase,
  messageContainer,
  entranceAnimation,
  exitAnimation,
  iconContainer,
  getToastYDirection as d
} from '../util'
import { Success, Error, Loader } from './'

export const ToastBar = (props: ToastBarProps) => {
  const message = resolveValue(props.toast.message, props.toast)
  const [animation, setAnimation] = createSignal('');

  createEffect(() => {
    props.toast.visible ?
      setAnimation(`${keyframes(entranceAnimation(d(props.toast, props.position)))} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`) :
      setAnimation(`${keyframes(exitAnimation(d(props.toast, props.position)))}  0.4s forwards cubic-bezier(.06,.71,.55,1)`) 
  })

  return (
    <div
      class={props.toast.className} 
      style={{
        ...toastBarBase,
        animation: animation(),
        ...props.toast.style
      }} 
    >
      
      <Switch>
        <Match when={props.toast.icon} >
          <div style={iconContainer}>{props.toast.icon}</div>
        </Match>
        <Match when={props.toast.type === 'loading'} >
          <div style={iconContainer}><Loader {...props.toast.iconTheme} /></div>
        </Match>
        <Match when={props.toast.type === 'success'} >
          <div style={iconContainer}><Success {...props.toast.iconTheme}/></div>
        </Match>
        <Match when={props.toast.type === 'error'} >
          <div style={iconContainer}><Error {...props.toast.iconTheme}/></div>
        </Match>
      </Switch>

      <div style={messageContainer} {...props.toast.ariaProps} >{message}</div>
    </div>
  );
}
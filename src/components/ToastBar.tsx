import { keyframes } from 'goober'
import { createEffect, createSignal, Match, Switch,  } from 'solid-js'
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
import { Sucess, Error, Loader } from './'

export const ToastBar = (props: ToastBarProps) => {
  const message = resolveValue(props.toast.message, props.toast)
  const [animation, setAnimation] = createSignal('');

  createEffect(() => {
    if (props.toast.visible && !props.toast.updatedAt) {
      setAnimation(`${keyframes(entranceAnimation(d(props.toast, props.position)))} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`)
    }
    
    !props.toast.visible && setAnimation(`${keyframes(exitAnimation(d(props.toast, props.position)))}  0.4s forwards cubic-bezier(.06,.71,.55,1)`) 
  })

  console.log(props.toast)

  return (
    <div style={{
      ...toastBarBase,
      animation: animation()
    }} >
      
      <Switch>
        <Match when={props.toast.type === 'loading'} >
          <div style={iconContainer}><Loader /></div>
        </Match>
        <Match when={props.toast.type === 'success'} >
          <div style={iconContainer}><Sucess /></div>
        </Match>
        <Match when={props.toast.type === 'error'} >
          <div style={iconContainer}><Error /></div>
        </Match>
      </Switch>

      <div style={messageContainer} {...props.toast.ariaProps} >{message}</div>
    </div>
  );
}
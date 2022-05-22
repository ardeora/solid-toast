import { keyframes } from 'goober'
import { createEffect, createSignal } from 'solid-js'
import { ToastBarProps } from '../types'
import { resolveValue } from '../types'
import { 
  toastBarBase,
  messageContainer,
  entranceAnimation,
  exitAnimation,
  iconContainer
} from '../util'
import { Sucess } from './SuccessIcon'

export const ToastBar = (props: ToastBarProps) => {
  const message = resolveValue(props.toast.message, props.toast)
  const [animation, setAnimation] = createSignal('');

  createEffect(() => {
    props.toast.visible ?
    setAnimation(`${keyframes(entranceAnimation(1))} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`) :
    setAnimation(`${keyframes(exitAnimation(1))}  0.4s forwards cubic-bezier(.06,.71,.55,1)`) 
  })

  return (
    <div style={{
      ...toastBarBase,
      animation: animation()
    }} >
      <div style={iconContainer}>
        <Sucess />
      </div>
      <div style={messageContainer}>{message}</div>
    </div>
  );
}
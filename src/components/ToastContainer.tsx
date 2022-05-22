import { ToastContainerProps } from "../"
import { getToastWrapperStyles, updateToastHeight, getWrapperYAxisOffset } from "../util"
import { createEffect, createSignal, on, onMount } from "solid-js"
import { store, defaultToastOptions } from '../core';
import { resolveValue } from "../types";
import { ToastBar } from "./ToastBar";
import { css } from 'goober'

const activeClass = css`z-index: 9999;> * { pointer-events: auto;}`;

export const ToastContainer = (props: ToastContainerProps) => {

  const calculatePosition = () => {
    const position = props.toast.position || defaultToastOptions.position
    const offset = getWrapperYAxisOffset(props.toast, position)
    const positionStyle = getToastWrapperStyles(position, offset)

    return positionStyle
  }

  const [positionStyle, setPositionStyle] = createSignal(calculatePosition())

  createEffect(on(store, () => {
    const newStyles = calculatePosition()
    setPositionStyle(newStyles) 
  }))

  let el: (HTMLDivElement | undefined) = undefined;
  onMount(() => {
    if (el) {
      updateToastHeight(el, props.toast)
    }
  })

  return (
  <div 
    ref={el}
    style={positionStyle()}
    class={props.toast.visible ? activeClass : ''}
  >
    {
      props.toast.type === 'custom' ? 
      resolveValue(props.toast.message, props.toast) :
      <ToastBar toast={props.toast} position={props.toast.position || defaultToastOptions.position} />
    }
  </div>
  )
}
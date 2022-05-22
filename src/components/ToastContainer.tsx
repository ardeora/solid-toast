import { defaultContainerStyle } from "../core/defaults"
import { ToastContainerProps } from "../"
import { mergeContainerOptions, getToastWrapperStyles, updateToastHeight, getWrapperYAxisOffset } from "../util"
import { createEffect, onMount } from "solid-js"
import { store, defaultToastOptions } from '../core';

export const ToastContainer = (props: ToastContainerProps) => {

  createEffect(() => {
    mergeContainerOptions(props)
  })

  return (
    <div 
      style={{
      ...defaultContainerStyle,
      ...props.containerStyle
      }}
      class={props.containerClassName}
    >
      { store().toasts.map((toast) => {
        const position = toast.position || defaultToastOptions.position
        const offset = getWrapperYAxisOffset(toast, position)
        const positionStyle = getToastWrapperStyles(position, offset)

        let el: (HTMLDivElement | undefined) = undefined;
        onMount(() => {
          if (el) {
            updateToastHeight(el, toast)
          }
        })

        return (
          <div 
            ref={el}
            style={positionStyle}
          >
            Hello {toast.id} {toast.height}
          </div>
        );
      })}
    </div>
  )
}
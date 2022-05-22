import { defaultContainerStyle } from "../core"
import { ToasterProps } from ".."
import { mergeContainerOptions } from "../util"
import { createEffect, For } from "solid-js"
import { store } from '../core';
import { ToastContainer } from "./";


export const Toaster = (props: ToasterProps) => {
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
      <For each={store().toasts} >
        {(toast) => <ToastContainer toast={toast} />}
      </For>
    </div>
  )
}
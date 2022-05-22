import { ToastContainerProps, ToastOptions, ToastTimeouts } from "../types";
import { JSX } from "solid-js";

export const defaultTimeouts: ToastTimeouts = {
  blank: 4000,
  error: 4000,
  success: 2000,
  loading: Infinity,
  custom: 4000,
};

export const defaultToastOptions: Required<ToastOptions> = {
  id: '',
  icon: '',
  unmountDelay: 500,
  duration: 3000,
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
  className: '',
  style: {},
  position: 'top-right'
}

export const defaultContainerOptions: ToastContainerProps = {
  position: 'top-right',
  toastOptions: defaultToastOptions,
  gutter: 8,
  containerStyle: {},
  containerClassName: ''
}

const defaultContainerPadding = '16px'

export const defaultContainerStyle: JSX.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  top: defaultContainerPadding,
  bottom: defaultContainerPadding,
  left: defaultContainerPadding,
  right: defaultContainerPadding,
  background: '#84cc1623',
  "pointer-events": 'none'
}
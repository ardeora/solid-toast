import { ToasterContainerProps, ToastOptions, ToastTimeouts } from "../types";

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
  toastUnmountDelay: 1000,
  duration: 1000,
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
  className: '',
  style: {},
  position: 'top-right'
}

export const defaultContainerOptions: ToasterContainerProps = {
  position: 'top-right',
  toastOptions: defaultToastOptions,
  gutter: 16,
  containerStyle: {},
  containerClassName: ''
}

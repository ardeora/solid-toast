import { createSignal } from 'solid-js';
import { ToasterProps, Message, ToastType, ToastOptions, Toast, ToastHandler, ActionType } from '../types';
import { defaultToasterOptions, defaultToastOptions, defaultTimeouts } from './defaults';
import { generateID } from '../util';
import { dispatch, store } from './store';

export const [defaultOpts, setDefaultOpts] = createSignal<ToasterProps>(defaultToasterOptions);

export const createToast = (
  message: Message,
  type: ToastType = 'blank',
  options: ToastOptions
): Toast => ({
  ...defaultToastOptions,
  ...defaultOpts().toastOptions,
  ...options,
  type,
  message,
  pauseDuration: 0,
  createdAt: Date.now(),
  visible: true,
  id: options.id || generateID(),
  style: {
    ...defaultToastOptions.style,
    ...defaultOpts().toastOptions?.style,
    ...options.style
  },
  duration: options.duration || defaultOpts().toastOptions?.duration || defaultTimeouts[type]
})

const createToastCreator = (type?: ToastType): ToastHandler => (
  message: Message,
  options: ToastOptions = {}
) => {
  if (options.id) {
    const existingToast = store().toasts.find(t => t.id === options.id)
    if (existingToast) {
      const toast = {...existingToast,...options, message}
      dispatch({ type: ActionType.UPDATE_TOAST, toast})
      return toast.id;
    } 
  }
  const toast = createToast(message, type, options) 
  dispatch({ type: ActionType.ADD_TOAST, toast})
  return toast.id;
};

const toast = (message: Message, opts?: ToastOptions) =>
  createToastCreator('blank')(message, opts);

toast.error = createToastCreator('error')
toast.success = createToastCreator('success')
toast.loading = createToastCreator('loading')
toast.custom = createToastCreator('custom')

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: ActionType.DISMISS_TOAST,
    toastId
  })
}

toast.remove = (toastId?: string) => {
  dispatch({
    type: ActionType.REMOVE_TOAST,
    toastId
  })
}

export { toast }
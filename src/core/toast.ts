import { createSignal } from 'solid-js';
import { ToasterContainerProps, Message, ToastType, ToastOptions, Toast, ToastHandler, ActionType } from '../types';
import { defaultContainerOptions, defaultToastOptions, defaultTimeouts } from './defaults';
import { generateID } from '../util';
import { dispatch } from './store';

export const [defaultOpts, setDefaultOpts] = createSignal<ToasterContainerProps>(defaultContainerOptions);

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
  const toast = createToast(message, type, options);
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
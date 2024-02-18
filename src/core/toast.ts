import { createRoot, createSignal } from 'solid-js';
import { ToasterProps, Message, ToastType, ToastOptions, Toast, ToastHandler } from '../types';
import { defaultToasterOptions, defaultToastOptions, defaultTimeouts } from './defaults';
import { generateID } from '../util';
import { dispatch, store } from './store';

import { resolveValue, Renderable, ValueOrFunction, DefaultToastOptions } from '../types';

export const [defaultOpts, setDefaultOpts] = createSignal<ToasterProps>(defaultToasterOptions);

export const createToast = (message: Message, type: ToastType = 'blank', options: ToastOptions): Toast => ({
  ...defaultToastOptions,
  ...defaultOpts().toastOptions,
  ...options,
  type,
  message,
  pauseDuration: 0,
  createdAt: Date.now(),
  visible: true,
  id: options.id || generateID(),
  paused: false,
  style: {
    ...defaultToastOptions.style,
    ...defaultOpts().toastOptions?.style,
    ...options.style,
  },
  duration: options.duration || defaultOpts().toastOptions?.duration || defaultTimeouts[type],
  position:
    options.position || defaultOpts().toastOptions?.position || defaultOpts().position || defaultToastOptions.position,
});

const createToastCreator =
  (type?: ToastType): ToastHandler =>
  (message: Message, options: ToastOptions = {}) => {
    return createRoot(() => {
      const existingToast = store.toasts.find((t) => t.id === options.id) as Toast;
      const toast = createToast(message, type, { ...existingToast, duration: undefined, ...options });
      dispatch({ type: 'upsert', toast });
      return toast.id;
    });
  };

const toast = (message: Message, opts?: ToastOptions) => createToastCreator('blank')(message, opts);

toast.error = createToastCreator('error');
toast.success = createToastCreator('success');
toast.loading = createToastCreator('loading');
toast.custom = createToastCreator('custom');

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: 'dismiss',
    toastId,
  });
};

toast.promise = <T>(
  promise: Promise<T>,
  msgs: {
    loading: Renderable;
    success: ValueOrFunction<Renderable, T>;
    error: ValueOrFunction<Renderable, any>;
  },
  opts?: DefaultToastOptions
) => {
  const id = toast.loading(msgs.loading, { ...opts });

  promise
    .then((p) => {
      toast.success(resolveValue(msgs.success, p), {
        id,
        ...opts,
      });
      return p;
    })
    .catch((e) => {
      toast.error(resolveValue(msgs.error, e), {
        id,
        ...opts,
      });
    });

  return promise;
};

toast.remove = (toastId?: string) => {
  dispatch({
    type: 'remove',
    toastId,
  });
};

export { toast };

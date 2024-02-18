import { JSX } from 'solid-js';

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type Renderable = JSX.Element | string | null;

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function';

export const resolveValue = <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg): TValue =>
  isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;

export interface IconTheme {
  primary?: string;
  secondary?: string;
}

export interface Toast {
  id: string;
  icon?: Renderable;
  duration?: number;
  message: ValueOrFunction<Renderable, Toast>;
  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  className?: string;
  style?: JSX.CSSProperties;
  position?: ToastPosition;
  unmountDelay: number;
  iconTheme?: IconTheme;

  pauseDuration: number;
  paused: boolean;
  type: ToastType;
  createdAt: number;
  updatedAt?: number;
  visible: boolean;
  height?: number;
}

export type ToastOptions = Partial<
  Pick<
    Toast,
    'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'unmountDelay' | 'iconTheme'
  >
>;

export type ToastTimeouts = {
  [key in ToastType]: number;
};

export type DefaultToastOptions = ToastOptions;

export type Message = ValueOrFunction<Renderable, Toast>;

export type ToastHandler = (message: Message, options?: ToastOptions) => string;

export interface ToasterProps {
  position?: ToastPosition;
  toastOptions?: DefaultToastOptions;
  gutter?: number;
  containerStyle?: JSX.CSSProperties;
  containerClassName?: string;
}

export interface ToastContainerProps {
  toast: Toast;
}

export interface ToastBarProps {
  toast: Toast;
  position: ToastPosition;
}

export type IconProps = Partial<IconTheme>;

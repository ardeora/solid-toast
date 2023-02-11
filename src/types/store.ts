import { Toast, ToastOptions } from './';

export type Action =
  | {
      type: 'add';
      toast: Toast;
    }
  | {
      type: 'upsert';
      toast: Toast;
    }
  | {
      type: 'update';
      toast: Partial<Toast>;
    }
  | {
      type: 'dismiss';
      toastId?: string;
    }
  | {
      type: 'remove';
      toastId?: string;
    }
  | {
      type: 'start_pause';
      time: number;
    }
  | {
      type: 'end_pause';
      time: number;
    };

export interface State {
  toasts: Toast[];
  pausedAt: number | undefined;
}

export interface InitOptions {
  options: ToastOptions[];
}

import { Toast } from './';

export type ActionType = 'add' | 'update' | 'upsert' | 'dismiss' | 'remove' | 'pause' | 'resume';

export type Action<T extends ActionType> = (T extends 'add' | 'upsert' | 'update'
  ? {
      toast: T extends 'update' ? Partial<Toast> : Toast;
    }
  : T extends 'dismiss' | 'remove'
  ? { toastId?: string }
  : T extends 'pause' | 'resume'
  ? { time: number }
  : {}) & { type: T };

export interface State {
  toasts: Toast[];
  pausedAt: number | undefined;
}

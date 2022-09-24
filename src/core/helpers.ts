import { Toast } from '../types';
import { dispatch } from './store';

const removalQueue = new Map<Toast['id'], ReturnType<typeof setTimeout>>();
export const scheduleRemoval = (toastId: string, unmountDelay: number) => {
  if (removalQueue.has(toastId)) return;

  const timeout = setTimeout(() => {
    removalQueue.delete(toastId);
    dispatch({
      type: 'remove',
      toastId,
    });
  }, unmountDelay);

  removalQueue.set(toastId, timeout);
};

export const unscheduleRemoval = (toastId: string) => {
  const timeout = removalQueue.get(toastId);
  removalQueue.delete(toastId);
  if (timeout) clearTimeout(timeout);
};

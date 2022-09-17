import { Action, Toast } from '../types';
import { dispatch, setStore, store } from './store';
import { produce as p } from 'solid-js/store';
import { scheduleRemoval, unscheduleRemoval } from './helpers';

export function add(action: Action<'add'>) {
  setStore('toasts', (t) => {
    const toasts = t as Toast[];
    return [action.toast, ...toasts];
  });
}

export function dismiss(action: Action<'dismiss'>) {
  const { toastId } = action;
  const toasts = store.toasts;
  if (toastId) {
    const toastToRemove = toasts.find((t) => t.id === toastId);
    if (toastToRemove) scheduleRemoval(toastId, toastToRemove.unmountDelay);
    setStore(
      'toasts',
      (t) => t.id === toastId,
      p((t) => (t.visible = false))
    );
  } else {
    toasts.forEach((t) => {
      scheduleRemoval(t.id, t.unmountDelay);
    });
    setStore(
      'toasts',
      (t) => t.id !== undefined,
      p((t) => (t.visible = false))
    );
  }
}

export function remove(action: Action<'remove'>) {
  if (!action.toastId) {
    setStore('toasts', []);
    return;
  }
  setStore('toasts', (t) => {
    const toasts = t as Toast[];
    return toasts.filter((t) => t.id !== action.toastId);
  });
}

export function update(action: Action<'update'>) {
  if (action.toast.id) {
    unscheduleRemoval(action.toast.id);
  }
  setStore(
    'toasts',
    (t) => t.id === action.toast.id,
    (t) => {
      const toast = t as Toast;
      return {
        ...toast,
        ...action.toast,
      };
    }
  );
}

export function upsert(action: Action<'upsert'>) {
  dispatch({
    type: store.toasts.find((t) => t.id === action.toast.id) ? 'update' : 'add',
    toast: action.toast,
  });
}

export function pause(_action: Action<'pause'>) {
  setStore(
    p((s) => {
      s.pausedAt = Date.now();
      s.toasts.forEach((t) => {
        t.paused = true;
      });
    })
  );
}

export function resume(action: Action<'resume'>) {
  const pauseInterval = action.time - (store.pausedAt || 0);
  setStore(
    p((s) => {
      s.pausedAt = undefined;
      s.toasts.forEach((t) => {
        t.pauseDuration += pauseInterval;
        t.paused = false;
      });
    })
  );
}

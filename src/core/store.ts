import { State, Action, ActionType } from '../types';
import { createStore } from 'solid-js/store';
import { isAction } from '../util';
import { add, dismiss, pause, resume, update, upsert } from './actions';

export const [store, setStore] = createStore<State>({
  toasts: [],
  pausedAt: undefined,
});

export const createTimers = () => {
  const { pausedAt, toasts } = store;
  if (pausedAt) return;
  const now = Date.now();
  const timers = toasts.map((toast) => {
    if (toast.duration === Infinity) return;
    const durationLeft = (toast.duration || 0) + toast.pauseDuration - (now - toast.createdAt);
    if (durationLeft <= 0) {
      if (toast.visible) {
        dispatch({
          type: 'dismiss',
          toastId: toast.id,
        });
      }
      return;
    }
    return setTimeout(() => {
      dispatch({
        type: 'dismiss',
        toastId: toast.id,
      });
    }, durationLeft);
  });
  return timers;
};

export const dispatch = <T extends ActionType>(action: Action<T>) => {
  if (isAction(action, 'add')) {
    add(action);
  } else if (isAction(action, 'dismiss')) {
    dismiss(action);
  } else if (isAction(action, 'update')) {
    update(action);
  } else if (isAction(action, 'upsert')) {
    upsert(action);
  } else if (isAction(action, 'pause')) {
    pause(action);
  } else if (isAction(action, 'resume')) {
    resume(action);
  } else {
    throw new Error(`Action type ${action.type} is not supported`);
  }
};

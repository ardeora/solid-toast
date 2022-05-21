import { createSignal } from 'solid-js';
import { State, Action, ActionType, Toast } from '../types';

const [store, setStore] = createSignal<State>({
  toasts: [],
  pausedAt: undefined,
})

const removalQueue = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

export const scheduleRemoval = (toastId: string, unmountDelay: number) => {
  if(removalQueue.has(toastId)) return;

  const timeout = setInterval(() => {
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId
    })
  }, unmountDelay)

  removalQueue.set(toastId, timeout)
}

export const unscheduleRemoval = (toastId: string) => {
  const timeout = removalQueue.get(toastId)
  if (timeout) clearTimeout(timeout)
}

export const dispatch = (action: Action) => {
  switch(action.type) {
    case ActionType.ADD_TOAST:
      setStore(s => ({
        ...s,
        toasts: [action.toast, ...s.toasts]
      }))
      break;
    case ActionType.DISMISS_TOAST:
      break;
  }
}

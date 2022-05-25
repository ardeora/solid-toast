import { createSignal } from 'solid-js';
import { State, Action, ActionType, Toast } from '../types';

const [store, setStore] = createSignal<State>({
  toasts: [],
  pausedAt: undefined,
})

export const createTimers = () => {
  const { pausedAt, toasts } = store()
  if(pausedAt) return;
  const now = Date.now()
  const timers = toasts.map(toast => {
    if(toast.duration === Infinity) return;

    const durationLeft = (toast.duration || 0) + toast.pauseDuration - (now - toast.createdAt)

    if (durationLeft <= 0) {
      if(toast.visible) {
        dispatch({
          type: ActionType.DISMISS_TOAST,
          toastId: toast.id
        })
      }
      return;
    }

    return setTimeout(() => {
      dispatch({
        type: ActionType.DISMISS_TOAST,
        toastId: toast.id
      })
    }, durationLeft)
  })

  return timers
}

const removalQueue = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

const scheduleRemoval = (toastId: string, unmountDelay: number) => {
  if(removalQueue.has(toastId)) return;

  const timeout = setTimeout(() => {
    removalQueue.delete(toastId);
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId
    })
  }, unmountDelay)

  removalQueue.set(toastId, timeout)
}

const unscheduleRemoval = (toastId: string) => {
  const timeout = removalQueue.get(toastId)
  removalQueue.delete(toastId);
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
      const { toastId } = action
      const toasts = store().toasts

      if (toastId) {
        const toastToRemove = toasts.find(t => t.id === toastId)
        if (toastToRemove) scheduleRemoval(toastId, toastToRemove.unmountDelay)
      } else {
        toasts.forEach(t => {
          scheduleRemoval(t.id, t.unmountDelay)
        })
      }

      setStore(s => ({
        ...s,
        toasts: s.toasts.map(t => {
          if(t.id === toastId) {
            return {...t, visible: false}
          }
          return t
        })
      }))
      break;
    case ActionType.REMOVE_TOAST:
      if (!action.toastId) {
        setStore(s => ({ ...s, toasts: [] }))
        break;
      }
      setStore(s => ({
        ...s,
        toasts: s.toasts.filter(t => t.id !== action.toastId)
      }))
      break;
    case ActionType.UPDATE_TOAST:
      if (action.toast.id) {
        unscheduleRemoval(action.toast.id)
      }
      setStore(s => ({
        ...s,
        toasts: s.toasts.map(t => (
          t.id === action.toast.id ? 
          { ...t, ...action.toast, updatedAt: action.silent ? undefined : Date.now() } : 
          t  
        ))
      }))
      break;
    case ActionType.UPSERT_TOAST:
      store().toasts.find(t => t.id === action.toast.id) ?
      dispatch({ type: ActionType.UPDATE_TOAST, toast: action.toast}) :
      dispatch({ type: ActionType.ADD_TOAST, toast: action.toast})
      break;
    case ActionType.START_PAUSE:
      setStore(s => ({ ...s, pausedAt: action.time }))
      break;
    case ActionType.END_PAUSE:
      const pauseInterval = action.time - (store().pausedAt || 0)
      setStore(s => ({
        ...s,
        pausedAt: undefined,
        toasts: s.toasts.map(t => ({
          ...t,
          pauseDuration: t.pauseDuration + pauseInterval
        }))
      }))
      break;
  }
}

export { store };
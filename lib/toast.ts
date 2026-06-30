type ToastListener = (message: string) => void
const _listeners: ToastListener[] = []

export function showToast(message: string) {
  _listeners.forEach(fn => fn(message))
}

export function subscribeToast(fn: ToastListener): () => void {
  _listeners.push(fn)
  return () => {
    const i = _listeners.indexOf(fn)
    if (i !== -1) _listeners.splice(i, 1)
  }
}

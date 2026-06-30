import { showToast } from './toast'

export async function openResume(url = '/resume.pdf') {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    if (!res.ok) {
      showToast('Resume is currently being updated.')
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch {
    showToast('Resume is currently being updated.')
  }
}

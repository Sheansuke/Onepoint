import { toast } from 'react-toastify'

export type NotificationType = 'success' | 'error' | 'info' | 'warn'

export const showNotification = (message: string, type: NotificationType) => {
  switch (type) {
    case 'success':
      return toast.success(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })

    case 'info':
      return toast.info(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })

    case 'error':
      return toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })

    case 'warn':
      return toast.warn(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      
    default:
      return;
  }
}

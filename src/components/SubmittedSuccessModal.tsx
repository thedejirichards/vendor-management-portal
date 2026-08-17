import { Check } from 'lucide-react'
import Modal from './Modal'

interface SubmittedSuccessModalProps {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
  closeLabel?: string
}

export default function SubmittedSuccessModal({
  open,
  onClose,
  title = 'Submitted Successfully',
  message = 'The request has been submitted.',
  closeLabel = 'Close',
}: SubmittedSuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-slate-500">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700"
        >
          {closeLabel}
        </button>
      </div>
    </Modal>
  )
}

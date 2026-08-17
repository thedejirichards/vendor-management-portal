import { Check } from 'lucide-react'
import Modal from './Modal'

interface DeactivatedSuccessModalProps {
  open: boolean
  onClose: () => void
}

export default function DeactivatedSuccessModal({ open, onClose }: DeactivatedSuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900">Deactivated Successfully</h3>
        <p className="mt-1 text-slate-500">The selected vendor has been deactivated</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

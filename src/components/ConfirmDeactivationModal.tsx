import { AlertCircle } from 'lucide-react'
import Modal from './Modal'

interface ConfirmDeactivationModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDeactivationModal({ open, onCancel, onConfirm }: ConfirmDeactivationModalProps) {
  return (
    <Modal open={open} onClose={onCancel}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-100 text-slate-400">
        <AlertCircle className="h-5 w-5" />
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-900">Confirm Deactivation</h3>
      <p className="mt-1 text-slate-500">Are you sure you want to deactivate this vendor?</p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-lg bg-red-700 py-3 font-semibold text-white hover:bg-red-800"
        >
          Yes
        </button>
      </div>
    </Modal>
  )
}

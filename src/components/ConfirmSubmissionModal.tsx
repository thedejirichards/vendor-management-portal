import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import Modal from './Modal'

interface ConfirmSubmissionModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  title?: string
  message?: ReactNode
  confirmLabel?: string
  confirmClassName?: string
}

export default function ConfirmSubmissionModal({
  open,
  onCancel,
  onConfirm,
  title = 'Confirm Submission',
  message = 'Are you sure you want to submit?',
  confirmLabel = 'Yes',
  confirmClassName = 'bg-brand-600 text-white hover:bg-brand-700',
}: ConfirmSubmissionModalProps) {
  return (
    <Modal open={open} onClose={onCancel}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-100 text-slate-400">
        <AlertCircle className="h-5 w-5" />
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-slate-500">{message}</p>

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
          className={`flex-1 rounded-lg py-3 font-semibold ${confirmClassName}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

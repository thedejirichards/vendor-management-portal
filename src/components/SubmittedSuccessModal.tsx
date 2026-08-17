import { Check, Mail } from 'lucide-react'
import Modal from './Modal'

interface SubmittedSuccessModalProps {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
  closeLabel?: string
  sharedWithEmails?: string[]
  onViewReport?: () => void
}

export default function SubmittedSuccessModal({
  open,
  onClose,
  title = 'Submitted Successfully',
  message = 'The request has been submitted.',
  closeLabel = 'Close',
  sharedWithEmails,
  onViewReport,
}: SubmittedSuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-slate-500">{message}</p>

        {sharedWithEmails && sharedWithEmails.length > 0 && (
          <div className="mt-4 w-full rounded-lg bg-slate-50 p-3 text-left">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Mail className="h-3.5 w-3.5" />
              Report shared with
            </p>
            <p className="mt-1.5 text-xs text-slate-600">{sharedWithEmails.join(', ')}</p>
          </div>
        )}

        {onViewReport && (
          <button
            type="button"
            onClick={onViewReport}
            className="mt-6 w-full rounded-lg border border-brand-600 py-3 font-semibold text-brand-600 hover:bg-brand-50"
          >
            View Report
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className={`w-full rounded-lg bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 ${onViewReport ? 'mt-3' : 'mt-6'}`}
        >
          {closeLabel}
        </button>
      </div>
    </Modal>
  )
}

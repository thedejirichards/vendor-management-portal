import type { DeactivationStatus } from '../types/deactivation'

const styles: Record<DeactivationStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Inactive: 'bg-slate-100 text-slate-500 border-slate-200',
}

export default function DeactivationStatusBadge({ status }: { status: DeactivationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

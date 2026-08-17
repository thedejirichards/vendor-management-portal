import type { DueDiligenceStatus } from '../types/dueDiligence'

const styles: Record<DueDiligenceStatus, string> = {
  Pending: 'bg-amber-50 text-amber-600 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
  Completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Rejected: 'bg-red-50 text-red-600 border-red-200',
}

export default function DueDiligenceStatusBadge({ status }: { status: DueDiligenceStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

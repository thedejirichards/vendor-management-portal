import type { OnboardingStatus } from '../types/onboarding'

const styles: Record<OnboardingStatus, string> = {
  Invited: 'bg-violet-50 text-violet-600 border-violet-200',
  Pending: 'bg-amber-50 text-amber-600 border-amber-200',
  'In Review': 'bg-blue-50 text-blue-600 border-blue-200',
  Approved: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Rejected: 'bg-red-50 text-red-600 border-red-200',
}

export default function OnboardingStatusBadge({ status }: { status: OnboardingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

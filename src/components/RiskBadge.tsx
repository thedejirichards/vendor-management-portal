import type { RiskCategory } from '../types/vendor'

const styles: Record<RiskCategory, string> = {
  'High Risk': 'bg-red-50 text-red-600 border-red-200',
  'Medium Risk': 'bg-amber-50 text-amber-600 border-amber-200',
  'Low Risk': 'bg-emerald-50 text-emerald-600 border-emerald-200',
}

export default function RiskBadge({ category }: { category: RiskCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[category]}`}
    >
      {category}
    </span>
  )
}

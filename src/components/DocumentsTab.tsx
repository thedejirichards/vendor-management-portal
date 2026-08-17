import DocumentCategoryCard from './DocumentCategoryCard'
import type { DocumentCategory } from '../types/document'

interface DocumentsTabProps {
  categories: DocumentCategory[]
  onNext: () => void
  onBack?: () => void
}

export default function DocumentsTab({ categories, onNext, onBack }: DocumentsTabProps) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-6">
      <div className="divide-y divide-slate-200">
        {categories.map((category) => (
          <DocumentCategoryCard key={category.title} category={category} />
        ))}
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 py-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}

import { AlertTriangle, CalendarDays, CheckCircle2, Download, Eye, Flag, FileText } from 'lucide-react'
import type { DocumentComparisonItem, DocumentVersion } from '../types/document'

interface DocumentReviewTabProps {
  items: DocumentComparisonItem[]
  deactivationRecommended: boolean
  onRecommendDeactivation: () => void
  onBack?: () => void
  onNext: () => void
  readOnly?: boolean
}

function DocumentVersionCard({
  version,
  badgeLabel,
  badgeClassName,
}: {
  version: DocumentVersion
  badgeLabel: string
  badgeClassName: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="break-all text-sm font-semibold text-slate-900">{version.name}</p>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClassName}`}>
          {badgeLabel}
        </span>
      </div>
      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
        <CalendarDays className="h-3.5 w-3.5" />
        {version.uploadedLabel}
        <span className="mx-0.5">&middot;</span>
        {version.sizeLabel}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
      </div>
    </div>
  )
}

export default function DocumentReviewTab({
  items,
  deactivationRecommended,
  onRecommendDeactivation,
  onBack,
  onNext,
  readOnly = false,
}: DocumentReviewTabProps) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold text-slate-900">Document Review</h2>
      <p className="mt-1 text-sm text-slate-500">Compare existing documents with newly uploaded versions</p>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[200px_1fr_1fr] gap-4 border-b border-slate-200 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span>Document Type</span>
            <span>Existing Document</span>
            <span>New Uploaded Document</span>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.docId} className="grid grid-cols-[200px_1fr_1fr] items-start gap-4 py-5">
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">ID: {item.docId}</p>
                  </div>
                </div>

                <DocumentVersionCard
                  version={item.existing}
                  badgeLabel="Existing"
                  badgeClassName="bg-slate-100 text-slate-600"
                />

                {item.updated ? (
                  <DocumentVersionCard
                    version={item.updated}
                    badgeLabel="New Upload"
                    badgeClassName="bg-brand-50 text-brand-600"
                  />
                ) : (
                  <div className="flex h-full min-h-[92px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 text-center text-sm text-slate-400">
                    No new document uploaded
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {deactivationRecommended ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-700">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Deactivation has been recommended for this vendor
        </div>
      ) : readOnly ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
          <AlertTriangle className="h-5 w-5 shrink-0 text-slate-400" />
          The maker has not recommended this vendor for deactivation
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-700">No Longer in business with the bank.</p>
              <p className="text-sm text-red-500">Inactive vendor of the bank</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRecommendDeactivation}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800"
          >
            <Flag className="h-4 w-4" />
            Recommend Deactivation
          </button>
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
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

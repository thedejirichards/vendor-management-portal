import { businessAssessmentFields } from '../data/businessAssessmentFields'
import type { AssessmentSummaryValues } from '../types/assessment'

interface BusinessAssessmentTabProps {
  values: AssessmentSummaryValues
  onChange: (key: string, value: string) => void
  onBack: () => void
  readOnly?: boolean
  isFinalTab?: boolean
  onNext?: () => void
  onSubmit?: () => void
  submitDisabled?: boolean
}

export default function BusinessAssessmentTab({
  values,
  onChange,
  onBack,
  readOnly = false,
  isFinalTab = true,
  onNext,
  onSubmit,
  submitDisabled = false,
}: BusinessAssessmentTabProps) {
  function handleFillTestData() {
    for (const field of businessAssessmentFields) {
      onChange(field.key, field.sampleValue)
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Business Assessment</h2>
          <p className="mt-1 text-sm text-slate-500">Complete the assessment for this vendor</p>
        </div>
        {!readOnly && (
          <button
            type="button"
            onClick={handleFillTestData}
            className="shrink-0 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Fill Test Data
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {businessAssessmentFields.map((field) => (
          <div key={field.key}>
            <label htmlFor={field.key} className="text-sm font-semibold text-slate-800">
              {field.label} <span className="text-red-500">*</span>
            </label>
            <textarea
              id={field.key}
              rows={3}
              placeholder={field.placeholder}
              value={values[field.key] ?? ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              readOnly={readOnly}
              className={`mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                readOnly ? 'bg-slate-50 text-slate-600' : 'focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
        {!isFinalTab ? (
          <button
            type="button"
            onClick={onNext}
            className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            Next
          </button>
        ) : (
          !readOnly && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitDisabled}
              className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              Submit Review
            </button>
          )
        )}
      </div>
    </div>
  )
}

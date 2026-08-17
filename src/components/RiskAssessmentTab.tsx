import {
  likelihoodOptions,
  impactOptions,
  computeRiskScore,
  getInherentRiskCategory,
  sampleOperationalRiskEntry,
} from '../data/operationalRisk'
import type { OperationalRiskEntry, RiskLevel } from '../types/assessment'

interface RiskAssessmentTabProps {
  value: OperationalRiskEntry
  onChange: (value: OperationalRiskEntry) => void
  onBack: () => void
  readOnly?: boolean
  title?: string
  subtitle?: string
  isFinalTab?: boolean
  onNext?: () => void
  onSubmit?: () => void
  submitDisabled?: boolean
  onApprove?: () => void
  onReject?: () => void
  comment?: string
  onCommentChange?: (value: string) => void
}

export default function RiskAssessmentTab({
  value,
  onChange,
  onBack,
  readOnly = false,
  title = 'Risk Assessment',
  subtitle = 'Provide detailed risk assessment for this vendor',
  isFinalTab = true,
  onNext,
  onSubmit,
  submitDisabled,
  onApprove,
  onReject,
  comment = '',
  onCommentChange,
}: RiskAssessmentTabProps) {
  const riskScore = computeRiskScore(value.likelihood, value.impact)
  const category = getInherentRiskCategory(riskScore)

  function update<K extends keyof OperationalRiskEntry>(key: K, next: OperationalRiskEntry[K]) {
    onChange({ ...value, [key]: next })
  }

  function handleFillTestData() {
    onChange(sampleOperationalRiskEntry)
  }

  const inputClassName = `mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
    readOnly ? 'bg-slate-50 text-slate-600' : 'focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20'
  }`

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
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
        <div>
          <label htmlFor="risk" className="text-sm font-semibold text-slate-800">
            Risk <span className="text-red-500">*</span>
          </label>
          <input
            id="risk"
            type="text"
            placeholder="Enter risk name or identifier..."
            value={value.risk}
            onChange={(e) => update('risk', e.target.value)}
            readOnly={readOnly}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-semibold text-slate-800">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Provide detailed description of the risk..."
            value={value.description}
            onChange={(e) => update('description', e.target.value)}
            readOnly={readOnly}
            className={`resize-none ${inputClassName}`}
          />
        </div>

        <div>
          <label htmlFor="likelihood" className="text-sm font-semibold text-slate-800">
            Likelihood (1-5) <span className="text-red-500">*</span>
          </label>
          <select
            id="likelihood"
            value={value.likelihood ?? ''}
            onChange={(e) => update('likelihood', (e.target.value ? (Number(e.target.value) as RiskLevel) : null))}
            disabled={readOnly}
            className={`${inputClassName} ${readOnly ? '' : 'bg-white'}`}
          >
            <option value="">Select likelihood...</option>
            {likelihoodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="impact" className="text-sm font-semibold text-slate-800">
            Impact (1-5) <span className="text-red-500">*</span>
          </label>
          <select
            id="impact"
            value={value.impact ?? ''}
            onChange={(e) => update('impact', (e.target.value ? (Number(e.target.value) as RiskLevel) : null))}
            disabled={readOnly}
            className={`${inputClassName} ${readOnly ? '' : 'bg-white'}`}
          >
            <option value="">Select impact...</option>
            {impactOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">Risk Score (Auto-calculated)</p>
          <div className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            {riskScore ?? '-'}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">Inherent Risk Category (Auto-calculated)</p>
          <div className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            {category?.label ?? '-'}
          </div>
        </div>

        <div>
          <label htmlFor="controlsInPlace" className="text-sm font-semibold text-slate-800">
            Controls in Place <span className="text-red-500">*</span>
          </label>
          <textarea
            id="controlsInPlace"
            rows={3}
            placeholder="Describe the controls currently in place to mitigate this risk..."
            value={value.controlsInPlace}
            onChange={(e) => update('controlsInPlace', e.target.value)}
            readOnly={readOnly}
            className={`resize-none ${inputClassName}`}
          />
        </div>
      </div>

      {isFinalTab && readOnly && (
        <div className="mt-6">
          <label htmlFor="risk-assessment-comment" className="text-sm font-semibold text-slate-800">
            Comment
          </label>
          <textarea
            id="risk-assessment-comment"
            rows={3}
            placeholder="Add a comment (optional)..."
            value={comment}
            onChange={(e) => onCommentChange?.(e.target.value)}
            className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
      )}

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
        ) : readOnly ? (
          <>
            <button
              type="button"
              onClick={onReject}
              className="rounded-lg border border-brand-600 bg-white px-6 py-2.5 font-semibold text-brand-600 hover:bg-brand-50"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={onApprove}
              className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700"
            >
              Approve
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitDisabled}
            className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            Submit Review
          </button>
        )}
      </div>
    </div>
  )
}

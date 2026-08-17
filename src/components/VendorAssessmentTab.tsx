import {
  ratingOptions,
  riskAssessmentParameters,
  scoreForRating,
  getRiskBand,
  testScoreScenarios,
} from '../data/riskAssessmentParameters'
import type { RatingKey, RiskAssessmentRatings } from '../types/assessment'

interface VendorAssessmentTabProps {
  ratings: RiskAssessmentRatings
  onRate: (parameterKey: string, rating: RatingKey) => void
  onBack: () => void
  readOnly?: boolean
  isFinalTab?: boolean
  onNext?: () => void
  onSubmit?: () => void
  submitDisabled?: boolean
  onApprove?: () => void
  onReject?: () => void
  comment?: string
  onCommentChange?: (value: string) => void
}

function formatScore(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

export default function VendorAssessmentTab({
  ratings,
  onRate,
  onBack,
  readOnly = false,
  isFinalTab = true,
  onNext,
  onSubmit,
  submitDisabled,
  onApprove,
  onReject,
  comment = '',
  onCommentChange,
}: VendorAssessmentTabProps) {
  const totalScore = riskAssessmentParameters.reduce(
    (sum, param) => sum + scoreForRating(param.maxScore, ratings[param.key] ?? null),
    0,
  )
  const band = getRiskBand(totalScore)

  function applyScenario(ratings: Record<string, RatingKey>) {
    for (const [paramKey, rating] of Object.entries(ratings)) {
      onRate(paramKey, rating)
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Vendor Risk Assessment</h2>
          <p className="mt-1 text-sm text-slate-500">
            Select the capacity rating for each parameter. The score will be calculated based on the maximum
            obtainable mark and the rating multiplier.
          </p>
        </div>
        {!readOnly && (
          <div className="flex flex-wrap gap-2">
            {testScoreScenarios.map((scenario) => (
              <button
                key={scenario.key}
                type="button"
                onClick={() => applyScenario(scenario.ratings)}
                className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {scenario.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {riskAssessmentParameters.map((param) => {
          const selected = ratings[param.key] ?? null
          const calculated = scoreForRating(param.maxScore, selected)

          return (
            <div key={param.key} className="rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">
                  {param.label} <span className="text-red-500">*</span>
                </p>
                <p className="text-xs text-slate-400">Max Score: {param.maxScore}</p>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ratingOptions.map((option) => {
                  const isSelected = selected === option.key
                  const value = param.maxScore * option.multiplier
                  const stateClassName = isSelected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : readOnly
                      ? 'border-slate-200 text-slate-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  return (
                    <button
                      key={option.key}
                      type="button"
                      disabled={readOnly}
                      onClick={() => onRate(param.key, option.key)}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${stateClassName} ${
                        readOnly ? 'cursor-not-allowed' : ''
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-semibold">{option.label}</span>
                        <span className={`block text-xs ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
                          {option.multiplierLabel}
                        </span>
                      </span>
                      <span className="text-sm font-bold">{formatScore(value)}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5 text-sm">
                <span className="text-slate-500">Calculated Score:</span>
                <span className="font-bold text-slate-900">
                  {formatScore(calculated)} / {param.maxScore}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-900">Total Assessment Score</p>
            <p className="mt-1 text-sm text-slate-500">Aggregate score based on all assessment parameters</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">
              {formatScore(totalScore)}
              <span className="ml-1 text-sm font-medium text-slate-400">out of 100</span>
            </p>
            <span
              className={`mt-1 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${band.className}`}
            >
              {band.label}
            </span>
          </div>
        </div>
      </div>

      {isFinalTab && readOnly && (
        <div className="mt-6">
          <label htmlFor="vendor-assessment-comment" className="text-sm font-semibold text-slate-800">
            Comment
          </label>
          <textarea
            id="vendor-assessment-comment"
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

import { assessmentSummaryFields } from '../data/assessmentSummaryFields'
import { riskAssessmentParameters, scoreForRating, getRiskBand } from '../data/riskAssessmentParameters'
import type { AssessmentSummaryValues, RiskAssessmentRatings } from '../types/assessment'

interface MakersAssessmentTabProps {
  summaryValues: AssessmentSummaryValues
  ratings: RiskAssessmentRatings
  submittedLabel: string
  onNext: () => void
}

function formatScore(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

export default function MakersAssessmentTab({ summaryValues, ratings, submittedLabel, onNext }: MakersAssessmentTabProps) {
  const totalScore = riskAssessmentParameters.reduce(
    (sum, param) => sum + scoreForRating(param.maxScore, ratings[param.key] ?? null),
    0,
  )
  const band = getRiskBand(totalScore)

  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Vendor Risk Assessment</h2>
        <p className="mt-1 text-sm text-slate-500">Submitted by ICSG Reviewer on {submittedLabel}</p>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-brand-600 p-6">
          <div>
            <p className="text-sm font-medium text-white/70">Overall Assessment Score</p>
            <p className="mt-1 text-4xl font-extrabold text-white">
              {formatScore(totalScore)} <span className="text-lg font-medium text-white/70">/ 100</span>
            </p>
          </div>
          <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${band.className}`}>
            {band.label}
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900">Assessment Parameters</h3>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {riskAssessmentParameters.map((param) => {
              const calculated = scoreForRating(param.maxScore, ratings[param.key] ?? null)
              const percent = param.maxScore > 0 ? (calculated / param.maxScore) * 100 : 0
              return (
                <div key={param.key} className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-700">{param.label}</p>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                      <div className="h-1.5 rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="w-4 text-right text-sm font-bold text-brand-600">{formatScore(calculated)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-bold text-slate-900">Assessment Summary</h3>
        <div className="mt-4 flex flex-col gap-5">
          {assessmentSummaryFields.map((field) => (
            <div key={field.key}>
              <p className="text-sm font-semibold text-slate-800">{field.label}:</p>
              <p className="mt-1 text-sm text-slate-600">{summaryValues[field.key] || '-'}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
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

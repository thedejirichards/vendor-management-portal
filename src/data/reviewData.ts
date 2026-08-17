import type { AssessmentSummaryValues, OperationalRiskEntry, RiskAssessmentRatings } from '../types/assessment'

export interface SubmissionReviewData {
  summaryValues: AssessmentSummaryValues
  ratings: RiskAssessmentRatings
  operationalRisk?: OperationalRiskEntry
  businessAssessmentValues?: AssessmentSummaryValues
}

const STORAGE_KEY = 'tprm-review-data'

function readStore(): Record<string, SubmissionReviewData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getReviewData(submissionId: string): SubmissionReviewData | undefined {
  return readStore()[submissionId]
}

export function saveReviewData(submissionId: string, data: SubmissionReviewData) {
  const store = readStore()
  store[submissionId] = data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

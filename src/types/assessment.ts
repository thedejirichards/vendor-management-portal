export type RatingKey = 'satisfactory' | 'acceptable' | 'needsImprovement' | 'unsatisfactory'

export interface AssessmentSummaryField {
  key: string
  label: string
  placeholder: string
  sampleValue: string
}

export interface RiskAssessmentParameter {
  key: string
  label: string
  maxScore: number
}

export type AssessmentSummaryValues = Record<string, string>
export type RiskAssessmentRatings = Record<string, RatingKey | null>

export type RiskLevel = 1 | 2 | 3 | 4 | 5

export interface OperationalRiskEntry {
  risk: string
  description: string
  likelihood: RiskLevel | null
  impact: RiskLevel | null
  controlsInPlace: string
}

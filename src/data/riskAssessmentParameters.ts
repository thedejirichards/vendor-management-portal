import type { RatingKey, RiskAssessmentParameter } from '../types/assessment'

export const riskAssessmentParameters: RiskAssessmentParameter[] = [
  { key: 'managementCapability', label: 'Management Capability', maxScore: 15 },
  { key: 'regulatoryCompliance', label: 'Regulatory Compliance', maxScore: 20 },
  { key: 'dataPrivacyManagement', label: 'Data Privacy Management', maxScore: 10 },
  { key: 'trainingAndDevelopment', label: 'Training and Development', maxScore: 15 },
  { key: 'technicalCompetence', label: 'Technical Competence', maxScore: 15 },
  { key: 'disasterRecoveryEffectiveness', label: 'Effectiveness of Disaster Recovery', maxScore: 10 },
  { key: 'policyProcedureAdequacy', label: 'Adequacy of Policy and Procedure', maxScore: 15 },
]

export const ratingOptions: { key: RatingKey; label: string; multiplier: number; multiplierLabel: string }[] = [
  { key: 'satisfactory', label: 'Satisfactory', multiplier: 1, multiplierLabel: '1x multiplier' },
  { key: 'acceptable', label: 'Acceptable', multiplier: 0.5, multiplierLabel: '0.5x multiplier' },
  { key: 'needsImprovement', label: 'Needs Improvement', multiplier: 0.3, multiplierLabel: '0.3x multiplier' },
  { key: 'unsatisfactory', label: 'Unsatisfactory', multiplier: 0, multiplierLabel: '0x multiplier' },
]

export function scoreForRating(maxScore: number, rating: RatingKey | null): number {
  if (!rating) return 0
  const option = ratingOptions.find((o) => o.key === rating)
  return option ? maxScore * option.multiplier : 0
}

export interface RiskBand {
  label: string
  className: string
}

export function getRiskBand(scoreOutOf100: number): RiskBand {
  if (scoreOutOf100 >= 80) return { label: 'Low Risk', className: 'bg-emerald-50 text-emerald-600 border-emerald-200' }
  if (scoreOutOf100 >= 60) return { label: 'Medium Risk', className: 'bg-amber-50 text-amber-600 border-amber-200' }
  if (scoreOutOf100 >= 50) return { label: 'Above Average', className: 'bg-orange-50 text-orange-600 border-orange-200' }
  return { label: 'High Risk', className: 'bg-red-50 text-red-600 border-red-200' }
}

export interface TestScoreScenario {
  key: string
  label: string
  ratings: Record<string, RatingKey>
}

// Each scenario picks ratings that land comfortably inside its target band (see getRiskBand).
export const testScoreScenarios: TestScoreScenario[] = [
  {
    key: 'highRisk',
    label: 'High Risk (<50)',
    ratings: {
      managementCapability: 'needsImprovement',
      regulatoryCompliance: 'needsImprovement',
      dataPrivacyManagement: 'needsImprovement',
      trainingAndDevelopment: 'needsImprovement',
      technicalCompetence: 'needsImprovement',
      disasterRecoveryEffectiveness: 'needsImprovement',
      policyProcedureAdequacy: 'needsImprovement',
    },
  },
  {
    key: 'aboveAverage',
    label: 'Above Average (50-60)',
    ratings: {
      managementCapability: 'acceptable',
      regulatoryCompliance: 'acceptable',
      dataPrivacyManagement: 'satisfactory',
      trainingAndDevelopment: 'acceptable',
      technicalCompetence: 'acceptable',
      disasterRecoveryEffectiveness: 'acceptable',
      policyProcedureAdequacy: 'acceptable',
    },
  },
  {
    key: 'mediumRisk',
    label: 'Medium Risk (61-79)',
    ratings: {
      managementCapability: 'satisfactory',
      regulatoryCompliance: 'satisfactory',
      dataPrivacyManagement: 'needsImprovement',
      trainingAndDevelopment: 'acceptable',
      technicalCompetence: 'satisfactory',
      disasterRecoveryEffectiveness: 'needsImprovement',
      policyProcedureAdequacy: 'acceptable',
    },
  },
  {
    key: 'lowRisk',
    label: 'Low Risk (80-100)',
    ratings: {
      managementCapability: 'satisfactory',
      regulatoryCompliance: 'satisfactory',
      dataPrivacyManagement: 'satisfactory',
      trainingAndDevelopment: 'satisfactory',
      technicalCompetence: 'satisfactory',
      disasterRecoveryEffectiveness: 'satisfactory',
      policyProcedureAdequacy: 'satisfactory',
    },
  },
]

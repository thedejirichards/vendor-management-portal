import type { OperationalRiskEntry, RiskLevel } from '../types/assessment'

export const likelihoodOptions: { value: RiskLevel; label: string }[] = [
  { value: 1, label: '1 - Rare' },
  { value: 2, label: '2 - Unlikely' },
  { value: 3, label: '3 - Possible' },
  { value: 4, label: '4 - Likely' },
  { value: 5, label: '5 - Almost Certain' },
]

export const impactOptions: { value: RiskLevel; label: string }[] = [
  { value: 1, label: '1 - Negligible' },
  { value: 2, label: '2 - Minor' },
  { value: 3, label: '3 - Moderate' },
  { value: 4, label: '4 - Major' },
  { value: 5, label: '5 - Severe' },
]

export function computeRiskScore(likelihood: RiskLevel | null, impact: RiskLevel | null): number | null {
  if (!likelihood || !impact) return null
  return likelihood * impact
}

export interface InherentRiskCategory {
  label: string
  className: string
}

export function getInherentRiskCategory(score: number | null): InherentRiskCategory | null {
  if (score === null) return null
  if (score >= 16) return { label: 'Critical', className: 'bg-red-50 text-red-600 border-red-200' }
  if (score >= 10) return { label: 'High', className: 'bg-orange-50 text-orange-600 border-orange-200' }
  if (score >= 5) return { label: 'Medium', className: 'bg-amber-50 text-amber-600 border-amber-200' }
  return { label: 'Low', className: 'bg-emerald-50 text-emerald-600 border-emerald-200' }
}

export const emptyOperationalRiskEntry: OperationalRiskEntry = {
  risk: '',
  description: '',
  likelihood: null,
  impact: null,
  controlsInPlace: '',
}

export const sampleOperationalRiskEntry: OperationalRiskEntry = {
  risk: 'Vendor System Downtime',
  description: 'The vendor\'s hosting infrastructure could experience unplanned outages, disrupting service delivery to the business unit.',
  likelihood: 2,
  impact: 4,
  controlsInPlace: 'Vendor maintains a documented disaster recovery plan with a 4-hour recovery time objective, backed by redundant hosting across two data centers.',
}

export function isOperationalRiskEntryComplete(entry: OperationalRiskEntry): boolean {
  return (
    entry.risk.trim() !== '' &&
    entry.description.trim() !== '' &&
    entry.likelihood !== null &&
    entry.impact !== null &&
    entry.controlsInPlace.trim() !== ''
  )
}

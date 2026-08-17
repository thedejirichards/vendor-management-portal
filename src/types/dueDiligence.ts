import type { DeactivationRiskRating } from './deactivation'

export type DueDiligenceStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected'

export interface DueDiligenceRequest {
  id: string
  requestId: string
  vendorName: string
  vendorId: string
  vendorEmail: string
  businessUnit: string
  class: DeactivationRiskRating
  status: DueDiligenceStatus
  submittedDate: string
  submittedLabel: string
  deactivationRecommended?: boolean
}

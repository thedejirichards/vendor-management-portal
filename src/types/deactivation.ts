export type DeactivationRiskRating = 'High Risk' | 'Medium Risk' | 'Low Risk'
export type DeactivationStatus = 'Active' | 'Inactive'

export interface DeactivatableVendor {
  id: string
  vendorName: string
  vendorId: string
  email: string
  category: string
  riskRating: DeactivationRiskRating
  status: DeactivationStatus
}

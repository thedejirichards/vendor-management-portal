export type VendorClass = 'Class A' | 'Class B' | 'Class C'
export type RiskCategory = 'High Risk' | 'Medium Risk' | 'Low Risk'
export type VendorStatus = 'Active' | 'Inactive'

export interface Vendor {
  id: string
  vendorId: string
  name: string
  vendorClass: VendorClass
  status: VendorStatus
  riskCategory: RiskCategory
  dueDiligenceComplete: boolean
}

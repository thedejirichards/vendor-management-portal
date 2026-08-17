export type OnboardingStatus = 'Invited' | 'Pending' | 'In Review' | 'Approved' | 'Rejected'

export interface OnboardingSubmission {
  id: string
  vendorId: string
  vendorName: string
  vendorEmail?: string
  submittedDate: string
  submittedLabel: string
  status: OnboardingStatus
}

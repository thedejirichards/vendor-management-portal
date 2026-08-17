import type { OnboardingStatus, OnboardingSubmission } from '../types/onboarding'

export const onboardingSubmissions: OnboardingSubmission[] = [
  { id: 'VND-013', vendorId: 'VND-013', vendorName: 'Premier Solutions International', businessUnit: 'Operational Risk Management', submittedDate: '2026-03-17', submittedLabel: 'March 17, 2026', status: 'Pending' },
  { id: 'VND-014', vendorId: 'VND-014', vendorName: 'Swift Technologies Ltd', businessUnit: 'Information & Cyber Security Group', submittedDate: '2026-03-17', submittedLabel: 'March 17, 2026', status: 'Pending' },
  { id: 'VND-015', vendorId: 'VND-015', vendorName: 'Apex Consulting Group', businessUnit: 'Compliance', submittedDate: '2026-03-17', submittedLabel: 'March 17, 2026', status: 'In Review' },
  { id: 'VND-016', vendorId: 'VND-016', vendorName: 'BlueSky Services Inc', businessUnit: 'Retail Banking', submittedDate: '2026-03-16', submittedLabel: 'March 16, 2026', status: 'In Review' },
  { id: 'VND-017', vendorId: 'VND-017', vendorName: 'Dynamic Systems Corp', businessUnit: 'Corporate Banking', submittedDate: '2026-03-16', submittedLabel: 'March 16, 2026', status: 'Pending' },
  { id: 'VND-018', vendorId: 'VND-018', vendorName: 'Nova Trade Partners', businessUnit: 'Treasury', submittedDate: '2026-03-16', submittedLabel: 'March 16, 2026', status: 'Pending' },
  { id: 'VND-019', vendorId: 'VND-019', vendorName: 'Keystone Logistics Ltd', businessUnit: 'Technology & Digital Banking', submittedDate: '2026-03-15', submittedLabel: 'March 15, 2026', status: 'In Review' },
  { id: 'VND-020', vendorId: 'VND-020', vendorName: 'Anchor Freight Systems', businessUnit: 'Human Resources', submittedDate: '2026-03-15', submittedLabel: 'March 15, 2026', status: 'Pending' },
  { id: 'VND-021', vendorId: 'VND-021', vendorName: 'Orbital Data Corp', businessUnit: 'Operational Risk Management', submittedDate: '2026-03-15', submittedLabel: 'March 15, 2026', status: 'Pending' },
  { id: 'VND-022', vendorId: 'VND-022', vendorName: 'Beacon Advisory Group', businessUnit: 'Information & Cyber Security Group', submittedDate: '2026-03-14', submittedLabel: 'March 14, 2026', status: 'In Review' },
  { id: 'VND-023', vendorId: 'VND-023', vendorName: 'Coastal Payments Ltd', businessUnit: 'Compliance', submittedDate: '2026-03-14', submittedLabel: 'March 14, 2026', status: 'Pending' },
  { id: 'VND-024', vendorId: 'VND-024', vendorName: 'Fusion Cloud Services', businessUnit: 'Retail Banking', submittedDate: '2026-03-14', submittedLabel: 'March 14, 2026', status: 'In Review' },

  { id: 'VND-005', vendorId: 'VND-005', vendorName: 'NorthBridge Capital', businessUnit: 'Corporate Banking', submittedDate: '2026-02-20', submittedLabel: 'February 20, 2026', status: 'Approved' },
  { id: 'VND-006', vendorId: 'VND-006', vendorName: 'Vertex Cloud Systems', businessUnit: 'Treasury', submittedDate: '2026-02-18', submittedLabel: 'February 18, 2026', status: 'Approved' },
  { id: 'VND-010', vendorId: 'VND-010', vendorName: 'Summit Payment Systems', businessUnit: 'Technology & Digital Banking', submittedDate: '2026-02-15', submittedLabel: 'February 15, 2026', status: 'Approved' },
  { id: 'VND-016B', vendorId: 'VND-016B', vendorName: 'Pinnacle Outsourcing Co', businessUnit: 'Human Resources', submittedDate: '2026-02-12', submittedLabel: 'February 12, 2026', status: 'Rejected' },
  { id: 'VND-011', vendorId: 'VND-011', vendorName: 'Horizon Data Labs', businessUnit: 'Operational Risk Management', submittedDate: '2026-02-10', submittedLabel: 'February 10, 2026', status: 'Approved' },
  { id: 'VND-018B', vendorId: 'VND-018B', vendorName: 'Crestpoint Advisory', businessUnit: 'Information & Cyber Security Group', submittedDate: '2026-02-08', submittedLabel: 'February 8, 2026', status: 'Rejected' },
  { id: 'VND-013B', vendorId: 'VND-013B', vendorName: 'Sterling Compliance Partners', businessUnit: 'Compliance', submittedDate: '2026-02-05', submittedLabel: 'February 5, 2026', status: 'Approved' },
  { id: 'VND-017B', vendorId: 'VND-017B', vendorName: 'Falcon Security Systems', businessUnit: 'Retail Banking', submittedDate: '2026-02-01', submittedLabel: 'February 1, 2026', status: 'Approved' },
]

export function addOnboardingSubmission(vendorName: string, vendorEmail: string): OnboardingSubmission {
  const nextNumber =
    onboardingSubmissions
      .map((s) => Number(/^VND-(\d+)$/.exec(s.vendorId)?.[1]))
      .filter((n) => !Number.isNaN(n))
      .reduce((max, n) => Math.max(max, n), 0) + 1
  const vendorId = `VND-${String(nextNumber).padStart(3, '0')}`
  const now = new Date()

  const submission: OnboardingSubmission = {
    id: vendorId,
    vendorId,
    vendorName,
    vendorEmail,
    submittedDate: now.toISOString().slice(0, 10),
    submittedLabel: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    status: 'Invited',
  }

  onboardingSubmissions.unshift(submission)
  return submission
}

export function updateOnboardingSubmissionStatus(id: string, status: OnboardingStatus) {
  const submission = onboardingSubmissions.find((s) => s.id === id)
  if (submission) submission.status = status
}

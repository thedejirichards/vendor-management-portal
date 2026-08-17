import type { DueDiligenceRequest } from '../types/dueDiligence'

export const dueDiligenceRequests: DueDiligenceRequest[] = [
  {
    id: 'VDD-2026-001',
    requestId: 'VDD-2026-001',
    vendorName: 'CloudTech Solutions Ltd',
    vendorId: 'V-2026-001',
    vendorEmail: 'contact@cloudtechsolutions.com',
    businessUnit: 'Operational Risk Management',
    class: 'High Risk',
    status: 'In Progress',
    submittedDate: '2026-02-10',
    submittedLabel: 'February 10, 2026',
  },
  {
    id: 'VDD-2026-002',
    requestId: 'VDD-2026-002',
    vendorName: 'SecureData Systems Inc',
    vendorId: 'V-2026-002',
    vendorEmail: 'support@securedatasystems.com',
    businessUnit: 'Information & Cyber Security Group',
    class: 'Medium Risk',
    status: 'Completed',
    submittedDate: '2026-02-05',
    submittedLabel: 'February 5, 2026',
  },
  {
    id: 'VDD-2026-003',
    requestId: 'VDD-2026-003',
    vendorName: 'Global Payment Processors',
    vendorId: 'V-2026-003',
    vendorEmail: 'support@globalpayment.com',
    businessUnit: 'Operational Risk Management',
    class: 'High Risk',
    status: 'Pending',
    submittedDate: '2026-02-18',
    submittedLabel: 'February 18, 2026',
  },
  {
    id: 'VDD-2026-004',
    requestId: 'VDD-2026-004',
    vendorName: 'TechVendor Group',
    vendorId: 'V-2026-004',
    vendorEmail: 'info@techvendorgroup.com',
    businessUnit: 'Technology & Digital Banking',
    class: 'Low Risk',
    status: 'Completed',
    submittedDate: '2026-01-28',
    submittedLabel: 'January 28, 2026',
  },
  {
    id: 'VDD-2026-005',
    requestId: 'VDD-2026-005',
    vendorName: 'DataCenter Services Co',
    vendorId: 'V-2026-005',
    vendorEmail: 'support@datacenterservices.com',
    businessUnit: 'Technology & Digital Banking',
    class: 'High Risk',
    status: 'Rejected',
    submittedDate: '2026-01-20',
    submittedLabel: 'January 20, 2026',
  },
  {
    id: 'VDD-2026-006',
    requestId: 'VDD-2026-006',
    vendorName: 'Meridian Cloud Partners',
    vendorId: 'V-2026-006',
    vendorEmail: 'contact@meridiancloud.com',
    businessUnit: 'Operational Risk Management',
    class: 'Medium Risk',
    status: 'Completed',
    submittedDate: '2026-01-15',
    submittedLabel: 'January 15, 2026',
  },
  {
    id: 'VDD-2026-007',
    requestId: 'VDD-2026-007',
    vendorName: 'Apex Network Services',
    vendorId: 'V-2026-007',
    vendorEmail: 'support@apexnetwork.com',
    businessUnit: 'Compliance',
    class: 'Low Risk',
    status: 'In Progress',
    submittedDate: '2026-02-22',
    submittedLabel: 'February 22, 2026',
  },
  {
    id: 'VDD-2026-008',
    requestId: 'VDD-2026-008',
    vendorName: 'Fortress Security Systems',
    vendorId: 'V-2026-008',
    vendorEmail: 'contact@fortresssecurity.com',
    businessUnit: 'Information & Cyber Security Group',
    class: 'High Risk',
    status: 'Pending',
    submittedDate: '2026-02-25',
    submittedLabel: 'February 25, 2026',
  },
]

export function addDueDiligenceRequest(
  vendorName: string,
  vendorId: string,
  vendorEmail: string,
  businessUnit: string,
  vendorClass: DueDiligenceRequest['class'],
): DueDiligenceRequest {
  const nextNumber =
    dueDiligenceRequests
      .map((r) => Number(/^VDD-2026-(\d+)$/.exec(r.requestId)?.[1]))
      .filter((n) => !Number.isNaN(n))
      .reduce((max, n) => Math.max(max, n), 0) + 1
  const requestId = `VDD-2026-${String(nextNumber).padStart(3, '0')}`
  const now = new Date()

  const request: DueDiligenceRequest = {
    id: requestId,
    requestId,
    vendorName,
    vendorId,
    vendorEmail,
    businessUnit,
    class: vendorClass,
    status: 'Pending',
    submittedDate: now.toISOString().slice(0, 10),
    submittedLabel: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }

  dueDiligenceRequests.unshift(request)
  return request
}

export function updateDueDiligenceRequestStatus(id: string, status: DueDiligenceRequest['status']) {
  const request = dueDiligenceRequests.find((r) => r.id === id)
  if (request) request.status = status
}

import { users } from './users'
import { groupEmailForBusinessUnit } from './businessUnits'

export interface ReportRecipient {
  name: string
  role: string
  email: string
}

export function onboardingReportRecipients(): ReportRecipient[] {
  return users
    .filter((u) => u.isReviewer || u.isGroupHead || u.id === 'initiator')
    .map((u) => ({ name: u.name, role: u.role, email: u.email }))
}

export function dueDiligenceReportRecipients(): ReportRecipient[] {
  return users
    .filter((u) => u.reviewStream === 'orm' || u.id === 'business-unit')
    .map((u) => ({ name: u.name, role: u.role, email: u.email }))
}

export function groupEmailRecipient(businessUnit: string | undefined): ReportRecipient {
  return {
    name: businessUnit ? `${businessUnit} Group` : 'Vendor Management Group',
    role: 'Distribution List',
    email: groupEmailForBusinessUnit(businessUnit),
  }
}

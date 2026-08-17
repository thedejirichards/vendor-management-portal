export const businessUnits: string[] = [
  'Operational Risk Management',
  'Information & Cyber Security Group',
  'Compliance',
  'Retail Banking',
  'Corporate Banking',
  'Treasury',
  'Technology & Digital Banking',
  'Human Resources',
]

const FALLBACK_GROUP_EMAIL = 'vendor-management-group@accessbankplc.com'

export function groupEmailForBusinessUnit(businessUnit?: string): string {
  if (!businessUnit) return FALLBACK_GROUP_EMAIL
  const slug = businessUnit
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${slug}-group@accessbankplc.com`
}

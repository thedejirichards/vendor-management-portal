import type { DocumentComparisonItem } from '../types/document'

export function getDocumentComparisons(): DocumentComparisonItem[] {
  return [
    {
      docId: 'DOC-001',
      title: 'Company Profile',
      existing: { name: 'Company_Profile_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '2.3 MB' },
      updated: { name: 'Company_Profile_2026_Updated.pdf', uploadedLabel: '2026-03-14', sizeLabel: '2.5 MB' },
    },
    {
      docId: 'DOC-002',
      title: 'Company Organogram',
      existing: { name: 'Company_Organogram_v1.pdf', uploadedLabel: '2025-12-15', sizeLabel: '1.8 MB' },
      updated: { name: 'Company_Organogram_v2_Revised.pdf', uploadedLabel: '2026-03-14', sizeLabel: '1.9 MB' },
    },
    {
      docId: 'DOC-003',
      title: 'Staff Recruitment and Selection Policy',
      existing: { name: 'Staff_Recruitment_Policy_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '950 KB' },
      updated: null,
    },
    {
      docId: 'DOC-004',
      title: 'Business Continuity Plan',
      existing: { name: 'BCP_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '3.2 MB' },
      updated: { name: 'BCP_2026_Enhanced.pdf', uploadedLabel: '2026-03-14', sizeLabel: '3.5 MB' },
    },
    {
      docId: 'DOC-005',
      title: 'BCP Test Reports',
      existing: { name: 'BCP_Test_Reports_Q4_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '1.5 MB' },
      updated: { name: 'BCP_Test_Reports_Q1_2026.pdf', uploadedLabel: '2026-03-14', sizeLabel: '1.6 MB' },
    },
    {
      docId: 'DOC-006',
      title: 'Operations Manual',
      existing: { name: 'Operations_Manual_v3.pdf', uploadedLabel: '2025-12-15', sizeLabel: '4.1 MB' },
      updated: null,
    },
    {
      docId: 'DOC-007',
      title: 'Audited Financial Statements (2024)',
      existing: { name: 'Financial_Statements_2024_Audited.pdf', uploadedLabel: '2025-12-15', sizeLabel: '2.7 MB' },
      updated: { name: 'Financial_Statements_2025_Audited.pdf', uploadedLabel: '2026-03-14', sizeLabel: '2.9 MB' },
    },
    {
      docId: 'DOC-008',
      title: 'Business Registration Certificate',
      existing: { name: 'Business_Registration_Certificate.pdf', uploadedLabel: '2025-12-15', sizeLabel: '580 KB' },
      updated: null,
    },
    {
      docId: 'DOC-009',
      title: 'Memorandum and Articles of Association',
      existing: { name: 'Memorandum_Articles_of_Association.pdf', uploadedLabel: '2025-12-15', sizeLabel: '1.2 MB' },
      updated: { name: 'Memorandum_Articles_of_Association_Amended.pdf', uploadedLabel: '2026-03-14', sizeLabel: '1.3 MB' },
    },
    {
      docId: 'DOC-010',
      title: 'Certificate of Incorporation',
      existing: { name: 'Certificate_of_Incorporation.pdf', uploadedLabel: '2025-12-15', sizeLabel: '420 KB' },
      updated: null,
    },
    {
      docId: 'DOC-011',
      title: 'Form CO2',
      existing: { name: 'Form_CO2_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '350 KB' },
      updated: { name: 'Form_CO2_2026.pdf', uploadedLabel: '2026-03-14', sizeLabel: '360 KB' },
    },
    {
      docId: 'DOC-012',
      title: 'Form CO7',
      existing: { name: 'Form_CO7_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '380 KB' },
      updated: { name: 'Form_CO7_2026.pdf', uploadedLabel: '2026-03-14', sizeLabel: '390 KB' },
    },
    {
      docId: 'DOC-013',
      title: 'License to Operate',
      existing: { name: 'License_to_Operate_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '620 KB' },
      updated: { name: 'License_to_Operate_2026_Renewed.pdf', uploadedLabel: '2026-03-14', sizeLabel: '640 KB' },
    },
    {
      docId: 'DOC-014',
      title: 'Information Security Policy',
      existing: { name: 'Information_Security_Policy_v2.pdf', uploadedLabel: '2025-12-15', sizeLabel: '1.1 MB' },
      updated: null,
    },
    {
      docId: 'DOC-015',
      title: 'Business Continuity Policy',
      existing: { name: 'Business_Continuity_Policy_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '890 KB' },
      updated: { name: 'Business_Continuity_Policy_2026.pdf', uploadedLabel: '2026-03-14', sizeLabel: '920 KB' },
    },
    {
      docId: 'DOC-016',
      title: 'AML/CFT Policy',
      existing: { name: 'AML_CFT_Policy_v3.pdf', uploadedLabel: '2025-12-15', sizeLabel: '1.3 MB' },
      updated: null,
    },
    {
      docId: 'DOC-017',
      title: 'KYC Policy',
      existing: { name: 'KYC_Policy_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '760 KB' },
      updated: { name: 'KYC_Policy_2026_Revised.pdf', uploadedLabel: '2026-03-14', sizeLabel: '820 KB' },
    },
    {
      docId: 'DOC-018',
      title: 'ISO 27001 Certificate',
      existing: { name: 'ISO_27001_Certificate_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '520 KB' },
      updated: { name: 'ISO_27001_Certificate_2026_Renewed.pdf', uploadedLabel: '2026-03-14', sizeLabel: '530 KB' },
    },
    {
      docId: 'DOC-019',
      title: 'ISO 22301 Certificate',
      existing: { name: 'ISO_22301_Certificate.pdf', uploadedLabel: '2025-12-15', sizeLabel: '480 KB' },
      updated: null,
    },
    {
      docId: 'DOC-020',
      title: 'PCI DSS Certificate',
      existing: { name: 'PCI_DSS_Certificate_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '670 KB' },
      updated: { name: 'PCI_DSS_Certificate_2026.pdf', uploadedLabel: '2026-03-14', sizeLabel: '890 KB' },
    },
    {
      docId: 'DOC-021',
      title: 'Service Level Agreement',
      existing: { name: 'Service_Level_Agreement_2025.pdf', uploadedLabel: '2025-12-15', sizeLabel: '1.8 MB' },
      updated: { name: 'Service_Level_Agreement_2026_Updated.pdf', uploadedLabel: '2026-03-14', sizeLabel: '1.9 MB' },
    },
  ]
}

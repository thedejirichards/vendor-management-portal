import type { DocumentCategory } from '../types/document'

export function getVendorDocuments(vendorName: string): DocumentCategory[] {
  return [
    {
      title: 'SLA Document',
      subtitle: 'Service Level Agreement',
      files: [
        {
          name: `SLA Document - ${vendorName}`,
          fileType: 'XLSX',
          sizeLabel: '2.1 MB',
          uploadedLabel: 'Feb 18, 2025',
        },
      ],
    },
    {
      title: 'Corporate Information',
      subtitle: '2 documents',
      files: [
        { name: 'Company Profile', fileType: 'PDF', sizeLabel: '2.3 MB', uploadedLabel: 'Feb 15, 2025' },
        { name: 'Company Organogram', fileType: 'PDF', sizeLabel: '1.8 MB', uploadedLabel: 'Feb 15, 2025' },
      ],
    },
    {
      title: 'HR Policies',
      subtitle: '1 document',
      files: [
        {
          name: 'Staff Recruitment and Selection Policy',
          fileType: 'PDF',
          sizeLabel: '950 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2027',
        },
      ],
    },
    {
      title: 'Risk Management',
      subtitle: '2 documents',
      files: [
        {
          name: 'Business Continuity Plan',
          fileType: 'PDF',
          sizeLabel: '3.2 MB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2027',
        },
        {
          name: 'BCP Test Reports',
          fileType: 'PDF',
          sizeLabel: '1.5 MB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2026',
        },
      ],
    },
    {
      title: 'Operations',
      subtitle: '1 document',
      files: [
        { name: 'Operations Manual', fileType: 'PDF', sizeLabel: '4.1 MB', uploadedLabel: 'Feb 15, 2025' },
      ],
    },
    {
      title: 'Financial Documents',
      subtitle: '1 document',
      files: [
        {
          name: 'Audited Financial Statements (2024)',
          fileType: 'PDF',
          sizeLabel: '2.7 MB',
          uploadedLabel: 'Feb 15, 2025',
        },
      ],
    },
    {
      title: 'Legal Documents',
      subtitle: '6 documents',
      files: [
        {
          name: 'Business Registration Certificate',
          fileType: 'PDF',
          sizeLabel: '580 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Dec 31, 2028',
        },
        {
          name: 'Memorandum and Articles of Association',
          fileType: 'PDF',
          sizeLabel: '1.2 MB',
          uploadedLabel: 'Feb 15, 2025',
        },
        { name: 'Certificate of Incorporation', fileType: 'PDF', sizeLabel: '420 KB', uploadedLabel: 'Feb 15, 2025' },
        { name: 'Form CO2', fileType: 'PDF', sizeLabel: '350 KB', uploadedLabel: 'Feb 15, 2025' },
        { name: 'Form CO7', fileType: 'PDF', sizeLabel: '380 KB', uploadedLabel: 'Feb 15, 2025' },
        {
          name: 'Service Level Agreement',
          fileType: 'PDF',
          sizeLabel: '1.8 MB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2028',
        },
      ],
    },
    {
      title: 'Licenses & Certifications',
      subtitle: '4 documents',
      files: [
        {
          name: 'License to Operate',
          fileType: 'PDF',
          sizeLabel: '620 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Jun 30, 2027',
        },
        {
          name: 'ISO 27001 Certificate',
          fileType: 'PDF',
          sizeLabel: '520 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2028',
        },
        {
          name: 'ISO 22301 Certificate',
          fileType: 'PDF',
          sizeLabel: '490 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2028',
        },
        {
          name: 'PCI DSS Certificate',
          fileType: 'PDF',
          sizeLabel: '670 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2026',
        },
      ],
    },
    {
      title: 'Policy Documents',
      subtitle: '4 documents',
      files: [
        {
          name: 'Information Security Policy',
          fileType: 'PDF',
          sizeLabel: '1.1 MB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2027',
        },
        {
          name: 'Business Continuity Policy',
          fileType: 'PDF',
          sizeLabel: '890 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2027',
        },
        {
          name: 'AML/CFT Policy',
          fileType: 'PDF',
          sizeLabel: '1.3 MB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2027',
        },
        {
          name: 'KYC Policy',
          fileType: 'PDF',
          sizeLabel: '780 KB',
          uploadedLabel: 'Feb 15, 2025',
          expiresLabel: 'Feb 15, 2027',
        },
      ],
    },
  ]
}

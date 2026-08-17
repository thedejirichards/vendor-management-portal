import type { AssessmentSummaryField } from '../types/assessment'

export const assessmentSummaryFields: AssessmentSummaryField[] = [
  {
    key: 'natureOfService',
    label: 'Nature of Service Provided',
    placeholder: 'Describe the nature of services provided by the vendor...',
    sampleValue: 'The vendor provides outsourced IT infrastructure support, including hosting, network monitoring, and helpdesk services for the business unit.',
  },
  {
    key: 'licensingCompliance',
    label: 'Licensing, Certifications, and Regulatory Compliance',
    placeholder: 'Assess licensing, certifications, and regulatory compliance...',
    sampleValue: 'The vendor holds a valid CAC registration and ISO 27001 certification, and all regulatory filings reviewed were current and in good standing.',
  },
  {
    key: 'policiesProcedures',
    label: 'Policies and Procedures',
    placeholder: 'Evaluate policies and procedures...',
    sampleValue: 'Documented policies covering data handling, incident response, and vendor conduct were reviewed and found to be adequate and up to date.',
  },
  {
    key: 'managementCapabilities',
    label: 'Management Capabilities / Experience',
    placeholder: 'Assess management capabilities and experience...',
    sampleValue: 'The management team has over ten years of relevant industry experience and a track record of delivering similar engagements successfully.',
  },
  {
    key: 'financialCapacity',
    label: 'Financial Capacity',
    placeholder: 'Evaluate financial capacity and stability...',
    sampleValue: 'Review of the vendor\'s most recent audited financial statements indicates stable revenue and sufficient working capital to support the engagement.',
  },
  {
    key: 'businessContinuity',
    label: 'Business Continuity / Disaster Recovery Arrangement',
    placeholder: 'Assess business continuity and disaster recovery arrangements...',
    sampleValue: 'A documented business continuity plan is in place, with defined recovery time objectives and evidence of an annual disaster recovery test.',
  },
  {
    key: 'geographicalSpread',
    label: 'Geographical Spread',
    placeholder: 'Describe geographical presence and spread...',
    sampleValue: 'The vendor operates from a primary office in Lagos with a secondary support hub in Abuja, covering all required service regions.',
  },
  {
    key: 'environmentalSocialRisk',
    label: 'Environmental and Social Risk Assessment',
    placeholder: 'Assess environmental and social risks...',
    sampleValue: 'No material environmental or social risks were identified; the vendor operates an office-based service model with a low environmental footprint.',
  },
  {
    key: 'trainingStaffDevelopment',
    label: 'Training and Staff Development',
    placeholder: 'Evaluate training and staff development programs...',
    sampleValue: 'Staff undergo mandatory annual compliance and security awareness training, supplemented by role-specific technical certifications.',
  },
  {
    key: 'reputationalRiskReview',
    label: 'Reputational Risk Review',
    placeholder: 'Assess reputational risks...',
    sampleValue: 'No adverse media, litigation, or regulatory sanctions were identified during the reputational screening of the vendor.',
  },
  {
    key: 'legalRegulatoryReview',
    label: 'Legal and Regulatory Review',
    placeholder: 'Review legal and regulatory aspects...',
    sampleValue: 'Contractual terms, data protection clauses, and applicable regulatory obligations were reviewed by legal and found to be satisfactory.',
  },
  {
    key: 'thirdPartyDependency',
    label: 'Third Party Dependency',
    placeholder: 'Assess third party dependencies...',
    sampleValue: 'The vendor relies on a small number of well-established subcontractors for cloud hosting, each covered by its own due diligence review.',
  },
  {
    key: 'infoSecurityDataProtection',
    label: 'Information Security and Data Protection',
    placeholder: 'Evaluate information security and data protection measures...',
    sampleValue: 'The vendor demonstrated encryption at rest and in transit, role-based access controls, and a documented data breach response procedure.',
  },
  {
    key: 'feedbackBusinessUnit',
    label: 'Feedback from Business Unit',
    placeholder: 'Provide feedback from business unit...',
    sampleValue: 'The business unit reports consistent service quality and responsive support throughout the engagement to date.',
  },
  {
    key: 'exceptionsRecommendations',
    label: 'Exceptions and Recommendations',
    placeholder: 'Note any exceptions and provide recommendations...',
    sampleValue: 'No material exceptions were noted. It is recommended that the vendor be approved, subject to standard annual re-assessment.',
  },
  {
    key: 'others',
    label: 'Others',
    placeholder: 'Add any other relevant information...',
    sampleValue: 'No additional information to disclose at this time.',
  },
]

import type { AssessmentSummaryField } from '../types/assessment'

export const businessAssessmentFields: AssessmentSummaryField[] = [
  {
    key: 'slaAdherence',
    label: 'Adherence to Service Level Agreements',
    placeholder:
      'Describe the extent to which the vendor has complied with agreed Service Level Agreements (SLAs), including any notable breaches and how they were handled.',
    sampleValue:
      'The vendor has consistently met agreed SLAs over the review period, with only one minor breach relating to response time, which was promptly remediated.',
  },
  {
    key: 'qualityOfServiceDelivery',
    label: 'Quality of Service Delivery',
    placeholder:
      "Based on the services provided, provide a detailed assessment of the vendor's performance, highlighting strengths, weaknesses, and areas for improvement.",
    sampleValue:
      'Service delivery has been reliable and of good quality, with strong technical support; occasional delays in reporting turnaround remain an area for improvement.',
  },
  {
    key: 'issueResolutionResponsiveness',
    label: 'Issue Resolution and Responsiveness',
    placeholder:
      'Describe how promptly and effectively the vendor responds to incidents, complaints, or service requests, including examples where applicable.',
    sampleValue:
      'The vendor responds to escalations within the agreed timeframe and has resolved all logged incidents to date without recurrence.',
  },
  {
    key: 'lossesAndFraudExposure',
    label: 'Losses and Fraud Exposure',
    placeholder:
      'Please state whether the organization has experienced any financial loss, fraud incident, or control breach arising from engagement with this vendor, and provide details of the incident if applicable.',
    sampleValue: 'No financial loss, fraud incident, or control breach has been recorded in connection with this vendor.',
  },
]

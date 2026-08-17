import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import CaseReportView, { type CaseReportSection } from '../components/CaseReportView'
import { dueDiligenceRequests } from '../data/dueDiligenceRequests'
import { assessmentSummaryFields } from '../data/assessmentSummaryFields'
import { businessAssessmentFields } from '../data/businessAssessmentFields'
import { riskAssessmentParameters, scoreForRating, getRiskBand } from '../data/riskAssessmentParameters'
import { getReviewData } from '../data/reviewData'
import { getCaseCompletion } from '../data/caseCompletions'
import { dueDiligenceReportRecipients, groupEmailRecipient } from '../data/reportRecipients'

export default function VendorDueDiligenceReportPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const request = dueDiligenceRequests.find((r) => r.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!request || !id) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Vendor Due Diligence', to: '/vendor-due-diligence' }, 'Report']} />
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Report not found</h1>
      </div>
    )
  }

  const reviewData = getReviewData(id)
  const completion = getCaseCompletion(id)

  const sections: CaseReportSection[] = []

  sections.push({
    title: 'Deactivation Recommendation',
    entries: [
      {
        label: 'Recommended for deactivation',
        value: request.deactivationRecommended ? 'Yes' : 'No',
      },
    ],
  })

  if (reviewData?.summaryValues) {
    sections.push({
      title: 'Assessment Summary',
      entries: assessmentSummaryFields
        .filter((field) => (reviewData.summaryValues[field.key] ?? '').trim() !== '')
        .map((field) => ({ label: field.label, value: reviewData.summaryValues[field.key] })),
    })
  }

  if (reviewData?.ratings && Object.keys(reviewData.ratings).length > 0) {
    const totalScore = riskAssessmentParameters.reduce(
      (sum, param) => sum + scoreForRating(param.maxScore, reviewData.ratings[param.key] ?? null),
      0,
    )
    const band = getRiskBand(totalScore)
    sections.push({
      title: 'Vendor Assessment',
      entries: [
        ...riskAssessmentParameters
          .filter((param) => reviewData.ratings[param.key])
          .map((param) => ({ label: param.label, value: String(reviewData.ratings[param.key]) })),
        { label: 'Total Score', value: `${totalScore} / 100 (${band.label})` },
      ],
    })
  }

  if (reviewData?.businessAssessmentValues) {
    sections.push({
      title: 'Business Assessment',
      entries: businessAssessmentFields
        .filter((field) => (reviewData.businessAssessmentValues?.[field.key] ?? '').trim() !== '')
        .map((field) => ({ label: field.label, value: reviewData.businessAssessmentValues?.[field.key] ?? '' })),
    })
  }

  if (reviewData?.operationalRisk?.risk) {
    const risk = reviewData.operationalRisk
    sections.push({
      title: 'Risk Assessment',
      entries: [
        { label: 'Risk', value: risk.risk },
        { label: 'Description', value: risk.description },
        { label: 'Likelihood', value: String(risk.likelihood ?? '—') },
        { label: 'Impact', value: String(risk.impact ?? '—') },
        { label: 'Controls in Place', value: risk.controlsInPlace },
      ],
    })
  }

  const recipients = [...dueDiligenceReportRecipients(), groupEmailRecipient(request.businessUnit)]

  return (
    <div>
      <Breadcrumb items={[{ label: 'Vendor Due Diligence', to: '/vendor-due-diligence' }, 'Report']} />

      <CaseReportView
        processLabel="Vendor Due Diligence"
        caseId={request.requestId}
        vendorName={request.vendorName}
        vendorId={request.vendorId}
        businessUnit={request.businessUnit}
        statusLabel={request.status}
        submittedLabel={request.submittedLabel}
        sections={sections}
        completion={completion}
        recipients={recipients}
        onBack={() => navigate(`/vendor-due-diligence/${request.id}`)}
      />
    </div>
  )
}

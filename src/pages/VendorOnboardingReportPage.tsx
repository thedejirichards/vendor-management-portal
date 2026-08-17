import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import CaseReportView, { type CaseReportSection } from '../components/CaseReportView'
import { onboardingSubmissions } from '../data/onboardingSubmissions'
import { assessmentSummaryFields } from '../data/assessmentSummaryFields'
import { riskAssessmentParameters, scoreForRating, getRiskBand } from '../data/riskAssessmentParameters'
import { getReviewData } from '../data/reviewData'
import { getCaseCompletion } from '../data/caseCompletions'
import { onboardingReportRecipients, groupEmailRecipient } from '../data/reportRecipients'

export default function VendorOnboardingReportPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const submission = onboardingSubmissions.find((s) => s.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!submission || !id) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Vendor Onboarding', to: '/vendor-onboarding' }, 'Report']} />
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Report not found</h1>
      </div>
    )
  }

  const reviewData = getReviewData(id)
  const completion = getCaseCompletion(id)

  const sections: CaseReportSection[] = []

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

  const recipients = [...onboardingReportRecipients(), groupEmailRecipient(submission.businessUnit)]

  return (
    <div>
      <Breadcrumb items={[{ label: 'Vendor Onboarding', to: '/vendor-onboarding' }, 'Report']} />

      <CaseReportView
        processLabel="Vendor Onboarding"
        caseId={submission.id}
        vendorName={submission.vendorName}
        vendorId={submission.vendorId}
        businessUnit={submission.businessUnit}
        statusLabel={submission.status}
        submittedLabel={submission.submittedLabel}
        sections={sections}
        completion={completion}
        recipients={recipients}
        onBack={() => navigate(`/vendor-onboarding/${submission.id}`)}
      />
    </div>
  )
}

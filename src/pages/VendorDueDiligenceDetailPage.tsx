import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import DueDiligenceStatusBadge from '../components/DueDiligenceStatusBadge'
import DocumentReviewTab from '../components/DocumentReviewTab'
import AssessmentSummaryTab from '../components/AssessmentSummaryTab'
import VendorAssessmentTab from '../components/VendorAssessmentTab'
import RiskAssessmentTab from '../components/RiskAssessmentTab'
import BusinessAssessmentTab from '../components/BusinessAssessmentTab'
import ConfirmSubmissionModal from '../components/ConfirmSubmissionModal'
import SubmittedSuccessModal from '../components/SubmittedSuccessModal'
import { dueDiligenceRequests } from '../data/dueDiligenceRequests'
import { getDocumentComparisons } from '../data/documentComparisons'
import { assessmentSummaryFields } from '../data/assessmentSummaryFields'
import { businessAssessmentFields } from '../data/businessAssessmentFields'
import { riskAssessmentParameters, testScoreScenarios } from '../data/riskAssessmentParameters'
import { getReviewData, saveReviewData } from '../data/reviewData'
import { emptyOperationalRiskEntry, sampleOperationalRiskEntry, isOperationalRiskEntryComplete } from '../data/operationalRisk'
import { useCurrentUser } from '../context/useCurrentUser'
import type { AssessmentSummaryValues, OperationalRiskEntry, RatingKey, RiskAssessmentRatings } from '../types/assessment'

type CaseReviewTab = 'documentReview' | 'summary' | 'assessment' | 'riskAssessment' | 'businessAssessment'
type ReviewAction = 'submit' | 'approve' | 'reject' | 'recommendDeactivation'

const reviewerTabs: { key: CaseReviewTab; label: string }[] = [
  { key: 'documentReview', label: 'Document Review' },
  { key: 'summary', label: 'Assessment Summary' },
  { key: 'assessment', label: 'Vendor Assessment' },
  { key: 'riskAssessment', label: 'Risk Assessment' },
]

const businessUnitTabs: { key: CaseReviewTab; label: string }[] = [
  { key: 'documentReview', label: 'Document Review' },
  { key: 'businessAssessment', label: 'Business Assessment' },
]

const finalApproverTabs: { key: CaseReviewTab; label: string }[] = [
  { key: 'documentReview', label: 'Document Review' },
  { key: 'summary', label: 'Assessment Summary' },
  { key: 'assessment', label: 'Vendor Assessment' },
  { key: 'businessAssessment', label: 'Business Assessment' },
  { key: 'riskAssessment', label: 'Risk Assessment' },
]

const actionCopy: Record<
  ReviewAction,
  { title: string; message: string; confirmLabel: string; confirmClassName: string; successTitle: string; successMessage: string }
> = {
  submit: {
    title: 'Confirm Submission',
    message: 'Are you sure you want to submit?',
    confirmLabel: 'Yes',
    confirmClassName: 'bg-brand-600 text-white hover:bg-brand-700',
    successTitle: 'Submitted Successfully',
    successMessage: 'The request has been submitted.',
  },
  approve: {
    title: 'Confirm Approval',
    message: 'Are you sure you want to approve this vendor assessment?',
    confirmLabel: 'Approve',
    confirmClassName: 'bg-brand-600 text-white hover:bg-brand-700',
    successTitle: 'Approved',
    successMessage: 'The vendor assessment has been approved.',
  },
  reject: {
    title: 'Confirm Rejection',
    message: 'Are you sure you want to reject this vendor assessment?',
    confirmLabel: 'Reject',
    confirmClassName: 'border border-brand-600 bg-white text-brand-600 hover:bg-brand-50',
    successTitle: 'Rejected',
    successMessage: 'The vendor assessment has been rejected.',
  },
  recommendDeactivation: {
    title: 'Confirm Deactivation Recommendation',
    message: 'Are you sure you want to recommend this vendor for deactivation?',
    confirmLabel: 'Yes, Recommend',
    confirmClassName: 'bg-red-700 text-white hover:bg-red-800',
    successTitle: 'Deactivation Recommended',
    successMessage: 'This vendor has been flagged for deactivation review.',
  },
}

function sampleSummaryValues(): AssessmentSummaryValues {
  return Object.fromEntries(assessmentSummaryFields.map((field) => [field.key, field.sampleValue]))
}

function sampleBusinessAssessmentValues(): AssessmentSummaryValues {
  return Object.fromEntries(businessAssessmentFields.map((field) => [field.key, field.sampleValue]))
}

function sampleRatings(): RiskAssessmentRatings {
  return testScoreScenarios.find((scenario) => scenario.key === 'mediumRisk')?.ratings ?? {}
}

export default function VendorDueDiligenceDetailPage() {
  const { id } = useParams()
  const { currentUser } = useCurrentUser()
  // Remount the case review whenever the case or the acting user changes, so
  // loaded/sample review data and the selected tab always start fresh for
  // that combination (see [[business_unit_due_diligence_flow]] memory).
  return <CaseReview key={`${id ?? 'none'}-${currentUser.id}`} />
}

function CaseReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()
  const request = dueDiligenceRequests.find((r) => r.id === id)

  const isChecker = currentUser.isChecker || currentUser.isGroupHead
  const isBusinessUnit = currentUser.id === 'business-unit'
  const isFinalApprover = currentUser.id === 'group-head-orm'
  const tabs = isBusinessUnit ? businessUnitTabs : isFinalApprover ? finalApproverTabs : reviewerTabs

  const stored = id ? getReviewData(id) : undefined

  const [tab, setTab] = useState<CaseReviewTab>('documentReview')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [action, setAction] = useState<ReviewAction>('submit')
  const [comment, setComment] = useState('')
  const [summaryValues, setSummaryValues] = useState<AssessmentSummaryValues>(
    () => stored?.summaryValues ?? (isChecker ? sampleSummaryValues() : {}),
  )
  const [ratings, setRatings] = useState<RiskAssessmentRatings>(
    () => stored?.ratings ?? (isChecker ? sampleRatings() : {}),
  )
  const [operationalRisk, setOperationalRisk] = useState<OperationalRiskEntry>(
    () => stored?.operationalRisk ?? (isChecker ? sampleOperationalRiskEntry : emptyOperationalRiskEntry),
  )
  const [businessAssessmentValues, setBusinessAssessmentValues] = useState<AssessmentSummaryValues>(
    () => stored?.businessAssessmentValues ?? (isChecker ? sampleBusinessAssessmentValues() : {}),
  )
  const [deactivationRecommended, setDeactivationRecommended] = useState(request?.deactivationRecommended ?? false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab])

  if (!request) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Vendor Due Diligence', to: '/vendor-due-diligence' }, 'Case Review']} />
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Request not found</h1>
      </div>
    )
  }

  const summaryComplete = assessmentSummaryFields.every((field) => (summaryValues[field.key] ?? '').trim() !== '')
  const assessmentComplete = riskAssessmentParameters.every((param) => ratings[param.key])
  const operationalRiskComplete = isOperationalRiskEntryComplete(operationalRisk)
  const businessAssessmentComplete = businessAssessmentFields.every(
    (field) => (businessAssessmentValues[field.key] ?? '').trim() !== '',
  )
  const submitDisabled = isBusinessUnit
    ? !businessAssessmentComplete
    : !summaryComplete || !assessmentComplete || !operationalRiskComplete

  function startAction(next: ReviewAction) {
    setAction(next)
    setConfirmOpen(true)
  }

  function handleConfirm() {
    setConfirmOpen(false)
    if (action === 'submit' && id) {
      saveReviewData(id, { summaryValues, ratings, operationalRisk, businessAssessmentValues })
    }
    if (action === 'recommendDeactivation') {
      setDeactivationRecommended(true)
    }
    setSuccessOpen(true)
  }

  function handleCloseSuccess() {
    setSuccessOpen(false)
    if (action !== 'recommendDeactivation') {
      navigate('/vendor-due-diligence')
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Vendor Due Diligence', to: '/vendor-due-diligence' }, 'Case Review']} />

      <h1 className="mt-3 text-3xl font-bold text-slate-900">Case Review - {request.vendorName}</h1>
      <p className="mt-1 text-slate-500">Review pending document updates for vendor ID: {request.vendorId}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Case ID</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{request.requestId}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Vendor Name</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{request.vendorName}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</p>
          <div className="mt-1">
            <DueDiligenceStatusBadge status={request.status} />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Last Updated</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{request.submittedLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex gap-6 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 pb-3 text-sm font-semibold ${
              tab === t.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'documentReview' && (
        <DocumentReviewTab
          items={getDocumentComparisons()}
          deactivationRecommended={deactivationRecommended}
          onRecommendDeactivation={() => startAction('recommendDeactivation')}
          onNext={() => setTab(isBusinessUnit ? 'businessAssessment' : 'summary')}
          readOnly={isChecker}
        />
      )}

      {tab === 'businessAssessment' && (
        <BusinessAssessmentTab
          values={businessAssessmentValues}
          onChange={(key, value) => setBusinessAssessmentValues((prev) => ({ ...prev, [key]: value }))}
          onBack={() => setTab(isBusinessUnit ? 'documentReview' : 'assessment')}
          readOnly={isChecker}
          isFinalTab={isBusinessUnit}
          onNext={() => setTab('riskAssessment')}
          onSubmit={() => startAction('submit')}
          submitDisabled={submitDisabled}
        />
      )}

      {tab === 'summary' && (
        <AssessmentSummaryTab
          values={summaryValues}
          onChange={(key, value) => setSummaryValues((prev) => ({ ...prev, [key]: value }))}
          onBack={() => setTab('documentReview')}
          onNext={() => setTab('assessment')}
          readOnly={isChecker}
        />
      )}

      {tab === 'assessment' && (
        <VendorAssessmentTab
          ratings={ratings}
          onRate={(paramKey, rating: RatingKey) => setRatings((prev) => ({ ...prev, [paramKey]: rating }))}
          onBack={() => setTab('summary')}
          readOnly={isChecker}
          isFinalTab={false}
          onNext={() => setTab(isFinalApprover ? 'businessAssessment' : 'riskAssessment')}
        />
      )}

      {tab === 'riskAssessment' && (
        <RiskAssessmentTab
          value={operationalRisk}
          onChange={setOperationalRisk}
          onBack={() => setTab(isFinalApprover ? 'businessAssessment' : 'assessment')}
          readOnly={isChecker}
          onSubmit={() => startAction('submit')}
          submitDisabled={submitDisabled}
          onApprove={() => startAction('approve')}
          onReject={() => startAction('reject')}
          comment={comment}
          onCommentChange={setComment}
        />
      )}

      <ConfirmSubmissionModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={actionCopy[action].title}
        message={actionCopy[action].message}
        confirmLabel={actionCopy[action].confirmLabel}
        confirmClassName={actionCopy[action].confirmClassName}
      />
      <SubmittedSuccessModal
        open={successOpen}
        onClose={handleCloseSuccess}
        title={actionCopy[action].successTitle}
        message={actionCopy[action].successMessage}
      />
    </div>
  )
}

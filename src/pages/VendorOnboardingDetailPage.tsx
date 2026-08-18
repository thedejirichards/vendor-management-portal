import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import OnboardingStatusBadge from '../components/OnboardingStatusBadge'
import DocumentCategoryCard from '../components/DocumentCategoryCard'
import DocumentsTab from '../components/DocumentsTab'
import AssessmentSummaryTab from '../components/AssessmentSummaryTab'
import VendorAssessmentTab from '../components/VendorAssessmentTab'
import RiskAssessmentTab from '../components/RiskAssessmentTab'
import MakersAssessmentTab from '../components/MakersAssessmentTab'
import ApprovalChainTab from '../components/ApprovalChainTab'
import WorkflowHistoryTab from '../components/WorkflowHistoryTab'
import ConfirmSubmissionModal from '../components/ConfirmSubmissionModal'
import SubmittedSuccessModal from '../components/SubmittedSuccessModal'
import { onboardingSubmissions, updateOnboardingSubmissionStatus } from '../data/onboardingSubmissions'
import { getVendorDocuments } from '../data/vendorDocuments'
import { assessmentSummaryFields } from '../data/assessmentSummaryFields'
import { riskAssessmentParameters, testScoreScenarios } from '../data/riskAssessmentParameters'
import { getReviewData, saveReviewData } from '../data/reviewData'
import { saveCaseCompletion } from '../data/caseCompletions'
import { getWorkflowHistory, appendWorkflowHistoryEntry } from '../data/workflowHistory'
import { onboardingWorkflowStages } from '../data/workflowStages'
import { onboardingReportRecipients, groupEmailRecipient } from '../data/reportRecipients'
import { emptyOperationalRiskEntry, sampleOperationalRiskEntry, isOperationalRiskEntryComplete } from '../data/operationalRisk'
import { groupHeadApprovals, type ApprovalChainComment } from '../data/approvalChain'
import { useCurrentUser } from '../context/useCurrentUser'
import type { AssessmentSummaryValues, OperationalRiskEntry, RatingKey, RiskAssessmentRatings } from '../types/assessment'

type ReviewTab = 'documents' | 'summary' | 'assessment' | 'riskAssessment' | 'workflowHistory'
type ReviewAction = 'submit' | 'approve' | 'reject'
type GroupHeadTab = 'makersAssessment' | 'documents' | 'riskAssessment' | 'approvalChain' | 'workflowHistory'
type InitiatorTab = 'documents' | 'workflowHistory'

const groupHeadTabs: { key: GroupHeadTab; label: string }[] = [
  { key: 'makersAssessment', label: "Maker's Assessment" },
  { key: 'documents', label: 'Documents' },
  { key: 'riskAssessment', label: 'Risk Assessment' },
  { key: 'approvalChain', label: 'Approval Chain' },
  { key: 'workflowHistory', label: 'Workflow History' },
]

const initiatorTabs: { key: InitiatorTab; label: string }[] = [
  { key: 'documents', label: 'Documents' },
  { key: 'workflowHistory', label: 'Workflow History' },
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
}

function sampleSummaryValues(): AssessmentSummaryValues {
  return Object.fromEntries(assessmentSummaryFields.map((field) => [field.key, field.sampleValue]))
}

function sampleRatings(): RiskAssessmentRatings {
  return testScoreScenarios.find((scenario) => scenario.key === 'mediumRisk')?.ratings ?? {}
}

export default function VendorOnboardingDetailPage() {
  const { id } = useParams()
  const { currentUser } = useCurrentUser()
  // Remount the review whenever the submission or the acting user changes, so
  // loaded/sample review data and the selected tab always start fresh for
  // that combination.
  return <SubmissionReview key={`${id ?? 'none'}-${currentUser.id}`} />
}

function SubmissionReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()
  const submission = onboardingSubmissions.find((s) => s.id === id)

  const stored = id ? getReviewData(id) : undefined
  const workflowEntries = id ? getWorkflowHistory(id) : []
  const isCheckerOrGroupHead = currentUser.isChecker || currentUser.isGroupHead

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [action, setAction] = useState<ReviewAction>('submit')
  const [tab, setTab] = useState<ReviewTab>('documents')
  const [initiatorTab, setInitiatorTab] = useState<InitiatorTab>('documents')
  const [groupHeadTab, setGroupHeadTab] = useState<GroupHeadTab>('makersAssessment')
  const [groupHeadComment, setGroupHeadComment] = useState('')
  const [checkerComment, setCheckerComment] = useState('')
  const [summaryValues, setSummaryValues] = useState<AssessmentSummaryValues>(
    () => stored?.summaryValues ?? (isCheckerOrGroupHead ? sampleSummaryValues() : {}),
  )
  const [ratings, setRatings] = useState<RiskAssessmentRatings>(
    () => stored?.ratings ?? (isCheckerOrGroupHead ? sampleRatings() : {}),
  )
  const [operationalRisk, setOperationalRisk] = useState<OperationalRiskEntry>(
    () => stored?.operationalRisk ?? (isCheckerOrGroupHead ? sampleOperationalRiskEntry : emptyOperationalRiskEntry),
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab, groupHeadTab])

  if (!submission) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Vendor Onboarding', to: '/vendor-onboarding' }, 'View']} />
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Submission not found</h1>
      </div>
    )
  }

  const documentCategories = getVendorDocuments(submission.vendorName).filter(
    (category) => category.title !== 'SLA Document',
  )
  const documentCount = documentCategories.reduce((sum, category) => sum + category.files.length, 0)

  // Any group head rejecting halts the process; only the Integrated Reviewer's
  // approval (the top of the escalation chain, see [[approval_chain_flow]]) completes it.
  const isFinalApprover = currentUser.id === 'integrated-reviewer'
  const isCaseCompletingAction =
    currentUser.isGroupHead && ((action === 'approve' && isFinalApprover) || action === 'reject')
  const reportRecipients = isCaseCompletingAction
    ? [...onboardingReportRecipients(), groupEmailRecipient(submission.businessUnit)]
    : []

  // Maps the acting user to their stage in onboardingWorkflowStages.
  function currentWorkflowStageKey(): string {
    if (!currentUser.isReviewer && !currentUser.isGroupHead) return 'initiated'
    if (currentUser.isGroupHead) return currentUser.id
    return currentUser.reviewStream === 'orm' ? 'orm' : 'icsgCompliance'
  }

  function handleConfirm() {
    setConfirmOpen(false)
    if (action === 'submit' && id) {
      saveReviewData(id, { summaryValues, ratings, operationalRisk })
    }
    if (id) {
      appendWorkflowHistoryEntry(id, {
        stageKey: currentWorkflowStageKey(),
        decision: action === 'submit' ? 'submitted' : action === 'approve' ? 'approved' : 'rejected',
        actorName: currentUser.name,
        actorRole: currentUser.role,
        timestampLabel: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        comment: action === 'submit' ? undefined : currentUser.isGroupHead ? groupHeadComment : checkerComment,
      })
    }
    if (isCaseCompletingAction && id) {
      updateOnboardingSubmissionStatus(id, action === 'approve' ? 'Approved' : 'Rejected')
      saveCaseCompletion(id, {
        decision: action === 'approve' ? 'approved' : 'rejected',
        decidedByName: currentUser.name,
        decidedByRole: currentUser.role,
        decidedAtLabel: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        comment: groupHeadComment,
      })
    }
    setSuccessOpen(true)
  }

  function handleCloseSuccess() {
    setSuccessOpen(false)
    navigate('/vendor-onboarding')
  }

  function startAction(next: ReviewAction) {
    setAction(next)
    setConfirmOpen(true)
  }

  if (!currentUser.isReviewer && !currentUser.isGroupHead) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Vendor Onboarding', to: '/vendor-onboarding' }, 'View']} />

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{submission.vendorName}</h1>
            <p className="mt-1 text-slate-500">
              Vendor ID: {submission.vendorId}
              <span className="mx-1.5">&middot;</span>
              Submitted: {submission.submittedLabel}
            </p>
          </div>
          <OnboardingStatusBadge status={submission.status} />
        </div>

        <div className="mt-5 flex gap-6 border-b border-slate-200">
          {initiatorTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setInitiatorTab(t.key)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold ${
                initiatorTab === t.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {initiatorTab === 'documents' && (
          <>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-6">
              <div className="divide-y divide-slate-200">
                {documentCategories.map((category) => (
                  <DocumentCategoryCard key={category.title} category={category} />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => startAction('submit')}
                className="rounded-lg bg-brand-600 px-8 py-3 font-semibold text-white hover:bg-brand-700"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {initiatorTab === 'workflowHistory' && (
          <WorkflowHistoryTab stages={onboardingWorkflowStages} entries={workflowEntries} />
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

  if (currentUser.isGroupHead) {
    const priorGroupHeadComments: ApprovalChainComment[] =
      currentUser.id === 'group-head-orm'
        ? [groupHeadApprovals.icsg]
        : currentUser.id === 'group-head-compliance'
          ? [groupHeadApprovals.icsg, groupHeadApprovals.orm]
          : currentUser.id === 'integrated-reviewer'
            ? [groupHeadApprovals.icsg, groupHeadApprovals.orm, groupHeadApprovals.compliance]
            : []

    return (
      <div>
        <Breadcrumb items={[{ label: 'Vendor Onboarding', to: '/vendor-onboarding' }, 'Group Head Review']} />

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{submission.vendorName}</h1>
            <p className="mt-1 text-slate-500">
              Vendor ID: {submission.vendorId}
              <span className="mx-1.5">&middot;</span>
              Submitted: {submission.submittedLabel}
              <span className="mx-1.5">&middot;</span>
              {documentCount} Documents
            </p>
          </div>
          <OnboardingStatusBadge status={submission.status} />
        </div>

        <div className="mt-5 flex gap-6 border-b border-slate-200">
          {groupHeadTabs.map((t) =>
            t.key === 'workflowHistory' ? (
              <button
                key={t.key}
                type="button"
                onClick={() => setGroupHeadTab(t.key)}
                className={`-mb-px border-b-2 pb-3 text-sm font-semibold ${
                  groupHeadTab === t.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {t.label}
              </button>
            ) : (
              <span
                key={t.key}
                className={`-mb-px cursor-default border-b-2 pb-3 text-sm font-semibold ${
                  groupHeadTab === t.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400'
                }`}
              >
                {t.label}
              </span>
            ),
          )}
        </div>

        {groupHeadTab === 'makersAssessment' && (
          <MakersAssessmentTab
            summaryValues={summaryValues}
            ratings={ratings}
            submittedLabel={submission.submittedLabel}
            onNext={() => setGroupHeadTab('documents')}
          />
        )}

        {groupHeadTab === 'documents' && (
          <DocumentsTab
            categories={documentCategories}
            onBack={() => setGroupHeadTab('makersAssessment')}
            onNext={() => setGroupHeadTab('riskAssessment')}
          />
        )}

        {groupHeadTab === 'riskAssessment' && (
          <RiskAssessmentTab
            value={operationalRisk}
            onChange={setOperationalRisk}
            onBack={() => setGroupHeadTab('documents')}
            readOnly
            title="ORM Risk Assessment"
            subtitle="Risk assessment completed by Operational Risk reviewer"
            isFinalTab={false}
            onNext={() => setGroupHeadTab('approvalChain')}
          />
        )}

        {groupHeadTab === 'approvalChain' && (
          <ApprovalChainTab
            onBack={() => setGroupHeadTab('riskAssessment')}
            comment={groupHeadComment}
            onCommentChange={setGroupHeadComment}
            onApprove={() => startAction('approve')}
            onReject={() => startAction('reject')}
            groupHeadComments={priorGroupHeadComments}
          />
        )}

        {groupHeadTab === 'workflowHistory' && (
          <WorkflowHistoryTab stages={onboardingWorkflowStages} entries={workflowEntries} />
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
          sharedWithEmails={isCaseCompletingAction ? reportRecipients.map((r) => r.email) : undefined}
          onViewReport={isCaseCompletingAction ? () => navigate(`/vendor-onboarding/${id}/report`) : undefined}
        />
      </div>
    )
  }

  const isChecker = currentUser.isChecker
  const isOrm = currentUser.reviewStream === 'orm'
  const summaryComplete = assessmentSummaryFields.every((field) => (summaryValues[field.key] ?? '').trim() !== '')
  const assessmentComplete = riskAssessmentParameters.every((param) => ratings[param.key])
  const operationalRiskComplete = !isOrm || isOperationalRiskEntryComplete(operationalRisk)
  const submitDisabled = !summaryComplete || !assessmentComplete || !operationalRiskComplete

  const tabs: { key: ReviewTab; label: string }[] = [
    { key: 'documents', label: 'View Documents' },
    { key: 'summary', label: 'Assessment Summary' },
    { key: 'assessment', label: 'Vendor Assessment' },
    ...(isOrm ? [{ key: 'riskAssessment' as ReviewTab, label: 'Risk Assessment' }] : []),
    { key: 'workflowHistory', label: 'Workflow History' },
  ]

  return (
    <div>
      <Breadcrumb items={[{ label: 'Vendor Onboarding', to: '/vendor-onboarding' }, 'Review']} />

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{submission.vendorName}</h1>
          <p className="mt-1 text-slate-500">
            Vendor ID: {submission.vendorId}
            <span className="mx-1.5">&middot;</span>
            Submitted: {submission.submittedLabel}
            <span className="mx-1.5">&middot;</span>
            {documentCount} Documents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/vendor-onboarding')}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
          <OnboardingStatusBadge status={submission.status} />
        </div>
      </div>

      <div className="mt-5 flex gap-6 border-b border-slate-200">
        {tabs.map((t) =>
          t.key === 'workflowHistory' ? (
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
          ) : (
            <span
              key={t.key}
              className={`-mb-px cursor-default border-b-2 pb-3 text-sm font-semibold ${
                tab === t.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400'
              }`}
            >
              {t.label}
            </span>
          ),
        )}
      </div>

      {tab === 'documents' && <DocumentsTab categories={documentCategories} onNext={() => setTab('summary')} />}

      {tab === 'summary' && (
        <AssessmentSummaryTab
          values={summaryValues}
          onChange={(key, value) => setSummaryValues((prev) => ({ ...prev, [key]: value }))}
          onBack={() => setTab('documents')}
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
          isFinalTab={!isOrm}
          onNext={() => setTab('riskAssessment')}
          onSubmit={() => startAction('submit')}
          submitDisabled={submitDisabled}
          onApprove={() => startAction('approve')}
          onReject={() => startAction('reject')}
          comment={checkerComment}
          onCommentChange={setCheckerComment}
        />
      )}

      {tab === 'riskAssessment' && (
        <RiskAssessmentTab
          value={operationalRisk}
          onChange={setOperationalRisk}
          onBack={() => setTab('assessment')}
          readOnly={isChecker}
          onSubmit={() => startAction('submit')}
          submitDisabled={submitDisabled}
          onApprove={() => startAction('approve')}
          onReject={() => startAction('reject')}
          comment={checkerComment}
          onCommentChange={setCheckerComment}
        />
      )}

      {tab === 'workflowHistory' && (
        <WorkflowHistoryTab stages={onboardingWorkflowStages} entries={workflowEntries} />
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

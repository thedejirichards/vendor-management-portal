import { CheckCircle2, Download, Mail, XCircle } from 'lucide-react'
import type { CaseCompletion } from '../data/caseCompletions'
import type { ReportRecipient } from '../data/reportRecipients'

export interface CaseReportSection {
  title: string
  entries: { label: string; value: string }[]
}

interface CaseReportViewProps {
  processLabel: string
  caseId: string
  vendorName: string
  vendorId: string
  businessUnit?: string
  statusLabel: string
  submittedLabel: string
  sections: CaseReportSection[]
  completion?: CaseCompletion
  recipients: ReportRecipient[]
  onBack: () => void
}

export default function CaseReportView({
  processLabel,
  caseId,
  vendorName,
  vendorId,
  businessUnit,
  statusLabel,
  submittedLabel,
  sections,
  completion,
  recipients,
  onBack,
}: CaseReportViewProps) {
  return (
    <div>
      <div className="print:hidden mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Download className="h-4 w-4" />
          Download Report
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{processLabel} Report</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{vendorName}</h1>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Case ID</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{caseId}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Vendor ID</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{vendorId}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Business Unit</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{businessUnit ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Submitted</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{submittedLabel}</p>
          </div>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
          <div className="mt-4 flex flex-col gap-4">
            {section.entries.map((entry) => (
              <div key={entry.label}>
                <p className="text-sm font-semibold text-slate-700">{entry.label}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-bold text-slate-900">Final Decision</h2>
        {completion ? (
          <div className="mt-4 flex items-start gap-3">
            {completion.decision === 'approved' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            )}
            <div>
              <p className="font-semibold text-slate-900">
                {completion.decision === 'approved' ? 'Approved' : 'Rejected'} by {completion.decidedByName}
              </p>
              <p className="text-sm text-slate-500">
                {completion.decidedByRole} &middot; {completion.decidedAtLabel} &middot; Status: {statusLabel}
              </p>
              {completion.comment && <p className="mt-2 text-sm text-slate-600">{completion.comment}</p>}
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            This case has not reached a final decision yet. Current status: {statusLabel}.
          </p>
        )}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-bold text-slate-900">Distribution</h2>
        <p className="mt-1 text-sm text-slate-500">
          {completion
            ? `This report was shared with the following resources on ${completion.decidedAtLabel}.`
            : 'This report will be shared with the following resources once the case is completed.'}
        </p>
        <div className="mt-4 flex flex-col divide-y divide-slate-100">
          {recipients.map((recipient) => (
            <div key={recipient.email} className="flex items-center justify-between gap-4 py-2.5">
              <div>
                <p className="text-sm font-semibold text-slate-900">{recipient.name}</p>
                <p className="text-xs text-slate-500">{recipient.role}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                <Mail className="h-3.5 w-3.5" />
                {recipient.email}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

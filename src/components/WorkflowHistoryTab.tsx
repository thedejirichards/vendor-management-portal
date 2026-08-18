import { CheckCircle2, Circle, Clock, XCircle } from 'lucide-react'
import type { WorkflowHistoryEntry } from '../data/workflowHistory'
import { currentPendingWith, stageStatus, type WorkflowStageDef } from '../data/workflowStages'

interface WorkflowHistoryTabProps {
  stages: WorkflowStageDef[]
  entries: WorkflowHistoryEntry[]
}

const statusStyles: Record<string, { icon: typeof CheckCircle2; className: string; badge: string }> = {
  completed: { icon: CheckCircle2, className: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
  rejected: { icon: XCircle, className: 'text-red-600', badge: 'bg-red-50 text-red-700' },
  'in-progress': { icon: Clock, className: 'text-amber-600', badge: 'bg-amber-50 text-amber-700' },
  'not-started': { icon: Circle, className: 'text-slate-300', badge: 'bg-slate-100 text-slate-500' },
}

const statusLabel: Record<string, string> = {
  completed: 'Completed',
  rejected: 'Rejected',
  'in-progress': 'In Progress',
  'not-started': 'Not Started',
}

export default function WorkflowHistoryTab({ stages, entries }: WorkflowHistoryTabProps) {
  const rejected = entries.some((e) => e.decision === 'rejected')
  const pendingWith = currentPendingWith(stages, entries)

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold text-slate-900">Workflow History</h2>
      <p className="mt-1 text-sm text-slate-500">Track every stage of this case and see who it's currently with</p>

      {rejected ? (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          <XCircle className="h-5 w-5 shrink-0" />
          This case was rejected and the workflow has stopped.
        </div>
      ) : pendingWith.length > 0 ? (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-700">
          <Clock className="h-5 w-5 shrink-0" />
          Currently pending with: {pendingWith.join(', ')}
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          This case has completed the full workflow.
        </div>
      )}

      <div className="mt-6 flex flex-col">
        {stages.map((stage, index) => {
          const status = stageStatus(stage, entries)
          const style = statusStyles[status]
          const Icon = style.icon
          const stageEntries = entries.filter((e) => e.stageKey === stage.key)
          const isLast = index === stages.length - 1
          const isParallelWithPrev = index > 0 && stages[index - 1].parallelGroup === stage.parallelGroup

          return (
            <div key={stage.key} className={`flex gap-4 ${isParallelWithPrev ? '-mt-1' : ''}`}>
              <div className="flex flex-col items-center">
                <Icon className={`h-6 w-6 shrink-0 ${style.className}`} />
                {!isLast && <div className="mt-1 w-px flex-1 bg-slate-200" />}
              </div>
              <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-6'}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{stage.label}</p>
                  {isParallelWithPrev && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                      Runs in parallel
                    </span>
                  )}
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>
                    {statusLabel[status]}
                  </span>
                </div>

                {stageEntries.length > 0 ? (
                  <div className="mt-2 flex flex-col gap-2">
                    {stageEntries.map((entry, entryIndex) => (
                      <div key={entryIndex} className="rounded-lg bg-slate-50 p-3 text-sm">
                        <p className="font-semibold text-slate-800">
                          {entry.actorName}
                          <span className="ml-1.5 font-normal text-slate-500">
                            ({entry.actorRole}) &middot;{' '}
                            {entry.decision === 'submitted' ? 'Submitted' : entry.decision === 'approved' ? 'Approved' : 'Rejected'}
                          </span>
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">{entry.timestampLabel}</p>
                        {entry.comment && <p className="mt-1.5 text-slate-600">{entry.comment}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-slate-400">
                    Pending with: {status === 'in-progress' && stage.checkerRoleLabel ? stage.checkerRoleLabel : stage.makerRoleLabel}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

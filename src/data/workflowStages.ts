import type { WorkflowHistoryEntry } from './workflowHistory'

export interface WorkflowStageDef {
  key: string
  label: string
  /** Role that acts first (or the only actor, for single-step stages). */
  makerRoleLabel: string
  /** Role that acts second. When set, the stage only completes once this role approves/rejects. */
  checkerRoleLabel?: string
  /** Stages sharing the same group number run simultaneously rather than one-after-another. */
  parallelGroup: number
}

export type StageStatus = 'not-started' | 'in-progress' | 'completed' | 'rejected'

// Initiator -> ICSG & Compliance and ORM maker/checker review (in parallel) -> Group Head ICSG
// -> Group Head ORM -> Group Head Compliance -> Integrated Reviewer (final).
export const onboardingWorkflowStages: WorkflowStageDef[] = [
  { key: 'initiated', label: 'Initiation', makerRoleLabel: 'Initiating Team', parallelGroup: 0 },
  {
    key: 'icsgCompliance',
    label: 'ICSG & Compliance Review',
    makerRoleLabel: 'Reviewer-ICSG & Compliance (Maker)',
    checkerRoleLabel: 'Reviewer-ICSG & Compliance (Checker)',
    parallelGroup: 1,
  },
  {
    key: 'orm',
    label: 'ORM Review',
    makerRoleLabel: 'Reviewer-ORM (Maker)',
    checkerRoleLabel: 'ORM Reviewer (Checker)',
    parallelGroup: 1,
  },
  { key: 'group-head-icsg', label: 'Group Head ICSG Approval', makerRoleLabel: 'Group Head ICSG', parallelGroup: 2 },
  { key: 'group-head-orm', label: 'Group Head ORM Approval', makerRoleLabel: 'Group Head ORM', parallelGroup: 3 },
  {
    key: 'group-head-compliance',
    label: 'Group Head Compliance Approval',
    makerRoleLabel: 'Group Head Compliance',
    parallelGroup: 4,
  },
  {
    key: 'integrated-reviewer',
    label: 'Integrated Reviewer Final Approval',
    makerRoleLabel: 'Integrated Reviewer',
    parallelGroup: 5,
  },
]

// Maker ORM -> Checker ORM -> Business Unit -> Group Head ORM (final).
export const dueDiligenceWorkflowStages: WorkflowStageDef[] = [
  { key: 'orm-maker', label: 'Maker Review', makerRoleLabel: 'Reviewer-ORM (Maker)', parallelGroup: 0 },
  { key: 'orm-checker', label: 'Checker Review', makerRoleLabel: 'ORM Reviewer (Checker)', parallelGroup: 1 },
  { key: 'business-unit', label: 'Business Assessment', makerRoleLabel: 'Business Unit', parallelGroup: 2 },
  { key: 'group-head-orm', label: 'Final Approval', makerRoleLabel: 'Group Head ORM', parallelGroup: 3 },
]

export function stageStatus(stage: WorkflowStageDef, entries: WorkflowHistoryEntry[]): StageStatus {
  const stageEntries = entries.filter((e) => e.stageKey === stage.key)
  if (stageEntries.length === 0) return 'not-started'
  if (stageEntries.some((e) => e.decision === 'rejected')) return 'rejected'
  if (!stage.checkerRoleLabel) return 'completed'
  return stageEntries.some((e) => e.decision === 'approved') ? 'completed' : 'in-progress'
}

/** Who the case is currently sitting with, across every unresolved stage in the earliest unresolved group(s). */
export function currentPendingWith(stages: WorkflowStageDef[], entries: WorkflowHistoryEntry[]): string[] {
  const statuses = stages.map((stage) => ({ stage, status: stageStatus(stage, entries) }))
  if (statuses.some((s) => s.status === 'rejected')) return []

  const groups = [...new Set(stages.map((s) => s.parallelGroup))].sort((a, b) => a - b)
  for (const group of groups) {
    const groupStatuses = statuses.filter((s) => s.stage.parallelGroup === group)
    const unresolved = groupStatuses.filter((s) => s.status !== 'completed')
    if (unresolved.length > 0) {
      return unresolved.map((s) =>
        s.status === 'in-progress' && s.stage.checkerRoleLabel ? s.stage.checkerRoleLabel : s.stage.makerRoleLabel,
      )
    }
  }
  return []
}

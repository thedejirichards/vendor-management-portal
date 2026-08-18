export type WorkflowStageDecision = 'submitted' | 'approved' | 'rejected'

export interface WorkflowHistoryEntry {
  stageKey: string
  decision: WorkflowStageDecision
  actorName: string
  actorRole: string
  timestampLabel: string
  comment?: string
}

const STORAGE_KEY = 'tprm-workflow-history'

function readStore(): Record<string, WorkflowHistoryEntry[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getWorkflowHistory(caseId: string): WorkflowHistoryEntry[] {
  return readStore()[caseId] ?? []
}

export function appendWorkflowHistoryEntry(caseId: string, entry: WorkflowHistoryEntry) {
  const store = readStore()
  store[caseId] = [...(store[caseId] ?? []), entry]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

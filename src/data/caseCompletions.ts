export type CaseDecision = 'approved' | 'rejected'

export interface CaseCompletion {
  decision: CaseDecision
  decidedByName: string
  decidedByRole: string
  decidedAtLabel: string
  comment: string
}

const STORAGE_KEY = 'tprm-case-completions'

function readStore(): Record<string, CaseCompletion> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getCaseCompletion(caseId: string): CaseCompletion | undefined {
  return readStore()[caseId]
}

export function saveCaseCompletion(caseId: string, data: CaseCompletion) {
  const store = readStore()
  store[caseId] = data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export type NavKey = 'dashboard' | 'vendor-onboarding' | 'vendor-deactivation' | 'vendor-due-diligence'

const ALL_PAGES: NavKey[] = ['dashboard', 'vendor-onboarding', 'vendor-deactivation']
const NO_DEACTIVATION_PAGES: NavKey[] = ['dashboard', 'vendor-onboarding']
const DASHBOARD_ONLY_PAGES: NavKey[] = ['dashboard', 'vendor-due-diligence']
const ORM_PAGES: NavKey[] = ['dashboard', 'vendor-onboarding', 'vendor-due-diligence']

export type ReviewStream = 'icsgCompliance' | 'orm'

export interface AppUser {
  id: string
  name: string
  role: string
  visiblePages: NavKey[]
  isReviewer: boolean
  isChecker: boolean
  isGroupHead: boolean
  reviewStream: ReviewStream | null
}

export const users: AppUser[] = [
  { id: 'initiator', name: 'Dejir Richards', role: 'Level 1: Initiator', visiblePages: ALL_PAGES, isReviewer: false, isChecker: false, isGroupHead: false, reviewStream: null },
  { id: 'icsg-maker', name: 'Ngozi Umeh', role: 'Reviewer-ICSG & Compliance (Maker)', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: true, isChecker: false, isGroupHead: false, reviewStream: 'icsgCompliance' },
  { id: 'icsg-checker', name: 'Tunde Bakare', role: 'Reviewer-ICSG & Compliance (Checker)', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: true, isChecker: true, isGroupHead: false, reviewStream: 'icsgCompliance' },
  { id: 'orm-maker', name: 'Amara Chukwu', role: 'Reviewer-ORM (Maker)', visiblePages: ORM_PAGES, isReviewer: true, isChecker: false, isGroupHead: false, reviewStream: 'orm' },
  { id: 'orm-checker', name: 'Femi Adigun', role: 'ORM Reviewer (Checker)', visiblePages: ORM_PAGES, isReviewer: true, isChecker: true, isGroupHead: false, reviewStream: 'orm' },
  { id: 'group-head-icsg', name: 'Chidi Okafor', role: 'Group Head ICSG', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: 'icsgCompliance' },
  { id: 'group-head-orm', name: 'Ifeoma Nwosu', role: 'Group Head ORM', visiblePages: ORM_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: 'orm' },
  { id: 'business-unit', name: 'Kelechi Eze', role: 'Business Unit', visiblePages: DASHBOARD_ONLY_PAGES, isReviewer: false, isChecker: false, isGroupHead: false, reviewStream: null },
  { id: 'group-head-compliance', name: 'Grace Adeyemi', role: 'Group Head Compliance', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: 'icsgCompliance' },
  { id: 'integrated-reviewer', name: 'Emeka Obi', role: 'Integrated Reviewer', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: null },
]

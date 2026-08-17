export type NavKey = 'dashboard' | 'vendor-onboarding' | 'vendor-deactivation' | 'vendor-due-diligence'

const ALL_PAGES: NavKey[] = ['dashboard', 'vendor-onboarding', 'vendor-deactivation']
const NO_DEACTIVATION_PAGES: NavKey[] = ['dashboard', 'vendor-onboarding']
const DASHBOARD_ONLY_PAGES: NavKey[] = ['dashboard', 'vendor-due-diligence']
const ORM_PAGES: NavKey[] = ['dashboard', 'vendor-onboarding', 'vendor-due-diligence']

export type ReviewStream = 'icsgCompliance' | 'orm'

export interface AppUser {
  id: string
  name: string
  email: string
  role: string
  visiblePages: NavKey[]
  isReviewer: boolean
  isChecker: boolean
  isGroupHead: boolean
  reviewStream: ReviewStream | null
}

export const users: AppUser[] = [
  { id: 'initiator', name: 'Dejir Richards', email: 'dejir.richards@accessbankplc.com', role: 'Level 1: Initiator', visiblePages: ALL_PAGES, isReviewer: false, isChecker: false, isGroupHead: false, reviewStream: null },
  { id: 'icsg-maker', name: 'Ngozi Umeh', email: 'ngozi.umeh@accessbankplc.com', role: 'Reviewer-ICSG & Compliance (Maker)', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: true, isChecker: false, isGroupHead: false, reviewStream: 'icsgCompliance' },
  { id: 'icsg-checker', name: 'Tunde Bakare', email: 'tunde.bakare@accessbankplc.com', role: 'Reviewer-ICSG & Compliance (Checker)', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: true, isChecker: true, isGroupHead: false, reviewStream: 'icsgCompliance' },
  { id: 'orm-maker', name: 'Amara Chukwu', email: 'amara.chukwu@accessbankplc.com', role: 'Reviewer-ORM (Maker)', visiblePages: ORM_PAGES, isReviewer: true, isChecker: false, isGroupHead: false, reviewStream: 'orm' },
  { id: 'orm-checker', name: 'Femi Adigun', email: 'femi.adigun@accessbankplc.com', role: 'ORM Reviewer (Checker)', visiblePages: ORM_PAGES, isReviewer: true, isChecker: true, isGroupHead: false, reviewStream: 'orm' },
  { id: 'group-head-icsg', name: 'Chidi Okafor', email: 'chidi.okafor@accessbankplc.com', role: 'Group Head ICSG', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: 'icsgCompliance' },
  { id: 'group-head-orm', name: 'Ifeoma Nwosu', email: 'ifeoma.nwosu@accessbankplc.com', role: 'Group Head ORM', visiblePages: ORM_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: 'orm' },
  { id: 'business-unit', name: 'Kelechi Eze', email: 'kelechi.eze@accessbankplc.com', role: 'Business Unit', visiblePages: DASHBOARD_ONLY_PAGES, isReviewer: false, isChecker: false, isGroupHead: false, reviewStream: null },
  { id: 'group-head-compliance', name: 'Grace Adeyemi', email: 'grace.adeyemi@accessbankplc.com', role: 'Group Head Compliance', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: 'icsgCompliance' },
  { id: 'integrated-reviewer', name: 'Emeka Obi', email: 'emeka.obi@accessbankplc.com', role: 'Integrated Reviewer', visiblePages: NO_DEACTIVATION_PAGES, isReviewer: false, isChecker: false, isGroupHead: true, reviewStream: null },
]

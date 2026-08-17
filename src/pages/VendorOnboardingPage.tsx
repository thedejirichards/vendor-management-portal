import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, Plus } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Pagination from '../components/Pagination'
import OnboardingStatusBadge from '../components/OnboardingStatusBadge'
import NewVendorRequestModal from '../components/NewVendorRequestModal'
import SubmittedSuccessModal from '../components/SubmittedSuccessModal'
import { addOnboardingSubmission, onboardingSubmissions } from '../data/onboardingSubmissions'
import { useCurrentUser } from '../context/UserContext'
import type { OnboardingStatus } from '../types/onboarding'

const PAGE_SIZE = 5

type TabKey = 'current' | 'historical' | 'invited'

const CURRENT_STATUSES: OnboardingStatus[] = ['Pending', 'In Review']
const HISTORICAL_STATUSES: OnboardingStatus[] = ['Approved', 'Rejected']
const INVITED_STATUSES: OnboardingStatus[] = ['Invited']

const STATUSES_BY_TAB: Record<TabKey, OnboardingStatus[]> = {
  current: CURRENT_STATUSES,
  historical: HISTORICAL_STATUSES,
  invited: INVITED_STATUSES,
}

export default function VendorOnboardingPage() {
  const { currentUser } = useCurrentUser()
  const canInitiate = !currentUser.isReviewer && !currentUser.isGroupHead
  const [tab, setTab] = useState<TabKey>('current')
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [requestModalOpen, setRequestModalOpen] = useState(false)
  const [invitedEmail, setInvitedEmail] = useState('')
  const [successOpen, setSuccessOpen] = useState(false)
  const [submissionsVersion, setSubmissionsVersion] = useState(0)

  const statusOptions = STATUSES_BY_TAB[tab]

  function handleTabChange(next: TabKey) {
    setTab(next)
    setStatus('')
    setPage(1)
  }

  const filtered = useMemo(() => {
    const scopeStatuses = STATUSES_BY_TAB[tab]
    return onboardingSubmissions.filter((submission) => {
      if (!scopeStatuses.includes(submission.status)) return false
      if (status && submission.status !== status) return false
      if (date && submission.submittedDate !== date) return false
      if (search && !submission.vendorId.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [tab, search, date, status, submissionsVersion])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleNewVendorRequest(vendorName: string, vendorEmail: string) {
    addOnboardingSubmission(vendorName, vendorEmail)
    setSubmissionsVersion((v) => v + 1)
    setRequestModalOpen(false)
    setInvitedEmail(vendorEmail)
    setSuccessOpen(true)
  }

  return (
    <div>
      <Breadcrumb items={['Vendor Onboarding']} />

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Vendor Onboarding</h1>
          <p className="mt-1 text-slate-500">View and track vendor submissions and approval status</p>
        </div>
        {canInitiate && (
          <button
            type="button"
            onClick={() => setRequestModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />
            New Request
          </button>
        )}
      </div>

      <div className="mt-6 inline-flex gap-1 rounded-lg bg-white p-1">
        <button
          type="button"
          onClick={() => handleTabChange('current')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'current' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Today's Transactions
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('historical')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'historical' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Historical Review
        </button>
        {canInitiate && (
          <button
            type="button"
            onClick={() => handleTabChange('invited')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'invited' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Intending Vendors
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-3">
        <div>
          <label htmlFor="search-vendor" className="text-sm font-medium text-slate-600">
            Search (Vendor ID)
          </label>
          <div className="relative mt-1.5">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="search-vendor"
              type="text"
              placeholder="Search Vendor ID"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="date-filter" className="text-sm font-medium text-slate-600">
            Date
          </label>
          <input
            id="date-filter"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setPage(1)
            }}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>

        <div>
          <label htmlFor="status-filter" className="text-sm font-medium text-slate-600">
            Status
          </label>
          <select
            id="status-filter"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          >
            <option value="">Select</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-3 font-semibold">S/N</th>
                <th className="px-3 py-3 font-semibold">Vendor ID</th>
                <th className="px-3 py-3 font-semibold">Vendor Name</th>
                {tab === 'invited' ? (
                  <>
                    <th className="px-3 py-3 font-semibold">Email Address</th>
                    <th className="px-3 py-3 font-semibold">Date Sent</th>
                  </>
                ) : (
                  <th className="px-3 py-3 font-semibold">Date</th>
                )}
                <th className="px-3 py-3 font-semibold">Status</th>
                {tab !== 'invited' && <th className="px-6 py-3 text-right font-semibold">Action</th>}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((submission, index) => (
                <tr key={submission.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-3 py-4 text-slate-500">{submission.vendorId}</td>
                  <td className="px-3 py-4 font-medium text-slate-900">{submission.vendorName}</td>
                  {tab === 'invited' ? (
                    <>
                      <td className="px-3 py-4 text-slate-500">{submission.vendorEmail}</td>
                      <td className="px-3 py-4 text-slate-500">{submission.submittedDate}</td>
                    </>
                  ) : (
                    <td className="px-3 py-4 text-slate-500">{submission.submittedDate}</td>
                  )}
                  <td className="px-3 py-4">
                    <OnboardingStatusBadge status={submission.status} />
                  </td>
                  {tab !== 'invited' && (
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/vendor-onboarding/${submission.id}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:underline"
                      >
                        View
                        <Eye className="h-4 w-4" />
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <NewVendorRequestModal
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        onSubmit={handleNewVendorRequest}
      />
      <SubmittedSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Invitation Sent"
        message={`An email with a Microsoft Form link has been sent to ${invitedEmail}. The vendor can now submit their information and documentation.`}
      />
    </div>
  )
}

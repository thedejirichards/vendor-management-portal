import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, Plus } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Pagination from '../components/Pagination'
import DueDiligenceStatusBadge from '../components/DueDiligenceStatusBadge'
import { dueDiligenceRequests } from '../data/dueDiligenceRequests'
import { useCurrentUser } from '../context/UserContext'
import type { DueDiligenceStatus } from '../types/dueDiligence'

const PAGE_SIZE = 5

type TabKey = 'pending' | 'treated' | 'completed'

const statusesByTab: Record<TabKey, DueDiligenceStatus[]> = {
  pending: ['Pending'],
  treated: ['In Progress'],
  completed: ['Completed', 'Rejected'],
}

export default function VendorDueDiligencePage() {
  const { currentUser } = useCurrentUser()
  const canInitiate = currentUser.id === 'orm-maker'
  const [tab, setTab] = useState<TabKey>('pending')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  function handleTabChange(next: TabKey) {
    setTab(next)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const scopeStatuses = statusesByTab[tab]
    const term = search.trim().toLowerCase()
    return dueDiligenceRequests.filter((r) => {
      if (!scopeStatuses.includes(r.status)) return false
      if (!term) return true
      return (
        r.vendorName.toLowerCase().includes(term) ||
        r.requestId.toLowerCase().includes(term) ||
        r.vendorId.toLowerCase().includes(term)
      )
    })
  }, [tab, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <Breadcrumb items={['Vendor Due Diligence']} />

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Vendor Due Diligence</h1>
          <p className="mt-1 text-slate-500">Monitor and manage vendor due diligence assessment requests</p>
        </div>
        {canInitiate && (
          <Link
            to="/vendor-due-diligence/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />
            Initiate Vendor Due Diligence
          </Link>
        )}
      </div>

      <div className="mt-6 inline-flex gap-1 rounded-lg bg-white p-1">
        <button
          type="button"
          onClick={() => handleTabChange('pending')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'pending' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Pending
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('treated')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'treated' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Treated
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('completed')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'completed' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by vendor name, request ID, or vendor ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-3 font-semibold">S/N</th>
                <th className="px-3 py-3 font-semibold">Request ID</th>
                <th className="px-3 py-3 font-semibold">Vendor Name</th>
                <th className="px-3 py-3 font-semibold">Vendor ID</th>
                <th className="px-3 py-3 font-semibold">Class</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((request, index) => (
                <tr key={request.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-3 py-4 text-slate-500">{request.requestId}</td>
                  <td className="px-3 py-4 font-medium text-slate-900">{request.vendorName}</td>
                  <td className="px-3 py-4 text-slate-500">{request.vendorId}</td>
                  <td className="px-3 py-4 text-slate-500">{request.class}</td>
                  <td className="px-3 py-4">
                    <DueDiligenceStatusBadge status={request.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/vendor-due-diligence/${request.id}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:underline"
                    >
                      View
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                    No due diligence requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}

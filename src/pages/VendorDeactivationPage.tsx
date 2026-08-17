import { useMemo, useState } from 'react'
import { Search, PowerOff } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Pagination from '../components/Pagination'
import DeactivationStatusBadge from '../components/DeactivationStatusBadge'
import ConfirmDeactivationModal from '../components/ConfirmDeactivationModal'
import DeactivatedSuccessModal from '../components/DeactivatedSuccessModal'
import { deactivatableVendors } from '../data/deactivatableVendors'
import type { DeactivatableVendor } from '../types/deactivation'

const PAGE_SIZE = 5

type TabKey = 'pending' | 'deactivated'

export default function VendorDeactivationPage() {
  const [vendors, setVendors] = useState<DeactivatableVendor[]>(deactivatableVendors)
  const [tab, setTab] = useState<TabKey>('pending')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [target, setTarget] = useState<DeactivatableVendor | null>(null)
  const [successOpen, setSuccessOpen] = useState(false)

  function handleTabChange(next: TabKey) {
    setTab(next)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const scopeStatus = tab === 'pending' ? 'Active' : 'Inactive'
    const term = search.trim().toLowerCase()
    return vendors.filter((v) => {
      if (v.status !== scopeStatus) return false
      if (!term) return true
      return (
        v.vendorName.toLowerCase().includes(term) ||
        v.vendorId.toLowerCase().includes(term) ||
        v.category.toLowerCase().includes(term)
      )
    })
  }, [vendors, tab, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleConfirm() {
    if (!target) return
    setVendors((prev) =>
      prev.map((v) => (v.id === target.id ? { ...v, status: 'Inactive' } : v)),
    )
    setTarget(null)
    setSuccessOpen(true)
  }

  return (
    <div>
      <Breadcrumb items={['Vendor Deactivation']} />

      <h1 className="mt-3 text-3xl font-bold text-slate-900">Vendor Deactivation</h1>
      <p className="mt-1 text-slate-500">Manage vendor activation status in Service Central</p>

      <div className="mt-6 inline-flex gap-1 rounded-lg bg-white p-1">
        <button
          type="button"
          onClick={() => handleTabChange('pending')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'pending' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Pending Deactivation
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('deactivated')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            tab === 'deactivated' ? 'bg-slate-100 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Deactivated Vendors
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by vendor name, ID, or category..."
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
                <th className="px-3 py-3 font-semibold">Vendor Name</th>
                <th className="px-3 py-3 font-semibold">Vendor ID</th>
                <th className="px-3 py-3 font-semibold">Category</th>
                <th className="px-3 py-3 font-semibold">Risk Rating</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                {tab === 'pending' && <th className="px-6 py-3 text-right font-semibold">Action</th>}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((vendor, index) => (
                <tr key={vendor.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-3 py-4 font-medium text-slate-900">{vendor.vendorName}</td>
                  <td className="px-3 py-4 text-slate-500">{vendor.vendorId}</td>
                  <td className="px-3 py-4 text-slate-500">{vendor.category}</td>
                  <td className="px-3 py-4 text-slate-500">{vendor.riskRating}</td>
                  <td className="px-3 py-4">
                    <DeactivationStatusBadge status={vendor.status} />
                  </td>
                  {tab === 'pending' && (
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setTarget(vendor)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-800"
                      >
                        <PowerOff className="h-3.5 w-3.5" />
                        Deactivate
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={tab === 'pending' ? 7 : 6} className="px-6 py-10 text-center text-slate-400">
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <ConfirmDeactivationModal
        open={target !== null}
        onCancel={() => setTarget(null)}
        onConfirm={handleConfirm}
      />
      <DeactivatedSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  )
}

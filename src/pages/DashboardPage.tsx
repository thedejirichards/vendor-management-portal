import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Files, ClipboardCheck, AlertTriangle, Eye } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import RiskBadge from '../components/RiskBadge'
import Pagination from '../components/Pagination'
import { vendors } from '../data/vendors'
import type { VendorClass, VendorStatus } from '../types/vendor'

const PAGE_SIZE = 5
const DD_CLASSES: VendorClass[] = ['Class A', 'Class B', 'Class C']

function dueDiligenceStats(vendorClass: VendorClass) {
  const inClass = vendors.filter((v) => v.vendorClass === vendorClass)
  const complete = inClass.filter((v) => v.dueDiligenceComplete).length
  return { complete, total: inClass.length }
}

export default function DashboardPage() {
  const [tab, setTab] = useState<VendorStatus>('Active')
  const [page, setPage] = useState(1)

  const highRisk = vendors.filter((v) => v.riskCategory === 'High Risk').length
  const mediumRisk = vendors.filter((v) => v.riskCategory === 'Medium Risk').length
  const lowRisk = vendors.filter((v) => v.riskCategory === 'Low Risk').length

  const filteredVendors = useMemo(() => vendors.filter((v) => v.status === tab), [tab])
  const totalPages = Math.max(1, Math.ceil(filteredVendors.length / PAGE_SIZE))
  const pageVendors = filteredVendors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleTabChange(next: VendorStatus) {
    setTab(next)
    setPage(1)
  }

  return (
    <div>
      <Breadcrumb items={['Dashboard']} />

      <h1 className="mt-3 text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">Overview of vendor management metrics and statistics</p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
            <Files className="h-5 w-5 text-brand-600" />
          </span>
          <p className="mt-4 text-sm text-slate-500">Total Number of Vendors</p>
          <p className="mt-1 text-4xl font-bold text-slate-900">{vendors.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <ClipboardCheck className="h-5 w-5 text-emerald-600" />
          </span>
          <p className="mt-4 font-semibold text-slate-900">Due Diligence Completed</p>

          <div className="mt-4 flex flex-col gap-3">
            {DD_CLASSES.map((cls) => {
              const { complete, total } = dueDiligenceStats(cls)
              const pct = total ? (complete / total) * 100 : 0
              return (
                <div key={cls}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{cls}</span>
                    <span className="font-medium text-slate-900">
                      {complete}/{total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </span>
          <p className="mt-4 font-semibold text-slate-900">Risk Categories</p>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-2.5">
              <span className="text-sm font-medium text-red-600">High Risk</span>
              <span className="text-sm font-bold text-red-600">{highRisk}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-amber-50 px-4 py-2.5">
              <span className="text-sm font-medium text-amber-600">Medium Risk</span>
              <span className="text-sm font-bold text-amber-600">{mediumRisk}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-2.5">
              <span className="text-sm font-medium text-emerald-600">Low Risk</span>
              <span className="text-sm font-bold text-emerald-600">{lowRisk}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">Vendor List</h2>
        <p className="mt-1 text-sm text-slate-500">Complete list of all vendors in the system</p>

        <div className="mt-5 flex gap-6 border-b border-slate-200">
          {(['Active', 'Inactive'] as VendorStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleTabChange(status)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
                tab === status
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {status}
            </button>
          ))}
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
                <th className="px-3 py-3 font-semibold">Vendor Class</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Risk Category</th>
                <th className="px-6 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageVendors.map((vendor, index) => (
                <tr key={vendor.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-3 py-4 text-slate-500">{vendor.vendorId}</td>
                  <td className="px-3 py-4 font-medium text-slate-900">{vendor.name}</td>
                  <td className="px-3 py-4 text-slate-500">{vendor.vendorClass}</td>
                  <td className="px-3 py-4 text-slate-500">{vendor.status}</td>
                  <td className="px-3 py-4">
                    <RiskBadge category={vendor.riskCategory} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/vendors/${vendor.id}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:underline"
                    >
                      View
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {pageVendors.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                    No {tab.toLowerCase()} vendors found.
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

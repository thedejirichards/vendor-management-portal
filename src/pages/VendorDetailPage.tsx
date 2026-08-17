import { useParams } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import RiskBadge from '../components/RiskBadge'
import DocumentCategoryCard from '../components/DocumentCategoryCard'
import { vendors } from '../data/vendors'
import { getVendorDocuments } from '../data/vendorDocuments'

export default function VendorDetailPage() {
  const { id } = useParams()
  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, 'View Vendor']} />
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Vendor not found</h1>
      </div>
    )
  }

  const documentCategories = getVendorDocuments(vendor.name)

  return (
    <div>
      <Breadcrumb items={['Dashboard', 'View Vendor']} />

      <h1 className="mt-3 text-3xl font-bold text-slate-900">View Vendor</h1>
      <p className="mt-1 text-slate-500">Complete vendor information and associated documents</p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
            <Building2 className="h-5 w-5 text-brand-600" />
          </span>
          <h2 className="text-lg font-bold text-slate-900">Vendor Information</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Vendor Name</p>
            <p className="mt-1 font-semibold text-slate-900">{vendor.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Vendor ID</p>
            <p className="mt-1 font-semibold text-slate-900">{vendor.vendorId}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Vendor Class</p>
            <p className="mt-1 font-semibold text-slate-900">{vendor.vendorClass}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Vendor Status</p>
            <p className="mt-1 font-semibold text-slate-900">{vendor.status}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Vendor Risk Category</p>
            <div className="mt-1.5">
              <RiskBadge category={vendor.riskCategory} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6">
        <h2 className="border-b border-slate-200 py-4 text-lg font-bold text-slate-900">Documents</h2>
        <div className="divide-y divide-slate-200">
          {documentCategories.map((category) => (
            <DocumentCategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import ConfirmSubmissionModal from '../components/ConfirmSubmissionModal'
import SubmittedSuccessModal from '../components/SubmittedSuccessModal'
import { deactivatableVendors } from '../data/deactivatableVendors'
import { businessUnits } from '../data/businessUnits'
import { addDueDiligenceRequest } from '../data/dueDiligenceRequests'

const activeVendors = deactivatableVendors.filter((v) => v.status === 'Active')

export default function InitiateDueDiligencePage() {
  const navigate = useNavigate()
  const [vendorId, setVendorId] = useState('')
  const [businessUnit, setBusinessUnit] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const selectedVendor = activeVendors.find((v) => v.vendorId === vendorId)
  const isValid = Boolean(selectedVendor) && businessUnit !== ''

  function handleConfirmSubmit() {
    if (!selectedVendor) return
    addDueDiligenceRequest(selectedVendor.vendorName, selectedVendor.vendorId, selectedVendor.email, businessUnit, selectedVendor.riskRating)
    setConfirmOpen(false)
    setSuccessOpen(true)
  }

  function handleCloseSuccess() {
    setSuccessOpen(false)
    navigate('/vendor-due-diligence')
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Vendor Due Diligence', to: '/vendor-due-diligence' }, 'Initiate New Request']} />

      <h1 className="mt-3 text-3xl font-bold text-slate-900">Initiate Vendor Due Diligence Request</h1>
      <p className="mt-1 text-slate-500">Complete the form below to initiate a new vendor due diligence assessment</p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-slate-900">Vendor Request Information</h2>

        <div className="mt-5">
          <label htmlFor="vendor-select" className="text-sm font-medium text-slate-600">
            Vendor Name <span className="text-red-500">*</span>
          </label>
          <select
            id="vendor-select"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          >
            <option value="">Select a vendor</option>
            {activeVendors.map((v) => (
              <option key={v.vendorId} value={v.vendorId}>
                {v.vendorName}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label htmlFor="vendor-email" className="text-sm font-medium text-slate-600">
            Vendor Email <span className="text-red-500">*</span>
          </label>
          <input
            id="vendor-email"
            type="email"
            readOnly
            disabled
            placeholder="Email will auto-populate when vendor is selected"
            value={selectedVendor?.email ?? ''}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="business-unit-select" className="text-sm font-medium text-slate-600">
            Business Unit <span className="text-red-500">*</span>
          </label>
          <select
            id="business-unit-select"
            value={businessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          >
            <option value="">Select a business unit</option>
            {businessUnits.map((bu) => (
              <option key={bu} value={bu}>
                {bu}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => navigate('/vendor-due-diligence')}
            className="rounded-lg border border-slate-200 px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isValid}
            onClick={() => setConfirmOpen(true)}
            className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            Submit Request
          </button>
        </div>
      </div>

      <ConfirmSubmissionModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirm Submission"
        message={
          <>
            Are you sure you want to submit a vendor due diligence request for{' '}
            <strong className="text-slate-900">{selectedVendor?.vendorName}</strong> ({businessUnit})? This action
            will initiate the review process.
          </>
        }
        confirmLabel="Submit"
      />
      <SubmittedSuccessModal
        open={successOpen}
        onClose={handleCloseSuccess}
        message="Your request has been submitted successfully"
        closeLabel="Back to Overview"
      />
    </div>
  )
}

import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import Modal from './Modal'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface NewVendorRequestModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (vendorName: string, vendorEmail: string) => void
}

export default function NewVendorRequestModal({ open, onClose, onSubmit }: NewVendorRequestModalProps) {
  const [vendorName, setVendorName] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [touched, setTouched] = useState(false)

  const nameValid = vendorName.trim() !== ''
  const emailValid = EMAIL_PATTERN.test(vendorEmail.trim())

  function handleClose() {
    setVendorName('')
    setVendorEmail('')
    setTouched(false)
    onClose()
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!nameValid || !emailValid) return

    onSubmit(vendorName.trim(), vendorEmail.trim())
    setVendorName('')
    setVendorEmail('')
    setTouched(false)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Mail className="h-5 w-5" />
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-900">New Vendor Request</h3>
      <p className="mt-1 text-sm text-slate-500">
        Enter the intending vendor's name and email. They'll receive an email with a Microsoft Form link to submit
        their information and documentation.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 text-left">
        <div>
          <label htmlFor="vendor-name" className="text-sm font-medium text-slate-600">
            Vendor Name <span className="text-red-500">*</span>
          </label>
          <input
            id="vendor-name"
            type="text"
            placeholder="Enter vendor name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
          {touched && !nameValid && <p className="mt-1.5 text-xs text-red-600">Vendor name is required.</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="vendor-email" className="text-sm font-medium text-slate-600">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="vendor-email"
            type="email"
            placeholder="Enter vendor email address"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
          {touched && !emailValid && <p className="mt-1.5 text-xs text-red-600">Enter a valid email address.</p>}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-lg border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700"
          >
            Send Invite
          </button>
        </div>
      </form>
    </Modal>
  )
}

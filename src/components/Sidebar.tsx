import { NavLink } from 'react-router-dom'
import { LayoutGrid, FileText, Power, ShieldCheck, LogOut } from 'lucide-react'
import accessLogo from '../assets/brand/access-logo.svg'
import { useCurrentUser } from '../context/useCurrentUser'
import type { NavKey } from '../data/users'

const navItems: { to: string; label: string; icon: typeof LayoutGrid; key: NavKey }[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid, key: 'dashboard' },
  { to: '/vendor-onboarding', label: 'Vendor Onboarding', icon: FileText, key: 'vendor-onboarding' },
  { to: '/vendor-deactivation', label: 'Vendor Deactivation', icon: Power, key: 'vendor-deactivation' },
  { to: '/vendor-due-diligence', label: 'Vendor Due Diligence', icon: ShieldCheck, key: 'vendor-due-diligence' },
]

export default function Sidebar() {
  const { currentUser } = useCurrentUser()
  const visibleItems = navItems.filter((item) => currentUser.visiblePages.includes(item.key))

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <img src={accessLogo} alt="Access" className="h-6 w-auto" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <h2 className="px-2 text-lg font-bold text-brand-600">Vendor Management</h2>

        <nav className="mt-4 flex flex-col gap-1">
          {visibleItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-slate-100 font-semibold text-brand-600'
                    : 'font-medium text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" strokeWidth={2} />
          Exit System
        </button>
      </div>
    </aside>
  )
}

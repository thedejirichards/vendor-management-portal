import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { users } from '../data/users'
import { useCurrentUser } from '../context/useCurrentUser'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { currentUser, setCurrentUser } = useCurrentUser()

  const initial = currentUser.name.charAt(0).toUpperCase()

  return (
    <header className="print:hidden relative flex h-20 items-center justify-end border-b border-slate-200 bg-white px-8">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-50"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
          {initial}
        </span>
        <span className="text-left">
          <span className="block text-sm font-bold text-slate-900">{currentUser.name}</span>
          <span className="block text-xs text-slate-500">{currentUser.role}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-8 top-16 z-20 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <p className="border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Switch User
            </p>
            <div className="max-h-96 overflow-y-auto py-1">
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    setCurrentUser(user)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">{user.name}</span>
                    <span className="block truncate text-xs text-slate-500">{user.role}</span>
                  </span>
                  {user.id === currentUser.id && <Check className="h-4 w-4 shrink-0 text-brand-600" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  )
}

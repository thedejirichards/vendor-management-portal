import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { UserProvider } from '../context/UserContext'

export default function AppLayout() {
  return (
    <UserProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 px-8 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </UserProvider>
  )
}

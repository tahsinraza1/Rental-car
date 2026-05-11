import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main key={location.pathname} className="animate-fade-in-up mx-auto w-full flex-1 max-w-7xl px-4 pb-24 pt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

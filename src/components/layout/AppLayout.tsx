import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-clip">
      {/* Background Architectural Mesh Layer */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-mesh-pattern opacity-70 dark:opacity-40" />

      {/* Dynamic Ambient Luxury Lighting Orbs across the page */}
      <div className="pointer-events-none fixed -left-48 top-40 size-[520px] rounded-full bg-orange-500/8 dark:bg-orange-500/12 blur-[140px]" />
      <div className="pointer-events-none fixed -right-48 top-1/3 size-[560px] rounded-full bg-blue-500/6 dark:bg-blue-500/10 blur-[150px]" />
      <div className="pointer-events-none fixed left-1/4 top-2/3 size-[500px] rounded-full bg-amber-500/8 dark:bg-amber-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed right-10 bottom-20 size-[620px] rounded-full bg-purple-500/6 dark:bg-purple-500/10 blur-[160px]" />

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <main key={location.pathname} className="animate-fade-in-up w-full flex-1 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-16 pt-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}


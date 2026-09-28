import { useEffect, lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp'
import { HomePage } from './pages/HomePage'
import { preloadAllRoutes } from './lib/routePreloader'

// Lazy loaded page components for optimal initial bundle & fast mobile FCP/LCP
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const CarDetailPage = lazy(() => import('./pages/CarDetailPage').then((m) => ({ default: m.CarDetailPage })))
const CarsPage = lazy(() => import('./pages/CarsPage').then((m) => ({ default: m.CarsPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage').then((m) => ({ default: m.FeedbackPage })))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })))

function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname, search, hash])

  return null
}

export default function App() {
  useEffect(() => {
    // Schedule route preloading during browser idle period
    const timer = setTimeout(() => {
      preloadAllRoutes()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="size-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>}>
        <Routes>
          {/* Standalone Admin Dashboard Route */}
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Public Website Routes with AppLayout */}
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="cars" element={<CarsPage />} />
            <Route path="cars/:carId" element={<CarDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <FloatingWhatsApp />
    </>
  )
}

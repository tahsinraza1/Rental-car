import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp'
import { AboutPage } from './pages/AboutPage'
import { CarDetailPage } from './pages/CarDetailPage'
import { CarsPage } from './pages/CarsPage'
import { ContactPage } from './pages/ContactPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { HomePage } from './pages/HomePage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'

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
  return (
    <>
      <ScrollToTop />
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
      <FloatingWhatsApp />
    </>
  )
}

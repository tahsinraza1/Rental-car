// Intelligent route preloader to make page transitions 100% instantaneous on mobile & desktop

const preloadedSet = new Set<string>()

export function preloadPage(page: 'cars' | 'about' | 'feedback' | 'contact' | 'carDetail') {
  if (preloadedSet.has(page)) return
  preloadedSet.add(page)

  switch (page) {
    case 'cars':
      import('../pages/CarsPage')
      break
    case 'about':
      import('../pages/AboutPage')
      break
    case 'feedback':
      import('../pages/FeedbackPage')
      break
    case 'contact':
      import('../pages/ContactPage')
      break
    case 'carDetail':
      import('../pages/CarDetailPage')
      break
  }
}

export function preloadAllRoutes() {
  preloadPage('cars')
  preloadPage('about')
  preloadPage('feedback')
  preloadPage('contact')
}

// Automatically preload routes during browser idle time after initial page load
if (typeof window !== 'undefined') {
  const scheduleIdle = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1200))
  window.addEventListener('load', () => {
    scheduleIdle(() => {
      preloadAllRoutes()
    })
  })
}

import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { OWNER_PHONE_E164, OWNER_WHATSAPP_NUMBER } from '../../config'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/cn'
import logoImg from '../../assets/logo.png'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // Detect scroll to adjust navbar shadow and compactness
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 w-full py-2.5 sm:py-3 px-3 sm:px-6 md:px-8 lg:px-12 transition-all duration-300">
      {/* ── ULTRA-STYLISH FLOATING GLASS CAPSULE ── */}
      <div
        className={cn(
          'relative mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl md:rounded-full border px-3.5 sm:px-6 py-2 transition-all duration-300 backdrop-blur-2xl',
          scrolled
            ? 'border-orange-200/80 bg-white/90 dark:border-white/10 dark:bg-slate-900/90 shadow-[0_12px_36px_-5px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.5)] py-1.5 sm:py-2 ring-1 ring-orange-500/15'
            : 'border-slate-200/75 bg-white/80 dark:border-white/8 dark:bg-slate-900/80 shadow-[0_6px_25px_-5px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.35)] py-2 sm:py-2.5',
        )}
      >
        {/* Subtle glowing top edge highlight line */}
        <div className="pointer-events-none absolute inset-x-8 -top-px h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/60 dark:via-orange-400/50 to-transparent blur-[0.5px]" />

        {/* Ambient background bloom */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-rose-500/10 blur-xl opacity-60 dark:opacity-30 -z-10" />

        {/* ── 1. LOGO WITH LIVE STATUS TAG ── */}
        <Link to="/" className="group flex items-center gap-3 shrink-0 relative">
          <div className="relative flex items-center">
            {/* Ambient logo glow on hover */}
            <div className="pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={logoImg}
              alt="Car Rental Express"
              className="h-8.5 sm:h-9.5 w-auto transition-transform duration-300 group-hover:scale-105 relative z-10 drop-shadow-xs"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/50 px-2.5 py-0.5 text-[10px] font-black text-emerald-700 dark:text-emerald-300 shadow-2xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Delhi NCR · 24×7</span>
          </div>
        </Link>

        {/* ── 2. FLOATING DOCK NAVIGATION LINKS ── */}
        <nav className="hidden items-center gap-1 md:flex rounded-full bg-slate-100/80 dark:bg-slate-800/80 p-1.5 border border-slate-200/80 dark:border-white/10 shadow-inner backdrop-blur-md">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/cars" badge="14+ Cars" badgeColor="bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-400/30">
            Browse Cars
          </NavItem>
          <NavItem to="/feedback" badge="★ 4.9" badgeColor="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-400/30">
            Reviews
          </NavItem>
          <NavItem to="/about">About Us</NavItem>
          <NavItem to="/contact" badge="Instant" badgeColor="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-400/30">
            Contact
          </NavItem>
        </nav>

        {/* ── 3. DESKTOP ACTION CONTROLS (THEME TOGGLE + CALL + BOOK CTA) ── */}
        <div className="hidden items-center gap-3 md:flex shrink-0">
          {/* Futuristic Theme Switcher */}
          <button
            onClick={toggleTheme}
            type="button"
            className={cn(
              "group relative inline-flex h-8.5 w-16 items-center rounded-full p-1 transition-all duration-500 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
              theme === 'dark'
                ? "bg-slate-800/90 border border-slate-700 shadow-inner shadow-black/50 hover:border-amber-400/70"
                : "bg-slate-200/90 border border-slate-300 shadow-inner shadow-slate-400/20 hover:border-orange-400/70"
            )}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {/* Background Track Icons */}
            <span className="absolute left-2 text-[10px] select-none transition-opacity duration-300 opacity-70 group-hover:opacity-100">☀️</span>
            <span className="absolute right-2 text-[10px] select-none transition-opacity duration-300 opacity-70 group-hover:opacity-100">🌙</span>

            {/* Smooth Sliding Thumb */}
            <span
              className={cn(
                "relative z-10 flex size-6.5 items-center justify-center rounded-full shadow-md transition-all duration-500 ease-out transform",
                theme === 'dark'
                  ? "translate-x-7.5 bg-gradient-to-tr from-slate-900 to-indigo-950 text-amber-300 ring-1 ring-indigo-500/60 shadow-indigo-950/60"
                  : "translate-x-0 bg-white text-orange-500 ring-1 ring-orange-200 shadow-orange-500/30"
              )}
            >
              <span
                className={cn(
                  "transition-transform duration-500 ease-out",
                  theme === 'dark' ? "rotate-360 scale-105" : "rotate-0 scale-100"
                )}
              >
                {theme === 'dark' ? (
                  <svg className="size-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ) : (
                  <svg className="size-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                )}
              </span>
            </span>
          </button>

          {/* Call Host Hotline Button */}
          <a
            href={`tel:${OWNER_PHONE_E164}`}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-950/50 dark:border-emerald-700/50 px-4 py-2 text-xs font-black text-emerald-700 dark:text-emerald-400 transition-all duration-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95"
            title="Call Fleet Support"
          >
            <span className="flex size-4.5 items-center justify-center rounded-full bg-emerald-200/90 dark:bg-emerald-900/90 text-emerald-800 dark:text-emerald-200 group-hover:bg-white group-hover:text-emerald-600 transition-colors">
              <svg className="size-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </span>
            <span>Call Now</span>
          </a>

          {/* Shimmering Book a Car CTA */}
          <button
            onClick={() => navigate('/cars')}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-5.5 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/45 active:scale-95 cursor-pointer after:absolute after:inset-0 after:-translate-x-full hover:after:translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:transition-transform after:duration-700"
          >
            <span>Book a Car</span>
            <svg className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* ── 4. MOBILE CONTROLS (THEME + CALL + HAMBURGER) ── */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            className={cn(
              "flex size-9 items-center justify-center rounded-xl border transition-all duration-500 active:scale-90 shadow-2xs cursor-pointer",
              theme === 'dark'
                ? "border-slate-700 bg-slate-800 text-amber-300"
                : "border-slate-200 bg-slate-100 text-orange-500"
            )}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <span className={cn("transition-transform duration-500 ease-out", theme === 'dark' ? "rotate-360 scale-105" : "rotate-0 scale-100")}>
              {theme === 'dark' ? (
                <svg className="size-4.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg className="size-4.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </span>
          </button>

          {/* Mobile Call Button */}
          <a
            href={`tel:${OWNER_PHONE_E164}`}
            className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 shadow-2xs active:scale-90"
            aria-label="Call Fleet Support"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>

          {/* Animated Hamburger Toggle */}
          <button
            className="flex size-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition active:scale-90 shadow-2xs"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── 5. MOBILE EXPANDABLE DRAWER ── */}
      {open && (
        <div className="mt-2.5 overflow-hidden rounded-[2rem] border border-orange-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden animate-fade-in-up">
          <nav className="grid gap-2">
            <MobileNavItem to="/" icon="🏠" onClick={() => setOpen(false)}>Home</MobileNavItem>
            <MobileNavItem to="/cars" icon="🚗" badge="14+ Fleet" onClick={() => setOpen(false)}>Browse Cars</MobileNavItem>
            <MobileNavItem to="/feedback" icon="⭐" badge="4.9 ★" onClick={() => setOpen(false)}>Customer Reviews</MobileNavItem>
            <MobileNavItem to="/about" icon="✨" onClick={() => setOpen(false)}>About Us</MobileNavItem>
            <MobileNavItem to="/contact" icon="📍" badge="24×7" onClick={() => setOpen(false)}>Contact Us</MobileNavItem>
          </nav>

          {/* Quick Theme Mode Toggle in Drawer */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <span>{theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 active:scale-95"
            >
              <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* Direct Mobile CTAs */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 grid gap-2.5">
            <a
              href={`tel:${OWNER_PHONE_E164}`}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-500/80 bg-white dark:bg-slate-800 px-4 py-3 text-xs font-black text-emerald-700 dark:text-emerald-400 shadow-sm hover:bg-emerald-50 dark:hover:bg-slate-700 active:scale-95"
            >
              <svg className="size-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>Direct Call: {OWNER_PHONE_E164}</span>
            </a>

            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, I want to book a rental car`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-xs font-black text-white shadow-md shadow-emerald-500/25 active:scale-95"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp Quick Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function NavItem({
  to,
  children,
  badge,
  badgeColor,
}: {
  to: string
  children: React.ReactNode
  badge?: string
  badgeColor?: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300',
          isActive
            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/30 font-black scale-[1.03]'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700/80 shadow-2xs hover:shadow-sm',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          {badge && (
            <span
              className={cn(
                'rounded-full px-1.5 py-0.2 text-[9px] font-black tracking-tight transition-colors border',
                isActive
                  ? 'bg-white/25 text-white border-white/30'
                  : badgeColor || 'bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/40'
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

function MobileNavItem({
  to,
  children,
  icon,
  badge,
  onClick,
}: {
  to: string
  children: React.ReactNode
  icon?: string
  badge?: string
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all',
          isActive
            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/30'
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70',
        )
      }
    >
      <div className="flex items-center gap-2.5">
        {icon && <span className="text-base">{icon}</span>}
        <span>{children}</span>
      </div>
      {badge && (
        <span className="rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 px-2 py-0.5 text-[10px] font-black">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

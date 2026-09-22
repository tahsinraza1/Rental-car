import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  type User,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import {
  subscribeToAllReviews,
  approveReview,
  rejectReview,
  deleteReview,
  verifyAdminRole,
  type CustomerReview,
} from '../services/reviewService'
import { OWNER_WHATSAPP_NUMBER } from '../config'
import { useTheme } from '../context/ThemeContext'
import brandLogo from '../assets/logo.png'
import adminLoginBg from '../assets/admin_login_bg.jpg'

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected'
type ViewMode = 'cards' | 'table'

export function AdminDashboardPage() {
  const { theme, toggleTheme } = useTheme()

  // ── Authentication State (Firebase Auth + Firestore Role Verification) ──
  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true)
  const [adminProfileName, setAdminProfileName] = useState<string>('')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // ── Password Reset Modal State ──
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [isSendingReset, setIsSendingReset] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [forgotError, setForgotError] = useState('')

  // ── Listen to Firebase Auth state changes & verify Firestore Admin Role ──
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
        try {
          const { isAdmin, name } = await verifyAdminRole(user.uid)
          if (isAdmin) {
            setIsAuthenticated(true)
            if (name) setAdminProfileName(name)
          } else {
            console.warn('Authenticated user does not have admin role in Firestore users/{uid}.')
            await firebaseSignOut(auth)
            setCurrentUser(null)
            setIsAuthenticated(false)
            setLoginError('Access denied: Your account does not have administrator privileges.')
          }
        } catch (err) {
          console.warn('Role verification error:', err)
          await firebaseSignOut(auth)
          setCurrentUser(null)
          setIsAuthenticated(false)
          setLoginError('Access verification failed. Please try signing in again.')
        }
      } else {
        setCurrentUser(null)
        setIsAuthenticated(false)
      }
      setIsAuthChecking(false)
    })
    return () => unsubscribe()
  }, [])

  // ── Data & Reviews State ──
  const [reviews, setReviews] = useState<CustomerReview[]>([])
  const [loading, setLoading] = useState(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)

  // ── Filters & Search State ──
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('cre_admin_view_mode')
    return (saved === 'cards' || saved === 'table') ? saved : 'table'
  })

  // ── Modal State ──
  const [deleteTarget, setDeleteTarget] = useState<CustomerReview | null>(null)
  const [detailTarget, setDetailTarget] = useState<CustomerReview | null>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)

  // ── Live Clock & Time-of-Day Greeting State ──
  const [currentTime, setCurrentTime] = useState<string>(() => {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  })
  const [currentDate, setCurrentDate] = useState<string>(() => {
    return new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
  })
  const [quoteIndex] = useState<number>(() => Math.floor(Math.random() * 4))

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }))
      setCurrentDate(now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Effective Logged-in Admin Name
  const effectiveAdminName = useMemo(() => {
    if (adminProfileName && adminProfileName.trim()) return adminProfileName.trim()
    if (currentUser?.displayName && currentUser.displayName.trim()) return currentUser.displayName.trim()
    if (currentUser?.email) return currentUser.email.split('@')[0]
    return 'Admin'
  }, [adminProfileName, currentUser])

  // Dynamic Time-of-Day Greeting with Motivational Quote
  const greetingInfo = useMemo(() => {
    const hour = new Date().getHours()
    let salute = 'Good Morning'
    let icon = '🌅'
    let period: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning'
    let quotes: string[] = []
    let gradientBadge = 'from-amber-500 to-orange-500'

    if (hour >= 5 && hour < 12) {
      salute = 'Good Morning'
      icon = '🌅'
      period = 'morning'
      gradientBadge = 'from-amber-500 via-orange-500 to-amber-600'
      quotes = [
        "Ready to start the day strong! Moderate fresh customer reviews and keep fleet ratings shining.",
        "Fresh morning feedback is live. Verify new rental experiences for upcoming bookings.",
        "A brand new day of smooth highway drives! Let's ensure top-rated service reviews are active.",
        "Rise and shine! Fast moderation builds instant customer trust for today's dispatches.",
      ]
    } else if (hour >= 12 && hour < 17) {
      salute = 'Good Afternoon'
      icon = '☀️'
      period = 'afternoon'
      gradientBadge = 'from-orange-500 via-amber-500 to-rose-500'
      quotes = [
        "Mid-day fleet check! Review customer experiences and maintain our 5-star service standard.",
        "Fleet operations are moving fast today. Check and approve the latest verified rental feedback.",
        "Keep the momentum soaring! Direct review moderation helps live website visitors book with confidence.",
        "Afternoon dispatch update: verify new ratings so customers choose their dream cars effortlessly.",
      ]
    } else if (hour >= 17 && hour < 22) {
      salute = 'Good Evening'
      icon = '🌆'
      period = 'evening'
      gradientBadge = 'from-rose-500 via-orange-500 to-amber-500'
      quotes = [
        "Wrapping up today's rental drives! Moderate return trip feedback from happy customers.",
        "Evening fleet update! Approve glowing reviews to inspire tomorrow's self-drive bookings.",
        "Sunset over the highways! Check customer satisfaction scores from today's completed journeys.",
        "Great stories created today. Let's make sure verified customer testimonials shine on the live site.",
      ]
    } else {
      salute = 'Good Night & Welcome'
      icon = '🌙'
      period = 'night'
      gradientBadge = 'from-indigo-600 via-purple-600 to-orange-500'
      quotes = [
        "Late shift operations active! Overnight sync ensures the public fleet rating stays fresh.",
        "Quiet night hours — perfect time to clear pending reviews before tomorrow morning's dispatches.",
        "Night drop-off reviews incoming. Moderate late trip ratings and keep your high reputation.",
        "Smooth night drives across all cities. Rest easy knowing customer ratings are verified and secure.",
      ]
    }

    const safeQuote = quotes[quoteIndex % quotes.length] || quotes[0]
    return {
      salute,
      icon,
      period,
      greeting: `${salute}, ${effectiveAdminName}!`,
      quote: safeQuote,
      gradientBadge,
    }
  }, [effectiveAdminName, quoteIndex])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 3500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  // ── Firestore Subscription (Only when Authenticated) ──
  useEffect(() => {
    if (!isAuthenticated) return

    setLoading(true)
    const unsubscribe = subscribeToAllReviews(
      (allReviews) => {
        setReviews(allReviews)
        setLoading(false)
        setErrorNotice(null)
      },
      (err) => {
        console.error('Admin subscription error:', err)
        setErrorNotice('Failed to load reviews from Firestore. Please check Firebase rules or network.')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [isAuthenticated])

  // ── Login Handler with Firebase Auth Only + Firestore Role Verification ──
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)

    const cleanEmail = emailInput.trim().toLowerCase()
    const cleanPassword = passwordInput.trim()

    if (!cleanEmail || !cleanPassword) {
      setLoginError('Please enter both Email and Password.')
      setIsLoggingIn(false)
      return
    }

    try {
      // 1. Configure Firebase Auth Persistence based on Remember Me
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      )

      // 2. Authenticate strictly via Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword)
      const user = userCredential.user

      // 3. Verify Admin Role in Firestore users/{uid}
      const { isAdmin, name } = await verifyAdminRole(user.uid)
      if (!isAdmin) {
        await firebaseSignOut(auth)
        setCurrentUser(null)
        setIsAuthenticated(false)
        setLoginError('Access denied: Your account does not have administrator privileges.')
        return
      }

      setCurrentUser(user)
      if (name) setAdminProfileName(name)
      setIsAuthenticated(true)
      setToastMessage({
        text: `Welcome back, ${name || user.displayName || cleanEmail}! Logged in as Administrator.`,
        type: 'success',
      })
    } catch (fbError: any) {
      console.warn('Firebase authentication error:', fbError?.code)

      // Map Firebase Auth error codes safely
      if (
        fbError?.code === 'auth/invalid-credential' ||
        fbError?.code === 'auth/wrong-password' ||
        fbError?.code === 'auth/user-not-found'
      ) {
        setLoginError('Invalid Email ID or Password! Please check your credentials.')
      } else if (fbError?.code === 'auth/invalid-email') {
        setLoginError('Please enter a valid email address format.')
      } else if (fbError?.code === 'auth/user-disabled') {
        setLoginError('This administrator account has been disabled. Please contact support.')
      } else if (fbError?.code === 'auth/too-many-requests') {
        setLoginError('Too many failed attempts. Please wait a moment or reset your password.')
      } else {
        setLoginError('Authentication failed. Please check your credentials.')
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  // ── Password Reset Handler (Firebase Auth Flow) ──
  async function handleSendPasswordReset(e: React.FormEvent) {
    e.preventDefault()
    setForgotError('')
    const targetEmail = forgotEmail.trim() || emailInput.trim()
    if (!targetEmail) {
      setForgotError('Please enter your administrator email address.')
      return
    }

    setIsSendingReset(true)
    try {
      await sendPasswordResetEmail(auth, targetEmail)
      setResetSent(true)
      setToastMessage({ text: `Firebase password reset link sent to ${targetEmail}!`, type: 'success' })
    } catch (err: any) {
      console.warn('Firebase reset email notice:', err?.code)
      if (err?.code === 'auth/invalid-email') {
        setForgotError('Please enter a valid email address format.')
      } else if (err?.code === 'auth/too-many-requests') {
        setForgotError('Too many requests. Please wait a few minutes before trying again.')
      } else {
        // Safe generic message to prevent email enumeration
        setResetSent(true)
        setToastMessage({ text: `If registered, a password reset link has been dispatched to ${targetEmail}.`, type: 'info' })
      }
    } finally {
      setIsSendingReset(false)
    }
  }

  // ── Logout Handler ──
  async function handleLogout() {
    try {
      await firebaseSignOut(auth)
    } catch (err) {
      console.error('Firebase signout error:', err)
    }
    setIsAuthenticated(false)
    setCurrentUser(null)
    setAdminProfileName('')
    setEmailInput('')
    setPasswordInput('')
    setShowLogoutModal(false)
    setToastMessage({ text: 'Logged out successfully.', type: 'info' })
  }

  // ── Moderation Actions ──
  async function handleApprove(review: CustomerReview) {
    if (!review.id) return
    setActionLoadingId(review.id)
    try {
      await approveReview(review.id)
      setToastMessage({ text: `Approved review by "${review.name}"! Now live on website.`, type: 'success' })
      if (detailTarget?.id === review.id) {
        setDetailTarget((prev) => (prev ? { ...prev, status: 'approved' } : null))
      }
    } catch (err: any) {
      console.error('Error approving review:', err)
      setToastMessage({ text: 'Failed to approve review: ' + (err?.message || 'Unknown error'), type: 'error' })
    } finally {
      setActionLoadingId(null)
    }
  }

  async function handleReject(review: CustomerReview) {
    if (!review.id) return
    setActionLoadingId(review.id)
    try {
      await rejectReview(review.id)
      setToastMessage({ text: `Rejected review by "${review.name}". Moved to rejected list.`, type: 'info' })
      if (detailTarget?.id === review.id) {
        setDetailTarget((prev) => (prev ? { ...prev, status: 'rejected' } : null))
      }
    } catch (err: any) {
      console.error('Error rejecting review:', err)
      setToastMessage({ text: 'Failed to reject review: ' + (err?.message || 'Unknown error'), type: 'error' })
    } finally {
      setActionLoadingId(null)
    }
  }

  async function confirmDelete() {
    if (!deleteTarget?.id) return
    const reviewId = deleteTarget.id
    const reviewName = deleteTarget.name
    setActionLoadingId(reviewId)
    setDeleteTarget(null)

    try {
      await deleteReview(reviewId)
      setToastMessage({ text: `Review by "${reviewName}" permanently deleted.`, type: 'success' })
      if (detailTarget?.id === reviewId) {
        setDetailTarget(null)
      }
    } catch (err: any) {
      console.error('Error deleting review:', err)
      setToastMessage({ text: 'Failed to delete review: ' + (err?.message || 'Unknown error'), type: 'error' })
    } finally {
      setActionLoadingId(null)
    }
  }

  // ── Metrics Computation ──
  const metrics = useMemo(() => {
    const total = reviews.length
    const pending = reviews.filter((r) => r.status === 'pending').length
    const approved = reviews.filter((r) => r.status === 'approved').length
    const rejected = reviews.filter((r) => r.status === 'rejected').length

    const approvedReviews = reviews.filter((r) => r.status === 'approved')
    const avgRating =
      approvedReviews.length > 0
        ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
        : 5.0

    return { total, pending, approved, rejected, avgRating }
  }, [reviews])

  // ── Filtered & Sorted Reviews ──
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Status Filter
      if (filterStatus !== 'all' && review.status !== filterStatus) {
        return false
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = review.name.toLowerCase().includes(query)
        const matchCity = review.city.toLowerCase().includes(query)
        const matchCar = review.car.toLowerCase().includes(query)
        const matchText = review.text.toLowerCase().includes(query)
        const matchPhone = review.phone?.toLowerCase().includes(query)
        const matchEmail = review.email?.toLowerCase().includes(query)
        if (!matchName && !matchCity && !matchCar && !matchText && !matchPhone && !matchEmail) {
          return false
        }
      }

      return true
    }).sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0
      return dateB - dateA
    })
  }, [reviews, filterStatus, searchQuery])

  // ─────────────────────────────────────────────────────────────
  // 0. AUTH CHECKING LOADING SCREEN
  // ─────────────────────────────────────────────────────────────
  if (isAuthChecking) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white select-none">
        <img
          src={brandLogo}
          alt="Car Rental Express"
          className="h-10 w-auto object-contain mb-4 animate-pulse drop-shadow-lg"
        />
        <div className="flex items-center gap-2.5 text-xs font-bold text-orange-400 tracking-wider uppercase">
          <span className="size-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
          <span>Verifying Admin Access...</span>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 1. REFINED LUXURY LOGIN SCREEN (SAME AS USER MOCKUP IMAGE)
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="relative h-screen max-h-screen w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-slate-950 font-sans text-white select-none">
        {/* Full-Brightness Cinematic Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-[position:20%_center] sm:bg-[position:25%_center] lg:bg-center bg-no-repeat transition-all duration-500"
          style={{ backgroundImage: `url(${adminLoginBg})` }}
        >
          {/* Subtle Ambient Contrast Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/20" />
        </div>

        {/* ── TOP HEADER ── */}
        <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-4 sm:pt-6 pb-1 flex items-center justify-between shrink-0">
          {/* Top Left: Back to Website Button + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 hover:border-orange-400 bg-slate-900/80 hover:bg-slate-900 text-slate-100 hover:text-orange-400 px-3.5 py-1.5 text-xs font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer group"
              title="Return to Main Website"
            >
              <svg className="size-3.5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to Website</span>
            </Link>

            <Link to="/" className="inline-flex items-center gap-2 group" title="Return to Homepage">
              <img
                src={brandLogo}
                alt="Car Rental Express"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md hidden sm:block"
              />
            </Link>
          </div>

          {/* Top Right: Watermark Script */}
          <div className="text-right font-serif italic text-white/95 text-xs sm:text-sm tracking-wide rotate-[-5deg] drop-shadow-md select-none leading-tight">
            Good Journeys<br />
            <span className="text-orange-400 font-sans not-italic font-semibold text-xs">Create Great Stories</span>
          </div>
        </header>

        {/* ── CENTER MAIN SECTION (2 COLUMNS - NO SCROLL) ── */}
        <main className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 my-auto py-2 sm:py-3 shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Admin Portal Showcase (Compact & Clean without big gaps) */}
            <div className="lg:col-span-6 space-y-2 text-white lg:self-start">
              <div className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-slate-300 uppercase leading-snug drop-shadow-md">
                DRIVE MORE<br />MANAGE BETTER
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Admin <span className="text-orange-400 drop-shadow-sm">Portal</span>
              </h1>

              <p className="text-sm sm:text-base font-bold text-slate-200 drop-shadow-md pb-0.5">
                Control. Manage. Grow.
              </p>

              {/* 3 Feature Pills with Website Orange Brand Accents */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {/* 1. Manage Bookings */}
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/70 border border-slate-700/70 px-3 py-1.5 backdrop-blur-md shadow-lg shadow-black/30">
                  <div className="grid size-6 place-items-center rounded-lg bg-orange-500/20 text-orange-400">
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-slate-100">Manage Bookings</span>
                </div>

                {/* 2. Handle Customers */}
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/70 border border-slate-700/70 px-3 py-1.5 backdrop-blur-md shadow-lg shadow-black/30">
                  <div className="grid size-6 place-items-center rounded-lg bg-orange-500/20 text-orange-400">
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-slate-100">Handle Customers</span>
                </div>

                {/* 3. Track Performance */}
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/70 border border-slate-700/70 px-3 py-1.5 backdrop-blur-md shadow-lg shadow-black/30">
                  <div className="grid size-6 place-items-center rounded-lg bg-orange-500/20 text-orange-400">
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-slate-100">Track Performance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphic Login Card (Website Brand Theme) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] rounded-3xl border border-orange-400/35 bg-slate-950/85 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl shadow-orange-950/40 ring-1 ring-orange-400/20 text-white">
                
                {/* Brand Logo & Pill Header inside Card */}
                <div className="text-center mb-5">
                  <img
                    src={brandLogo}
                    alt="Car Rental Express"
                    className="h-8 w-auto mx-auto object-contain mb-2.5 drop-shadow-md"
                  />

                  <div className="flex justify-center mb-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 shadow-2xs backdrop-blur-md">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Verified Admin Portal</span>
                    </div>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Admin <span className="text-orange-400">Login</span>
                  </h2>

                  <p className="text-[11px] text-slate-400 mt-1">
                    Sign in with your administrator email & password to manage customer reviews.
                  </p>
                </div>

                {/* Error Banner */}
                {loginError && (
                  <div className="mb-3.5 flex items-start gap-2.5 rounded-xl border border-rose-500/50 bg-rose-950/80 p-2.5 text-xs font-bold text-rose-300 animate-fade-in-up">
                    <svg className="size-4 shrink-0 mt-0.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-3.5">
                  
                  {/* Field 1: Administrator Email ID */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Administrator Email ID
                    </label>
                    <div className="relative rounded-xl border border-slate-700/90 bg-slate-900/90 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                      <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => {
                          setEmailInput(e.target.value)
                          setLoginError('')
                        }}
                        placeholder="admin@carrentalexpress.in"
                        required
                        className="w-full bg-transparent text-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* Field 2: Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative rounded-xl border border-slate-700/90 bg-slate-900/90 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                      <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value)
                          setLoginError('')
                        }}
                        placeholder="••••••••••••"
                        required
                        className="w-full bg-transparent text-white pl-10 pr-10 py-2 text-xs sm:text-sm font-medium focus:outline-none placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Below Password Field: Keep me signed in + Forgot Password Option */}
                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer font-medium select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="size-3.5 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500 cursor-pointer accent-orange-500"
                      />
                      <span className="text-[11px] sm:text-xs">Keep me signed in</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(emailInput)
                        setResetSent(false)
                        setShowForgotModal(true)
                      }}
                      className="text-[11px] sm:text-xs font-semibold text-orange-400 hover:text-orange-300 hover:underline transition cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Sign In Button with Brand Vibrant Orange Gradient */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2.5 sm:py-3 text-xs sm:text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isLoggingIn ? (
                        <>
                          <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Admin Dashboard</span>
                          <span className="text-base">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Back to Webpage Link */}
                <div className="mt-4 text-center">
                  <Link
                    to="/"
                    className="text-xs font-semibold text-slate-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>←</span>
                    <span>Back to Main Website</span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </main>

        {/* ── FORGOT PASSWORD RECOVERY MODAL (FIREBASE RESET & WHATSAPP) ── */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-md rounded-3xl border border-orange-500/40 bg-slate-950 p-6 shadow-2xl shadow-orange-950/60 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-orange-500/20 text-orange-400 text-lg">
                    <span>🔑</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-black text-white">Reset Admin Password</h3>
                    <p className="text-xs text-slate-400">Firebase Password Recovery</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false)
                    setForgotError('')
                  }}
                  className="grid size-8 place-items-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Visual Flow Indicator */}
              <div className="flex items-center justify-between gap-1 rounded-xl bg-slate-900/90 border border-slate-800 p-2 text-[10px] font-bold text-slate-400">
                <span className="text-slate-300">1. Email</span>
                <span className="text-orange-400">→</span>
                <span className="text-orange-400">2. Reset Link</span>
                <span className="text-orange-400">→</span>
                <span className="text-emerald-400">3. New Password</span>
              </div>

              {forgotError && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-500/50 bg-rose-950/80 p-2.5 text-xs font-semibold text-rose-300 animate-fade-in">
                  <svg className="size-4 shrink-0 mt-0.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <span>{forgotError}</span>
                </div>
              )}

              {resetSent ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/60 p-4 text-center space-y-3">
                  <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-400 text-2xl mx-auto flex items-center justify-center border border-emerald-500/40">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-emerald-300">Firebase Reset Email Sent!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      A secure password reset link has been dispatched to <strong className="text-white">{forgotEmail || emailInput}</strong>.
                    </p>
                  </div>

                  <div className="text-left rounded-xl bg-slate-950/80 border border-slate-800 p-3 space-y-1.5 text-xs text-slate-300">
                    <div className="font-bold text-orange-400 text-[11px] uppercase tracking-wider">Next Steps:</div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-emerald-400">1.</span>
                      <span>Open your email inbox or spam folder.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-emerald-400">2.</span>
                      <span>Click the official Firebase reset link.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-emerald-400">3.</span>
                      <span>Enter your <strong>New Password</strong> & submit.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-emerald-400">4.</span>
                      <span>Return here and sign in with your new password!</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false)
                      setForgotError('')
                    }}
                    className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold py-2.5 transition cursor-pointer shadow-lg shadow-orange-950/40"
                  >
                    Back to Admin Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendPasswordReset} className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Enter your registered administrator email address to receive an official Firebase password reset link and create a new password.
                  </p>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Administrator Email ID
                    </label>
                    <div className="relative rounded-xl border border-slate-700/90 bg-slate-900/90 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                      <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value)
                          setForgotError('')
                        }}
                        placeholder="admin@carrentalexpress.in"
                        required
                        className="w-full bg-transparent text-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSendingReset}
                      className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2.5 px-3 text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 transition cursor-pointer disabled:opacity-60"
                    >
                      {isSendingReset ? (
                        <>
                          <span className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Link...</span>
                        </>
                      ) : (
                        <span>📧 Send Reset Email</span>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        'Hi Faizan, I need assistance resetting my Admin Portal password for Car Rental Express.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3.5 text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>💬 WhatsApp Support</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ── BOTTOM FOOTER ── */}
        <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-4 sm:pb-5 pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          {/* Bottom Left: Tagline */}
          <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase leading-relaxed text-center sm:text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            PREMIUM CARS<br />
            HAPPIER CUSTOMERS<br />
            BIGGER TOMORROWS
          </div>

          {/* Bottom Right: Copyright & Links */}
          <div className="text-[11px] text-slate-300 space-y-0.5 text-center sm:text-right drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 text-slate-300 text-[11px]">
              <a
                href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Admin Portal Support`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Need Help?
              </a>
              <span>|</span>
              <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            </div>
            <div className="text-[10px] text-slate-400">
              © {new Date().getFullYear()} Car Rental Express. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    )
  }


  // ─────────────────────────────────────────────────────────────
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-white transition-colors duration-300 flex flex-col scroll-smooth">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-fade-in-up ${
            toastMessage.type === 'success'
              ? 'bg-emerald-600/95 border border-emerald-400/40 shadow-emerald-900/30'
              : toastMessage.type === 'error'
              ? 'bg-rose-600/95 border border-rose-400/40 shadow-rose-900/30'
              : 'bg-slate-800/95 border border-slate-700 shadow-slate-950/40'
          }`}
        >
          <span>{toastMessage.type === 'success' ? '✓' : toastMessage.type === 'error' ? '⚠️' : 'ℹ️'}</span>
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/70 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── TOP HEADER / APP BAR ── */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3.5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={brandLogo}
                alt="Car Rental Express"
                className="h-9 w-auto object-contain transition group-hover:scale-105"
              />
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-orange-200 dark:border-orange-800/60 bg-orange-50 dark:bg-orange-950/60 px-3 py-0.5 text-[11px] font-black text-orange-600 dark:text-orange-400">
              <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Admin Portal</span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Logged-in Admin User Badge */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="max-w-[150px] truncate">{effectiveAdminName}</span>
              </div>
            )}

            {/* View Live Website Button */}
            <Link
              to="/feedback"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition"
              title="Open public feedback page in new tab"
            >
              <span>🌐 Public Page</span>
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>

            {/* Smooth Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              type="button"
              className={`group relative inline-flex h-8 w-14 items-center rounded-full p-0.5 transition-all duration-500 ease-in-out cursor-pointer focus:outline-none ${
                theme === 'dark'
                  ? 'bg-slate-800 border border-slate-700 shadow-inner shadow-black/40 hover:border-amber-400/60'
                  : 'bg-slate-200 border border-slate-300 shadow-inner shadow-slate-400/20 hover:border-orange-400/60'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              <span className="absolute left-1.5 text-[9px] select-none opacity-70">☀️</span>
              <span className="absolute right-1.5 text-[9px] select-none opacity-70">🌙</span>
              <span
                className={`relative z-10 flex size-6 items-center justify-center rounded-full shadow-md transition-all duration-500 ease-out transform ${
                  theme === 'dark'
                    ? 'translate-x-6 bg-slate-900 text-amber-300 ring-1 ring-indigo-500/50'
                    : 'translate-x-0 bg-white text-orange-500 ring-1 ring-orange-200'
                }`}
              >
                <span className={`transition-transform duration-500 ease-out ${theme === 'dark' ? 'rotate-360 scale-105' : 'rotate-0 scale-100'}`}>
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

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition cursor-pointer"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="mx-auto max-w-7xl w-full flex-1 px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* ── ERROR NOTICE BANNER IF ANY ── */}
        {errorNotice && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/60 p-4 text-xs font-bold text-rose-700 dark:text-rose-300">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorNotice}</span>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-rose-600 px-3 py-1 text-white hover:bg-rose-700 transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── TOP SECTION: DYNAMIC WELCOME HERO BANNER (TIME-OF-DAY + LIVE CLOCK + MOTIVATIONAL MESSAGE) ── */}
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-7 text-white shadow-xl shadow-orange-950/20 backdrop-blur-xl">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute -right-16 -top-16 size-72 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 size-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Greeting & Motivational Quote */}
            <div className="space-y-2.5 max-w-2xl">
              {/* Status capsule & live clock */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-3 py-0.5 text-[11px] font-bold text-emerald-400 shadow-sm backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admin Session Active</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-0.5 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
                  <span>🗓️ {currentDate}</span>
                  <span>•</span>
                  <span className="font-mono text-orange-400 font-bold">⏱️ {currentTime}</span>
                </div>
              </div>

              {/* Dynamic Time-of-Day Title */}
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl animate-bounce duration-1000">{greetingInfo.icon}</span>
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  {greetingInfo.salute},{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                    {effectiveAdminName}
                  </span>
                </h1>
              </div>

              {/* Dynamic Motivational Message */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                "{greetingInfo.quote}"
              </p>
            </div>

            {/* Right: Quick Action Shortcuts */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 lg:self-center shrink-0">
              {metrics.pending > 0 && (
                <button
                  onClick={() => setFilterStatus('pending')}
                  className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-4 py-2.5 text-xs shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="animate-pulse">⏳</span>
                  <span>Review {metrics.pending} Pending</span>
                </button>
              )}

              <Link
                to="/feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-700 bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold px-4 py-2.5 text-xs transition-all hover:border-orange-400/60 cursor-pointer flex items-center gap-1.5 backdrop-blur-md"
                title="Open Public Customer Feedback Page in a new tab"
              >
                <span>🌐 Public Live Feed</span>
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── 5 KPI METRIC CARDS WITH ELEVATED MODERN UI ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* 1. Total Reviews */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Feedback</span>
              <div className="grid size-7 place-items-center rounded-xl bg-blue-500/10 text-blue-500">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v4.518z" />
                </svg>
              </div>
            </div>
            <div className="mt-2.5 font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {metrics.total}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">All submissions</div>
          </div>

          {/* 2. Pending Approvals (Highlighted) */}
          <div className={`rounded-3xl border p-4 sm:p-5 shadow-sm transition hover:shadow-md flex flex-col justify-between ${
            metrics.pending > 0
              ? 'border-amber-400/80 dark:border-amber-600/80 bg-gradient-to-br from-amber-500/10 to-orange-500/10 ring-2 ring-amber-400/20'
              : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pending Review</span>
              <div className="grid size-7 place-items-center rounded-xl bg-amber-500/15 text-amber-500">
                <span className="text-xs">⏳</span>
              </div>
            </div>
            <div className="mt-2.5 font-display text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <span>{metrics.pending}</span>
              {metrics.pending > 0 && (
                <span className="text-[10px] font-bold bg-amber-500 text-white rounded-full px-2 py-0.5 animate-pulse">
                  Action
                </span>
              )}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-amber-700/80 dark:text-amber-400/80">Needs action</div>
          </div>

          {/* 3. Approved (Live) */}
          <div className="rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Live Approved</span>
              <div className="grid size-7 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <span className="text-xs font-black">✓</span>
              </div>
            </div>
            <div className="mt-2.5 font-display text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {metrics.approved}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-emerald-700/80 dark:text-emerald-400/80">Visible on site</div>
          </div>

          {/* 4. Rejected */}
          <div className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm transition hover:border-rose-400 hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Rejected</span>
              <div className="grid size-7 place-items-center rounded-xl bg-rose-500/15 text-rose-500">
                <span className="text-xs font-black">✕</span>
              </div>
            </div>
            <div className="mt-2.5 font-display text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
              {metrics.rejected}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-rose-700/80 dark:text-rose-400/80">Archived</div>
          </div>

          {/* 5. Average Rating */}
          <div className="col-span-2 sm:col-span-1 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm transition hover:border-amber-400 hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Avg Rating</span>
              <div className="grid size-7 place-items-center rounded-xl bg-amber-500/15 text-amber-500">
                <span className="text-xs">★</span>
              </div>
            </div>
            <div className="mt-2.5 font-display text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1.5">
              <span>★</span>
              <span>{metrics.avgRating.toFixed(1)}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">From approved</div>
          </div>
        </div>

        {/* ── CONTROLS & FILTER BAR ── */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs space-y-4">
          
          {/* Row 1: Status Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  filterStatus === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Reviews</span>
                <span className="rounded-full bg-slate-200 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-black text-slate-700 dark:text-slate-300">
                  {metrics.total}
                </span>
              </button>

              <button
                onClick={() => setFilterStatus('pending')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  filterStatus === 'pending'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                    : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                }`}
              >
                <span>⏳ Pending</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                  filterStatus === 'pending' ? 'bg-white/20 text-white' : 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                }`}>
                  {metrics.pending}
                </span>
              </button>

              <button
                onClick={() => setFilterStatus('approved')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  filterStatus === 'approved'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                }`}
              >
                <span>✓ Approved</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                  filterStatus === 'approved' ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                }`}>
                  {metrics.approved}
                </span>
              </button>

              <button
                onClick={() => setFilterStatus('rejected')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  filterStatus === 'rejected'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                }`}
              >
                <span>✕ Rejected</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                  filterStatus === 'rejected' ? 'bg-white/20 text-white' : 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'
                }`}>
                  {metrics.rejected}
                </span>
              </button>
            </div>

            {/* View Mode Toggle (Cards vs Table) */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-1">
              <button
                onClick={() => {
                  setViewMode('table')
                  localStorage.setItem('cre_admin_view_mode', 'table')
                }}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Table View (Default)"
              >
                <span>☰ Table</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('cards')
                  localStorage.setItem('cre_admin_view_mode', 'cards')
                }}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Card View"
              >
                <span>⊞ Cards</span>
              </button>
            </div>
          </div>

          {/* Row 2: Search Input (Compact Width) */}
          <div className="relative max-w-sm sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews by name, phone, car, city..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 pl-10 pr-4 py-2 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── REVIEW LISTINGS (CARDS OR TABLE) ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="skeleton size-9 rounded-xl" />
                  <div className="space-y-1 flex-1">
                    <div className="skeleton h-3.5 w-24 rounded-md" />
                    <div className="skeleton h-2.5 w-16 rounded-md" />
                  </div>
                </div>
                <div className="skeleton h-10 w-full rounded-lg" />
                <div className="skeleton h-7 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
            <div className="mx-auto size-16 rounded-full bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-2xl mb-4 text-orange-500">
              🔍
            </div>
            <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
              No Reviews Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No reviews matched "${searchQuery}". Try clearing search keywords.`
                : `No reviews found in "${filterStatus}" category.`}
            </p>
            {(searchQuery || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterStatus('all')
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-orange-600 transition cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : viewMode === 'cards' ? (
          /* ──────────────── COMPACT CARDS VIEW ──────────────── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredReviews.map((review) => {
              const isActionLoading = actionLoadingId === review.id
              const isPending = review.status === 'pending'
              const isApproved = review.status === 'approved'
              const isRejected = review.status === 'rejected'

              return (
                <div
                  key={review.id}
                  className={`group rounded-2xl border bg-white dark:bg-slate-900 p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                    isPending
                      ? 'border-amber-300 dark:border-amber-700/70 ring-1 ring-amber-400/30'
                      : isApproved
                      ? 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      : 'border-rose-200 dark:border-rose-900/50 opacity-80'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Card Top: Customer Avatar, Name, Rating & Status Pill */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 font-display text-xs font-black text-white shadow-xs">
                          {review.avatar || review.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-heading text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight truncate">
                            {review.name}
                          </h4>
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                            <span className="truncate">📍 {review.city}</span>
                            <span>•</span>
                            <span className="truncate">🚗 {review.car}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide shrink-0 ${
                          isApproved
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                            : isPending
                            ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 animate-pulse'
                            : 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${isApproved ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-rose-500'}`} />
                        <span>{isApproved ? 'LIVE' : isPending ? 'PENDING' : 'REJECTED'}</span>
                      </span>
                    </div>

                    {/* Star Rating & Submission Date */}
                    <div className="flex items-center justify-between gap-1.5 border-y border-slate-100 dark:border-slate-800/80 py-1.5 text-[11px]">
                      <div className="flex items-center gap-0.5 text-amber-400 font-black">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={s <= review.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}>
                            ★
                          </span>
                        ))}
                        <span className="text-slate-700 dark:text-slate-300 text-[11px] ml-1 font-bold">
                          {review.rating}.0
                        </span>
                      </div>

                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                        {review.createdAt instanceof Date
                          ? review.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                          : 'Recent'}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-[11.5px] font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed italic">
                      "{review.text}"
                    </p>

                    {/* Customer Phone / WhatsApp */}
                    {review.phone && (
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                        <span className="truncate">📞 {review.phone}</span>
                        <a
                          href={`https://wa.me/${review.phone.replace(/\D/g, '')}?text=Hi ${review.name}, thank you for renting with Car Rental Express!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline shrink-0 ml-1"
                        >
                          WhatsApp →
                        </a>
                      </div>
                    )}
                  </div>

                  {/* ── ACTION BUTTONS ROW ── */}
                  <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                    {/* Approve Button (If not approved) */}
                    {!isApproved && (
                      <button
                        onClick={() => handleApprove(review)}
                        disabled={isActionLoading}
                        className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 px-2 text-[11px] font-bold transition shadow-2xs flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <span>✓ Approve</span>
                      </button>
                    )}

                    {/* Reject Button (If not rejected) */}
                    {!isRejected && (
                      <button
                        onClick={() => handleReject(review)}
                        disabled={isActionLoading}
                        className="rounded-lg border border-amber-300 dark:border-amber-800/70 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 px-2.5 py-1.5 text-[11px] font-bold transition cursor-pointer disabled:opacity-50"
                        title="Reject & Archive"
                      >
                        <span>Reject</span>
                      </button>
                    )}

                    {/* Detail Preview Button */}
                    <button
                      onClick={() => setDetailTarget(review)}
                      className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 p-1.5 text-[11px] font-bold transition cursor-pointer"
                      title="View Full Details"
                    >
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>

                    {/* Delete Button (Distinct RED) */}
                    <button
                      onClick={() => setDeleteTarget(review)}
                      disabled={isActionLoading}
                      className="rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white p-1.5 text-[11px] font-bold transition cursor-pointer shadow-2xs group disabled:opacity-50"
                      title="Delete Permanently"
                    >
                      <svg className="size-3.5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* ──────────────── VERTICAL SLIDING TABLE VIEW (STICKY HEADER & CLICKABLE ROWS) ──────────────── */
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="overflow-y-auto max-h-[460px] scroll-smooth">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-md text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[10.5px] border-b border-slate-200 dark:border-slate-700 shadow-2xs">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-3 py-3">Vehicle</th>
                    <th className="px-2.5 py-3">Rating</th>
                    <th className="px-3 py-3">Feedback Snippet</th>
                    <th className="px-2.5 py-3">Status</th>
                    <th className="px-2.5 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {filteredReviews.map((review) => {
                  const isActionLoading = actionLoadingId === review.id
                  const isPending = review.status === 'pending'
                  const isApproved = review.status === 'approved'
                  const isRejected = review.status === 'rejected'

                  return (
                    <tr
                      key={review.id}
                      onClick={() => setDetailTarget(review)}
                      className="hover:bg-slate-50/90 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                      title="Click row to view full customer feedback details"
                    >
                      {/* 1. Customer */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 font-display text-[11px] font-black text-white shadow-2xs group-hover:scale-105 transition-transform">
                            {review.avatar || review.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-white text-xs truncate max-w-[130px] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {review.name}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5 truncate">
                              {review.phone ? (
                                <a
                                  href={`tel:${review.phone}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="hover:text-orange-500 transition-colors flex items-center gap-0.5 truncate"
                                  title="Call Customer"
                                >
                                  <span>📞</span>
                                  <span className="truncate">{review.phone}</span>
                                </a>
                              ) : (
                                <span className="truncate">📍 {review.city}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Vehicle */}
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg text-xs truncate max-w-[130px]">
                          <span>🚗</span>
                          <span className="truncate">{review.car}</span>
                        </span>
                      </td>

                      {/* 3. Rating */}
                      <td className="px-2.5 py-2.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-black text-amber-500 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-800/50 px-2 py-0.5 rounded-lg text-xs">
                          <span>★</span>
                          <span>{review.rating}.0</span>
                        </span>
                      </td>

                      {/* 4. Feedback Snippet */}
                      <td className="px-3 py-2.5 max-w-xs xl:max-w-md">
                        <p className="truncate text-slate-600 dark:text-slate-300 italic text-xs leading-relaxed" title={review.text}>
                          "{review.text}"
                        </p>
                      </td>

                      {/* 5. Status */}
                      <td className="px-2.5 py-2.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider ${
                            isApproved
                              ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                              : isPending
                              ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 animate-pulse'
                              : 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
                          }`}
                        >
                          <span className={`size-1.5 rounded-full ${isApproved ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-rose-500'}`} />
                          <span>{isApproved ? 'APPROVED' : isPending ? 'PENDING' : 'REJECTED'}</span>
                        </span>
                      </td>

                      {/* 6. Date */}
                      <td className="px-2.5 py-2.5 text-[11px] font-medium text-slate-400 whitespace-nowrap">
                        {review.createdAt instanceof Date
                          ? review.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                          : '—'}
                      </td>

                      {/* 7. Actions */}
                      <td className="px-4 py-2.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approve Button */}
                          {!isApproved && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApprove(review)
                              }}
                              disabled={isActionLoading}
                              className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 text-[11px] font-bold transition shadow-2xs cursor-pointer disabled:opacity-50"
                              title="Approve Review"
                            >
                              Approve
                            </button>
                          )}

                          {/* Reject Button */}
                          {!isRejected && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReject(review)
                              }}
                              disabled={isActionLoading}
                              className="rounded-lg border border-amber-300 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1.5 text-[11px] font-bold transition hover:bg-amber-100 cursor-pointer disabled:opacity-50"
                              title="Reject Review"
                            >
                              Reject
                            </button>
                          )}

                          {/* View Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setDetailTarget(review)
                            }}
                            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 text-[11px] font-bold hover:bg-slate-100 transition cursor-pointer"
                            title="View Full Details"
                          >
                            View
                          </button>

                          {/* Delete Button (Distinct RED with SVG Trash Icon) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeleteTarget(review)
                            }}
                            disabled={isActionLoading}
                            className="rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white p-1.5 text-[11px] font-bold transition cursor-pointer shadow-2xs group disabled:opacity-50"
                            title="Delete Permanently"
                          >
                            <svg className="size-3.5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </main>

      {/* ── DETAIL PREVIEW MODAL ── */}
      {detailTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white font-black text-base">
                  {detailTarget.avatar || detailTarget.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
                    {detailTarget.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    📍 {detailTarget.city} • 🚗 {detailTarget.car}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDetailTarget(null)}
                className="rounded-full bg-slate-100 dark:bg-slate-800 p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Rating</span>
                <span className="font-black text-amber-500">★ {detailTarget.rating}.0 / 5.0</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                <span className="font-bold capitalize text-slate-800 dark:text-slate-200">{detailTarget.status || 'pending'}</span>
              </div>
              {detailTarget.phone && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Phone</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{detailTarget.phone}</span>
                </div>
              )}
              {detailTarget.bookingMethod && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Booking Channel</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{detailTarget.bookingMethod}</span>
                </div>
              )}
            </div>

            {/* Full Review Text */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Customer Review</label>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-4 text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                "{detailTarget.text}"
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {detailTarget.status !== 'approved' && (
                <button
                  onClick={() => handleApprove(detailTarget)}
                  className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  ✓ Approve & Publish Live
                </button>
              )}
              {detailTarget.status !== 'rejected' && (
                <button
                  onClick={() => handleReject(detailTarget)}
                  className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 px-4 py-2.5 text-xs font-bold transition cursor-pointer"
                >
                  Reject
                </button>
              )}
              <button
                onClick={() => {
                  setDeleteTarget(detailTarget)
                  setDetailTarget(null)
                }}
                className="rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 px-4 py-2.5 text-xs font-bold hover:bg-rose-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-sm rounded-3xl border border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-900 p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto size-14 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 grid place-items-center text-2xl">
              🗑️
            </div>
            <div>
              <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
                Delete Review?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to permanently delete the review by <strong className="text-slate-800 dark:text-slate-200">{deleteTarget.name}</strong> from Firestore? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/30 transition cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOGOUT CONFIRMATION POPUP MODAL ── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl text-center space-y-4">
            <div className="mx-auto size-14 rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/60 grid place-items-center shadow-inner">
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
                Log Out from Admin Portal?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Are you sure you want to end your administrator session, <strong className="text-slate-800 dark:text-slate-200">{effectiveAdminName}</strong>? You will need to sign in again to access moderation controls.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false)
                  handleLogout()
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

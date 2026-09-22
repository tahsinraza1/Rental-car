import { initializeApp, getApps, getApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics, isSupported } from 'firebase/analytics'

export const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    'AIzaSyC8sUpS60lvcpkzPkq_4tZEw_TDdIuiq2I',

  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    'car-rental-express.firebaseapp.com',

  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    'car-rental-express',

  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    'car-rental-express.firebasestorage.app',

  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    '586851412359',

  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    '1:586851412359:web:d3668b65258e35ff620b22',

  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    'G-WPYTCDCE06',
}

// Initialize Firebase safely
export const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)

// ================================
// Firebase App Check
// ================================

export let appCheck: AppCheck | null = null

if (typeof window !== 'undefined') {
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY

  if (recaptchaKey) {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(recaptchaKey),
      isTokenAutoRefreshEnabled: true,
    })
  } else {
    console.warn('Firebase App Check: reCAPTCHA Enterprise key is missing.')
  }
}

// ================================
// Firebase Services
// ================================

export const db = getFirestore(app)
export const auth = getAuth(app)

// ================================
// Analytics
// ================================

export let analytics: ReturnType<typeof getAnalytics> | null = null

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app)
      }
    })
    .catch(() => {
      // Ignore if analytics is blocked
    })
}

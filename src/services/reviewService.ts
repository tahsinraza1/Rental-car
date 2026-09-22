import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export interface CustomerReview {
  id?: string
  name: string
  city: string
  car: string
  rating: number
  text: string
  phone?: string
  email?: string
  bookingMethod?: string
  avatar?: string
  createdAt?: any
  approvedAt?: any
  rejectedAt?: any
  status?: 'approved' | 'pending' | 'rejected'
  isUserSubmitted?: boolean
}

// Collection name matching Firestore security rules
const FEEDBACKS_COLLECTION = 'feedbacks'

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Add a new customer feedback to Firestore with status 'pending'
 * (Matches Firestore Rule: allow create: if request.resource.data.status == "pending")
 */
export async function addCustomerReview(data: Omit<CustomerReview, 'id' | 'createdAt' | 'avatar'>): Promise<string> {
  const feedbackData = {
    name: data.name.trim(),
    city: data.city.trim(),
    car: data.car.trim(),
    rating: Number(data.rating),
    text: data.text.trim(),
    phone: data.phone?.trim() || '',
    email: data.email?.trim() || '',
    bookingMethod: data.bookingMethod || 'WhatsApp',
    avatar: getInitials(data.name),
    status: 'pending', // Required by Firestore rule
    isUserSubmitted: true,
    createdAt: serverTimestamp(),
  }

  const docRef = await addDoc(collection(db, FEEDBACKS_COLLECTION), feedbackData)
  return docRef.id
}

/**
 * Subscribe to approved real-time reviews from Firestore (for Public Website)
 * (Matches Firestore Rule: allow read: if resource.data.status == "approved")
 */
export function subscribeToReviews(
  onUpdate: (reviews: CustomerReview[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  // Query strictly for approved feedbacks so security rules allow reading
  const q = query(
    collection(db, FEEDBACKS_COLLECTION),
    where('status', '==', 'approved')
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const liveReviews: CustomerReview[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          name: data.name || 'Anonymous Driver',
          city: data.city || 'Delhi NCR',
          car: data.car || 'Self-Drive Fleet',
          rating: data.rating || 5,
          text: data.text || '',
          phone: data.phone || '',
          email: data.email || '',
          bookingMethod: data.bookingMethod || 'WhatsApp',
          avatar: data.avatar || getInitials(data.name || 'AD'),
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          status: data.status || 'approved',
          isUserSubmitted: true,
        }
      })

      // Sort client-side by date descending
      liveReviews.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0
        const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0
        return dateB - dateA
      })

      onUpdate(liveReviews)
    },
    (err) => {
      console.warn('Firestore public subscription notice:', err.message)
      if (onError) onError(err)
    }
  )
}

/**
 * Subscribe to ALL real-time reviews from Firestore (for Admin Dashboard)
 * Includes pending, approved, and rejected reviews.
 */
export function subscribeToAllReviews(
  onUpdate: (reviews: CustomerReview[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const collRef = collection(db, FEEDBACKS_COLLECTION)

  return onSnapshot(
    collRef,
    (snapshot) => {
      const allReviews: CustomerReview[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          name: data.name || 'Anonymous Driver',
          city: data.city || 'Delhi NCR',
          car: data.car || 'Self-Drive Fleet',
          rating: Number(data.rating) || 5,
          text: data.text || '',
          phone: data.phone || '',
          email: data.email || '',
          bookingMethod: data.bookingMethod || 'WhatsApp',
          avatar: data.avatar || getInitials(data.name || 'AD'),
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          approvedAt: data.approvedAt?.toDate ? data.approvedAt.toDate() : undefined,
          rejectedAt: data.rejectedAt?.toDate ? data.rejectedAt.toDate() : undefined,
          status: (data.status as 'approved' | 'pending' | 'rejected') || 'pending',
          isUserSubmitted: true,
        }
      })

      // Sort by createdAt descending
      allReviews.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0
        const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0
        return dateB - dateA
      })

      onUpdate(allReviews)
    },
    (err) => {
      console.warn('Firestore admin subscription error:', err.message)
      if (onError) onError(err)
    }
  )
}

/**
 * Admin Action: Approve a review
 * Sets status to 'approved' and records approvedAt timestamp
 */
export async function approveReview(reviewId: string): Promise<void> {
  const reviewRef = doc(db, FEEDBACKS_COLLECTION, reviewId)
  await updateDoc(reviewRef, {
    status: 'approved',
    approvedAt: serverTimestamp(),
  })
}

/**
 * Admin Action: Reject a review
 * Sets status to 'rejected' and records rejectedAt timestamp
 */
export async function rejectReview(reviewId: string): Promise<void> {
  const reviewRef = doc(db, FEEDBACKS_COLLECTION, reviewId)
  await updateDoc(reviewRef, {
    status: 'rejected',
    rejectedAt: serverTimestamp(),
  })
}

/**
 * Admin Action: Permanently delete a review from Firestore
 */
export async function deleteReview(reviewId: string): Promise<void> {
  const reviewRef = doc(db, FEEDBACKS_COLLECTION, reviewId)
  await deleteDoc(reviewRef)
}

# 🧠 CAR RENTAL EXPRESS — PROJECT MASTER BRAIN (BRAIN.md)

> **Document Purpose**: This file serves as the definitive reference guide and architecture overview for **Car Rental Express**. When future developers or AI agents need to update, redesign, debug, or extend this application, they can read this single file to immediately understand the entire codebase without scanning all directories.

---

## 📌 1. Project Overview & Tech Stack

* **Brand Name**: Car Rental Express
* **Business Model**: 100% Direct-to-Owner, 0% Online Advance Deposit, Unlimited Kilometers, Self-Drive Rental across Delhi NCR (Jasola Vihar, Okhla, Noida Sector 18/62, IGI Airport, Central Delhi).
* **Founder**: **Faizan Ahmad** (Founder & Operations Lead)
* **Core Framework**: **React 18** (Functional components + Hooks)
* **Build Tool**: **Vite 8** + TypeScript (`tsc -b`)
* **Styling**: **Tailwind CSS v4** + Custom CSS in `src/index.css` (Glassmorphism, 3D CSS transforms, Custom Keyframe Animations)
* **Routing**: **React Router v6** (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`)
* **Real-time Database**: **Firebase Firestore** (Customer reviews and real-time live feed sync)
* **Live Fleet Data Source**: **Google Sheets API via OpenSheet** (Real-time live car status and price synchronization)

---

## 🗂️ 2. Comprehensive Directory Structure

```
Rental-car/
├── .env                              # Environment variables (Firebase config, Sheet IDs)
├── BRAIN.md                          # 👈 MASTER PROJECT ARCHITECTURE & REFERENCE GUIDE
├── package.json                      # Dependencies and scripts (dev, build, preview)
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite build configuration
├── index.html                        # Root HTML template with Google Fonts (Outfit, Plus Jakarta Sans)
└── src/
    ├── App.tsx                       # Main application router + ScrollToTop + Floating WhatsApp
    ├── main.tsx                      # React root entry point (wrapped with ThemeProvider)
    ├── config.ts                     # Global contact numbers (WhatsApp, Phone E164)
    ├── index.css                     # Design system, Dark mode tokens (@custom-variant dark), 3D styles
    │
    ├── context/
    │   └── ThemeContext.tsx          # Dark/Light Theme Provider & useTheme hook with localStorage ('cre_theme')
    │
    ├── assets/                       # Image assets, photos, textures & banners
    │   ├── cars/                     # 14+ Car fleet photos (thar.jpg, scorpio-n.jpg, creta.jpg, etc.)
    │   ├── owners/                   # Owner photos (faizan.jpg, imran.jpg, inzemam.jpg)
    │   ├── occasions/                # Use-case photos (road_trip.jpg, wedding.jpg, luxury.jpg, etc.)
    │   ├── steps/                    # How it works process images (step1-4)
    │   ├── logo.png                  # Brand logo
    │   └── featured-wave-bg.png      # Abstract wave gradient background texture
    │
    ├── components/                   # Modular React UI components
    │   ├── booking/
    │   │   └── BookingCard.tsx       # Daily/Hourly date-time calendar booking card + WhatsApp inquiry builder
    │   │
    │   ├── cars/
    │   │   └── CarCard.tsx           # Reusable 3D interactive car card with Live Sheet status & price overrides
    │   │
    │   ├── common/
    │   │   └── FloatingWhatsApp.tsx  # Sticky bottom-right floating animated WhatsApp button
    │   │
    │   ├── home/
    │   │   ├── ScenicHero.tsx        # 4-slide crossfade scenic hero banner with category pills
    │   │   ├── StatsSection.tsx      # Glowing 3D metric cards (500+ Happy Customers, 14+ Cars)
    │   │   ├── FleetMarquee.tsx      # Infinite continuous horizontal scrolling car marquee
    │   │   ├── FeaturedCarsSection.tsx # 3D Center Focus + Horizontal Shift carousel with category filters
    │   │   ├── UseCasesSection.tsx   # Filterable occasion cards (Self-Drive, Hourly, Wedding, Airport, etc.)
    │   │   ├── HowItWorks.tsx        # 4-step interactive rental guide
    │   │   ├── WhyChooseUs.tsx       # 6 core trust pillars
    │   │   ├── FeedbackSection.tsx   # Live Firestore customer review stream + modal trigger
    │   │   ├── ReviewModal.tsx       # Write a review popup modal with 1-tap perk chips & Firestore save
    │   │   ├── BehindYourSafeRide.tsx # 3D 9-owner safety slider with 2.5s auto-progress bar & swipe support
    │   │   └── CTABanner.tsx         # Bottom high-conversion CTA banner
    │   │
    │   ├── layout/
    │   │   ├── AppLayout.tsx         # Main layout wrapper with background ambient glows & mesh
    │   │   ├── Navbar.tsx            # Glassmorphic dynamic sticky navbar with mobile drawer
    │   │   └── Footer.tsx            # Footer with directory links, contact numbers & social links
    │   │
    │   └── ui/
    │       ├── SortSelect.tsx        # Custom glassmorphic luxury sorting dropdown (Latest, Highest, Oldest)
    │       ├── VehicleCombobox.tsx   # Searchable car selector dropdown with categories & thumbnails
    │       └── BookingMethodSelect.tsx # Custom channel select dropdown (WhatsApp, Call, Direct, etc.)
    │
    ├── data/
    │   └── cars.ts                   # 14+ Verified vehicle definitions with complete specs, prices, images
    │
    ├── lib/
    │   ├── availability.ts           # Calendar range overlap checker & calculation logic
    │   ├── bookingsStore.ts          # LocalStorage booked dates persistence fallback
    │   ├── cn.ts                     # Classnames merger helper
    │   ├── dates.ts                  # Date formatting utilities (ISO, short dates, range calculation)
    │   ├── firebase.ts               # Firebase App & Firestore initialization from .env
    │   ├── sheetAvailability.ts      # Live Google Sheet fetcher, status normalizer & price lookup hook
    │   └── whatsapp.ts               # Formatted WhatsApp booking message & URL generator
    │
    ├── pages/
    │   ├── HomePage.tsx              # Landing page assembling all key showcase sections
    │   ├── CarsPage.tsx              # Browse full fleet with real-time search, availability & sort filters
    │   ├── CarDetailPage.tsx         # Vehicle detail page + spec sheet + live BookingCard + similar cars
    │   ├── AboutPage.tsx             # Founder (Faizan Ahmad) profile, trusted owners network & hub locations
    │   ├── FeedbackPage.tsx          # Paginated customer reviews wall (6/page) + sticky feedback submission form
    │   ├── ContactPage.tsx           # Contact hubs, direct phone/WhatsApp tiles, inquiry builder & FAQs
    │   └── AdminDashboardPage.tsx    # 🛡️ Admin portal for review moderation (Approve, Reject, Delete) + Auth gate
    │
    ├── services/
    │   └── reviewService.ts          # Firestore feedback service (add, subscribeToApproved, subscribeToAll, approve, reject, delete)
    │
    └── types/
        └── index.ts                  # Global TypeScript interfaces (`Car`, `Booking`, `Review`)
```

---

## 🌐 3. Routes & Page Mapping

| URL Route | Page Component | Key Functionality |
| :--- | :--- | :--- |
| `/` | `src/pages/HomePage.tsx` | Main showcase: Hero, 3D Featured Cars, Occasions, Reviews, 9 Owners Slider. |
| `/cars` | `src/pages/CarsPage.tsx` | Full 14+ fleet grid with live search, availability filter & price sorting. |
| `/cars/:carId` | `src/pages/CarDetailPage.tsx` | Photo gallery, engine/mileage specs, daily/hourly BookingCard with WhatsApp. |
| `/about` | `src/pages/AboutPage.tsx` | Founder (Faizan Ahmad) spotlight card, zero-advance pledge, NCR delivery hubs. |
| `/feedback` | `src/pages/FeedbackPage.tsx` | Smart paginated reviews (6/page), custom SortSelect, sticky review submit form. |
| `/contact` | `src/pages/ContactPage.tsx` | Phone dialer, WhatsApp direct link, vehicle inquiry builder, interactive FAQs. |
| `/admin` | `src/pages/AdminDashboardPage.tsx` | 🛡️ Passcode-protected Admin Dashboard: Moderate reviews (Approve/Reject/Delete), analytics. |
| `*` | Fallback | Redirects to `/` (Home). |

---

## ⚡ 4. Live Integrations & Core Business Logic

### A. Live Google Sheet Availability Sync (`src/lib/sheetAvailability.ts`)
* **Endpoint URL**: `https://opensheet.elk.sh/1CDDKB1_U47E4yQZ_vIRsd4ouC8PoPiMWfRYc1jF0tcM/Sheet1`
* **Poll Interval**: Default 30 seconds (`useSheetAvailability(30000)`).
* **Expected Sheet Columns**: `Car` or `Cars`, `Price `, `Availability`, `id` or `ID`.
* **Smart Status Normalizer (`isCarAvailable`)**:
  * If cell contains: `"Unavailable"`, `"unabiable"`, `"Booked"`, `"not available"`, `"busy"`, `"no"`, `"sold"`, `"0"` -> **Red BOOKED badge (`bg-rose-600 text-white`)**.
  * Otherwise -> **Green AVAILABLE badge (`bg-emerald-500 text-white`)**.
* **Price Override**: If the Google Sheet specifies a custom price, the website automatically overrides the catalog price in real-time.

### B. Firebase Firestore Customer Reviews & Moderation Lifecycle (`src/services/reviewService.ts`)
* **Collection Name**: `feedbacks`
* **Lifecycle Flow**:
  1. Customer submits feedback $\rightarrow$ stored with `status: 'pending'` and `createdAt: serverTimestamp()`.
  2. Public Website listens only to `status: 'approved'` via `subscribeToReviews()`.
  3. Admin logs into `/admin` $\rightarrow$ views all reviews via `subscribeToAllReviews()`.
  4. Admin clicks **Approve** (`approveReview()`) $\rightarrow$ sets `status: 'approved'` & `approvedAt`, instantly publishing to live site.
  5. Admin clicks **Reject** (`rejectReview()`) $\rightarrow$ sets `status: 'rejected'` & `rejectedAt`, moving to archive.
* **Admin Credentials**: Configured in `src/config.ts` (`ADMIN_EMAIL = 'faizan@carrentalexpress.in'`, `ADMIN_PASSWORD = 'creadmin2026'`). Also supports `faizan@admin` and `admin@carrentalexpress.in`.

### C. WhatsApp Booking Engine (`src/lib/whatsapp.ts`, `src/config.ts`)
* **Global Owner WhatsApp**: `918796178177` (Configured in `src/config.ts`).
* **Global Phone Dialer**: `+918796178177` (Configured in `src/config.ts`).
* **Booking Format**: Auto-formats car name, pickup date/time, return date/time, duration, calculated total, customer name, phone number, and trip purpose into a clean pre-filled WhatsApp message.

---

## 🎨 5. Design System & Custom UI Tokens

### A. Color Tokens (`src/index.css`)
* `--color-accent`: `#f97316` (Brand Vibrant Orange)
* `--color-accent-soft`: `#fb923c`
* `--color-accent-dark`: `#ea580c`
* `--color-ink`: `#0f172a` (Deep Slate Slate-900)
* `--color-paper`: `#f8fafc` (Clean Slate-50)

### B. Typography
* **Heading & Display Font**: `"Outfit"`, `"Plus Jakarta Sans"`, sans-serif.
* **Body Font**: `"Plus Jakarta Sans"`, `"Inter"`, sans-serif.

### C. Custom Keyframe Animations (`src/index.css`)
* `animate-slide-progress`: 2.5s auto-slide timer indicator for the owner slider.
* `animate-whatsapp-float-vertical`: Subtle vertical bobbing animation for the floating WhatsApp button.
* `animate-dropdown`: Smooth scale & fade-in popover animation for dropdowns.
* `animate-fade-in-up`: Entrance transition for page views and cards.
* `marquee`: 30s infinite linear car showcase marquee.
* `stage-3d-perspective`: Perspective 1200px container for 3D card carousels.

---

## 👥 6. Key Personnel & Fleet Hosts

1. **Faizan Ahmad** (Founder & Operations Lead) — Specializes in 4x4 Thar, Scorpio-N & Jimny. Base Hub: Jasola / Okhla, South Delhi. Photo: `src/assets/owners/faizan.jpg`.
2. **Imran Malik** (Fleet Operations & Sanitization Lead) — Base Hub: Noida Sector 62/18. Photo: `src/assets/owners/imran.jpg`.
3. **Inzemam Ul Haq** (Executive & Outstation Host) — Base Hub: Central Delhi (Shaheen Bagh / NFC). Photo: `src/assets/owners/inzemam.jpg`.
4. **Rajesh Sharma**, **Sunil Verma**, **Gurpreet Singh**, **Vikram Rawat**, **Sandeep Tyagi**, **Manish Bhardwaj** (Verified NCR Partner Hosts).

---

## 🛠️ 7. Quick Developer Cheat-Sheet (How To Make Changes)

### 1. How to change the Owner's WhatsApp or Phone Number
* Open `src/config.ts` and update:
  ```ts
  export const OWNER_WHATSAPP_NUMBER = '918796178177'
  export const OWNER_PHONE_E164 = '+918796178177'
  ```

### 2. How to add or edit a car in the fleet catalog
* Open `src/data/cars.ts`.
* Import the car photo from `src/assets/cars/`.
* Add the car object into `export const cars: Car[] = [ ... ]` with unique `id`, `name`, `pricePerDay`, `seats`, `transmission`, `fuel`, `mileage`, and `images`.

### 3. How to change Google Sheet integration
* Open `src/lib/sheetAvailability.ts`.
* Update `SHEET_API_URL` to your new OpenSheet or SheetDB endpoint.

### 4. How to build and test
* Run dev server: `npm run dev` (Runs locally on `http://localhost:5173/`).
* Run full TypeScript & bundle build check: `npm run build` (`tsc -b && vite build`).

---

## 🌓 8. Theme System (Dark / Light Mode)

* **Context & Hook**: `src/context/ThemeContext.tsx` (`useTheme()`)
* **State Management**: `'light' | 'dark'`, persists in `localStorage` (`'cre_theme'`).
* **Auto-detection**: Automatically checks system preference `window.matchMedia('(prefers-color-scheme: dark)')` if no saved preference exists.
* **HTML Element Binding**: Adds or removes `.dark` class on `<html class="dark">` and updates `color-scheme` CSS property.
* **Tailwind v4 Integration**: Uses `@custom-variant dark (&:where(.dark, .dark *));` in `src/index.css`.
* **Navbar Controls**: Interactive Sun/Moon toggle button with rotation animations in both Desktop Navbar and Mobile Menu Drawer.

---

*Document created and audited for Car Rental Express codebase.*

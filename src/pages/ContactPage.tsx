import { useState } from 'react'
import { OWNER_PHONE_E164, OWNER_WHATSAPP_NUMBER } from '../config'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = `Hi, I'm ${name} (${email}). ${message}`
    const link = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(link, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const contactItems = [
    { icon: (<svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>),
      label: 'Phone', value: OWNER_PHONE_E164, href: `tel:${OWNER_PHONE_E164}`, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', border: 'border-emerald-200', valueColor: 'text-emerald-700' },
    { icon: (<svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>),
      label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi, I have a question`, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', border: 'border-orange-200', valueColor: 'text-orange-700' },
    { icon: (<svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>),
      label: 'Email', value: 'car24rentalexpress@gmail.com', href: 'mailto:car24rentalexpress@gmail.com', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-200', valueColor: 'text-blue-700' },
    { icon: (<svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
      label: 'Working Hours', value: 'Available 24×7', href: null, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', border: 'border-amber-200', valueColor: 'text-slate-900' },
  ]

  return (
    <div className="grid gap-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600 mb-4">
          Get in Touch
        </div>
        <h1 className="text-4xl font-black text-slate-900">Contact us</h1>
        <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
          Have a question about a car or booking? We're here to help. Reach out via WhatsApp for the fastest response.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact info */}
        <div className="grid gap-4 content-start">
          <div className="text-sm font-bold text-slate-900">Reach us directly</div>
          {contactItems.map((item) => (
            <div key={item.label} className={`flex items-center gap-4 rounded-2xl border ${item.border} bg-white p-5 shadow-sm`}>
              <div className={`grid size-12 shrink-0 place-items-center rounded-2xl ${item.iconBg} ${item.iconColor}`}>
                {item.icon}
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{item.label}</div>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className={`text-sm font-bold ${item.valueColor} hover:opacity-80 transition`}>
                    {item.value}
                  </a>
                ) : (
                  <div className={`text-sm font-bold ${item.valueColor}`}>{item.value}</div>
                )}
              </div>
            </div>
          ))}

          {/* FAQ */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mt-2">
            <div className="text-sm font-bold text-slate-900 mb-4">Frequently asked questions</div>
            <div className="grid gap-4">
              {[
                { q: 'Do I need to pay online?',           a: 'No. All payments are made directly to the car owner. No online payment required.' },
                { q: 'How quickly will the owner respond?', a: 'Most owners respond within 30 minutes on WhatsApp during working hours.' },
                { q: 'Can I cancel a booking?',            a: 'Yes. Contact the owner directly on WhatsApp to cancel or modify your booking.' },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="text-sm font-semibold text-slate-900 mb-1">{faq.q}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="grid size-16 place-items-center rounded-2xl bg-emerald-100 border border-emerald-200 text-3xl">✅</div>
              <div className="text-lg font-bold text-slate-900">Message sent!</div>
              <div className="text-sm text-slate-500">Your message has been sent via WhatsApp. The owner will respond shortly.</div>
              <button onClick={() => setSent(false)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="text-sm font-bold text-slate-900 mb-1">Send us a message</div>
              <div className="text-xs text-slate-400 mb-6">We'll reply via WhatsApp</div>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold text-slate-600">Your name</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahul Sharma"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-300 transition" />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold text-slate-600">Email address</span>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="rahul@example.com"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-300 transition" />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold text-slate-600">Message</span>
                  <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="I'd like to know more about..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-300 transition resize-none" />
                </label>
                <button type="submit"
                  className="h-11 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:opacity-90 transition flex items-center justify-center gap-2">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </button>
                <div className="text-xs text-slate-400 text-center">Clicking send will open WhatsApp with your message pre-filled.</div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

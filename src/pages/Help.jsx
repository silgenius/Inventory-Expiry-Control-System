import { useState } from 'react'
import { ChevronDown, LifeBuoy, Mail } from 'lucide-react'

const FAQS = [
  {
    question: 'How do I add a product?',
    answer:
      'Go to Products and select Add Product, or use the Add Product quick action on the Dashboard. Fill in the product name, category, batch number, quantity, purchase date and expiry date, then save.'
  },
  {
    question: 'How is expiry status calculated?',
    answer:
      'Status is calculated automatically from each product\u2019s expiry date compared to today. More than 30 days remaining is Safe, 8\u201330 days is Warning, 1\u20137 days is Expiring Soon, 0 days is Expires Today, and any date in the past is Expired.'
  },
  {
    question: 'How do I edit a product?',
    answer:
      'Open the product from Products or Expiry Monitor, then select Edit Product. Update the fields you need and save your changes.'
  },
  {
    question: 'How do I view expired products?',
    answer:
      'Visit Expiry Monitor and select the Expired tab, or use the View Expired Products quick action on the Dashboard.'
  },
  {
    question: 'How do I configure warning periods?',
    answer:
      'Open Settings and adjust the Warning Period and Critical Period values under Expiry Settings to match how far in advance you want to be alerted.'
  }
]

export default function Help() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Help</h2>
        <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Answers to common questions about IECS.</p>
      </div>

      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Frequently Asked Questions</h3>
        <div className="mt-3 divide-y divide-navy-100 dark:divide-navy-700">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-3.5 text-left text-sm font-medium text-navy-800 dark:text-navy-100"
                >
                  {faq.question}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-navy-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="pb-4 text-sm text-navy-500 dark:text-navy-400">{faq.answer}</p>}
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
            <LifeBuoy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Need more help?</h3>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
              This prototype does not yet include live support. Once the backend is connected, a support channel
              can be added here.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-navy-600 dark:text-navy-300">
              <Mail className="h-4 w-4" /> support@iecs-placeholder.com
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

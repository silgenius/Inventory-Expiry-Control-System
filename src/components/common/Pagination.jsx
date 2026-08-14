import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((page) => {
    return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  })

  return (
    <nav className="flex items-center justify-between gap-4 border-t border-navy-100 px-1 pt-4 dark:border-navy-700" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-navy-500 hover:bg-navy-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-navy-300 dark:hover:bg-navy-700"
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          const previous = pages[index - 1]
          const showEllipsis = previous && page - previous > 1
          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-navy-300">…</span>}
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-emerald-600 text-white'
                    : 'text-navy-500 hover:bg-navy-100 dark:text-navy-300 dark:hover:bg-navy-700'
                }`}
              >
                {page}
              </button>
            </span>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-navy-500 hover:bg-navy-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-navy-300 dark:hover:bg-navy-700"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

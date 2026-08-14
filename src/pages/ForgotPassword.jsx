import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Boxes, Mail, CheckCircle2 } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import * as authService from '../services/authService'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Business email is required.')
      return
    }
    setIsSubmitting(true)
    try {
      await authService.requestPasswordReset(email)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50/50 px-4 py-10 dark:bg-navy-900">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Boxes className="h-6 w-6" strokeWidth={2.25} />
          </div>
          <h1 className="text-xl font-bold text-navy-900 dark:text-navy-50">Forgot Your Password?</h1>
          <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">Enter your business email to continue.</p>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="text-sm font-semibold text-navy-900 dark:text-navy-50">Request received</h2>
              <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
                Check your email for a link to reset your password.
              </p>
              <Link to="/login" className="mt-5 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                  {error}
                </div>
              )}
              <Input
                label="Business Email"
                type="email"
                icon={Mail}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@business.com"
                required
              />
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Continue
              </Button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-navy-500 dark:text-navy-400">
          Remembered your password?{' '}
          <Link to="/login" className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

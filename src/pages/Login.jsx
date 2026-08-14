import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import AuthHero from '../components/common/AuthHero'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setIsSubmitting(true)
    try {
      await login(email, password)
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-50/50 dark:bg-navy-900 sm:flex sm:items-center sm:justify-center sm:py-10">
      <div className="sm:w-full sm:max-w-md">
        <AuthHero
          eyebrow="IECS"
          title="Welcome back"
          subtitle="Sign in to your inventory expiry control system."
        />

        <div className="relative z-10 -mt-8 px-4 sm:mt-0 sm:px-0">
          <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-popover dark:border-navy-700 dark:bg-navy-800 sm:rounded-2xl sm:shadow-card">
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <Input
                label="Email"
                type="email"
                icon={Mail}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@business.com"
                autoComplete="username"
                required
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-[38px] text-navy-400 hover:text-navy-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-navy-600 dark:text-navy-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-navy-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
                Sign In
              </Button>
            </form>
          </div>

          <p className="mt-6 pb-8 text-center text-sm text-navy-500 dark:text-navy-400 sm:pb-0">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

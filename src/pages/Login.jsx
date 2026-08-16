import {
  BellRing,
  Boxes,
  CalendarClock,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PackageSearch,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setIsSubmitting(true);
    try {
      await login(email, password);
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-50/50 dark:bg-navy-900 lg:flex">
      {/* Left branding panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
            <Boxes className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <span className="text-lg font-bold">IECS</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight">Welcome back</h2>
          <p className="mt-4 max-w-sm text-navy-200">
            Sign in to keep your inventory ahead of expiry.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3.5 backdrop-blur">
              <PackageSearch className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-navy-100">
                Track every product batch in one place
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3.5 backdrop-blur">
              <CalendarClock className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-navy-100">
                Monitor days remaining before expiry
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3.5 backdrop-blur">
              <BellRing className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-navy-100">
                Get alerted before it's too late
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-navy-400">
          © {new Date().getFullYear()} IECS. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-8 lg:py-10">
        <div className="lg:w-full lg:max-w-md">
          {/* Mobile-only header */}
          <div className="px-4 pt-10 text-center lg:hidden">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
              <Boxes className="h-6 w-6 text-white" strokeWidth={2.25} />
            </div>
            <h1 className="mt-4 text-xl font-bold text-navy-900 dark:text-navy-50">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
              Sign in to your inventory expiry control system.
            </p>
          </div>

          <div className="relative z-10 mt-6 px-4 pb-10 lg:mt-0 lg:px-0 lg:pb-0">
            <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-popover dark:border-navy-700 dark:bg-navy-800 sm:p-7 lg:rounded-2xl lg:shadow-card">
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-navy-900 dark:text-navy-50">
                  Sign In
                </h1>
                <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
                  Enter your details to access your dashboard.
                </p>
              </div>

              {error && (
                <div className="mb-5 mt-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300 lg:mt-5">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-2 space-y-4 lg:mt-6"
              >
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
                    type={showPassword ? "text" : "password"}
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-[38px] text-navy-400 hover:text-navy-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
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
                  <Link
                    to="/forgot-password"
                    className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  Sign In
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-navy-500 dark:text-navy-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  ArrowRight,
  BarChart3,
  BellRing,
  Boxes,
  CalendarClock,
  CheckCircle2,
  PackageSearch,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: PackageSearch,
    title: "Product & Batch Tracking",
    description:
      "Register products and track every batch separately, so restocked items with different expiry dates never get mixed up.",
  },
  {
    icon: CalendarClock,
    title: "Real-Time Expiry Monitoring",
    description:
      "Instantly see what\u2019s safe, approaching expiry, or already expired \u2014 no manual date-checking required.",
  },
  {
    icon: BellRing,
    title: "Automatic Alerts",
    description:
      "Get notified the moment a product enters a warning window, updating live without refreshing the page.",
  },
  {
    icon: BarChart3,
    title: "Reports & Insights",
    description:
      "Visual breakdowns by category and expiry status, printable for stocktaking and audits.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Every business\u2019s inventory is fully isolated and protected \u2014 no one can see or touch data that isn\u2019t theirs.",
  },
  {
    icon: Users,
    title: "Built for Any Business",
    description:
      "Pharmacies, supermarkets, warehouses, and more \u2014 anywhere inventory has a shelf life.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Create your business account",
    description: "Sign up in minutes and verify your email.",
  },
  {
    step: "2",
    title: "Add your products",
    description: "Register products and log each batch with its expiry date.",
  },
  {
    step: "3",
    title: "Stay ahead of expiry",
    description: "Get alerts and dashboards that keep you in control.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-navy-100 bg-white/90 backdrop-blur dark:border-navy-700 dark:bg-navy-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
              <Boxes className="h-5 w-5 text-white" strokeWidth={2.25} />
            </div>
            <span className="text-lg font-bold text-navy-900 dark:text-navy-50">
              IECS
            </span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-800"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
            >
              Create Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #10b981 0, transparent 40%), radial-gradient(circle at 80% 60%, #10b981 0, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              Inventory Expiry Control System
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Never let a product expire on your shelf again
            </h1>
            <p className="mt-5 text-base text-navy-200 sm:text-lg">
              IECS helps businesses track inventory batches, monitor expiry
              dates in real time, and get alerted before stock goes to waste.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 sm:w-auto"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-xl border border-navy-600 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 sm:w-auto"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-50 sm:text-3xl">
            Everything you need to manage inventory expiry
          </h2>
          <p className="mt-3 text-sm text-navy-500 dark:text-navy-400 sm:text-base">
            Built to solve one problem well: knowing what's about to expire,
            before it's too late.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950">
                <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy-900 dark:text-navy-50">
                {title}
              </h3>
              <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-50/60 py-16 dark:bg-navy-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-navy-50 sm:text-3xl">
              How it works
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {step}
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-900 dark:text-navy-50">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-3xl bg-navy-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to take control of your inventory?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-navy-200 sm:text-base">
            Create your business account today and start tracking expiry dates
            in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/signup"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 sm:w-auto"
            >
              Create Account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border border-navy-600 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Academic attribution */}
      <section className="border-t border-navy-100 py-10 dark:border-navy-700">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 dark:bg-navy-800">
            <CheckCircle2 className="h-5 w-5 text-navy-500 dark:text-navy-300" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-navy-500 dark:text-navy-400">
            This Inventory Expiry Control System was developed by{" "}
            <span className="font-semibold text-navy-800 dark:text-navy-100">
              Adewuyi Aliyah Sijuade (2460113317)
            </span>{" "}
            as a final year project submitted in partial fulfillment of the
            requirements for the award of National Diploma (ND) in Computer
            Science at Federal Polytechnic Ilaro.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-100 bg-navy-50/60 py-6 dark:border-navy-700 dark:bg-navy-900/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500">
              <Boxes className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-navy-800 dark:text-navy-100">
              IECS
            </span>
          </div>
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} IECS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

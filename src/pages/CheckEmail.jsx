import { MailCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthHero from "../components/common/AuthHero";
import Button from "../components/common/Button";

export default function CheckEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="min-h-screen bg-navy-50/50 dark:bg-navy-900 sm:flex sm:items-center sm:justify-center sm:py-10">
      <div className="sm:w-full sm:max-w-md">
        <AuthHero
          eyebrow="IECS"
          title="Check your email"
          subtitle="We've sent a verification link to your inbox."
        />
        <div className="relative z-10 -mt-8 px-4 sm:mt-0 sm:px-0">
          <div className="rounded-3xl border border-navy-100 bg-white p-6 text-center shadow-popover dark:border-navy-700 dark:bg-navy-800 sm:rounded-2xl sm:shadow-card">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
              <MailCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mt-4 text-sm text-navy-600 dark:text-navy-300">
              {email ? (
                <>
                  We sent a verification link to{" "}
                  <span className="font-medium text-navy-800 dark:text-navy-100">
                    {email}
                  </span>
                  .
                </>
              ) : (
                "We sent a verification link to your email address."
              )}{" "}
              Click the link to activate your account, then sign in.
            </p>
            <p className="mt-2 text-xs text-navy-400">
              Didn&apos;t get it? Check your spam folder.
            </p>
            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  BellRing,
  Boxes,
  CalendarClock,
  Check,
  Eye,
  EyeOff,
  PackageSearch,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHero from "../components/common/AuthHero";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import { useAuth } from "../hooks/useAuth";

const BUSINESS_TYPES = [
  "Pharmacy",
  "Supermarket",
  "Provision Store",
  "Warehouse",
  "Retail Store",
  "Food Business",
  "Cosmetics",
  "Other",
].map((type) => ({ value: type, label: type }));

const initialValues = {
  businessName: "",
  businessType: "",
  businessAddress: "",
  businessPhone: "",
  administratorName: "",
  businessEmail: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

function PasswordRequirement({ met, label }) {
  return (
    <li
      className={`flex items-center gap-1.5 text-xs ${met ? "text-emerald-600" : "text-navy-400"}`}
    >
      <Check className={`h-3.5 w-3.5 ${met ? "opacity-100" : "opacity-30"}`} />
      {label}
    </li>
  );
}

function FormSection({ step, title, children }) {
  return (
    <div className="rounded-2xl bg-navy-50/60 p-4 dark:bg-navy-900/40 sm:bg-transparent sm:p-0">
      <div className="mb-3 flex items-center gap-2 sm:mb-3">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white sm:hidden">
          {step}
        </span>
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">
          {title}
        </h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const passwordChecks = {
    length: values.password.length >= 8,
    number: /\d/.test(values.password),
    uppercase: /[A-Z]/.test(values.password),
  };

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const nextErrors = {};
    if (!values.businessName.trim())
      nextErrors.businessName = "Business name is required.";
    if (!values.businessAddress.trim())
      nextErrors.businessAddress = "Business address is required.";
    if (!values.businessEmail.trim()) {
      nextErrors.businessEmail = "Business email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.businessEmail)) {
      nextErrors.businessEmail = "Enter a valid email address.";
    }
    if (
      !passwordChecks.length ||
      !passwordChecks.number ||
      !passwordChecks.uppercase
    ) {
      nextErrors.password = "Password does not meet all requirements.";
    }
    if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    if (!values.agreeToTerms) {
      nextErrors.agreeToTerms =
        "You must agree to the Terms of Service and Privacy Policy.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await signup(values);
      setShowSuccess(true);
      navigate("/check-email", { state: { email: values.businessEmail } });
    } catch (err) {
      setFormError(err.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-50/50 dark:bg-navy-900 lg:flex">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
            <Boxes className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <span className="text-lg font-bold">IECS</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Inventory Expiry Control System
          </h2>
          <p className="mt-4 max-w-sm text-navy-200">
            Stay ahead of product expiry and protect your inventory.
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

      <div className="lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-8 lg:py-10">
        <div className="lg:w-full lg:max-w-lg">
          <div className="lg:hidden">
            <AuthHero
              eyebrow="IECS"
              title="Create your business account"
              subtitle="Set up your inventory expiry control account to get started."
              compact
            />
          </div>

          <div className="relative z-10 -mt-8 px-4 pb-10 lg:mt-0 lg:px-0 lg:pb-0">
            <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-popover dark:border-navy-700 dark:bg-navy-800 sm:p-6 lg:rounded-2xl lg:border lg:shadow-card">
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-navy-900 dark:text-navy-50">
                  Create Your Business Account
                </h1>
                <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
                  Set up your inventory expiry control account to get started.
                </p>
              </div>

              {formError && (
                <div className="mb-5 mt-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300 lg:mt-5">
                  {formError}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-2 space-y-5 lg:mt-6"
              >
                <FormSection step={1} title="Business details">
                  <Input
                    label="Business Name"
                    value={values.businessName}
                    onChange={(event) =>
                      update("businessName", event.target.value)
                    }
                    error={errors.businessName}
                    required
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                      label="Business Type"
                      placeholder="Select type"
                      options={BUSINESS_TYPES}
                      value={values.businessType}
                      onChange={(event) =>
                        update("businessType", event.target.value)
                      }
                    />
                    <Input
                      label="Business Phone Number"
                      type="tel"
                      value={values.businessPhone}
                      onChange={(event) =>
                        update("businessPhone", event.target.value)
                      }
                    />
                  </div>
                  <Input
                    label="Business Address"
                    value={values.businessAddress}
                    onChange={(event) =>
                      update("businessAddress", event.target.value)
                    }
                    error={errors.businessAddress}
                    required
                  />
                  <Input
                    label="Owner / Administrator Name"
                    value={values.administratorName}
                    onChange={(event) =>
                      update("administratorName", event.target.value)
                    }
                  />
                </FormSection>

                <FormSection step={2} title="Sign-in details">
                  <Input
                    label="Business Email"
                    type="email"
                    value={values.businessEmail}
                    onChange={(event) =>
                      update("businessEmail", event.target.value)
                    }
                    error={errors.businessEmail}
                    required
                  />

                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={(event) =>
                        update("password", event.target.value)
                      }
                      error={errors.password}
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
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      <PasswordRequirement
                        met={passwordChecks.length}
                        label="Minimum 8 characters"
                      />
                      <PasswordRequirement
                        met={passwordChecks.number}
                        label="At least one number"
                      />
                      <PasswordRequirement
                        met={passwordChecks.uppercase}
                        label="At least one uppercase letter"
                      />
                    </ul>
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={(event) =>
                        update("confirmPassword", event.target.value)
                      }
                      error={errors.confirmPassword}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-[38px] text-navy-400 hover:text-navy-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormSection>

                <div>
                  <label className="flex items-start gap-2.5 text-sm text-navy-600 dark:text-navy-300">
                    <input
                      type="checkbox"
                      checked={values.agreeToTerms}
                      onChange={(event) =>
                        update("agreeToTerms", event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 rounded border-navy-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  Create Business Account
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-navy-500 dark:text-navy-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        onClose={() => navigate("/login")}
        title="Account created successfully!"
        footer={
          <Button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto"
          >
            Continue to Login
          </Button>
        }
      >
        Welcome to IECS. Your business account has been created. Sign in to
        explore your dashboard.
      </Modal>
    </div>
  );
}

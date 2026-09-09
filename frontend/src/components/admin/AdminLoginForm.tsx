"use client";

import { FormEvent, useState } from "react";
import {
  AlertCircle,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { loginAdmin, saveAdminToken } from "@/lib/admin-api";

export default function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const result = await loginAdmin(
        email.trim().toLowerCase(),
        password
      );

      saveAdminToken(result.access_token);
      router.replace("/admin/dashboard");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to sign in."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="adminLoginForm" onSubmit={handleSubmit}>
      <div className="adminLoginIcon">
        <LockKeyhole size={30} aria-hidden="true" />
      </div>

      <div>
        <p className="tag">SECURE ACCESS</p>
        <h1>Admin Login</h1>

        <p className="adminLoginDescription">
          Sign in to manage Glexa Digital inquiries, quotations and job
          applications.
        </p>
      </div>

      <label>
        Admin Email

        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="admin@example.com"
          autoComplete="email"
          required
        />
      </label>

      <label>
        Password

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
          minLength={8}
          maxLength={72}
          required
        />
      </label>

      <label className="showPasswordOption">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(event) => setShowPassword(event.target.checked)}
        />

        <span>Show password</span>
      </label>

      {error && (
        <div className="formError" role="alert">
          <AlertCircle size={20} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="primaryButton adminLoginButton"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle
              className="loadingSpinner"
              size={18}
              aria-hidden="true"
            />
            <span>Signing In...</span>
          </>
        ) : (
          <span>Sign In to Dashboard</span>
        )}
      </button>
    </form>
  );
}
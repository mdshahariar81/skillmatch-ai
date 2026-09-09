"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  // Form input values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state for loading and error/success messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    // Creates the browser-side Supabase client.
    // This connects the frontend to our Supabase project.
    const supabase = createClient();

    // FRONTEND → SUPABASE AUTH
    // The backend/auth system will receive the user's email/password.
    // full_name is stored in Supabase user metadata.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If email verification is enabled in Supabase,
    // the user will receive a verification email.
    setMessage(
      "Account created successfully. Please check your email if verification is required."
    );

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Project branding */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold">
            SkillMatch AI
          </Link>

          <h1 className="mt-8 text-3xl font-bold tracking-tight">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Start discovering your career path.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Error message from Supabase Auth */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Successful signup message */}
            {message && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Link to existing login page */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
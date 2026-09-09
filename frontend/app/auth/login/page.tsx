"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  // Stores the values entered by the user in the login form.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Controls loading state and displays authentication errors.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // Creates the browser-side Supabase client.
    // This connects the frontend to Supabase Auth.
    const supabase = createClient();

    // FRONTEND → SUPABASE AUTH
    // Supabase securely handles password authentication.
    // We NEVER store or send the user's password to our own database.
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Show a user-friendly authentication error.
      setError(error.message);
      setLoading(false);
      return;
    }

    // BACKEND / AUTH INTEGRATION:
    // After successful authentication, Supabase creates the user session.
    // Later, the protected dashboard will use this session to identify
    // the authenticated user and request only their own data.
    //
    // For now we return the user to the main landing page.
    window.location.href = "/";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">

        {/* SkillMatch AI branding */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold">
            SkillMatch AI
          </Link>

          <h1 className="mt-8 text-3xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue your career journey.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email input */}
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
                autoComplete="email"
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Authentication error */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Link to signup */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
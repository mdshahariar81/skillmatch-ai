"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  History,
  UserRound,
  Sparkles,
  LogOut,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type UserInfo = {
  email?: string;
  fullName?: string;
};

function getInitials(name?: string, email?: string) {
  const value = name?.trim();

  if (value) {
    const parts = value.split(/\s+/);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }

    return value.slice(0, 2).toUpperCase();
  }

  if (email) {
    return email.slice(0, 2).toUpperCase();
  }

  return "U";
}

export default function Header() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser({
          email: user.email,
          fullName: user.user_metadata?.full_name,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user;

      if (currentUser) {
        setUser({
          email: currentUser.email,
          fullName: currentUser.user_metadata?.full_name,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    setMenuOpen(false);
    setUser(null);

    window.location.href = "/";
  };

  const initials = getInitials(user?.fullName, user?.email);

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* =========================================================
            SkillMatch AI Logo
            ========================================================= */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>

          <span className="text-base font-semibold text-foreground">
            SkillMatch AI
          </span>
        </Link>

        {/* =========================================================
            Navigation
            ========================================================= */}
        <nav className="flex items-center gap-2">

          {/* History */}
          <Link
            href="/history"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            <History className="h-4 w-4" />
            <span>History</span>
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            About
          </Link>

          {/* =======================================================
              Authentication
              ======================================================= */}

          {!loading && !user && (
            <Link
              href="/auth/login"
              className="ml-1 flex items-center gap-2 rounded-xl border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <UserRound className="h-4 w-4" />
              <span>Sign in</span>
            </Link>
          )}

          {!loading && user && (
            <div className="relative ml-1">

              {/* User Avatar */}
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Open account menu"
                aria-expanded={menuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/10 transition hover:bg-primary/15"
              >
                {initials}
              </button>

              {/* Account Menu */}
              {menuOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border bg-background p-2 shadow-lg">

                  {/* User information */}
                  <div className="rounded-xl px-3 py-3">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user.fullName || "SkillMatch User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="my-1 h-px bg-border" />

                  {/* Sign out */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
import Link from "next/link";
import {
  History,
  UserRound,
  Sparkles,
} from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* =========================================================
            SkillMatch AI Logo
            ---------------------------------------------------------
            This is currently a frontend-only logo.

            BACKEND HANDOFF:
            No backend/API connection is required here.
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
            ---------------------------------------------------------
            History:
            Later this page will show the authenticated user's
            previous CV analyses.

            BACKEND HANDOFF:
            Friend will connect this route to:
              GET /api/history

            IMPORTANT:
            History must only return data belonging to the
            currently authenticated user.
            ========================================================= */}
        <nav className="flex items-center gap-2">
          <Link
            href="/history"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            <History className="h-4 w-4" />
            <span>History</span>
          </Link>

          {/* =======================================================
              About page
              -------------------------------------------------------
              Frontend-only informational page for now.
              No backend connection required.
              ======================================================= */}
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            About
          </Link>

          {/* =======================================================
              Authentication button
              -------------------------------------------------------
              CURRENT:
              Always shows "Sign in".

              BACKEND HANDOFF:
              After Supabase Auth is connected, this section should
              become dynamic:

                Logged out  → Sign in
                Logged in   → User avatar / profile menu

              The frontend should NEVER receive or display the
              user's password.

              Friend should use Supabase Auth session to determine
              whether the user is authenticated.
              ======================================================= */}
          <Link
            href="/auth/login"
            className="ml-1 flex items-center gap-2 rounded-xl border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <UserRound className="h-4 w-4" />
            <span>Sign in</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
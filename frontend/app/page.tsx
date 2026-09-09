"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Header from "@/components/layout/Header";
import AnalysisDashboard from "@/components/dashboard/AnalysisDashboard";
import CVUpload from "@/components/upload/CVUpload";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =========================================================
          HEADER
          ========================================================= */}

      <Header />

      {/* =========================================================
          HERO SECTION
          ========================================================= */}

      <section className="relative overflow-hidden">
        {/* Soft background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          {/* =====================================================
              LEFT SIDE
              ===================================================== */}

          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-bold tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI POWERED CAREER INSIGHTS
            </div>

            {/* Main heading */}
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Know your skills.
              <br />

              <span className="skillmatch-gradient">
                Find your path.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Turn your CV into clear career insights, discover your skill
              gaps, and build a personalized roadmap toward your dream job.
            </p>

            {/* Benefits */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Benefit
                icon={<Sparkles className="h-4 w-4" />}
                title="AI Analysis"
              />

              <Benefit
                icon={<ArrowRight className="h-4 w-4" />}
                title="Career Insights"
              />

              <Benefit
                icon={<Lock className="h-4 w-4" />}
                title="100% Private"
              />
            </div>
          </div>

          {/* =====================================================
              CV UPLOAD COMPONENT
              ===================================================== */}

          <div className="w-full">
            <CVUpload />
          </div>
        </div>
      </section>

      {/* =========================================================
          ANALYSIS DASHBOARD
          =========================================================
          
          CURRENT:
          Demo data for UI development.

          FUTURE:
          This will receive real analysis data from the backend.
          ========================================================= */}

      <AnalysisDashboard />

      {/* =========================================================
          TRUST / ABOUT SECTION
          ========================================================= */}

      <section
        id="about"
        className="border-t border-border/70 bg-card/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <TrustItem
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Private by design"
              description="Your CV and career data are designed to remain accessible only to the authorized user."
            />

            <TrustItem
              icon={<Sparkles className="h-5 w-5" />}
              title="Actionable insights"
              description="Understand your existing skills, career matches, and the areas you should improve."
            />

            <TrustItem
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Personal roadmap"
              description="Move from your current skills toward your target role with a practical learning path."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <p className="text-sm font-bold text-foreground">
              SkillMatch AI
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Find the gap. Build the path.
            </p>
          </div>

          {/* Developer links */}
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/team/shahariar"
              className="cursor-pointer font-semibold text-foreground transition-colors duration-200 hover:text-primary"
            >
              Frontend Developer
            </Link>

            <Link
              href="/team/sujoypal"
              className="cursor-pointer font-semibold text-foreground transition-colors duration-200 hover:text-primary"
            >
              Backend Developer
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ===============================================================
   BENEFIT COMPONENT
   =============================================================== */

function Benefit({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>

      <span>{title}</span>
    </div>
  );
}

/* ===============================================================
   TRUST ITEM COMPONENT
   =============================================================== */

function TrustItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-base font-bold text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
"use client";

import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Analysis = {
  id: number;
  fileName: string;
  date: string;
  time: string;
  skills: number;
  matches: number;
  topMatch: string;
  score: number;
  status: "Completed" | "Processing" | "Failed";
};

const analyses: Analysis[] = [
  {
    id: 1,
    fileName: "My CV.pdf",
    date: "Sep 10, 2026",
    time: "10:42 AM",
    skills: 18,
    matches: 5,
    topMatch: "AI Engineer",
    score: 88,
    status: "Completed",
  },
  {
    id: 2,
    fileName: "Data Analyst CV.pdf",
    date: "Sep 02, 2026",
    time: "03:18 PM",
    skills: 15,
    matches: 3,
    topMatch: "Data Analyst",
    score: 82,
    status: "Completed",
  },
  {
    id: 3,
    fileName: "Frontend Developer.pdf",
    date: "Aug 28, 2026",
    time: "11:25 AM",
    skills: 14,
    matches: 4,
    topMatch: "Frontend Developer",
    score: 86,
    status: "Completed",
  },
  {
    id: 4,
    fileName: "ML Resume.pdf",
    date: "Aug 15, 2026",
    time: "09:12 AM",
    skills: 20,
    matches: 6,
    topMatch: "ML Engineer",
    score: 79,
    status: "Completed",
  },
  {
    id: 5,
    fileName: "Software Engineer CV.pdf",
    date: "Aug 05, 2026",
    time: "04:37 PM",
    skills: 17,
    matches: 5,
    topMatch: "Software Engineer",
    score: 81,
    status: "Completed",
  },
];

function StatusBadge({ status }: { status: Analysis["status"] }) {
  if (status === "Processing") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
        Processing
      </span>
    );
  }

  if (status === "Failed") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive">
        Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Completed
    </span>
  );
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.fileName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Analysis History
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Review your previous CV analyses and career insights.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Private & Secure
          </div>
        </div>

        {/* =====================================================
            SUMMARY CARDS
            ===================================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Analyses
                </p>

                <p className="mt-2 text-2xl font-extrabold">
                  {analyses.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Latest Match
                </p>

                <p className="mt-2 text-2xl font-extrabold">88%</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Target className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Skills Detected
                </p>

                <p className="mt-2 text-2xl font-extrabold">18</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SEARCH
            ===================================================== */}

        <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your CV analyses..."
              className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* =====================================================
            ANALYSIS LIST
            ===================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

          {/* Section Header */}

          <div className="border-b border-border px-5 py-4">
            <h2 className="font-bold">Previous Analyses</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Your recent CV analysis activity.
            </p>
          </div>

          {/* Desktop Column Header */}

          <div className="hidden border-b border-border bg-muted/20 px-5 py-3 lg:grid lg:grid-cols-[minmax(260px,1fr)_70px_80px_minmax(150px,180px)_70px_110px_40px] lg:items-center lg:gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              CV
            </span>

            <span className="text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Skills
            </span>

            <span className="text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Matches
            </span>

            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Top Match
            </span>

            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Score
            </span>

            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Status
            </span>

            <span />
          </div>

          {/* Analysis Rows */}

          <div className="divide-y divide-border">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="group grid gap-5 px-5 py-5 transition hover:bg-muted/30 lg:grid-cols-[minmax(260px,1fr)_70px_80px_minmax(150px,180px)_70px_110px_40px] lg:items-center lg:gap-4"
                >
                  {/* ==================================================
                      CV FILE
                      ================================================== */}

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {analysis.fileName}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {analysis.date}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {analysis.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                      SKILLS
                      ================================================== */}

                  <div className="flex items-center justify-between lg:block lg:text-center">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                      Skills
                    </span>

                    <p className="text-sm font-bold">
                      {analysis.skills}
                    </p>
                  </div>

                  {/* ==================================================
                      MATCHES
                      ================================================== */}

                  <div className="flex items-center justify-between lg:block lg:text-center">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                      Matches
                    </span>

                    <p className="text-sm font-bold">
                      {analysis.matches}
                    </p>
                  </div>

                  {/* ==================================================
                      TOP MATCH
                      ================================================== */}

                  <div className="flex min-w-0 items-center justify-between gap-4 lg:block">
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                      Top Match
                    </span>

                    <p
                      className="truncate text-sm font-bold lg:mt-1"
                      title={analysis.topMatch}
                    >
                      {analysis.topMatch}
                    </p>
                  </div>

                  {/* ==================================================
                      SCORE
                      ================================================== */}

                  <div className="flex items-center justify-between lg:block">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                      Score
                    </span>

                    <p className="text-lg font-extrabold text-primary">
                      {analysis.score}%
                    </p>
                  </div>

                  {/* ==================================================
                      STATUS
                      ================================================== */}

                  <div className="flex items-center justify-between lg:block">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                      Status
                    </span>

                    <StatusBadge status={analysis.status} />
                  </div>

                  {/* ==================================================
                      VIEW
                      ================================================== */}

                  <button
                    type="button"
                    aria-label={`View ${analysis.fileName}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              /* ==================================================
                 EMPTY SEARCH STATE
                 ================================================== */

              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Search className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-bold">
                  No analyses found
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Try searching with a different CV name.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            PRIVACY INFORMATION
            ===================================================== */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-bold">
              Your analysis data is private
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your CVs and career analysis are linked to your account and
              should only be accessible to you. Backend authorization will
              enforce this when the API is connected.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
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
import { useEffect, useState } from "react";

import { getAnalysisHistory } from "@/lib/api";

type HistoryItem = {
  analysisId: string;
  status: "pending" | "processing" | "completed" | "failed";
  resumeFileName: string;
  createdAt: string;
  overallScore: number | null;
  topJobMatch: { title: string; score: number } | null;
};

function StatusBadge({ status }: { status: HistoryItem["status"] }) {
  if (status === "processing" || status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
        Processing
      </span>
    );
  }

  if (status === "failed") {
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

function formatDate(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      setIsLoading(true);
      setLoadError("");

      const result = await getAnalysisHistory();

      if (result.error) {
        setLoadError(result.error.message);
      } else if (result.data?.history) {
        setHistory(result.data.history);
      }

      setIsLoading(false);
    }

    loadHistory();
  }, []);

  const filteredAnalyses = history.filter((item) =>
    item.resumeFileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const latestMatchScore = history[0]?.topJobMatch?.score ?? null;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}
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

        {/* SUMMARY CARDS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Analyses
                </p>
                <p className="mt-2 text-2xl font-extrabold">{history.length}</p>
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
                <p className="mt-2 text-2xl font-extrabold">
                  {latestMatchScore !== null ? `${latestMatchScore}%` : "—"}
                </p>
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
                  Analyses Completed
                </p>
                <p className="mt-2 text-2xl font-extrabold">
                  {history.filter((h) => h.status === "completed").length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
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

        {/* ANALYSIS LIST */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-bold">Previous Analyses</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Your recent CV analysis activity.
            </p>
          </div>

          <div className="hidden border-b border-border bg-muted/20 px-5 py-3 lg:grid lg:grid-cols-[minmax(260px,1fr)_minmax(150px,180px)_70px_110px_40px] lg:items-center lg:gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              CV
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

          <div className="divide-y divide-border">
            {isLoading ? (
              <div className="px-5 py-16 text-center text-sm text-muted-foreground">
                Loading your history...
              </div>
            ) : loadError ? (
              <div className="px-5 py-16 text-center text-sm text-destructive">
                {loadError}
              </div>
            ) : filteredAnalyses.length > 0 ? (
              filteredAnalyses.map((item) => {
                const { date, time } = formatDate(item.createdAt);
                return (
                  <div
                    key={item.analysisId}
                    className="group grid gap-5 px-5 py-5 transition hover:bg-muted/30 lg:grid-cols-[minmax(260px,1fr)_minmax(150px,180px)_70px_110px_40px] lg:items-center lg:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {item.resumeFileName}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            {time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center justify-between gap-4 lg:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                        Top Match
                      </span>
                      <p className="truncate text-sm font-bold lg:mt-1">
                        {item.topJobMatch?.title ?? "—"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between lg:block">
                      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                        Score
                      </span>
                      <p className="text-lg font-extrabold text-primary">
                        {item.topJobMatch ? `${item.topJobMatch.score}%` : "—"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between lg:block">
                      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground lg:hidden">
                        Status
                      </span>
                      <StatusBadge status={item.status} />
                    </div>

                    <button
                      type="button"
                      aria-label={`View ${item.resumeFileName}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border transition hover:border-primary/30 hover:bg-primary/5"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold">No analyses found</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {searchQuery
                    ? "Try searching with a different CV name."
                    : "Upload a CV from the home page to get started."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* PRIVACY INFORMATION */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-bold">Your analysis data is private</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your CVs and career analysis are linked to your account and are
              only accessible to you, enforced by database-level security.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
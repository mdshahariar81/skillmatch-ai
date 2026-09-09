"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Mail,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "128",
    change: "+12.5%",
    icon: Users,
  },
  {
    label: "CV Uploads",
    value: "94",
    change: "+8.2%",
    icon: FileText,
  },
  {
    label: "Analyses",
    value: "81",
    change: "+14.7%",
    icon: BarChart3,
  },
  {
    label: "Team Inquiries",
    value: "12",
    change: "+4.3%",
    icon: Mail,
  },
];

const recentUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    date: "Sep 10, 2026",
    status: "Active",
  },
  {
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    date: "Sep 10, 2026",
    status: "Active",
  },
  {
    name: "Michael Chen",
    email: "michael@example.com",
    date: "Sep 09, 2026",
    status: "Active",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    date: "Sep 08, 2026",
    status: "Active",
  },
];

const recentAnalyses = [
  {
    user: "John Doe",
    cv: "Software Engineer CV.pdf",
    result: "5 job matches",
    date: "2 hours ago",
  },
  {
    user: "Sarah Ahmed",
    cv: "Data Analyst CV.pdf",
    result: "4 job matches",
    date: "5 hours ago",
  },
  {
    user: "Michael Chen",
    cv: "AI Engineer CV.pdf",
    result: "6 job matches",
    date: "Yesterday",
  },
  {
    user: "Emma Wilson",
    cv: "Frontend CV.pdf",
    result: "3 job matches",
    date: "Yesterday",
  },
];

const inquiries = [
  {
    name: "Alex Morgan",
    company: "TechFlow",
    project: "AI Career Platform",
    date: "Sep 10, 2026",
  },
  {
    name: "Daniel Smith",
    company: "Nova Labs",
    project: "Web Application",
    date: "Sep 09, 2026",
  },
  {
    name: "Lisa Wang",
    company: "FutureTech",
    project: "AI Integration",
    date: "Sep 08, 2026",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Private Dashboard
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              SkillMatch AI
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Monitor users, CV activity, analyses and team inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              SH
            </div>

            <div>
              <p className="text-xs font-bold">Team Admin</p>
              <p className="text-[11px] text-muted-foreground">
                Shahariar & Sujoy
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            STATS
            ===================================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-2xl font-extrabold tracking-tight">
                      {stat.value}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {stat.change}
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            RECENT USERS + ANALYSES
            ===================================================== */}

        <div className="mt-6 grid gap-6 xl:grid-cols-2">

          {/* Recent Users */}

          <section className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-bold">Recent Users</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Recently registered accounts
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="divide-y divide-border">
              {recentUsers.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center gap-3 px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {user.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-[11px] text-muted-foreground">
                      {user.date}
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Analyses */}

          <section className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-bold">Recent Analyses</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Latest CV analysis activity
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="divide-y divide-border">
              {recentAnalyses.map((analysis) => (
                <div
                  key={`${analysis.user}-${analysis.cv}`}
                  className="flex items-center gap-3 px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {analysis.user}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {analysis.cv}
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-xs font-semibold text-emerald-600">
                      {analysis.result}
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {analysis.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* =====================================================
            TEAM INQUIRIES
            ===================================================== */}

        <section className="mt-6 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">Team Inquiries</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Recent messages from potential clients
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Client
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Company
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Project
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Date
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {inquiries.map((inquiry) => (
                  <tr
                    key={`${inquiry.name}-${inquiry.date}`}
                    className="transition hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold">
                        {inquiry.name}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {inquiry.company}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium">
                      {inquiry.project}
                    </td>

                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {inquiry.date}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold transition hover:bg-muted"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================
            ACTIVITY
            ===================================================== */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Activity */}

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Activity className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">System Activity</h2>

                <p className="text-xs text-muted-foreground">
                  Platform activity overview
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  User registrations
                </span>

                <span className="text-sm font-bold">128</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[72%] rounded-full bg-primary" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  CV processing
                </span>

                <span className="text-sm font-bold">94</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[58%] rounded-full bg-primary" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Completed analyses
                </span>

                <span className="text-sm font-bold">81</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[48%] rounded-full bg-primary" />
              </div>
            </div>
          </section>

          {/* Platform status */}

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">Platform Status</h2>

                <p className="text-xs text-muted-foreground">
                  Current system health
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Authentication", "Operational"],
                ["Database", "Operational"],
                ["CV Storage", "Operational"],
                ["Analysis Service", "Operational"],
              ].map(([service, status]) => (
                <div
                  key={service}
                  className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3"
                >
                  <span className="text-sm font-medium">{service}</span>

                  <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>SkillMatch AI — Private Team Dashboard</p>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Restricted access
          </div>
        </div>
      </div>
    </main>
  );
}
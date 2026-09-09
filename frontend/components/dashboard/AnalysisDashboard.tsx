"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Download,
  Flag,
  GitBranch,
  Lightbulb,
  Map,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";

type Skill = {
  name: string;
  level: number;
  icon: React.ReactNode;
};

type JobMatch = {
  title: string;
  score: number;
  description: string;
  icon: React.ReactNode;
};

const skills: Skill[] = [
  {
    name: "Python",
    level: 90,
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    name: "React",
    level: 80,
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    name: "SQL",
    level: 75,
    icon: <Server className="h-5 w-5" />,
  },
  {
    name: "Machine Learning",
    level: 70,
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    name: "JavaScript",
    level: 65,
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    name: "Git",
    level: 60,
    icon: <GitBranch className="h-5 w-5" />,
  },
];

const jobMatches: JobMatch[] = [
  {
    title: "AI Engineer",
    score: 88,
    description: "Strong match based on your skills",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Python Developer",
    score: 84,
    description: "Strong match based on your skills",
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    title: "Data Analyst",
    score: 76,
    description: "Good match based on your skills",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Backend Developer",
    score: 71,
    description: "Good match based on your skills",
    icon: <Server className="h-5 w-5" />,
  },
  {
    title: "ML Engineer",
    score: 68,
    description: "Possible match",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const skillGaps = [
  "Docker",
  "MLOps",
  "Kubernetes",
  "System Design",
  "Cloud (AWS)",
  "Data Engineering",
];

const roadmap = [
  {
    title: "Python",
    status: "Completed",
    subtitle: "You have this skill",
    type: "completed",
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    title: "Machine Learning",
    status: "Completed",
    subtitle: "You have this skill",
    type: "completed",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "PyTorch",
    status: "Completed",
    subtitle: "You have this skill",
    type: "completed",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: "Docker",
    status: "Next Step",
    subtitle: "Recommended",
    type: "next",
    icon: <Cloud className="h-5 w-5" />,
  },
  {
    title: "MLOps",
    status: "Upcoming",
    subtitle: "Highly recommended",
    type: "upcoming",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: "Kubernetes",
    status: "Upcoming",
    subtitle: "Important",
    type: "upcoming",
    icon: <Server className="h-5 w-5" />,
  },
  {
    title: "Machine Learning Engineer",
    status: "Your Goal",
    subtitle: "Career target",
    type: "goal",
    icon: <Flag className="h-5 w-5" />,
  },
];

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-emerald-500/20">
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-500" />

      <span className="relative text-xs font-bold text-foreground">
        {score}%
      </span>
    </div>
  );
}

function StatCard({
  value,
  label,
  icon,
  iconClassName,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-extrabold tracking-tight">{value}</p>

          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {label}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function AnalysisDashboard() {
  return (
    <section className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* =====================================================
            DASHBOARD HEADER
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">

          {/* Recent Analysis */}
          <aside className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">Recent Analysis</h2>

              <button
                type="button"
                className="text-xs font-semibold text-primary hover:underline"
              >
                See all
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {[
                ["My CV.pdf", "5 matches found", "Sep 10, 2026"],
                ["Data Analyst CV.pdf", "3 matches found", "Sep 02, 2026"],
                [
                  "Frontend Developer.pdf",
                  "4 matches found",
                  "Aug 28, 2026",
                ],
                ["ML Resume.pdf", "6 matches found", "Aug 15, 2026"],
              ].map(([name, matches, date]) => (
                <button
                  type="button"
                  key={name}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-muted"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Code2 className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold">
                      {name}
                    </span>

                    <span className="mt-1 block text-[10px] text-muted-foreground">
                      {matches}
                    </span>
                  </span>

                  <span className="hidden text-[10px] text-muted-foreground sm:block">
                    {date}
                  </span>

                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          </aside>

          {/* Main Dashboard */}
          <div className="min-w-0">

            {/* Analysis Complete */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold tracking-tight">
                    Analysis Complete!
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Here&apos;s your career profile based on your CV.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold shadow-sm transition hover:bg-muted"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Analyze Another CV
              </button>
            </div>

            {/* Stats */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <StatCard
                value="18"
                label="Skills Detected"
                icon={<Sparkles className="h-5 w-5 text-primary" />}
                iconClassName="bg-primary/10"
              />

              <StatCard
                value="6"
                label="Job Matches"
                icon={<Target className="h-5 w-5 text-emerald-600" />}
                iconClassName="bg-emerald-500/10"
              />

              <StatCard
                value="6"
                label="Skills to Improve"
                icon={<BarChart3 className="h-5 w-5 text-emerald-600" />}
                iconClassName="bg-emerald-500/10"
              />
            </div>

            {/* Skills + Jobs */}
            <div className="mt-4 grid gap-4 xl:grid-cols-2">

              {/* Your Skills */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Your Skills</h3>

                  <button
                    type="button"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center text-primary">
                        {skill.icon}
                      </div>

                      <span className="w-28 shrink-0 text-sm font-medium">
                        {skill.name}
                      </span>

                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <span className="w-9 text-right text-xs font-medium text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jobs */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Jobs You&apos;re Ready For</h3>

                  <button
                    type="button"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    See all
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {jobMatches.map((job) => (
                    <button
                      type="button"
                      key={job.title}
                      className="flex w-full items-center gap-3 rounded-xl border border-border/70 p-3 text-left transition hover:bg-muted"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {job.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{job.title}</p>

                        <p className="mt-0.5 text-[11px] text-emerald-600">
                          {job.description}
                        </p>
                      </div>

                      <ScoreRing score={job.score} />

                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills to Develop */}
            <div className="mt-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                  <Lightbulb className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold">Skills to Develop</h3>

                  <p className="text-xs text-muted-foreground">
                    Based on your top job matches
                  </p>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  See suggestions
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {skillGaps.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            DREAM JOB
        ===================================================== */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target className="h-7 w-7" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-extrabold tracking-tight">
                Have a specific career in mind?
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Tell us your dream job and get a personalized roadmap to
                achieve it.
              </p>
            </div>

            <div className="flex w-full gap-2 lg:max-w-2xl">
              <input
                type="text"
                placeholder="e.g. Machine Learning Engineer"
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30"
              />

              <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground transition hover:opacity-90"
              >
                Build My Roadmap
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            ROADMAP
        ===================================================== */}

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Map className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-extrabold">Your Roadmap</h2>

                <p className="text-xs text-muted-foreground">
                  A personalized learning path based on your current skills
                  and target role.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-semibold transition hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              Export Roadmap
            </button>
          </div>

          {/* Roadmap Timeline */}
          <div className="mt-8 overflow-x-auto pb-3">
            <div className="flex min-w-[900px] items-start">
              {roadmap.map((item, index) => (
                <div
                  key={item.title}
                  className="flex min-w-[130px] flex-1 items-start"
                >
                  <div className="flex flex-1 flex-col items-center text-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        item.type === "completed"
                          ? "bg-emerald-500/15 text-emerald-600"
                          : item.type === "next"
                            ? "bg-primary/15 text-primary"
                            : item.type === "goal"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.type === "completed" ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        item.icon
                      )}
                    </div>

                    <p className="mt-3 text-xs font-bold">
                      {item.title}
                    </p>

                    <p
                      className={`mt-1 text-[11px] font-semibold ${
                        item.type === "completed"
                          ? "text-emerald-600"
                          : item.type === "next"
                            ? "text-primary"
                            : item.type === "goal"
                              ? "text-primary"
                              : "text-muted-foreground"
                      }`}
                    >
                      {item.status}
                    </p>

                    <p className="mt-1 max-w-[120px] text-[10px] leading-4 text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>

                  {index < roadmap.length - 1 && (
                    <div className="mt-6 flex h-px flex-1 items-center bg-border">
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Your career data stays private and secure.
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Lightbulb,
  Map,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  Code2,
} from "lucide-react";

import { generateRoadmap, AnalysisResponse } from "@/lib/api";

interface RoadmapStep {
  stepNumber: number;
  title: string;
  status: string;
}

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

function matchDescription(score: number): string {
  if (score >= 80) return "Strong match based on your skills";
  if (score >= 60) return "Good match based on your skills";
  return "Possible match";
}

export default function AnalysisDashboard({
  analysis,
}: {
  analysis: AnalysisResponse;
}) {
  const [roadmapInput, setRoadmapInput] = useState("");
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[] | null>(null);
  const [roadmapError, setRoadmapError] = useState("");

  const skills = analysis.skills.map((s) => ({
    name: s.name,
    level: Math.round(s.proficiency * 100),
    icon: <Code2 className="h-5 w-5" />,
  }));

  const jobMatches = analysis.jobMatches
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((j) => ({
      title: j.title,
      score: j.score,
      description: matchDescription(j.score),
      icon: <Sparkles className="h-5 w-5" />,
    }));

  const skillGaps = analysis.skillGaps.map((g) => g.skill);

  const handleBuildRoadmap = async () => {
    if (!roadmapInput.trim()) return;

    setIsGeneratingRoadmap(true);
    setRoadmapError("");
    setRoadmapSteps(null);

    const result = await generateRoadmap(roadmapInput.trim(), analysis.id);

    if (result.error) {
      setRoadmapError(result.error.message);
    } else if (result.data?.steps) {
      setRoadmapSteps(result.data.steps);
    }

    setIsGeneratingRoadmap(false);
  };

  return (
    <section className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          {/* Recent Analysis — placeholder until History API is wired up */}
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
            <p className="mt-4 text-xs text-muted-foreground">
              History coming soon.
            </p>
          </aside>

          {/* Main Dashboard */}
          <div className="min-w-0">
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
                  {analysis.summary.aiSummary && (
                    <p className="mt-1 text-sm italic text-muted-foreground">
                      {analysis.summary.aiSummary}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <StatCard
                value={String(analysis.summary.skillsDetected)}
                label="Skills Detected"
                icon={<Sparkles className="h-5 w-5 text-primary" />}
                iconClassName="bg-primary/10"
              />
              <StatCard
                value={String(analysis.summary.jobMatches)}
                label="Job Matches"
                icon={<Target className="h-5 w-5 text-emerald-600" />}
                iconClassName="bg-emerald-500/10"
              />
              <StatCard
                value={String(analysis.summary.skillsToImprove)}
                label="Skills to Improve"
                icon={<BarChart3 className="h-5 w-5 text-emerald-600" />}
                iconClassName="bg-emerald-500/10"
              />
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              {/* Your Skills */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-bold">Your Skills</h3>
                <div className="mt-5 space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
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
                <h3 className="font-bold">Jobs You&apos;re Ready For</h3>
                <div className="mt-4 space-y-2">
                  {jobMatches.map((job) => (
                    <div
                      key={job.title}
                      className="flex w-full items-center gap-3 rounded-xl border border-border/70 p-3 text-left"
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills to Develop */}
            {skillGaps.length > 0 && (
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
            )}
          </div>
        </div>

        {/* DREAM JOB */}
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
                value={roadmapInput}
                onChange={(event) => setRoadmapInput(event.target.value)}
                placeholder="e.g. Machine Learning Engineer"
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                onClick={handleBuildRoadmap}
                disabled={isGeneratingRoadmap || !roadmapInput.trim()}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isGeneratingRoadmap ? "Building..." : "Build My Roadmap"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          {roadmapError && (
            <p className="mt-3 text-sm text-destructive">{roadmapError}</p>
          )}
        </div>

        {/* ROADMAP */}
        {roadmapSteps && roadmapSteps.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Map className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold">Your Roadmap</h2>
                <p className="text-xs text-muted-foreground">
                  A personalized learning path toward your target role.
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto pb-3">
              <div className="flex min-w-[900px] items-start">
                {roadmapSteps.map((step, index) => (
                  <div
                    key={step.stepNumber}
                    className="flex min-w-[130px] flex-1 items-start"
                  >
                    <div className="flex flex-1 flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <p className="mt-3 text-xs font-bold">{step.title}</p>
                      <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                        Step {step.stepNumber}
                      </p>
                    </div>
                    {index < roadmapSteps.length - 1 && (
                      <div className="mt-6 flex h-px flex-1 items-center bg-border">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Your career data stays private and secure.
        </div>
      </div>
    </section>
  );
}
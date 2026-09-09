"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  FileSearch,
  Lock,
  Map,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

import Header from "@/components/layout/Header";
import HireTeamModal from "@/components/team/HireTeamModal";

const features = [
  {
    icon: FileSearch,
    title: "CV Analysis",
    description:
      "Analyze your CV and identify the technical and professional skills already present in your profile.",
  },
  {
    icon: Target,
    title: "Career Matching",
    description:
      "Compare your skills with different career roles and discover where your current profile fits best.",
  },
  {
    icon: Workflow,
    title: "Skill Gap Analysis",
    description:
      "Understand which important skills are missing or need improvement for your target career.",
  },
  {
    icon: Map,
    title: "Personal Roadmap",
    description:
      "Build a practical learning roadmap based on your current skills and your desired career direction.",
  },
];

const steps = [
  {
    number: "01",
    icon: FileSearch,
    title: "Upload your CV",
    description:
      "Upload your CV in PDF or DOCX format. The platform starts with your existing experience and skills.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Analyze your skills",
    description:
      "Your CV is processed to identify, normalize and understand the skills represented in your profile.",
  },
  {
    number: "03",
    icon: Target,
    title: "Discover career matches",
    description:
      "Your skills are compared with relevant job roles to show your current career fit.",
  },
  {
    number: "04",
    icon: Map,
    title: "Build your roadmap",
    description:
      "Choose a dream job and receive a structured learning path based on your current skill gaps.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "AI / LLM",
  "Python",
];

export default function AboutPage() {
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* =========================================================
          HERO
          ========================================================= */}

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl px-5 pb-20 pt-20 text-center sm:px-8 lg:pb-24 lg:pt-28"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1.5 text-xs font-bold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            ABOUT SKILLMATCH AI
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Turn your CV into a
            <br />
            <span className="skillmatch-gradient">
              clearer career path.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            SkillMatch AI is a career intelligence platform designed to help
            students and early-career professionals understand their skills,
            discover suitable career opportunities, identify skill gaps, and
            build a personalized learning roadmap.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Stat
              icon={<BrainCircuit className="h-4 w-4" />}
              text="AI-Powered"
            />

            <Stat
              icon={<Target className="h-4 w-4" />}
              text="Career Focused"
            />

            <Stat
              icon={<ShieldCheck className="h-4 w-4" />}
              text="Privacy First"
            />
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          WHAT IS SKILLMATCH AI
          ========================================================= */}

      <section className="border-t border-border/70 bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold tracking-[0.18em] text-primary">
              OUR PURPOSE
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Career decisions should be clearer.
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              Many students know what they have learned but are not always sure
              how those skills translate into real career opportunities.
              SkillMatch AI is designed to bridge that gap.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Instead of simply showing a list of skills, the platform connects
              your current abilities with possible job roles, identifies what
              you need to improve, and helps you understand what to learn next.
            </p>

            <div className="mt-7 flex items-center gap-3 text-sm font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </span>

              From current skills to future goals.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
              <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      YOUR CAREER JOURNEY
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      Skills → Career → Growth
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <JourneyItem
                    icon={<FileSearch className="h-4 w-4" />}
                    title="Your CV"
                    text="Understand what you already know"
                    active
                  />

                  <JourneyLine />

                  <JourneyItem
                    icon={<Target className="h-4 w-4" />}
                    title="Career Match"
                    text="Discover suitable career directions"
                  />

                  <JourneyLine />

                  <JourneyItem
                    icon={<Map className="h-4 w-4" />}
                    title="Learning Roadmap"
                    text="Know what to learn next"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
          ========================================================= */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.18em] text-primary">
              WHAT IT DOES
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              One platform for your career journey.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              SkillMatch AI brings together CV analysis, career matching, skill
              gap discovery and personalized learning guidance.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-base font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
          ========================================================= */}

      <section className="border-y border-border/70 bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.18em] text-primary">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From CV to career roadmap.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              A simple workflow designed to turn your existing experience into
              actionable career insights.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative rounded-2xl border border-border bg-background p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest text-primary">
                      {step.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-6 text-base font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          PRIVACY
          ========================================================= */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/10 bg-primary/[0.04] p-7 sm:p-10"
          >
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Lock className="h-7 w-7" />
              </div>

              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-primary">
                  PRIVACY & SECURITY
                </p>

                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Your career data matters.
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  SkillMatch AI is designed with privacy and security in mind.
                  CV files and personal career information should only be
                  accessible to authorized users, while sensitive backend
                  credentials remain protected on the server.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <SecurityItem text="Private CV storage" />
                  <SecurityItem text="Protected user data" />
                  <SecurityItem text="Server-side validation" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          TECHNOLOGY
          ========================================================= */}

      <section className="border-t border-border/70 bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-primary">
                TECHNOLOGY
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built with modern technologies.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                The platform combines a modern web interface, secure backend
                infrastructure, structured data processing and AI-assisted
                career intelligence.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <div
                  key={technology}
                  className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm"
                >
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM
          ========================================================= */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.18em] text-primary">
              THE TEAM
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built by two developers.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              Explore our individual profiles, technical skills, projects and
              professional background.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            <TeamCard
              href="/team/shahariar"
              icon={<Code2 className="h-5 w-5" />}
              role="Frontend Developer"
              name="MD Shahariar Hossen"
              description="AI, web development, automation and cybersecurity-focused frontend development."
            />

            <TeamCard
              href="/team/sujoypal"
              icon={<BrainCircuit className="h-5 w-5" />}
              role="Backend Developer"
              name="PAL SUJOY"
              description="Artificial Intelligence, machine learning, data science and intelligent agent development."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          HIRE OUR TEAM CTA
          ========================================================= */}

      <section className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/10 bg-primary/[0.04] px-6 py-10 text-center sm:px-10"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold tracking-[0.18em] text-primary">
              WORK WITH OUR TEAM
            </p>

            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Have a project in mind?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Tell us about your project and our team will review your
              requirements and get back to you.
            </p>

            <button
              type="button"
              onClick={() => setHireOpen(true)}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Hire Our Team
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold">SkillMatch AI</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Find the gap. Build the path.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/team/shahariar"
              className="font-semibold text-foreground transition-colors hover:text-primary"
            >
              Frontend Developer
            </Link>

            <Link
              href="/team/sujoypal"
              className="font-semibold text-foreground transition-colors hover:text-primary"
            >
              Backend Developer
            </Link>
          </div>
        </div>
      </footer>

      {/* =========================================================
          HIRE OUR TEAM MODAL
          ========================================================= */}

      <HireTeamModal
        open={hireOpen}
        onClose={() => setHireOpen(false)}
      />
    </main>
  );
}

/* ===============================================================
   SMALL COMPONENTS
   =============================================================== */

function Stat({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground">
      <span className="text-primary">{icon}</span>
      {text}
    </div>
  );
}

function JourneyItem({
  icon,
  title,
  text,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function JourneyLine() {
  return (
    <div className="ml-5 h-5 border-l border-dashed border-border" />
  );
}

function SecurityItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
      <CheckCircle2 className="h-4 w-4 text-primary" />
      {text}
    </div>
  );
}

function TeamCard({
  href,
  icon,
  role,
  name,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  role: string;
  name: string;
  description: string;
}) {
  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ y: -4 }}
        className="h-full rounded-2xl border border-border bg-card p-6 transition-shadow duration-300 group-hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">
          {role}
        </p>

        <h3 className="mt-1 text-lg font-extrabold">{name}</h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-foreground">
          View profile
          <ArrowRight className="h-3.5 w-3.5 text-primary" />
        </div>
      </motion.div>
    </Link>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Network,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

import HireTeamModal from "@/components/team/HireTeamModal";

/* ===============================================================
   SKILLS
   =============================================================== */

const skillGroups = [
  {
    title: "AI & LLM",
    icon: <Sparkles className="h-5 w-5" />,
    skills: [
      "Prompt Engineering",
      "ChatGPT",
      "Claude",
      "Gemini",
      "Doubao",
      "AI Agent Concepts",
    ],
  },
  {
    title: "Web & Development",
    icon: <Code2 className="h-5 w-5" />,
    skills: [
      "WordPress",
      "Elementor",
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
    ],
  },
  {
    title: "Cybersecurity & Networking",
    icon: <Shield className="h-5 w-5" />,
    skills: [
      "HTTP / HTTPS",
      "Burp Suite",
      "Linux",
      "SQL Injection Fundamentals",
      "Web Security",
      "Networking",
    ],
  },
  {
    title: "SEO & Analytics",
    icon: <Target className="h-5 w-5" />,
    skills: [
      "SEO",
      "Technical SEO",
      "Google Analytics",
      "GTM",
      "Google Sheets",
      "Excel",
    ],
  },
  {
    title: "Automation & Tools",
    icon: <Network className="h-5 w-5" />,
    skills: [
      "Make",
      "Zapier",
      "Git / GitHub",
      "VS Code",
      "Arduino IDE",
    ],
  },
];

/* ===============================================================
   PROJECTS
   =============================================================== */

const projects = [
  {
    title: "SkillMatch AI",
    description:
      "Frontend developer for an AI-powered CV analysis, career matching and personalized roadmap platform.",
    tags: ["Next.js", "React", "TypeScript", "AI"],
  },
  {
    title: "Web Development & SEO",
    description:
      "Built and managed WordPress websites using Elementor with hands-on experience in SEO, optimization, analytics and tracking workflows.",
    tags: ["WordPress", "Elementor", "SEO"],
  },
  {
    title: "Web Security Practice",
    description:
      "Practiced web security fundamentals including HTTP/HTTPS, Burp Suite, Linux and SQL injection through hands-on security labs and testing.",
    tags: ["Burp Suite", "Linux", "Web Security"],
  },
  {
    title: "Arduino Smart Systems",
    description:
      "Developed sensor-based Arduino projects involving temperature monitoring, soil moisture detection, ultrasonic sensing and automated control.",
    tags: ["Arduino", "Sensors", "Embedded"],
  },
];

/* ===============================================================
   MAIN PAGE
   =============================================================== */

export default function ShahariarProfile() {
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* =========================================================
          ANIMATED BACKGROUND
          ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-[5%] h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[5%] top-[30%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        />
      </div>

      {/* =========================================================
          HEADER
          ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>

            SkillMatch AI
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      {/* =========================================================
          HERO
          ========================================================= */}

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* PHOTO */}

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-start"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
                <Image
                  src="/team/shahariar.png"
                  alt="Md Shahariar Hossen"
                  width={480}
                  height={560}
                  priority
                  className="h-[430px] w-[370px] object-cover object-top sm:h-[500px] sm:w-[420px]"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* INTRO */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              ARTIFICIAL INTELLIGENCE UNDERGRADUATE
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              MD Shahariar
              <br />

              <span className="skillmatch-gradient">Hossen</span>
            </h1>

            <p className="mt-5 text-lg font-semibold text-foreground/80">
              Artificial Intelligence Undergraduate Student
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Artificial Intelligence undergraduate student at Tiangong
              University with hands-on exposure to AI tools, prompt
              engineering, web technologies, automation, computer networking
              and web security.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Tianjin, China
              </span>

              <span className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Tiangong University
              </span>
            </div>

            {/* BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/cv/shahariar-cv.pdf"
                download
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>

              <button
                type="button"
                onClick={() => setHireOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-muted"
              >
                <Briefcase className="h-4 w-4" />
                Hire Our Team
              </button>
            </div>

            {/* CONTACT */}

            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <a
                href="mailto:mdshahariar81@tiangong.edu.cn"
                className="flex items-center gap-2 transition hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                mdshahariar81@tiangong.edu.cn
              </a>

              <span className="hidden h-4 w-px bg-border sm:block" />

              <span>Weixin: mdshahariar81</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          QUICK INFO
          ========================================================= */}

      <section className="border-y border-border/70 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-px px-5 sm:px-8 md:grid-cols-3">
          <InfoCard
            icon={<GraduationCap className="h-5 w-5" />}
            title="Education"
            text="B.Sc. in Artificial Intelligence"
          />

          <InfoCard
            icon={<Code2 className="h-5 w-5" />}
            title="Academic Period"
            text="2025 – 2029"
          />

          <InfoCard
            icon={<Target className="h-5 w-5" />}
            title="Focus"
            text="AI · Web · Security · Robotics"
          />
        </div>
      </section>

      {/* =========================================================
          ABOUT ME
          ========================================================= */}

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-bold text-primary">ABOUT ME</p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Building with AI,
            <br />
            exploring emerging technology.
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            My interests include AI agents, intelligent systems, virtual
            simulation, robotics and emerging AI applications. I enjoy
            learning through practical projects, experimenting with new
            technologies and turning ideas into useful digital experiences.
          </p>

          <p className="mt-4 text-base leading-8 text-muted-foreground">
            I am also developing practical knowledge in computer networking,
            web security, automation and AI-assisted workflows while building
            my foundation for research-oriented projects.
          </p>
        </motion.div>
      </section>

      {/* =========================================================
          TECHNICAL EXPERTISE
          ========================================================= */}

      <section className="border-y border-border/70 bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-sm font-bold text-primary">
            TECHNICAL EXPERTISE
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
            Skills & Competencies
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {group.icon}
                  </div>

                  <h3 className="font-bold">{group.title}</h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECTS
          ========================================================= */}

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="text-sm font-bold text-primary">
          PRACTICAL PROJECTS & EXPERIENCE
        </p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
          Selected Work
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Code2 className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-bold">{project.title}</h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* =========================================================
          EDUCATION
          ========================================================= */}

      <section className="border-y border-border/70 bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-sm font-bold text-primary">EDUCATION</p>

          <h2 className="mt-2 text-3xl font-extrabold">
            Academic Background
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Bachelor of Science in Artificial Intelligence
                </h3>

                <p className="mt-1 text-sm font-semibold text-primary">
                  Tiangong University
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Undergraduate Student · 2025 – 2029
                </p>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Focusing on Artificial Intelligence, Computer Science,
                  emerging technologies and practical technology projects.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CONTACT / HIRE
          ========================================================= */}

      <section
        id="contact"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-primary/10 bg-primary/5 p-7 sm:p-10"
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-primary">
                LET&apos;S WORK TOGETHER
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                Have a project in mind?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Looking for a team interested in AI, web development,
                automation or emerging technologies? Let&apos;s talk.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setHireOpen(true)}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Hire Our Team
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold">SkillMatch AI</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Find the gap. Build the path.
            </p>
          </div>

          <Link
            href="/"
            className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            Back to SkillMatch AI
          </Link>
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
   INFO CARD
   =============================================================== */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 border-border/70 py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground">
          {title}
        </p>

        <p className="mt-1 text-sm font-bold">{text}</p>
      </div>
    </div>
  );
}
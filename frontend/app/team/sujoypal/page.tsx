"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  Code2,
  Database,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Network,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

import HireTeamModal from "@/components/team/HireTeamModal";

/* ===============================================================
   TECHNICAL SKILLS
   =============================================================== */

const skillGroups = [
  {
    title: "Programming & Web",
    icon: <Code2 className="h-5 w-5" />,
    skills: ["Python", "HTML", "CSS", "C"],
  },
  {
    title: "Machine Learning & Data Science",
    icon: <BrainCircuit className="h-5 w-5" />,
    skills: [
      "PyTorch",
      "Pandas",
      "NumPy",
      "Seaborn",
      "Matplotlib",
      "Scikit-Learn",
    ],
  },
  {
    title: "AI & Prompt Engineering",
    icon: <Sparkles className="h-5 w-5" />,
    skills: [
      "Prompt Design",
      "Temperature Tuning",
      "Prompt Injection Mitigation",
      "AI Agents",
      "API Integration",
    ],
  },
  {
    title: "AI Platforms & Tools",
    icon: <Network className="h-5 w-5" />,
    skills: [
      "ChatGPT",
      "Claude",
      "Kimi",
      "DeepSeek",
      "Gamma",
      "Coze",
      "Doubao",
    ],
  },
  {
    title: "Databases & Workflow",
    icon: <Database className="h-5 w-5" />,
    skills: [
      "MySQL",
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
    ],
  },
];

/* ===============================================================
   PROJECTS
   =============================================================== */

const projects = [
  {
    title: "Real vs. Fake News Prediction",
    description:
      "Engineered an NLP-based classification pipeline using text preprocessing and machine learning algorithms to detect fake news articles.",
    tags: ["Python", "Scikit-Learn", "Pandas", "NLTK"],
  },
  {
    title: "Rock vs. Mine Prediction",
    description:
      "Built a machine learning classification model to distinguish complex acoustic sonar signatures between rocks and mines.",
    tags: ["Python", "Scikit-Learn", "Pandas"],
  },
  {
    title: "House Price Prediction",
    description:
      "Designed a regression model for property market valuation using exploratory data analysis, feature engineering and model evaluation.",
    tags: ["Python", "Scikit-Learn", "NumPy", "Seaborn"],
  },
  {
    title: "Medical Insurance Prediction",
    description:
      "Developed a regression-based prediction system for estimating medical insurance premiums using data analysis and machine learning.",
    tags: ["Python", "Scikit-Learn", "NumPy"],
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "Implemented a binary classification pipeline to identify potentially fraudulent financial transactions using optimized evaluation metrics.",
    tags: ["Python", "Pandas", "Scikit-Learn"],
  },
  {
    title: "Titanic Survival Prediction",
    description:
      "Built a machine learning classification workflow to evaluate historical passenger survival factors using structured datasets.",
    tags: ["Python", "Pandas", "Scikit-Learn"],
  },
  {
    title: "Customer Segmentation",
    description:
      "Applied K-Means clustering to identify behavioral customer segments from structured customer data.",
    tags: ["Python", "Scikit-Learn", "Pandas"],
  },
  {
    title: "Sentiment Analysis",
    description:
      "Conducted sentiment polarity evaluation on textual datasets using Python-based machine learning workflows.",
    tags: ["Python", "Scikit-Learn", "Pandas"],
  },
  {
    title: "Image Classification",
    description:
      "Developed deep learning image recognition pipelines for CIFAR and Fashion MNIST using PyTorch tensors and custom neural network architectures.",
    tags: ["Python", "PyTorch", "Matplotlib"],
  },
];

/* ===============================================================
   MAIN PAGE
   =============================================================== */

export default function SujoyPalProfile() {
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
            x: [0, 30, 0],
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
                  src="/team/sujoypal.png"
                  alt="Pal Sujoy"
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
              PAL Sujoy
              <br />

              <span className="skillmatch-gradient">宋知礼</span>
            </h1>

            <p className="mt-5 text-lg font-semibold text-foreground/80">
              Artificial Intelligence Undergraduate Student
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Motivated Artificial Intelligence undergraduate student at
              Tiangong University with a strong academic foundation in
              Python, Machine Learning, prompt engineering, and intelligent
              agent development.
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
                href="/cv/sujoypal.pdf"
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
                href="mailto:sujoyjitu1@gmail.com"
                className="flex items-center gap-2 transition hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                sujoyjitu1@gmail.com
              </a>

              <span className="hidden h-4 w-px bg-border sm:block" />

              <span>WeID: wxid_1ryhpyv66u8122</span>
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
            icon={<Target className="h-5 w-5" />}
            title="Academic Period"
            text="2025 – 2029"
          />

          <InfoCard
            icon={<BrainCircuit className="h-5 w-5" />}
            title="Academic Focus"
            text="AI · ML · Intelligent Agents"
          />
        </div>
      </section>

      {/* =========================================================
          ABOUT
          ========================================================= */}

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-bold text-primary">ABOUT</p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Exploring AI,
            <br />
            machine learning & intelligent systems.
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Sujoy is an Artificial Intelligence undergraduate student at
            Tiangong University with practical experience across machine
            learning, deep learning, prompt engineering and intelligent
            agent development.
          </p>

          <p className="mt-4 text-base leading-8 text-muted-foreground">
            His interests include advanced virtual simulation, intelligent
            systems, AI agents and research-oriented academic projects.
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
          PROJECT EXPERIENCE
        </p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
          Selected Machine Learning Projects
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
                delay: index * 0.05,
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

                <p className="mt-2 text-sm text-muted-foreground">
                  1st Semester GPA: 3.82 / 4.0
                </p>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Focused coursework includes Artificial Intelligence
                  Foundations, Data Structures, Python Programming and
                  Machine Learning.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          HIRE SECTION
          ========================================================= */}

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
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
                Looking for a team interested in AI, machine learning,
                intelligent agents or research-oriented projects? Let&apos;s
                connect.
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
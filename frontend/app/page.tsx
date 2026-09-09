"use client";

/**
 * SkillMatch AI - Main Landing Page
 *
 * RESPONSIBILITY:
 * This file contains the main public landing page and CV upload UI.
 *
 * BACKEND HANDOFF:
 * The frontend does NOT perform the real CV analysis.
 * The backend will later handle:
 *
 * 1. Authentication
 * 2. Guest usage limit
 * 3. CV upload
 * 4. Private Supabase Storage
 * 5. CV text extraction
 * 6. Skill extraction
 * 7. Skill normalization
 * 8. Job matching
 * 9. Skill-gap calculation
 * 10. Roadmap generation
 *
 * IMPORTANT SECURITY:
 * Frontend validation is only for user experience.
 * Backend MUST validate everything again.
 */

import { ChangeEvent, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

// Shared site header.
// BACKEND/AUTH HANDOFF:
// Header can later read the Supabase Auth session.
// Guest user -> "Sign in"
// Logged-in user -> profile/avatar/menu
import Header from "@/components/layout/Header";

/**
 * Maximum allowed CV size.
 *
 * Requirement:
 * PDF/DOCX only
 * Maximum 5 MB
 *
 * SECURITY:
 * This limit MUST also be enforced by the backend.
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Home() {
  /**
   * Reference to the hidden native file input.
   * Clicking the custom upload area opens the file picker.
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Currently selected CV.
   *
   * NOTE:
   * This file stays in browser memory for now.
   * Later the backend upload flow will send it securely
   * to the backend/private Supabase Storage.
   */
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /**
   * Upload/validation error shown to the user.
   */
  const [error, setError] = useState("");

  /**
   * Used to provide visual feedback while dragging a file
   * over the upload area.
   */
  const [dragActive, setDragActive] = useState(false);

  /**
   * Validates a selected CV before accepting it.
   *
   * SECURITY NOTE:
   * This is NOT the real security boundary.
   *
   * Backend MUST repeat:
   * - file type validation
   * - file size validation
   * - file content validation
   * - authentication/authorization
   *
   * BACKEND HANDOFF:
   * After validation, this File object will eventually be
   * uploaded through the backend API.
   */
  const validateAndSelectFile = (file: File) => {
    setError("");

    /**
     * Allowed file MIME types.
     *
     * Project requirement:
     * PDF + DOCX only.
     */
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    /**
     * Check file type.
     *
     * SECURITY:
     * Backend MUST NOT trust this MIME type because
     * browser-provided file metadata can be manipulated.
     */
    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    /**
     * Check maximum file size.
     *
     * Maximum = 5 MB
     */
    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setError("File size must be 5 MB or smaller.");
      return;
    }

    /**
     * File passed frontend validation.
     */
    setSelectedFile(file);
  };

  /**
   * Handles file selection through the native file picker.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    validateAndSelectFile(file);
  };

  /**
   * Handles drag-and-drop CV upload.
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    validateAndSelectFile(file);
  };

  /**
   * Starts CV analysis.
   *
   * CURRENT:
   * Only confirms that frontend validation succeeded.
   *
   * BACKEND INTEGRATION:
   * This function will later call the backend APIs.
   *
   * Expected flow:
   *
   * 1. Check whether user is guest or authenticated.
   *
   * 2. Backend checks guest usage limit.
   *    IMPORTANT:
   *    Do NOT implement the real limit using localStorage.
   *
   * 3. Upload CV to:
   *
   *    POST /api/resumes
   *
   * 4. Backend stores CV inside PRIVATE Supabase Storage.
   *
   * 5. Backend creates resume record.
   *
   * 6. Backend starts analysis:
   *
   *    POST /api/analyze
   *
   * 7. Backend returns analysis ID.
   *
   * 8. Frontend loads:
   *
   *    GET /api/analysis/:id
   *
   * 9. Frontend displays:
   *    - detected skills
   *    - job matches
   *    - skill gaps
   *    - recommendations
   *
   * SECURITY:
   * Backend MUST enforce:
   * - authentication
   * - guest limit
   * - ownership
   * - rate limiting
   * - file validation
   * - private storage
   */
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select your CV first.");
      return;
    }

    setError("");

    /*
     * ============================================================
     * TODO: BACKEND INTEGRATION
     * ============================================================
     *
     * Example future implementation:
     *
     * const formData = new FormData();
     * formData.append("file", selectedFile);
     *
     * const response = await fetch("/api/resumes", {
     *   method: "POST",
     *   body: formData,
     * });
     *
     * Then:
     *
     * const resume = await response.json();
     *
     * Next call:
     *
     * await fetch("/api/analyze", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     resumeId: resume.id,
     *   }),
     * });
     *
     * IMPORTANT:
     *
     * The actual API implementation depends on the backend
     * architecture created by the backend developer.
     *
     * Frontend should NOT directly access:
     * - Supabase secret key
     * - Gemini secret/API key
     * - service-role credentials
     */

    alert(
      "CV is validated successfully. Backend analysis will be connected next.",
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =========================================================
          SHARED HEADER
          =========================================================
          
          Header is separated into its own component so that
          authentication/navigation logic does not make this page
          unnecessarily large.

          BACKEND HANDOFF:
          The Header component can later receive the Supabase
          authenticated user/session and show the correct UI.
      */}

      <Header />

      {/* =========================================================
          HERO SECTION
          ========================================================= */}

      <section className="relative overflow-hidden">
        {/* 
          Subtle background decoration.

          This is intentionally very soft.
          We do NOT want excessive glassmorphism/glow.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          {/* =====================================================
              LEFT SIDE
              ===================================================== */}

          <div>
            {/* Small brand badge */}
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
              CV UPLOAD CARD
              ===================================================== */}

          <div className="w-full">
            <div className="skillmatch-glow rounded-3xl border border-border bg-card p-3">
              <div className="rounded-2xl border border-dashed border-border bg-background p-6 sm:p-8">
                {/* Upload area */}

                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer rounded-2xl px-5 py-12 text-center transition-all sm:px-8 ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "hover:bg-secondary/60"
                  }`}
                >
                  {/* Upload icon */}
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {selectedFile ? (
                      <FileText className="h-7 w-7" />
                    ) : (
                      <Upload className="h-7 w-7" />
                    )}
                  </div>

                  {/* File name / title */}
                  <h2 className="mt-5 text-xl font-bold">
                    {selectedFile ? selectedFile.name : "Upload your CV"}
                  </h2>

                  {/* Upload description */}
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    {selectedFile
                      ? "Your file passed the basic frontend validation."
                      : "Drag and drop your CV here, or click to browse your files."}
                  </p>

                  {/* Supported file types */}
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                      PDF
                    </span>

                    <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                      DOCX
                    </span>

                    <span className="text-xs font-medium text-muted-foreground">
                      Maximum 5 MB
                    </span>
                  </div>

                  {/* 
                    Hidden native file input.

                    SECURITY:
                    accept attribute is only a UX filter.
                    Backend MUST validate the real uploaded file.
                  */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* =================================================
                    ERROR MESSAGE
                    ================================================= */}

                {error && (
                  <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                    {error}
                  </div>
                )}

                {/* =================================================
                    ANALYZE BUTTON
                    ================================================= */}

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!selectedFile}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Analyze my CV
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* =================================================
                    PRIVACY NOTICE
                    ================================================= */}

                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Your CV stays private and secure.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <p className="text-sm font-bold">SkillMatch AI</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Find the gap. Build the path.
            </p>
          </div>

          {/* Developer roles */}
          <div className="flex gap-5 text-xs text-muted-foreground">
            <span>Frontend Developer</span>
            <span>Backend Developer</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ===============================================================
   REUSABLE BENEFIT COMPONENT
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

      {title}
    </div>
  );
}

/* ===============================================================
   REUSABLE TRUST ITEM COMPONENT
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
      <h3 className="mt-4 text-base font-bold">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
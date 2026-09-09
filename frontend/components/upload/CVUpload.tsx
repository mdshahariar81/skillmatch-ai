"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

/*
 * ============================================================
 * SKILLMATCH AI — CV UPLOAD COMPONENT
 * ============================================================
 *
 * RESPONSIBILITY:
 * - Select CV
 * - Drag & drop CV
 * - Validate file type
 * - Validate maximum file size
 * - Prepare the file for backend upload
 *
 * SECURITY NOTE:
 * Frontend validation is NOT a security boundary.
 * The backend MUST validate the file again.
 *
 * BACKEND DEVELOPER:
 * The API integration section below clearly marks
 * where your backend endpoints should be connected.
 * ============================================================
 */

/* Maximum allowed CV size = 5 MB */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/* Only these file types are allowed */
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function CVUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [success, setSuccess] = useState("");

  /*
   * ==========================================================
   * FILE VALIDATION
   * ==========================================================
   *
   * This function checks:
   * 1. File type
   * 2. File size
   *
   * IMPORTANT:
   * Backend must repeat these checks.
   */
  const validateFile = (file: File): boolean => {
    setError("");
    setSuccess("");

    /* Check file type */
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setSelectedFile(null);
      setError("Please upload a PDF or DOCX file.");
      return false;
    }

    /* Check maximum file size */
    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setError("File size must be 5 MB or smaller.");
      return false;
    }

    return true;
  };

  /*
   * ==========================================================
   * FILE SELECTION
   * ==========================================================
   *
   * Handles the normal file picker.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (validateFile(file)) {
      setSelectedFile(file);
    }

    /*
     * Reset input value.
     *
     * This allows the user to select the same file again
     * after removing it or receiving an error.
     */
    event.target.value = "";
  };

  /*
   * ==========================================================
   * DRAG & DROP
   * ==========================================================
   */
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    if (validateFile(file)) {
      setSelectedFile(file);
    }
  };

  /*
   * ==========================================================
   * REMOVE SELECTED FILE
   * ==========================================================
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");
    setSuccess("");
  };

  /*
   * ==========================================================
   * BACKEND INTEGRATION
   * ==========================================================
   *
   * CURRENT STATE:
   * This project does not connect the CV directly to the
   * backend yet.
   *
   * BACKEND DEVELOPER SHOULD CONNECT:
   *
   * STEP 1:
   * POST /api/resumes
   *
   * The frontend will eventually send the selected CV.
   *
   * STEP 2:
   * Backend stores the file in PRIVATE Supabase Storage.
   *
   * STEP 3:
   * Backend creates the resume database record.
   *
   * STEP 4:
   * POST /api/analyze
   *
   * Backend starts CV analysis.
   *
   * STEP 5:
   * Backend returns an analysis ID.
   *
   * STEP 6:
   * Frontend navigates to:
   *
   * /analysis/[id]
   *
   * SECURITY:
   * - Never trust frontend validation.
   * - Backend must check authentication.
   * - Backend must check file ownership.
   * - Backend must enforce the 5 MB limit.
   * - Backend must validate the actual file.
   * - Backend must enforce the 3-analysis guest limit.
   * - Backend should rate-limit analysis requests.
   */
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select your CV first.");
      return;
    }

    setError("");
    setSuccess("");
    setIsAnalyzing(true);

    try {
      /*
       * ======================================================
       * TODO — BACKEND API INTEGRATION
       * ======================================================
       *
       * Example:
       *
       * const formData = new FormData();
       * formData.append("file", selectedFile);
       *
       * const response = await fetch(
       *   `${process.env.NEXT_PUBLIC_API_URL}/api/resumes`,
       *   {
       *     method: "POST",
       *     body: formData,
       *   }
       * );
       *
       * IMPORTANT:
       * Do NOT put backend secret keys in this component.
       *
       * The backend developer should replace this section
       * when the backend API is ready.
       */

      /*
       * Temporary demo delay.
       *
       * This lets us test the UI loading state before the
       * real backend is connected.
       */
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccess(
        "CV validated successfully. Backend analysis will be connected next."
      );
    } catch {
      /*
       * Never expose internal backend/server details
       * directly to the user.
       */
      setError("Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full">
      {/* ======================================================
          OUTER CARD
          ====================================================== */}
      <div className="rounded-3xl border border-border bg-card p-3 shadow-sm">
        <div className="rounded-2xl border border-dashed border-border bg-background p-6 sm:p-8">

          {/* ==================================================
              UPLOAD AREA
              ================================================== */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl px-5 py-12 text-center transition-all sm:px-8 ${
              dragActive
                ? "bg-primary/5 ring-2 ring-primary/30"
                : "hover:bg-secondary/50"
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

            {/* Title */}
            <h2 className="mt-5 text-xl font-bold tracking-tight">
              {selectedFile ? selectedFile.name : "Upload your CV"}
            </h2>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {selectedFile
                ? "Your file passed the basic frontend validation."
                : "Drag and drop your CV here, or click to browse your files."}
            </p>

            {/* Supported formats */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold">
                PDF
              </span>

              <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold">
                DOCX
              </span>

              <span className="text-xs font-medium text-muted-foreground">
                Maximum 5 MB
              </span>
            </div>

            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* ==================================================
              SELECTED FILE
              ================================================== */}
          {selectedFile && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-5 w-5 shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {selectedFile.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveFile();
                }}
                className="rounded-lg p-2 text-muted-foreground transition hover:bg-background hover:text-foreground"
                aria-label="Remove selected CV"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ==================================================
              ERROR MESSAGE
              ================================================== */}
          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
            >
              {error}
            </div>
          )}

          {/* ==================================================
              SUCCESS MESSAGE
              ================================================== */}
          {success && (
            <div
              role="status"
              className="mt-4 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* ==================================================
              ANALYZE BUTTON
              ================================================== */}
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isAnalyzing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Preparing analysis...
              </>
            ) : (
              <>
                Analyze my CV
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* ==================================================
              PRIVACY NOTICE
              ================================================== */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Your CV stays private and secure.
          </div>
        </div>
      </div>
    </div>
  );
}
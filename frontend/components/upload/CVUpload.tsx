"use client";

/**
 * SkillMatch AI — CV Upload Component
 *
 * RESPONSIBILITY:
 * - PDF/DOCX file selection
 * - Drag & drop
 * - 5 MB frontend validation
 * - Upload UI state
 * - Error handling
 *
 * BACKEND HANDOFF:
 * This component is intentionally separated from the main page.
 * The backend developer can later connect the real API here.
 *
 * Expected backend flow:
 *
 * CVUpload
 *    ↓
 * POST /api/resumes
 *    ↓
 * Private Supabase Storage
 *    ↓
 * Resume record created
 *    ↓
 * POST /api/analyze
 *    ↓
 * Analysis result
 *
 * SECURITY:
 * Frontend validation is NOT a security boundary.
 * Backend MUST validate the file again.
 */

import { ChangeEvent, useRef, useState } from "react";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

/**
 * Maximum CV size = 5 MB.
 *
 * IMPORTANT:
 * Backend MUST enforce the same limit.
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Allowed MIME types.
 *
 * PDF + DOCX only.
 */
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface CVUploadProps {
  /**
   * Optional callback.
   *
   * BACKEND HANDOFF:
   * The parent page can receive the validated file here
   * and later start the backend upload/analysis flow.
   */
  onAnalyze?: (file: File) => void;
}

export default function CVUpload({ onAnalyze }: CVUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /**
   * Validate a CV before accepting it.
   *
   * SECURITY:
   * This validation only protects the frontend UX.
   *
   * Backend MUST independently validate:
   * - authentication
   * - authorization
   * - actual file type
   * - file size
   * - file content
   * - ownership
   * - rate limits
   */
  const validateFile = (file: File): boolean => {
    setError("");

    // Check file type.
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setSelectedFile(null);

      setError("Please upload a PDF or DOCX file.");

      return false;
    }

    // Check maximum file size.
    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);

      setError("File size must be 5 MB or smaller.");

      return false;
    }

    setSelectedFile(file);

    return true;
  };

  /**
   * Normal file picker.
   */
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    validateFile(file);
  };

  /**
   * Drag over upload area.
   */
  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setDragActive(true);
  };

  /**
   * Drag leaves upload area.
   */
  const handleDragLeave = () => {
    setDragActive(false);
  };

  /**
   * File dropped into upload area.
   */
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    validateFile(file);
  };

  /**
   * Remove selected file.
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");

    // Reset native file input.
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Start CV analysis.
   *
   * CURRENT:
   * This only demonstrates the frontend flow.
   *
   * BACKEND HANDOFF:
   *
   * Replace/extend this section when the backend API is ready.
   *
   * Expected flow:
   *
   * 1. User uploads CV.
   *
   * 2. Backend checks guest/authenticated user.
   *
   * 3. Backend checks the guest's allowed usage count.
   *
   * 4. Backend receives the CV.
   *
   * 5. Backend stores it in PRIVATE Supabase Storage.
   *
   * 6. Backend creates resume record.
   *
   * 7. Backend starts analysis.
   *
   * 8. Backend returns analysis ID.
   *
   * 9. Frontend navigates to analysis/results page.
   *
   * IMPORTANT:
   *
   * DO NOT implement the real 3-analysis limit using:
   * - localStorage
   * - cookies controlled only by frontend
   * - React state
   *
   * The backend must enforce the actual limit.
   */
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select your CV first.");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      /**
       * ==========================================================
       * TODO: BACKEND INTEGRATION
       * ==========================================================
       *
       * Example:
       *
       * const formData = new FormData();
       * formData.append("file", selectedFile);
       *
       * const response = await fetch("/api/resumes", {
       *   method: "POST",
       *   body: formData,
       * });
       *
       * const resume = await response.json();
       *
       * Then:
       *
       * const analysisResponse = await fetch("/api/analyze", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     resumeId: resume.id,
       *   }),
       * });
       *
       * Backend API contract:
       *
       * POST /api/resumes
       * POST /api/analyze
       * GET  /api/analysis/:id
       *
       * The backend developer should replace this demo
       * behavior with the real API implementation.
       */

      await new Promise((resolve) => setTimeout(resolve, 700));

      onAnalyze?.(selectedFile);
    } catch {
      /**
       * Never expose internal backend errors directly to users.
       * Backend should return safe/public error messages.
       */
      setError(
        "Something went wrong while starting the analysis.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================
          OUTER UPLOAD CARD
          ========================================================= */}

      <div className="skillmatch-glow rounded-3xl border border-border bg-card p-3">
        <div className="rounded-2xl border border-dashed border-border bg-background p-6 sm:p-8">

          {/* =====================================================
              DROP ZONE
              ===================================================== */}

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl px-5 py-12 text-center transition-all sm:px-8 ${
              dragActive
                ? "bg-primary/5 ring-2 ring-primary/30"
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

            {/* Title */}
            <h2 className="mt-5 text-xl font-bold">
              {selectedFile
                ? selectedFile.name
                : "Upload your CV"}
            </h2>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {selectedFile
                ? "Your CV passed the basic frontend validation."
                : "Drag and drop your CV here, or click to browse your files."}
            </p>

            {/* Supported formats */}
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

            {/* =================================================
                NATIVE FILE INPUT

                SECURITY:
                "accept" only filters the browser picker.
                It does NOT provide real security.
                Backend validation is mandatory.
                ================================================= */}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* =====================================================
              SELECTED FILE
              ===================================================== */}

          {selectedFile && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>

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
                className="ml-3 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                aria-label="Remove selected CV"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* =====================================================
              ERROR MESSAGE
              ===================================================== */}

          {error && (
            <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
              {error}
            </div>
          )}

          {/* =====================================================
              ANALYZE BUTTON
              ===================================================== */}

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

          {/* =====================================================
              PRIVACY NOTICE
              ===================================================== */}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Your CV stays private and secure.
          </div>

        </div>
      </div>
    </div>
  );
}
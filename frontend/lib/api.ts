/**
 * SkillMatch AI - Frontend API Client
 *
 * PURPOSE:
 * This file keeps all backend API communication in one place.
 *
 * IMPORTANT FOR BACKEND DEVELOPER:
 * Frontend components should NOT contain random fetch() calls.
 * When the backend API is ready, update the endpoint/base URL here.
 *
 * SECURITY:
 * - Never put Supabase secret/service-role keys here.
 * - Never put Gemini/API provider secret keys in frontend code.
 * - Authentication should be handled using the user's authenticated session.
 * - Backend MUST validate ownership, file type, file size and permissions.
 */

// ============================================================
// API BASE URL
// ============================================================
//
// BACKEND DEVELOPER:
// Replace this environment variable with the deployed backend URL.
//
// Example:
// NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com
//
// For local development, your friend can configure the value
// inside frontend/.env.local.
//
// DO NOT hardcode secret keys here.
//
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// ============================================================
// COMMON API RESPONSE TYPES
// ============================================================

export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// ============================================================
// RESUME TYPES
// ============================================================

export interface ResumeUploadResponse {
  id: string;
  fileName: string;
  status: "uploaded" | "processing" | "failed";
}

/**
 * Upload CV metadata/file.
 *
 * BACKEND ENDPOINT:
 * POST /api/resumes
 *
 * BACKEND RESPONSIBILITIES:
 * - Authenticate user / identify guest session
 * - Validate PDF/DOCX
 * - Validate maximum 5 MB
 * - Store file securely
 * - Verify ownership
 * - Never expose private storage URLs publicly
 */
export async function uploadResume(
  file: File
): Promise<ApiResponse<ResumeUploadResponse>> {
  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/resumes`, {
      method: "POST",

      // IMPORTANT:
      // Do NOT manually set Content-Type for FormData.
      // The browser automatically creates the correct multipart boundary.
      body: formData,

      // BACKEND AUTH:
      // When Supabase authentication is connected,
      // the authenticated session/token should be included here
      // according to the final backend authentication architecture.
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: result?.message || "CV upload failed.",
          code: result?.code,
        },
      };
    }

    return {
      data: result,
    };
  } catch {
    return {
      error: {
        message: "Unable to connect to the backend.",
      },
    };
  }
}

// ============================================================
// ANALYSIS TYPES
// ============================================================

export interface AnalysisResponse {
  id: string;

  status: "pending" | "processing" | "completed" | "failed";

  summary: {
    skillsDetected: number;
    jobMatches: number;
    skillsToImprove: number;
  };

  skills: {
    id: string;
    name: string;
    proficiency: number;
    confidence: number;
  }[];

  jobMatches: {
    jobId: string;
    title: string;
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
  }[];

  skillGaps: {
    skill: string;
    priority: "high" | "medium" | "low";
    currentLevel: number;
    requiredLevel: number;
  }[];
}

/**
 * Start CV analysis.
 *
 * BACKEND ENDPOINT:
 * POST /api/analyze
 *
 * SECURITY:
 * The backend must NOT trust the resumeId sent by the frontend.
 * It must verify that the resume belongs to the current user/session.
 *
 * BACKEND SHOULD ALSO:
 * - Apply guest analysis limit
 * - Apply rate limiting
 * - Prevent duplicate abuse
 * - Validate request body
 * - Treat CV text as untrusted input
 */
export async function analyzeResume(
  resumeId: string
): Promise<ApiResponse<{ analysisId: string; status: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        resumeId,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: result?.message || "Analysis could not be started.",
          code: result?.code,
        },
      };
    }

    return {
      data: result,
    };
  } catch {
    return {
      error: {
        message: "Unable to connect to the backend.",
      },
    };
  }
}

// ============================================================
// GET ANALYSIS RESULT
// ============================================================

/**
 * Get completed analysis.
 *
 * BACKEND ENDPOINT:
 * GET /api/analysis/:id
 *
 * BACKEND SECURITY:
 * Only return an analysis if it belongs to the authenticated user.
 */
export async function getAnalysis(
  analysisId: string
): Promise<ApiResponse<AnalysisResponse>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/analysis/${analysisId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: result?.message || "Unable to load analysis.",
          code: result?.code,
        },
      };
    }

    return {
      data: result,
    };
  } catch {
    return {
      error: {
        message: "Unable to connect to the backend.",
      },
    };
  }
}

// ============================================================
// HISTORY
// ============================================================

/**
 * Get user's previous CV analyses.
 *
 * BACKEND ENDPOINT:
 * GET /api/history
 *
 * SECURITY:
 * Backend must return ONLY the current user's records.
 */
export async function getAnalysisHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/history`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: result?.message || "Unable to load history.",
          code: result?.code,
        },
      };
    }

    return {
      data: result,
    };
  } catch {
    return {
      error: {
        message: "Unable to connect to the backend.",
      },
    };
  }
}

// ============================================================
// ROADMAP
// ============================================================

/**
 * Generate a roadmap for the user's dream job.
 *
 * BACKEND ENDPOINT:
 * POST /api/roadmaps
 *
 * Example request:
 * {
 *   targetJob: "Machine Learning Engineer",
 *   analysisId: "uuid"
 * }
 *
 * BACKEND SECURITY:
 * - Validate targetJob
 * - Verify analysis ownership
 * - Rate-limit roadmap generation
 * - Validate AI-generated output before storing
 */
export async function generateRoadmap(
  targetJob: string,
  analysisId: string
) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roadmaps`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        targetJob,
        analysisId,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: result?.message || "Unable to generate roadmap.",
          code: result?.code,
        },
      };
    }

    return {
      data: result,
    };
  } catch {
    return {
      error: {
        message: "Unable to connect to the backend.",
      },
    };
  }
}

/**
 * Get a previously generated roadmap.
 *
 * BACKEND ENDPOINT:
 * GET /api/roadmaps/:id
 */
export async function getRoadmap(roadmapId: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/roadmaps/${roadmapId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: result?.message || "Unable to load roadmap.",
          code: result?.code,
        },
      };
    }

    return {
      data: result,
    };
  } catch {
    return {
      error: {
        message: "Unable to connect to the backend.",
      },
    };
  }
}
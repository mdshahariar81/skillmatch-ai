/**
 * SkillMatch AI - Frontend API Client
 *
 * Talks directly to Supabase (Auth, Storage, Database, Edge Functions).
 * Function names/signatures kept identical to the original design so
 * components (CVUpload, AnalysisDashboard) don't need changes.
 */

import { supabase } from "./supabase";

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
// TEXT EXTRACTION (client-side, doc section 22-23)
// ============================================================

async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === "application/pdf") {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
    }
    return fullText;
  }

  // DOCX
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

// ============================================================
// RESUME TYPES
// ============================================================

export interface ResumeUploadResponse {
  id: string;
  fileName: string;
  status: "uploaded" | "processing" | "failed";
}

export async function uploadResume(
  file: File
): Promise<ApiResponse<ResumeUploadResponse>> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: { message: "You must be logged in to upload a CV." } };
    }

    // Extract text client-side (recommended MVP approach, doc section 23)
    let extractedText: string;
    try {
      extractedText = await extractTextFromFile(file);
    } catch {
      return { error: { message: "Could not read text from this file." } };
    }

    if (!extractedText.trim()) {
      return { error: { message: "No readable text found in this CV." } };
    }

    // Upload the original file to private storage
    const storagePath = `${user.id}/${crypto.randomUUID()}/${file.name}`;
    const { error: storageError } = await supabase.storage
      .from("resumes")
      .upload(storagePath, file);

    if (storageError) {
      return { error: { message: "File upload failed: " + storageError.message } };
    }

    // Save resume record with extracted text
    const { data: resume, error: dbError } = await supabase
      .from("resumes")
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: storagePath,
        extracted_text: extractedText,
      })
      .select()
      .single();

    if (dbError || !resume) {
      return { error: { message: "Could not save resume: " + dbError?.message } };
    }

    return {
      data: { id: resume.id, fileName: resume.file_name, status: "uploaded" },
    };
  } catch {
    return { error: { message: "Unable to connect to the backend." } };
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
    aiSummary?: string | null;
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

export async function analyzeResume(
  resumeId: string
): Promise<ApiResponse<{ analysisId: string; status: string }>> {
  try {
    const { data, error } = await supabase.functions.invoke("analyze-cv", {
      body: { resumeId },
    });

    if (error) {
      return { error: { message: "Analysis could not be started: " + error.message } };
    }

    return { data: { analysisId: data.id, status: data.status } };
  } catch {
    return { error: { message: "Unable to connect to the backend." } };
  }
}

// ============================================================
// GET ANALYSIS RESULT
// ============================================================

export async function getAnalysis(
  analysisId: string
): Promise<ApiResponse<AnalysisResponse>> {
  try {
    const { data: analysis, error } = await supabase
      .from("analyses")
      .select(`
        id, status, overall_score, summary,
        detected_skills ( skill_id, proficiency, confidence, skills(name) ),
        job_matches ( job_role_id, match_score, matched_skills, missing_skills, job_roles(title) ),
        skill_gaps ( skill_id, current_level, required_level, priority, skills(name) )
      `)
      .eq("id", analysisId)
      .single();

    if (error || !analysis) {
      return { error: { message: "Unable to load analysis." } };
    }

    const result: AnalysisResponse = {
      id: analysis.id,
      status: analysis.status,
      summary: {
        skillsDetected: analysis.summary?.skillsDetected ?? 0,
        jobMatches: analysis.summary?.jobMatches ?? 0,
        skillsToImprove: analysis.summary?.skillsToImprove ?? 0,
        aiSummary: analysis.summary?.aiSummary ?? null,
      },
      skills: (analysis.detected_skills ?? []).map((s: any) => ({
        id: s.skill_id,
        name: s.skills?.name ?? "Unknown",
        proficiency: s.proficiency,
        confidence: s.confidence,
      })),
      jobMatches: (analysis.job_matches ?? []).map((j: any) => ({
        jobId: j.job_role_id,
        title: j.job_roles?.title ?? "Unknown",
        score: j.match_score,
        matchedSkills: j.matched_skills ?? [],
        missingSkills: j.missing_skills ?? [],
      })),
      skillGaps: (analysis.skill_gaps ?? []).map((g: any) => ({
        skill: g.skills?.name ?? "Unknown",
        priority: g.priority,
        currentLevel: g.current_level,
        requiredLevel: g.required_level,
      })),
    };

    return { data: result };
  } catch {
    return { error: { message: "Unable to connect to the backend." } };
  }
}

// ============================================================
// HISTORY
// ============================================================

export async function getAnalysisHistory() {
  try {
    const { data, error } = await supabase.functions.invoke("get-history");

    if (error) {
      return { error: { message: "Unable to load history: " + error.message } };
    }

    return { data };
  } catch {
    return { error: { message: "Unable to connect to the backend." } };
  }
}

// ============================================================
// ROADMAP
// ============================================================

export async function generateRoadmap(targetJob: string, analysisId: string) {
  try {
    const { data, error } = await supabase.functions.invoke("generate-roadmap", {
      body: { targetJob, analysisId },
    });

    if (error) {
      return { error: { message: "Unable to generate roadmap: " + error.message } };
    }

    return { data };
  } catch {
    return { error: { message: "Unable to connect to the backend." } };
  }
}

export async function getRoadmap(roadmapId: string) {
  try {
    const { data: roadmap, error } = await supabase
      .from("roadmaps")
      .select(`
        id, target_job,
        roadmap_steps ( step_number, title, status )
      `)
      .eq("id", roadmapId)
      .single();

    if (error || !roadmap) {
      return { error: { message: "Unable to load roadmap." } };
    }

    return {
      data: {
        roadmapId: roadmap.id,
        targetJob: roadmap.target_job,
        steps: (roadmap.roadmap_steps ?? []).sort(
          (a: any, b: any) => a.step_number - b.step_number
        ),
      },
    };
  } catch {
    return { error: { message: "Unable to connect to the backend." } };
  }
}
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  useCase: string;
  companySize: string;
  location: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  ogImage: string;
  heroStat: string;
  heroStatLabel: string;
  tags: string[];
  content: string;
}

function parseFile(filename: string): CaseStudy | null {
  try {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    if (!data.slug) return null;
    return {
      slug: data.slug as string,
      title: data.title as string,
      industry: data.industry as string,
      useCase: data.useCase as string,
      companySize: (data.companySize as string) || "",
      location: (data.location as string) || "",
      metaTitle: (data.metaTitle as string) || (data.title as string),
      metaDescription: data.metaDescription as string,
      canonical: data.canonical as string,
      ogImage: (data.ogImage as string) || "",
      heroStat: data.heroStat as string,
      heroStatLabel: data.heroStatLabel as string,
      tags: (data.tags as string[]) || [],
      content,
    };
  } catch {
    return null;
  }
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];
  const files = fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".md"));
  return files
    .map((f) => parseFile(f))
    .filter((p): p is CaseStudy => p !== null)
    .sort((a, b) => a.industry.localeCompare(b.industry));
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return null;
  const files = fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".md"));
  for (const filename of files) {
    const study = parseFile(filename);
    if (study?.slug === slug) return study;
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllCaseStudies().map((s) => s.slug);
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return getAllCaseStudies().filter((s) => s.industry === industry);
}

export function getAllIndustries(): string[] {
  const industries = getAllCaseStudies().map((s) => s.industry);
  return Array.from(new Set(industries));
}

export function getRelatedCaseStudies(
  currentSlug: string,
  limit = 3,
): CaseStudy[] {
  const current = getCaseStudyBySlug(currentSlug);
  if (!current) return [];
  const all = getAllCaseStudies().filter((s) => s.slug !== currentSlug);
  const sameIndustry = all.filter((s) => s.industry === current.industry);
  const others = all.filter((s) => s.industry !== current.industry);
  return [...sameIndustry, ...others].slice(0, limit);
}

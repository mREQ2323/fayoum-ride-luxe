// Yoast-style algorithmic SEO analyzer. Pure client-safe TS, zero AI calls.

export type SeoCheckStatus = "good" | "ok" | "bad";

export interface SeoCheck {
  key: string;
  label: string;
  status: SeoCheckStatus;
  detail: string;
  weight: number;
}

export interface SeoReport {
  score: number; // 0..100
  grade: "ممتاز" | "جيد" | "ضعيف";
  checks: SeoCheck[];
  stats: {
    words: number;
    sentences: number;
    paragraphs: number;
    headings: number;
    internalLinks: number;
    externalLinks: number;
    images: number;
    keywordDensity: number; // %
    titleLength: number;
    descLength: number;
  };
}

export interface SeoInput {
  title: string;
  description: string;
  keyword: string; // focus keyword
  bodyText: string; // combined body without HTML
  headings: string[];
  internalLinkCount: number;
  externalLinkCount: number;
  imageCount: number;
}

function countWords(t: string) {
  return t.trim().split(/\s+/).filter(Boolean).length;
}
function countSentences(t: string) {
  return t.split(/[.!?…؟।]+/).map((s) => s.trim()).filter(Boolean).length;
}
function includesCI(hay: string, needle: string) {
  if (!needle) return false;
  return hay.toLocaleLowerCase().includes(needle.toLocaleLowerCase());
}
function countOccurrences(hay: string, needle: string) {
  if (!needle) return 0;
  const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(esc, "gi");
  return (hay.match(re) || []).length;
}

export function analyzeSeo(input: SeoInput): SeoReport {
  const words = countWords(input.bodyText);
  const sentences = countSentences(input.bodyText);
  const paragraphs = input.bodyText.split(/\n\n+/).filter((p) => p.trim()).length || 1;
  const kwOccurrences = countOccurrences(input.bodyText, input.keyword);
  const density = words > 0 ? (kwOccurrences / words) * 100 : 0;

  const checks: SeoCheck[] = [];

  // Title length
  const tl = input.title.length;
  checks.push({
    key: "title-length",
    label: "طول عنوان الصفحة",
    status: tl >= 40 && tl <= 65 ? "good" : tl >= 30 && tl <= 75 ? "ok" : "bad",
    detail: `${tl} حرف (المثالي بين 40 و65).`,
    weight: 10,
  });

  // Description length
  const dl = input.description.length;
  checks.push({
    key: "desc-length",
    label: "طول الوصف الميتا",
    status: dl >= 120 && dl <= 160 ? "good" : dl >= 90 && dl <= 180 ? "ok" : "bad",
    detail: `${dl} حرف (المثالي بين 120 و160).`,
    weight: 10,
  });

  // Focus keyword in title
  checks.push({
    key: "kw-in-title",
    label: "الكلمة المفتاحية في العنوان",
    status: includesCI(input.title, input.keyword) ? "good" : "bad",
    detail: includesCI(input.title, input.keyword)
      ? "الكلمة المفتاحية موجودة في العنوان."
      : "لم يتم العثور على الكلمة المفتاحية في العنوان.",
    weight: 12,
  });

  // Focus keyword in description
  checks.push({
    key: "kw-in-desc",
    label: "الكلمة المفتاحية في الوصف",
    status: includesCI(input.description, input.keyword) ? "good" : "bad",
    detail: includesCI(input.description, input.keyword)
      ? "الكلمة المفتاحية موجودة في الوصف الميتا."
      : "الكلمة المفتاحية غير موجودة في الوصف.",
    weight: 8,
  });

  // Focus keyword in first paragraph
  const firstPara = input.bodyText.split(/\n\n+/)[0] ?? "";
  checks.push({
    key: "kw-in-intro",
    label: "الكلمة المفتاحية في المقدمة",
    status: includesCI(firstPara, input.keyword) ? "good" : "bad",
    detail: includesCI(firstPara, input.keyword)
      ? "الكلمة المفتاحية ظهرت في أول فقرة."
      : "لا توجد الكلمة المفتاحية في أول فقرة.",
    weight: 8,
  });

  // Keyword in headings
  const kwInHeading = input.headings.some((h) => includesCI(h, input.keyword));
  checks.push({
    key: "kw-in-headings",
    label: "الكلمة المفتاحية في العناوين الفرعية",
    status: kwInHeading ? "good" : "ok",
    detail: kwInHeading
      ? "الكلمة المفتاحية ظهرت في أحد العناوين الفرعية."
      : "لا توجد الكلمة المفتاحية في أي عنوان فرعي.",
    weight: 8,
  });

  // Keyword density
  checks.push({
    key: "kw-density",
    label: "كثافة الكلمة المفتاحية",
    status: density >= 0.5 && density <= 3 ? "good" : density > 0 && density < 4 ? "ok" : "bad",
    detail: `${density.toFixed(2)}٪ (المثالي بين 0.5 و2.5٪).`,
    weight: 8,
  });

  // Word count
  checks.push({
    key: "word-count",
    label: "طول المقال",
    status: words >= 600 ? "good" : words >= 300 ? "ok" : "bad",
    detail: `${words} كلمة (يفضل 600+).`,
    weight: 10,
  });

  // Headings count
  checks.push({
    key: "headings",
    label: "استخدام العناوين الفرعية",
    status: input.headings.length >= 3 ? "good" : input.headings.length >= 1 ? "ok" : "bad",
    detail: `${input.headings.length} عناوين فرعية (يفضل 3+).`,
    weight: 6,
  });

  // Internal links
  checks.push({
    key: "internal-links",
    label: "روابط داخلية",
    status: input.internalLinkCount >= 2 ? "good" : input.internalLinkCount >= 1 ? "ok" : "bad",
    detail: `${input.internalLinkCount} رابط داخلي (يفضل 2+).`,
    weight: 6,
  });

  // External links
  checks.push({
    key: "external-links",
    label: "روابط خارجية موثوقة",
    status: input.externalLinkCount >= 1 ? "good" : "bad",
    detail: `${input.externalLinkCount} رابط خارجي (يفضل 1+).`,
    weight: 4,
  });

  // Images
  checks.push({
    key: "images",
    label: "صور المقال",
    status: input.imageCount >= 1 ? "good" : "bad",
    detail: `${input.imageCount} صور (يفضل صورة واحدة على الأقل).`,
    weight: 4,
  });

  // Readability: avg words/sentence
  const wps = sentences > 0 ? words / sentences : 0;
  checks.push({
    key: "readability",
    label: "سهولة القراءة",
    status: wps > 0 && wps <= 20 ? "good" : wps <= 26 ? "ok" : "bad",
    detail: `${wps.toFixed(1)} كلمة/جملة (يفضل ≤20).`,
    weight: 6,
  });

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.reduce(
    (s, c) => s + (c.status === "good" ? c.weight : c.status === "ok" ? c.weight * 0.5 : 0),
    0,
  );
  const score = Math.round((earned / totalWeight) * 100);
  const grade: SeoReport["grade"] = score >= 80 ? "ممتاز" : score >= 55 ? "جيد" : "ضعيف";

  return {
    score,
    grade,
    checks,
    stats: {
      words,
      sentences,
      paragraphs,
      headings: input.headings.length,
      internalLinks: input.internalLinkCount,
      externalLinks: input.externalLinkCount,
      images: input.imageCount,
      keywordDensity: Number(density.toFixed(2)),
      titleLength: tl,
      descLength: dl,
    },
  };
}

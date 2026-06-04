import rawJson from "./articles.json";

// Hero + inline images per article slug (built at module load via Vite eager glob)
const imageModules = import.meta.glob<{ default: string }>(
  "../assets/blog/*.jpg",
  { eager: true },
);

type ArticleSection = { heading: string; body: string };
type ArticleTable = { title: string; headers: string[]; rows: string[][] };
type ArticleFaq = { q: string; a: string };

export interface ArticleContent {
  title: string;
  description: string;
  intro: string;
  sections: ArticleSection[];
  table: ArticleTable;
  tips: string[];
  faqs: ArticleFaq[];
  conclusion: string;
}

export interface Article {
  slug: string;
  keywords_ar: string;
  keywords_en: string;
  ar: ArticleContent;
  en: ArticleContent;
  images: string[]; // [hero, inline1, ...]
}

function imagesFor(slug: string): string[] {
  return Object.entries(imageModules)
    .filter(([path]) => path.includes(`/${slug}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

const raw = rawJson as unknown as Omit<Article, "images">[];

export const articles: Article[] = raw.map((a) => ({
  ...a,
  images: imagesFor(a.slug),
}));

export const articlesBySlug: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
);

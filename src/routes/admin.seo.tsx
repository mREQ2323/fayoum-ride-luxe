import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import { analyzeSeo, type SeoInput, type SeoReport } from "@/lib/seo-analyzer";
import { CheckCircle2, AlertTriangle, XCircle, Gauge, Search } from "lucide-react";

export const Route = createFileRoute("/admin/seo")({
  component: SeoTool,
});

type ContentItem = {
  id: string;
  kind: "blog" | "guide";
  title: string;
  description: string;
  keyword: string;
  body: string;
  headings: string[];
  internalLinks: number;
  externalLinks: number;
  images: number;
};

function useContentItems(): ContentItem[] {
  return useMemo(() => {
    const blogs: ContentItem[] = articles.map((a) => ({
      id: `blog:${a.slug}`,
      kind: "blog",
      title: a.ar.title,
      description: a.ar.description,
      keyword: a.keywords_ar.split(",")[0]?.trim() ?? "",
      body: [
        a.ar.intro,
        ...a.ar.sections.map((s) => s.body),
        ...a.ar.tips,
        ...a.ar.faqs.flatMap((f) => [f.q, f.a]),
        a.ar.conclusion,
      ].join("\n\n"),
      headings: a.ar.sections.map((s) => s.heading),
      internalLinks: 3, // related-articles block
      externalLinks: 0,
      images: (a.images || []).length,
    }));
    const gs: ContentItem[] = guides.map((g) => ({
      id: `guide:${g.slug}`,
      kind: "guide",
      title: g.title,
      description: g.description,
      keyword: g.keywords.split(",")[0]?.trim() ?? "",
      body: [
        g.intro,
        ...g.sections.map((s) => s.body),
        ...g.tips,
        ...g.faqs.flatMap((f) => [f.q, f.a]),
      ].join("\n\n"),
      headings: g.sections.map((s) => s.heading),
      internalLinks: (g.relatedSlugs?.length ?? 0) + 2,
      externalLinks: g.sections.filter((s) => s.wiki).length,
      images: 1,
    }));
    return [...gs, ...blogs];
  }, []);
}

function SeoTool() {
  const items = useContentItems();
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [q, setQ] = useState("");
  const [customKeyword, setCustomKeyword] = useState<string>("");

  const filtered = useMemo(
    () => items.filter((i) => i.title.includes(q) || i.id.includes(q.toLowerCase())),
    [items, q],
  );

  const current = items.find((i) => i.id === selectedId) ?? items[0];
  const report: SeoReport | null = useMemo(() => {
    if (!current) return null;
    const input: SeoInput = {
      title: current.title,
      description: current.description,
      keyword: (customKeyword || current.keyword).trim(),
      bodyText: current.body,
      headings: current.headings,
      internalLinkCount: current.internalLinks,
      externalLinkCount: current.externalLinks,
      imageCount: current.images,
    };
    return analyzeSeo(input);
  }, [current, customKeyword]);

  const avgScore = useMemo(() => {
    const total = items.reduce((sum, it) => {
      const r = analyzeSeo({
        title: it.title,
        description: it.description,
        keyword: it.keyword,
        bodyText: it.body,
        headings: it.headings,
        internalLinkCount: it.internalLinks,
        externalLinkCount: it.externalLinks,
        imageCount: it.images,
      });
      return sum + r.score;
    }, 0);
    return items.length ? Math.round(total / items.length) : 0;
  }, [items]);

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-6">
        <Gauge className="size-6 text-gold" />
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">أدوات السيو</h1>
          <p className="text-sm text-muted-foreground">
            تحليل خوارزمي فوري لكل مقال — بدون استهلاك أي رصيد AI.
          </p>
        </div>
        <div className="mr-auto text-center">
          <div className="text-xs text-muted-foreground mb-0.5">متوسط السيو</div>
          <ScoreBadge score={avgScore} size="sm" />
        </div>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gold" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="بحث في المقالات..."
              className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-onyx/60 gold-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div className="max-h-[70vh] overflow-y-auto space-y-1.5 pr-1">
            {filtered.map((i) => {
              const active = i.id === selectedId;
              return (
                <button
                  key={i.id}
                  onClick={() => {
                    setSelectedId(i.id);
                    setCustomKeyword("");
                  }}
                  className={`w-full text-right p-3 rounded-xl text-sm transition-colors cursor-pointer ${
                    active
                      ? "bg-gold/15 text-gold gold-border"
                      : "bg-card/60 gold-border hover:bg-gold/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {i.kind === "blog" ? "مقال" : "دليل"}
                    </span>
                  </div>
                  <div className="font-semibold line-clamp-2">{i.title}</div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                لا توجد نتائج.
              </div>
            )}
          </div>
        </div>

        {current && report && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-card gold-border p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    {current.kind === "blog" ? "مقال مدونة" : "دليل"}
                  </div>
                  <h2 className="text-xl font-bold truncate">{current.title}</h2>
                </div>
                <ScoreBadge score={report.score} />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <label className="text-xs text-muted-foreground">الكلمة المفتاحية:</label>
                <input
                  value={customKeyword || current.keyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  className="flex-1 min-w-40 px-3 py-1.5 rounded-lg bg-onyx/60 gold-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                <button
                  onClick={() => setCustomKeyword("")}
                  className="text-xs text-gold hover:underline cursor-pointer"
                >
                  إعادة تعيين
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                {[
                  { l: "كلمات", v: report.stats.words },
                  { l: "جمل", v: report.stats.sentences },
                  { l: "عناوين", v: report.stats.headings },
                  { l: "كثافة الكلمة", v: `${report.stats.keywordDensity}٪` },
                  { l: "عنوان", v: `${report.stats.titleLength} حرف` },
                  { l: "وصف", v: `${report.stats.descLength} حرف` },
                  { l: "روابط داخلية", v: report.stats.internalLinks },
                  { l: "روابط خارجية", v: report.stats.externalLinks },
                ].map((s) => (
                  <div key={s.l} className="p-2.5 rounded-lg bg-onyx/40">
                    <div className="text-[10px] text-muted-foreground">{s.l}</div>
                    <div className="text-sm font-bold text-gold">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-card gold-border p-6">
              <h3 className="font-bold mb-4 text-lg">قائمة الفحوصات</h3>
              <ul className="space-y-2.5">
                {report.checks.map((c) => (
                  <li
                    key={c.key}
                    className="flex items-start gap-3 p-3 rounded-lg bg-onyx/30 hover:bg-onyx/50 transition-colors"
                  >
                    <StatusIcon s={c.status} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{c.label}</div>
                      <div className="text-xs text-muted-foreground">{c.detail}</div>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 mt-1">
                      وزن {c.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" }) {
  const color =
    score >= 80 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
    : score >= 55 ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
    : "bg-red-500/20 text-red-400 border-red-500/40";
  const sz = size === "sm" ? "text-lg px-3 py-1" : "text-2xl px-4 py-2";
  return (
    <div className={`inline-flex items-baseline gap-1 rounded-xl border font-bold ${color} ${sz}`}>
      <span>{score}</span>
      <span className="text-xs opacity-70">/100</span>
    </div>
  );
}

function StatusIcon({ s }: { s: "good" | "ok" | "bad" }) {
  if (s === "good") return <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />;
  if (s === "ok") return <AlertTriangle className="size-5 text-amber-400 shrink-0 mt-0.5" />;
  return <XCircle className="size-5 text-red-400 shrink-0 mt-0.5" />;
}

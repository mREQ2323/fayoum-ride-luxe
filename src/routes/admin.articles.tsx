import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import { Copy, Download, FileEdit, FilePlus, Save, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/articles")({
  component: ArticlesAdmin,
});

interface Draft {
  id: string;
  kind: "blog" | "guide" | "new";
  title: string;
  description: string;
  keywords: string;
  body: string;
  updatedAt: number;
}

const LS_KEY = "admin-article-drafts-v1";

function loadDrafts(): Record<string, Draft> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveDrafts(all: Record<string, Draft>) {
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

function ArticlesAdmin() {
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  const items = useMemo(() => {
    const list = [
      ...guides.map((g) => ({
        id: `guide:${g.slug}`,
        kind: "guide" as const,
        title: g.title,
        description: g.description,
        keywords: g.keywords,
        body: [g.intro, ...g.sections.map((s) => `## ${s.heading}\n\n${s.body}`)].join("\n\n"),
      })),
      ...articles.map((a) => ({
        id: `blog:${a.slug}`,
        kind: "blog" as const,
        title: a.ar.title,
        description: a.ar.description,
        keywords: a.keywords_ar,
        body: [a.ar.intro, ...a.ar.sections.map((s) => `## ${s.heading}\n\n${s.body}`)].join("\n\n"),
      })),
    ];
    // Append new drafts
    Object.values(drafts)
      .filter((d) => d.kind === "new")
      .forEach((d) => list.unshift({ id: d.id, kind: "guide", title: d.title || "(بلا عنوان)", description: d.description, keywords: d.keywords, body: d.body }));
    return list;
  }, [drafts]);

  const active = items.find((i) => i.id === activeId) ?? items[0];
  const draft = active ? drafts[active.id] : undefined;

  const editing = useMemo(
    () => ({
      title: draft?.title ?? active?.title ?? "",
      description: draft?.description ?? active?.description ?? "",
      keywords: draft?.keywords ?? active?.keywords ?? "",
      body: draft?.body ?? active?.body ?? "",
    }),
    [draft, active],
  );

  function updateField(field: keyof Omit<Draft, "id" | "kind" | "updatedAt">, value: string) {
    if (!active) return;
    const next: Draft = {
      id: active.id,
      kind: active.id.startsWith("new:") ? "new" : (active.kind as "blog" | "guide"),
      title: editing.title,
      description: editing.description,
      keywords: editing.keywords,
      body: editing.body,
      [field]: value,
      updatedAt: Date.now(),
    };
    const all = { ...drafts, [active.id]: next };
    setDrafts(all);
    saveDrafts(all);
  }

  function newArticle() {
    const id = `new:${Date.now()}`;
    const next: Draft = {
      id,
      kind: "new",
      title: "مقال جديد",
      description: "",
      keywords: "",
      body: "## مقدمة\n\nاكتب المحتوى هنا...",
      updatedAt: Date.now(),
    };
    const all = { ...drafts, [id]: next };
    setDrafts(all);
    saveDrafts(all);
    setActiveId(id);
  }

  function deleteDraft(id: string) {
    const all = { ...drafts };
    delete all[id];
    setDrafts(all);
    saveDrafts(all);
    if (activeId === id) setActiveId("");
  }

  function copyJson() {
    if (!active) return;
    const payload = {
      id: active.id,
      title: editing.title,
      description: editing.description,
      keywords: editing.keywords,
      body: editing.body,
      updatedAt: Date.now(),
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function downloadJson() {
    const payload = { drafts };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "article-drafts.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FileEdit className="size-6 text-gold" />
          <div>
            <h1 className="text-3xl font-bold text-gradient-gold">إدارة المقالات</h1>
            <p className="text-sm text-muted-foreground">
              حرّر مقال أو أضف واحداً جديداً. المسودّات تُحفظ في متصفحك — استخدم زر التصدير لتسليمها للمطوّر لدمجها في الكود.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={downloadJson}
            className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-4 py-2 rounded-lg text-sm hover:bg-gold/10 transition cursor-pointer"
          >
            <Download className="size-4" />
            تصدير المسودات
          </button>
          <button
            onClick={newArticle}
            className="inline-flex items-center gap-2 bg-gradient-gold text-onyx px-4 py-2 rounded-lg text-sm font-bold shadow-gold hover:scale-105 transition cursor-pointer"
          >
            <FilePlus className="size-4" />
            مقال جديد
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-1.5 max-h-[75vh] overflow-y-auto pr-1">
          {items.map((i) => {
            const hasDraft = !!drafts[i.id];
            const isActive = i.id === (active?.id ?? "");
            return (
              <button
                key={i.id}
                onClick={() => setActiveId(i.id)}
                className={`w-full text-right p-3 rounded-xl text-sm transition-colors cursor-pointer ${
                  isActive ? "bg-gold/15 text-gold gold-border" : "bg-card/60 gold-border hover:bg-gold/5"
                }`}
              >
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {i.kind === "blog" ? "مقال" : "دليل"}
                  </span>
                  {hasDraft && (
                    <span className="text-[10px] font-bold text-gold bg-gold/10 px-1.5 py-0.5 rounded">
                      مسودة
                    </span>
                  )}
                </div>
                <div className="font-semibold line-clamp-2">{i.title}</div>
              </button>
            );
          })}
        </aside>

        {active && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-card gold-border p-6 space-y-4">
              <Field label="العنوان">
                <input
                  value={editing.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="الوصف الميتا (Description)">
                <textarea
                  value={editing.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={2}
                  className="input"
                />
                <Counter n={editing.description.length} min={120} max={160} />
              </Field>
              <Field label="الكلمات المفتاحية (مفصولة بفاصلة)">
                <input
                  value={editing.keywords}
                  onChange={(e) => updateField("keywords", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="المحتوى (Markdown مبسط)">
                <textarea
                  value={editing.body}
                  onChange={(e) => updateField("body", e.target.value)}
                  rows={16}
                  className="input font-mono text-sm leading-relaxed"
                />
              </Field>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={copyJson}
                  className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-4 py-2 rounded-lg text-sm hover:bg-gold/10 transition cursor-pointer"
                >
                  <Copy className="size-4" />
                  {copied ? "تم النسخ ✓" : "نسخ JSON"}
                </button>
                <span className="inline-flex items-center gap-2 text-xs text-emerald-400">
                  <Save className="size-3.5" />
                  المسودة محفوظة تلقائياً
                </span>
                {drafts[active.id] && (
                  <button
                    onClick={() => deleteDraft(active.id)}
                    className="mr-auto inline-flex items-center gap-2 text-destructive/90 hover:bg-destructive/10 px-3 py-2 rounded-lg text-xs cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                    حذف المسودة
                  </button>
                )}
                <Link
                  to="/admin/seo"
                  className="text-xs text-gold hover:underline"
                >
                  تحليل السيو للمقال ←
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 text-amber-200/90 text-xs p-4 leading-relaxed">
              ⚠️ ملاحظة: التخزين حالياً محلي في متصفحك للسرعة والخصوصية. لتفعيل النشر المباشر
              على الموقع (بدون تدخل يدوي) نحتاج تفعيل قاعدة بيانات — أخبرني عندما تريد ذلك.
            </div>
          </div>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: color-mix(in oklab, var(--onyx) 60%, transparent);
          border: 1px solid color-mix(in oklab, var(--gold) 30%, transparent);
          color: var(--foreground);
          outline: none;
        }
        .input:focus {
          box-shadow: 0 0 0 2px color-mix(in oklab, var(--gold) 40%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-2 text-foreground/90">{label}</span>
      {children}
    </label>
  );
}

function Counter({ n, min, max }: { n: number; min: number; max: number }) {
  const status = n >= min && n <= max ? "text-emerald-400" : n > 0 ? "text-amber-400" : "text-muted-foreground";
  return (
    <div className={`text-[11px] mt-1 ${status}`}>
      {n} حرف — المثالي {min}–{max}
    </div>
  );
}

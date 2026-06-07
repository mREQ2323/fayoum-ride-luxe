import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import {
  Instagram,
  ExternalLink,
  Facebook,
  Twitter,
  Share2,
  Play,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { fetchSocialMeta } from "@/lib/social-feed.functions";

const SITE = "https://www.limousinefayoum.com";

// ⬇️ فقط ضع روابط المنشورات هنا. سيتم جلب الصور والعنوان تلقائيًا.
const INSTAGRAM_POSTS: string[] = [
  "https://www.instagram.com/mshwrk3lynalemozin/",
];

const TIKTOK_POSTS: string[] = [
  // مثال: "https://www.tiktok.com/@muhammadsayed2088/video/1234567890",
];

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1.84-.08z" />
  </svg>
);
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "أحدث الأخبار | منشورات إنستجرام وتيك توك — ليموزين الفيوم" },
      {
        name: "description",
        content:
          "تابع أحدث منشوراتنا وفيديوهاتنا على إنستجرام وتيك توك لمشوارك علينا ليموزين الفيوم — رحلات VIP، توصيل مطارات، وأحدث العروض.",
      },
      { property: "og:title", content: "أحدث الأخبار — ليموزين الفيوم" },
      {
        property: "og:description",
        content: "تابعنا على إنستجرام وتيك توك لأحدث منشوراتنا وعروضنا.",
      },
      { property: "og:url", content: `${SITE}/news` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/news` }],
  }),
  component: () => (
    <LanguageProvider>
      <NewsPage />
    </LanguageProvider>
  ),
});

type PostMeta = Awaited<ReturnType<typeof fetchSocialMeta>>;

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title} — ${url}`);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${text}`,
      cls: "bg-[#25D366] hover:brightness-110",
      Icon: WhatsAppIcon,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      cls: "bg-[#1877F2] hover:brightness-110",
      Icon: Facebook,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      cls: "bg-black hover:brightness-125 border border-white/15",
      Icon: Twitter,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label}`}
          className={`inline-flex items-center justify-center size-9 rounded-full text-white transition-transform hover:scale-110 shadow ${l.cls}`}
        >
          <l.Icon className="size-4" />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="inline-flex items-center justify-center size-9 rounded-full gold-border text-gold hover:bg-gold hover:text-onyx transition-all"
      >
        {copied ? <Check className="size-4" /> : <LinkIcon className="size-4" />}
      </button>
    </div>
  );
}

function PostCard({
  meta,
  isLoading,
  fallbackUrl,
  platform,
  isAr,
}: {
  meta?: PostMeta;
  isLoading: boolean;
  fallbackUrl: string;
  platform: "instagram" | "tiktok";
  isAr: boolean;
}) {
  const url = meta?.url || fallbackUrl;
  const title =
    meta?.title ||
    (platform === "instagram"
      ? isAr
        ? "منشور إنستجرام"
        : "Instagram Post"
      : isAr
        ? "فيديو تيك توك"
        : "TikTok Video");
  const image = meta?.image;
  const author = meta?.author;

  const PlatformIcon = platform === "instagram" ? Instagram : TikTokIcon;
  const platformGradient =
    platform === "instagram"
      ? "from-[#f09433] via-[#dc2743] to-[#bc1888]"
      : "from-cyan-400 via-pink-500 to-rose-500";

  return (
    <article className="group rounded-2xl overflow-hidden bg-card gold-border hover:shadow-gold transition-all hover:-translate-y-1 flex flex-col">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-square overflow-hidden bg-onyx"
      >
        {isLoading ? (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-onyx via-card to-onyx" />
        ) : image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${platformGradient} flex items-center justify-center`}
          >
            <PlatformIcon className="size-16 text-white/90" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-transparent" />
        <span
          className={`absolute top-3 ${isAr ? "right-3" : "left-3"} inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${platformGradient} text-white text-[11px] font-bold shadow`}
        >
          <PlatformIcon className="size-3.5" />
          {platform === "instagram" ? "Instagram" : "TikTok"}
        </span>
        {platform === "tiktok" && image && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center justify-center size-14 rounded-full bg-black/50 backdrop-blur text-white group-hover:scale-110 transition-transform">
              <Play className="size-6 fill-white" />
            </span>
          </span>
        )}
      </a>

      <div className="p-5 flex flex-col flex-1">
        {author && (
          <p className="text-xs text-gold/80 mb-1.5 font-semibold">@{author}</p>
        )}
        <h3 className="text-base font-bold leading-snug mb-3 line-clamp-2 group-hover:text-gold transition-colors">
          {title}
        </h3>
        {meta?.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
            {meta.description}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold hover:underline"
          >
            {isAr ? "مشاهدة" : "View"}
            <ExternalLink className="size-3.5" />
          </a>
          <ShareButtons url={url} title={title} />
        </div>
      </div>
    </article>
  );
}

function NewsPage() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const fetchMeta = useServerFn(fetchSocialMeta);

  const allPosts = [
    ...INSTAGRAM_POSTS.map((url) => ({ url, platform: "instagram" as const })),
    ...TIKTOK_POSTS.map((url) => ({ url, platform: "tiktok" as const })),
  ];

  const queries = useQueries({
    queries: allPosts.map((p) => ({
      queryKey: ["social-meta", p.url],
      queryFn: () => fetchMeta({ data: { url: p.url } }),
      staleTime: 1000 * 60 * 30, // 30 min cache
      retry: 1,
    })),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full gold-border text-gold text-xs tracking-widest uppercase mb-5">
              {isAr ? "تابعنا" : "Follow Us"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5">
              <span className="text-gradient-gold">
                {isAr ? "أحدث الأخبار والمنشورات" : "Latest News & Posts"}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {isAr
                ? "تحديث تلقائي لأحدث رحلاتنا وعروضنا من إنستجرام وتيك توك — مع إمكانية المشاركة المباشرة عبر واتساب وفيسبوك وتويتر."
                : "Auto-updated feed from Instagram and TikTok — share instantly via WhatsApp, Facebook, and Twitter."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
              <a
                href="https://www.instagram.com/mshwrk3lynalemozin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg"
              >
                <Instagram className="size-4" />
                Instagram
                <ExternalLink className="size-3.5 opacity-80" />
              </a>
              <a
                href="https://www.tiktok.com/@muhammadsayed2088"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-onyx text-white border border-white/15 font-semibold text-sm hover:scale-105 transition-transform shadow-lg"
              >
                <TikTokIcon className="size-4" />
                TikTok
                <ExternalLink className="size-3.5 opacity-80" />
              </a>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full gold-border text-gold text-xs font-semibold">
                <Share2 className="size-3.5" />
                {isAr ? "مشاركة بنقرة واحدة" : "1-click share"}
              </span>
            </div>
          </div>

          {allPosts.length === 0 ? (
            <div className="rounded-2xl gold-border bg-card p-10 text-center max-w-xl mx-auto">
              <p className="text-muted-foreground">
                {isAr
                  ? "لا توجد منشورات حالياً. سيتم إضافتها قريباً."
                  : "No posts yet. Check back soon."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allPosts.map((p, i) => (
                <PostCard
                  key={p.url}
                  meta={queries[i].data}
                  isLoading={queries[i].isLoading}
                  fallbackUrl={p.url}
                  platform={p.platform}
                  isAr={isAr}
                />
              ))}
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground/70 mt-10">
            {isAr
              ? "يتم تحديث المحتوى تلقائياً من روابط المنشورات."
              : "Content auto-syncs from post URLs."}
          </p>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

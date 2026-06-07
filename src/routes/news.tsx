import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { fetchSocialMeta } from "@/lib/social-feed.functions";
import { Instagram, ExternalLink, Facebook, Twitter, Link as LinkIcon, Check, Play, X } from "lucide-react";

const SITE = "https://www.limousinefayoum.com";

// ⬇️ ضع روابط منشورات إنستجرام (Permalink لكل بوست)
const INSTAGRAM_POSTS: string[] = ["https://www.instagram.com/mshwrk3lynalemozin/"];

// ⬇️ ضع روابط فيديوهات تيك توك الكاملة
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

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title} — ${url}`);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${text}`,
      cls: "bg-[#25D366]",
      Icon: WhatsAppIcon,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      cls: "bg-[#1877F2]",
      Icon: Facebook,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      cls: "bg-black border border-white/15",
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
          onClick={(e) => e.stopPropagation()}
        >
          <l.Icon className="size-4" />
        </a>
      ))}
      <button
        onClick={(e) => {
          e.stopPropagation();
          copy();
        }}
        aria-label="Copy link"
        className="inline-flex items-center justify-center size-9 rounded-full gold-border text-gold hover:bg-gold hover:text-onyx transition-all"
      >
        {copied ? <Check className="size-4" /> : <LinkIcon className="size-4" />}
      </button>
    </div>
  );
}

function extractTikTokId(url: string): string | null {
  const m = url.match(/\/video\/(\d+)/);
  return m?.[1] ?? null;
}

function TikTokLightbox({ url, onClose }: { url: string; onClose: () => void }) {
  const id = extractTikTokId(url);

  useEffect(() => {
    const ttId = "tiktok-embed-script";
    if (!document.getElementById(ttId)) {
      const s = document.createElement("script");
      s.id = ttId;
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else {
      // re-trigger TikTok embed processing for the newly mounted blockquote
      const s = document.createElement("script");
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!id) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 size-11 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <X className="size-5" />
      </button>
      <div
        className="w-full max-w-[360px] max-h-[90vh] overflow-auto rounded-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id={id}
          style={{ maxWidth: "100%", minWidth: "260px", width: "100%" }}
        >
          <section />
        </blockquote>
      </div>
    </div>
  );
}

function TikTokCard({
  url,
  thumb,
  title,
  author,
  onOpen,
  isAr,
}: {
  url: string;
  thumb?: string;
  title?: string;
  author?: string;
  onOpen: () => void;
  isAr: boolean;
}) {
  return (
    <article className="rounded-2xl overflow-hidden gold-border bg-card flex flex-col group">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full aspect-[9/14] overflow-hidden bg-black"
        aria-label={isAr ? "تشغيل الفيديو" : "Play video"}
      >
        {thumb ? (
          <img
            src={thumb}
            alt={title || (isAr ? "فيديو تيك توك" : "TikTok video")}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-onyx via-black to-onyx" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="size-16 md:size-20 rounded-full bg-white/95 text-onyx flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
            <Play className="size-7 md:size-9 fill-current ml-1" />
          </span>
        </span>
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-semibold backdrop-blur">
          <TikTokIcon className="size-3" />
          TikTok
        </span>
        {(author || title) && (
          <span className="absolute bottom-3 left-3 right-3 text-white text-xs md:text-sm font-medium line-clamp-2 text-start">
            {author ? <span className="opacity-90">@{author} · </span> : null}
            {title}
          </span>
        )}
      </button>
      <div className="p-4 border-t border-white/5 flex items-center justify-between gap-3">
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold hover:underline"
        >
          <Play className="size-3.5 fill-current" />
          {isAr ? "تشغيل" : "Play"}
        </button>
        <ShareButtons url={url} title={isAr ? "فيديو تيك توك — ليموزين الفيوم" : "TikTok Video — Limousine Fayoum"} />
      </div>
    </article>
  );
}

function NewsPage() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [activeTikTok, setActiveTikTok] = useState<string | null>(null);
  const fetchMeta = useServerFn(fetchSocialMeta);

  const tiktokMetaQueries = useQueries({
    queries: TIKTOK_POSTS.map((url) => ({
      queryKey: ["tiktok-meta", url],
      queryFn: () => fetchMeta({ data: { url } }),
      staleTime: 1000 * 60 * 60,
    })),
  });

  useEffect(() => {
    const igId = "instagram-embed-script";
    if (!document.getElementById(igId)) {
      const s = document.createElement("script");
      s.id = igId;
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else {
      // @ts-ignore
      window.instgrm?.Embeds?.process?.();
    }
  }, []);

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
              <span className="text-gradient-gold">{isAr ? "أحدث الأخبار والمنشورات" : "Latest News & Posts"}</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
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
            </div>
          </div>

          {/* Instagram */}
          {INSTAGRAM_POSTS.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white">
                  <Instagram className="size-5" />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold">{isAr ? "إنستجرام" : "Instagram"}</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {INSTAGRAM_POSTS.map((url) => (
                  <article key={url} className="rounded-2xl overflow-hidden gold-border bg-card flex flex-col">
                    <div className="p-2 flex justify-center bg-white/5">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={url}
                        data-instgrm-version="14"
                        style={{
                          background: "transparent",
                          border: 0,
                          margin: 0,
                          maxWidth: "100%",
                          minWidth: "260px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="p-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold hover:underline"
                      >
                        {isAr ? "مشاهدة" : "View"}
                        <ExternalLink className="size-3.5" />
                      </a>
                      <ShareButtons
                        url={url}
                        title={isAr ? "منشور إنستجرام — ليموزين الفيوم" : "Instagram Post — Limousine Fayoum"}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* TikTok */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center justify-center size-10 rounded-xl bg-onyx text-white border border-white/15">
                <TikTokIcon className="size-5" />
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">{isAr ? "تيك توك" : "TikTok"}</h2>
            </div>

            {TIKTOK_POSTS.length === 0 ? (
              <div className="rounded-2xl gold-border bg-card p-10 text-center">
                <TikTokIcon className="size-12 mx-auto text-gold mb-4" />
                <p className="text-muted-foreground mb-5">
                  {isAr
                    ? "تابع قناتنا على تيك توك لمشاهدة أحدث الفيديوهات والرحلات."
                    : "Follow our TikTok channel for the latest videos."}
                </p>
                <a
                  href="https://www.tiktok.com/@muhammadsayed2088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-onyx font-bold text-sm hover:scale-105 transition-transform shadow-gold"
                >
                  <TikTokIcon className="size-4" />
                  {isAr ? "زيارة قناتنا على تيك توك" : "Visit our TikTok"}
                </a>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TIKTOK_POSTS.map((url, i) => {
                  const meta = tiktokMetaQueries[i]?.data;
                  return (
                    <TikTokCard
                      key={url}
                      url={url}
                      thumb={meta?.image}
                      title={meta?.title}
                      author={meta?.author}
                      isAr={isAr}
                      onOpen={() => setActiveTikTok(url)}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
      <FloatingActions />
      {activeTikTok && <TikTokLightbox url={activeTikTok} onClose={() => setActiveTikTok(null)} />}
    </div>
  );
}

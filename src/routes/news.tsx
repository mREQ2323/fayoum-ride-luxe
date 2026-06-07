import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Instagram, ExternalLink } from "lucide-react";

const SITE = "https://www.limousinefayoum.com";

// ⬇️ أضف روابط منشورات إنستجرام هنا (Permalink لكل بوست)
const INSTAGRAM_POSTS: string[] = [
  "https://www.instagram.com/mshwrk3lynalemozin/",
];

// ⬇️ أضف روابط فيديوهات تيك توك هنا (رابط الفيديو الكامل)
const TIKTOK_POSTS: { url: string; videoId: string }[] = [
  // مثال: { url: "https://www.tiktok.com/@muhammadsayed2088/video/1234567890", videoId: "1234567890" }
];

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1.84-.08z" />
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

function NewsPage() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  useEffect(() => {
    // Instagram embed
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
    // TikTok embed
    const ttId = "tiktok-embed-script";
    if (!document.getElementById(ttId)) {
      const s = document.createElement("script");
      s.id = ttId;
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
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
              <span className="text-gradient-gold">
                {isAr ? "أحدث الأخبار والمنشورات" : "Latest News & Posts"}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {isAr
                ? "تابع أحدث رحلاتنا وعروضنا اليومية على إنستجرام وتيك توك."
                : "Stay updated with our latest rides and offers on Instagram and TikTok."}
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
            </div>
          </div>

          {/* Instagram Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white">
                <Instagram className="size-5" />
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                {isAr ? "إنستجرام" : "Instagram"}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {INSTAGRAM_POSTS.map((url) => (
                <div
                  key={url}
                  className="rounded-2xl overflow-hidden gold-border bg-card p-2 flex justify-center"
                >
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{
                      background: "transparent",
                      border: 0,
                      margin: 0,
                      maxWidth: "540px",
                      minWidth: "260px",
                      width: "100%",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a
                href="https://www.instagram.com/mshwrk3lynalemozin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:underline font-semibold"
              >
                {isAr ? "شاهد المزيد على إنستجرام" : "See more on Instagram"}
                <ExternalLink className="size-4" />
              </a>
            </div>
          </section>

          {/* TikTok Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center justify-center size-10 rounded-xl bg-onyx text-white border border-white/15">
                <TikTokIcon className="size-5" />
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                {isAr ? "تيك توك" : "TikTok"}
              </h2>
            </div>

            {TIKTOK_POSTS.length === 0 ? (
              <div className="rounded-2xl gold-border bg-card p-10 text-center">
                <TikTokIcon className="size-12 mx-auto text-gold mb-4" />
                <p className="text-muted-foreground mb-5">
                  {isAr
                    ? "تابع قناتنا على تيك توك لمشاهدة أحدث الفيديوهات والرحلات."
                    : "Follow our TikTok channel for the latest videos and trips."}
                </p>
                <a
                  href="https://www.tiktok.com/@muhammadsayed2088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-onyx font-bold text-sm hover:scale-105 transition-transform shadow-gold"
                >
                  <TikTokIcon className="size-4" />
                  {isAr ? "زر قناتنا على تيك توك" : "Visit our TikTok"}
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TIKTOK_POSTS.map((p) => (
                  <div
                    key={p.videoId}
                    className="rounded-2xl overflow-hidden gold-border bg-card p-2 flex justify-center"
                  >
                    <blockquote
                      className="tiktok-embed"
                      cite={p.url}
                      data-video-id={p.videoId}
                      style={{ maxWidth: "605px", minWidth: "260px", width: "100%" }}
                    >
                      <section />
                    </blockquote>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <a
                href="https://www.tiktok.com/@muhammadsayed2088"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:underline font-semibold"
              >
                {isAr ? "شاهد المزيد على تيك توك" : "See more on TikTok"}
                <ExternalLink className="size-4" />
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

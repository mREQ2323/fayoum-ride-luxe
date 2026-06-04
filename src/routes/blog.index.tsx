import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { articles } from "@/data/articles";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

const SITE = "https://www.limousinefayoum.com";
const PER_PAGE = 6;
const TOTAL_PAGES = Math.max(1, Math.ceil(articles.length / PER_PAGE));

const searchSchema = z.object({
  page: z.coerce.number().int().min(1).max(TOTAL_PAGES).catch(1),
});

export const Route = createFileRoute("/blog/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "مدونة ليموزين الفيوم | مقالات السفر والنقل الفاخر في مصر" },
      {
        name: "description",
        content:
          "اكتشف أفضل النصائح عن السفر بالليموزين في مصر: الفيوم، القاهرة، توصيل المطارات، أسعار، VIP، رحلات سياحية ودلائل حجز سيارات بسائق.",
      },
      { property: "og:title", content: "مدونة ليموزين الفيوم — نصائح السفر و VIP" },
      {
        property: "og:description",
        content:
          "35 مقالاً حصرياً حول خدمات الليموزين والنقل الفاخر في مصر — أسعار، خدمات مطار، رحلات الفيوم وأكثر.",
      },
      { property: "og:url", content: `${SITE}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "مدونة ليموزين الفيوم",
          url: `${SITE}/blog`,
          publisher: { "@type": "Organization", name: "مشوارك علينا ليموزين الفيوم" },
          blogPost: articles.map((a) => ({
            "@type": "BlogPosting",
            headline: a.ar.title,
            url: `${SITE}/blog/${a.slug}`,
            image: a.images[0],
          })),
        }),
      },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <BlogIndex />
    </LanguageProvider>
  ),
});

function BlogIndex() {
  const { lang } = useLang();
  const { page } = useSearch({ from: "/blog/" });
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const start = (page - 1) * PER_PAGE;
  const pageArticles = articles.slice(start, start + PER_PAGE);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full gold-border text-gold text-xs tracking-widest uppercase mb-5">
              {isAr ? "مدونتنا" : "Our Blog"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5">
              <span className="text-gradient-gold">
                {isAr ? "مقالات السفر والنقل الفاخر" : "Premium Travel & Transport Insights"}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {isAr
                ? `نصائح وأدلة شاملة (${articles.length} مقالاً) عن خدمات الليموزين والنقل VIP في الفيوم والقاهرة وجميع محافظات مصر.`
                : `Comprehensive guides (${articles.length} articles) about limousine and VIP transportation in Fayoum, Cairo, and all Egyptian governorates.`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {pageArticles.map((a, idx) => {
              const c = isAr ? a.ar : a.en;
              return (
                <Link
                  key={a.slug}
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  className="group rounded-2xl overflow-hidden bg-card gold-border hover:shadow-gold transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={a.images[0]}
                      alt={c.title}
                      width={1280}
                      height={720}
                      loading={idx < 3 ? "eager" : "lazy"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gold mb-3">
                      <Calendar className="size-3.5" />
                      <span>{isAr ? "دليل شامل" : "Complete Guide"}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-gold transition-colors">
                      {c.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {c.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold">
                      {isAr ? "اقرأ المقال" : "Read article"}
                      <Arrow className="size-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          <nav
            className="flex items-center justify-center gap-2 mt-14"
            aria-label={isAr ? "تنقل الصفحات" : "Pagination"}
          >
            <Link
              to="/blog"
              search={{ page: Math.max(1, page - 1) }}
              disabled={page <= 1}
              className={`inline-flex items-center justify-center size-10 rounded-full gold-border text-gold transition-all hover:bg-gold hover:text-onyx ${page <= 1 ? "opacity-40 pointer-events-none" : ""}`}
              aria-label={isAr ? "السابق" : "Previous"}
            >
              {isAr ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
            </Link>

            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                to="/blog"
                search={{ page: p }}
                className={`min-w-10 h-10 px-3 inline-flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                  p === page
                    ? "bg-gradient-gold text-onyx shadow-gold"
                    : "gold-border text-gold hover:bg-gold hover:text-onyx"
                }`}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </Link>
            ))}

            <Link
              to="/blog"
              search={{ page: Math.min(TOTAL_PAGES, page + 1) }}
              disabled={page >= TOTAL_PAGES}
              className={`inline-flex items-center justify-center size-10 rounded-full gold-border text-gold transition-all hover:bg-gold hover:text-onyx ${page >= TOTAL_PAGES ? "opacity-40 pointer-events-none" : ""}`}
              aria-label={isAr ? "التالي" : "Next"}
            >
              {isAr ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
            </Link>
          </nav>
          <p className="text-center text-muted-foreground text-sm mt-4">
            {isAr ? `صفحة ${page} من ${TOTAL_PAGES}` : `Page ${page} of ${TOTAL_PAGES}`}
          </p>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

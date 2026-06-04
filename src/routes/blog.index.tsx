import { createFileRoute, Link } from "@tanstack/react-router";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { articles } from "@/data/articles";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

const SITE = "https://fayoum-ride-luxe.lovable.app";

export const Route = createFileRoute("/blog/")({
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
          "10 مقالات حصرية حول خدمات الليموزين والنقل الفاخر في مصر — أسعار، خدمات مطار، رحلات الفيوم وأكثر.",
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
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

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
                ? "نصائح وأدلة شاملة عن خدمات الليموزين والنقل VIP في الفيوم والقاهرة وجميع محافظات مصر."
                : "Comprehensive guides and tips about limousine and VIP transportation in Fayoum, Cairo, and all Egyptian governorates."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.map((a, idx) => {
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
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

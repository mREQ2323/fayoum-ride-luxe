import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { articlesBySlug, articles, type Article } from "@/data/articles";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Phone, MessageCircle } from "lucide-react";

const SITE = "https://fayoum-ride-luxe.lovable.app";
const PHONE = "+201550516177";
const WA = "201550516177";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articlesBySlug[params.slug];
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article not found" }] };
    const url = `${SITE}/blog/${params.slug}`;
    return {
      meta: [
        { title: `${a.ar.title} | ليموزين الفيوم` },
        { name: "description", content: a.ar.description },
        { name: "keywords", content: `${a.keywords_ar}, ${a.keywords_en}` },
        { property: "og:title", content: a.ar.title },
        { property: "og:description", content: a.ar.description },
        { property: "og:image", content: a.images[0] },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: a.en.title },
        { name: "twitter:description", content: a.en.description },
        { name: "twitter:image", content: a.images[0] },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                headline: a.ar.title,
                alternativeHeadline: a.en.title,
                description: a.ar.description,
                image: a.images,
                inLanguage: "ar",
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                author: { "@type": "Organization", name: "مشوارك علينا ليموزين الفيوم" },
                publisher: {
                  "@type": "Organization",
                  name: "مشوارك علينا ليموزين الفيوم",
                  logo: { "@type": "ImageObject", url: `${SITE}/favicon.ico` },
                },
                datePublished: "2026-06-04",
                dateModified: "2026-06-04",
              },
              {
                "@type": "FAQPage",
                mainEntity: a.ar.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE },
                  { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
                  { "@type": "ListItem", position: 3, name: a.ar.title, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: () => (
    <LanguageProvider>
      <ArticlePage />
    </LanguageProvider>
  ),
});

function paragraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const { lang } = useLang();
  const isAr = lang === "ar";
  const c = isAr ? article.ar : article.en;
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const related: Article[] = articles
    .filter((x) => x.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <article className="pt-28 pb-20">
        {/* Hero */}
        <header className="container mx-auto px-5 max-w-4xl text-center mb-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gold text-sm mb-6 hover:underline"
          >
            <Arrow className="size-4 rotate-180" />
            {isAr ? "كل المقالات" : "All articles"}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-gradient-gold">
            {c.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4 text-gold" />
              {isAr ? "يونيو 2026" : "June 2026"}
            </span>
            <span>•</span>
            <span>{isAr ? "قراءة 10 دقائق" : "10 min read"}</span>
          </div>
        </header>

        <div className="container mx-auto px-5 max-w-5xl mb-12">
          <div className="rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={article.images[0]}
              alt={c.title}
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-5 max-w-3xl">
          {/* Intro */}
          <div className="prose-section text-lg leading-loose text-foreground/90 mb-12">
            {paragraphs(c.intro).map((p, i) => (
              <p key={i} className="mb-5">
                {p}
              </p>
            ))}
          </div>

          {/* Sections (insert second image after section 1) */}
          {c.sections.map((s, i) => (
            <section key={i} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gold mb-5">
                {s.heading}
              </h2>
              <div className="text-base md:text-lg leading-loose text-foreground/85 space-y-5">
                {paragraphs(s.body).map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>

              {i === 1 && article.images[1] && (
                <figure className="my-8 rounded-2xl overflow-hidden gold-border">
                  <img
                    src={article.images[1]}
                    alt={s.heading}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </figure>
              )}

              {/* Insert table after second section */}
              {i === 2 && (
                <div className="my-10">
                  <h3 className="text-lg font-bold mb-4 text-foreground/90">
                    {c.table.title}
                  </h3>
                  <div className="overflow-x-auto rounded-xl gold-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gold/10">
                          {c.table.headers.map((h, k) => (
                            <th
                              key={k}
                              className="px-4 py-3 text-start font-bold text-gold border-b border-gold/20"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {c.table.rows.map((row, r) => (
                          <tr
                            key={r}
                            className="border-b border-gold/10 last:border-0 hover:bg-gold/5"
                          >
                            {row.map((cell, k) => (
                              <td key={k} className="px-4 py-3 align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Tips */}
          <section className="mb-12 bg-card rounded-2xl p-6 md:p-8 gold-border">
            <h2 className="text-2xl font-bold text-gradient-gold mb-5">
              {isAr ? "نصائح سريعة" : "Quick Tips"}
            </h2>
            <ul className="space-y-3">
              {c.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gold mb-6">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-4">
              {c.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl gold-border bg-card p-5 open:bg-card/80"
                >
                  <summary className="cursor-pointer font-bold text-foreground flex items-center justify-between gap-3 list-none">
                    <span>{f.q}</span>
                    <span className="text-gold text-xl group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-foreground/80 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12 text-lg leading-loose text-foreground/90">
            {paragraphs(c.conclusion).map((p, i) => (
              <p key={i} className="mb-5">
                {p}
              </p>
            ))}
          </section>

          {/* CTA */}
          <div className="rounded-3xl p-8 md:p-10 bg-gradient-gold text-onyx text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {isAr ? "احجز رحلتك الآن" : "Book Your Ride Now"}
            </h3>
            <p className="mb-6 text-onyx/80">
              {isAr
                ? "خدمة ليموزين VIP على مدار 24 ساعة في الفيوم وجميع محافظات مصر."
                : "24/7 VIP limousine service across Fayoum and all of Egypt."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 bg-onyx text-gold px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <Phone className="size-4" />
                {PHONE}
              </a>
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-onyx/90 text-gold px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <MessageCircle className="size-4" />
                {isAr ? "واتساب" : "WhatsApp"}
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="container mx-auto px-5 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6 text-center">
            {isAr ? "مقالات ذات صلة" : "Related Articles"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => {
              const rc = isAr ? r.ar : r.en;
              return (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-2xl overflow-hidden bg-card gold-border hover:shadow-gold transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={r.images[0]}
                      alt={rc.title}
                      width={1280}
                      height={720}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold leading-snug group-hover:text-gold transition-colors">
                      {rc.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </article>

      <Footer />
      <FloatingActions />
    </div>
  );
}

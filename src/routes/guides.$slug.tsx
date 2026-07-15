import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { GuideHero } from "@/components/site/GuideHero";
import { guides, guidesBySlug } from "@/data/guides";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const SITE = "https://www.limousinefayoum.com";
const PHONE = "+201505663520";
const WA = "201505663520";
const MAP = "https://maps.app.goo.gl/KELgUBCChBA1saju7";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = guidesBySlug[params.slug];
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData, params }) => {
    const g = loaderData?.guide;
    if (!g) return { meta: [{ title: "Guide not found" }] };
    const url = `${SITE}/guides/${params.slug}`;
    return {
      meta: [
        { title: `${g.ar.title} | ${g.en.title}` },
        { name: "description", content: g.ar.description },
        { name: "keywords", content: `${g.ar.keywords}, ${g.en.keywords}` },
        { property: "og:title", content: g.ar.title },
        { property: "og:description", content: g.ar.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:locale", content: "ar_EG" },
        { property: "og:locale:alternate", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: g.en.title },
        { name: "twitter:description", content: g.en.description },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "ar", href: url },
        { rel: "alternate", hrefLang: "en", href: url },
        { rel: "alternate", hrefLang: "x-default", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: g.ar.title,
                alternativeHeadline: g.en.title,
                description: g.ar.description,
                inLanguage: ["ar", "en"],
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                author: { "@type": "Organization", name: "Mishwarak Alaina Limousine Fayoum", url: SITE },
                publisher: {
                  "@type": "Organization",
                  name: "Mishwarak Alaina Limousine Fayoum",
                  logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
                },
                datePublished: "2026-07-15",
                dateModified: "2026-07-15",
              },
              {
                "@type": "FAQPage",
                mainEntity: g.ar.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE },
                  { "@type": "ListItem", position: 2, name: "الأدلة", item: `${SITE}/guides` },
                  { "@type": "ListItem", position: 3, name: g.ar.title, item: url },
                ],
              },
              {
                "@type": "LocalBusiness",
                name: "Mishwarak Alaina Limousine Fayoum",
                telephone: PHONE,
                url: SITE,
                areaServed: "EG",
                hasMap: MAP,
              },
            ],
          }),
        },
      ],
    };
  },
  component: () => (
    <LanguageProvider>
      <GuidePage />
    </LanguageProvider>
  ),
});

function GuidePage() {
  const { guide: g } = Route.useLoaderData() as { guide: (typeof guides)[number] };
  const { lang } = useLang();
  const isAr = lang === "ar";
  const c = g[lang];
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const related = (g.relatedSlugs ?? [])
    .map((s) => guidesBySlug[s])
    .filter(Boolean)
    .slice(0, 3);

  const L = {
    allGuides: isAr ? "كل الأدلة" : "All guides",
    kicker: isAr ? "دليل الفيوم" : "Fayoum guide",
    callNow: isAr ? "اتصل الآن" : "Call Now",
    whatsapp: isAr ? "واتساب" : "WhatsApp",
    map: isAr ? "موقعنا على الخريطة" : "Our location on the map",
    quickTips: isAr ? "نصائح سريعة" : "Quick Tips",
    faqs: isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions",
    ready: isAr ? "جاهز للحجز؟" : "Ready to book?",
    readyDesc: isAr
      ? "خدمة ليموزين VIP على مدار 24 ساعة في الفيوم وجميع محافظات مصر."
      : "24/7 VIP limousine service in Fayoum and across every Egyptian governorate.",
    blog: isAr ? "المدونة" : "Blog",
    related: isAr ? "أدلة ذات صلة" : "Related guides",
    readMore: isAr ? "اقرأ المزيد:" : "Read more:",
    inquire: isAr ? `مرحباً، أريد الاستفسار عن: ${c.title}` : `Hello, I'd like to ask about: ${c.title}`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <article className="pt-28 pb-20">
        <header className="container mx-auto px-5 max-w-4xl text-center mb-10">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-gold text-sm mb-6 hover:underline"
          >
            <ArrowIcon className="size-4" />
            {L.allGuides}
          </Link>
          <div className="inline-flex items-center gap-2 text-xs text-gold mb-4 uppercase tracking-widest">
            <BookOpen className="size-3.5" />
            {L.kicker}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-gradient-gold">
            {c.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            {c.description}
          </p>
        </header>

        <div className="container mx-auto px-5 max-w-5xl mb-12">
          <div className="rounded-3xl overflow-hidden shadow-elegant aspect-[16/9]">
            <GuideHero icon={g.icon} hue={g.hue} className="w-full h-full" ariaLabel={c.title} />
          </div>
        </div>

        <div className="container mx-auto px-5 max-w-3xl mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3 p-4 rounded-2xl gold-border bg-card/60 backdrop-blur">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 bg-gradient-gold text-onyx px-5 py-2.5 rounded-full text-sm font-bold shadow-gold hover:scale-105 transition"
            >
              <Phone className="size-4" />
              {L.callNow}
            </a>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent(L.inquire)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gold/10 transition"
            >
              <MessageCircle className="size-4" />
              {L.whatsapp}
            </a>
            <a
              href={MAP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gold/10 transition"
            >
              <MapPin className="size-4" />
              {L.map}
            </a>
          </div>
        </div>

        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-lg leading-loose text-foreground/90 mb-12">{c.intro}</p>

          {c.sections.map((s, i) => (
            <section key={i} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gold mb-5">{s.heading}</h2>
              <p className="text-base md:text-lg leading-loose text-foreground/85 mb-4">{s.body}</p>
              {s.wiki && (
                <a
                  href={s.wiki.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-bright underline underline-offset-4 decoration-gold/40"
                >
                  <ExternalLink className="size-3.5" />
                  {L.readMore} {s.wiki.label}
                </a>
              )}
            </section>
          ))}

          <section className="mb-12 bg-card rounded-2xl p-6 md:p-8 gold-border">
            <h2 className="text-2xl font-bold text-gradient-gold mb-5">{L.quickTips}</h2>
            <ul className="space-y-3">
              {c.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gold mb-6">{L.faqs}</h2>
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

          <div className="rounded-3xl p-8 md:p-10 bg-gradient-gold text-onyx text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">{L.ready}</h3>
            <p className="mb-6 text-onyx/80">{L.readyDesc}</p>
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
                {L.whatsapp}
              </a>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-onyx/80 text-gold px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <BookOpen className="size-4" />
                {L.blog}
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container mx-auto px-5 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6 text-center">
              {L.related}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => {
                const rc = r[lang];
                return (
                  <Link
                    key={r.slug}
                    to="/guides/$slug"
                    params={{ slug: r.slug }}
                    className="group rounded-2xl overflow-hidden bg-card gold-border hover:shadow-gold transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <GuideHero
                        icon={r.icon}
                        hue={r.hue}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        ariaLabel={rc.title}
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
        )}
      </article>

      <Footer />
      <FloatingActions />
    </div>
  );
}

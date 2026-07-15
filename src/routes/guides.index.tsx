import { createFileRoute, Link } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { GuideHero } from "@/components/site/GuideHero";
import { guides } from "@/data/guides";
import { ArrowLeft, BookOpen, MapPin, Phone } from "lucide-react";

const SITE = "https://www.limousinefayoum.com";
const PHONE = "+201505663520";
const WA = "201505663520";
const MAP = "https://maps.app.goo.gl/KELgUBCChBA1saju7";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "أدلة سفر الفيوم | مقالات حصرية عن ليموزين الفيوم" },
      {
        name: "description",
        content:
          "10 أدلة حصرية عن ليموزين الفيوم، رحلات وادي الريان وبحيرة قارون وقرية تونس، توصيل مطار القاهرة، والسفر بين المحافظات — نصائح، أسعار، وحجز خاص.",
      },
      { property: "og:title", content: "أدلة ليموزين الفيوم — 10 مقالات حصرية" },
      {
        property: "og:description",
        content: "خبرة سنوات في خدمة ليموزين الفيوم مجموعة في 10 أدلة عملية جاهزة.",
      },
      { property: "og:url", content: `${SITE}/guides` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/guides` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "أدلة ليموزين الفيوم",
          url: `${SITE}/guides`,
          inLanguage: "ar",
          hasPart: guides.map((g) => ({
            "@type": "Article",
            headline: g.title,
            description: g.description,
            url: `${SITE}/guides/${g.slug}`,
          })),
          publisher: {
            "@type": "LocalBusiness",
            name: "مشوارك علينا ليموزين الفيوم",
            telephone: PHONE,
            areaServed: "EG",
          },
        }),
      },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <GuidesIndex />
    </LanguageProvider>
  ),
});

function GuidesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full gold-border text-gold text-xs tracking-widest uppercase mb-5">
              أدلة حصرية
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5">
              <span className="text-gradient-gold">10 أدلة عملية لخدمة ليموزين الفيوم</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              مقالات مختصرة بلغة واضحة تشرح أسعار، مسارات، ومحطات الرحلات من وإلى الفيوم — مع
              روابط مباشرة للحجز عبر الاتصال أو واتساب أو خريطة الموقع.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 bg-gradient-gold text-onyx px-5 py-2.5 rounded-full text-sm font-bold shadow-gold hover:scale-105 transition"
              >
                <Phone className="size-4" />
                {PHONE}
              </a>
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gold/10 transition"
              >
                واتساب
              </a>
              <a
                href={MAP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gold/10 transition"
              >
                <MapPin className="size-4" />
                موقعنا
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {guides.map((g, idx) => (
              <Link
                key={g.slug}
                to="/guides/$slug"
                params={{ slug: g.slug }}
                className="group rounded-2xl overflow-hidden bg-card gold-border hover:shadow-gold transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <GuideHero
                    icon={g.icon}
                    hue={g.hue}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    ariaLabel={g.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gold mb-3">
                    <BookOpen className="size-3.5" />
                    <span>دليل {idx + 1} من {guides.length}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-gold transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {g.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold">
                    اقرأ الدليل
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

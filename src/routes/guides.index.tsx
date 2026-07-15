import { createFileRoute, Link } from "@tanstack/react-router";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { GuideHero } from "@/components/site/GuideHero";
import { guides } from "@/data/guides";
import { ArrowLeft, ArrowRight, BookOpen, MapPin, Phone } from "lucide-react";

const SITE = "https://www.limousinefayoum.com";
const PHONE = "+201505663520";
const WA = "201505663520";
const MAP = "https://maps.app.goo.gl/KELgUBCChBA1saju7";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Fayoum Travel Guides | Exclusive Limousine Fayoum Articles" },
      {
        name: "description",
        content:
          "10 exclusive guides covering Fayoum limousine service, Wadi El Rayan and Lake Qarun trips, Tunis Village, Cairo airport transfers, and inter-governorate travel — tips, prices, and private bookings.",
      },
      { property: "og:title", content: "Fayoum Limousine Guides — 10 Exclusive Articles" },
      {
        property: "og:description",
        content: "Years of Fayoum limousine expertise packed into 10 practical, ready-to-use guides.",
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
          name: "Fayoum Limousine Guides",
          url: `${SITE}/guides`,
          inLanguage: ["ar", "en"],
          hasPart: guides.map((g) => ({
            "@type": "Article",
            headline: g.ar.title,
            alternativeHeadline: g.en.title,
            description: g.ar.description,
            url: `${SITE}/guides/${g.slug}`,
          })),
          publisher: {
            "@type": "LocalBusiness",
            name: "Mishwarak Alaina Limousine Fayoum",
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
  const { lang } = useLang();
  const isAr = lang === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full gold-border text-gold text-xs tracking-widest uppercase mb-5">
              {isAr ? "أدلة حصرية" : "Exclusive Guides"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5">
              <span className="text-gradient-gold">
                {isAr
                  ? "10 أدلة عملية لخدمة ليموزين الفيوم"
                  : "10 practical guides to Fayoum limousine service"}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {isAr
                ? "مقالات مختصرة بلغة واضحة تشرح أسعار، مسارات، ومحطات الرحلات من وإلى الفيوم — مع روابط مباشرة للحجز عبر الاتصال أو واتساب أو خريطة الموقع."
                : "Concise articles in clear language covering prices, routes, and stops for trips to and from Fayoum — with direct links to book by phone, WhatsApp, or the map."}
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
                {isAr ? "واتساب" : "WhatsApp"}
              </a>
              <a
                href={MAP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gold/10 transition"
              >
                <MapPin className="size-4" />
                {isAr ? "موقعنا" : "Our Location"}
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {guides.map((g, idx) => {
              const c = g[lang];
              return (
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
                      ariaLabel={c.title}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gold mb-3">
                      <BookOpen className="size-3.5" />
                      <span>
                        {isAr
                          ? `دليل ${idx + 1} من ${guides.length}`
                          : `Guide ${idx + 1} of ${guides.length}`}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-gold transition-colors">
                      {c.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {c.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold">
                      {isAr ? "اقرأ الدليل" : "Read the guide"}
                      <ArrowIcon className="size-4 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
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

import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { Fleet } from "@/components/site/Fleet";
import { WhyUs } from "@/components/site/WhyUs";
import { Areas } from "@/components/site/Areas";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مشوارك علينا ليموزين الفيوم | حجز سيارات ليموزين وسفر VIP" },
      {
        name: "description",
        content:
          "مشوارك علينا ليموزين الفيوم تقدم خدمات النقل والليموزين داخل وخارج الفيوم، توصيل المطارات، السفر VIP، سيارات 4 و7 مقاعد وSUV وهاي إس 14 راكب بأفضل الأسعار وخدمة 24 ساعة.",
      },
      {
        name: "keywords",
        content:
          "ليموزين الفيوم, شركة ليموزين الفيوم, حجز ليموزين الفيوم, ليموزين القاهرة الفيوم, توصيل مطار القاهرة, ليموزين مطار القاهرة, خدمة ليموزين, سيارات VIP, ليموزين مصر, تأجير سيارات مع سائق, Fayoum Limousine, Airport Transfer Egypt, VIP Transportation",
      },
      { property: "og:title", content: "مشوارك علينا ليموزين الفيوم | VIP Limousine" },
      { property: "og:description", content: "أفضل خدمة ليموزين وسفر VIP من وإلى الفيوم وجميع محافظات مصر." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "ar_EG" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "مشوارك علينا ليموزين الفيوم",
          alternateName: "Mishwarak Alaina Limousine Fayoum",
          image: "/og-image.jpg",
          description:
            "خدمة ليموزين وسفر VIP من وإلى الفيوم وجميع محافظات مصر، توصيل المطارات على مدار 24 ساعة.",
          telephone: ["+201550516177", "+201505663520"],
          email: "commandor764@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Fayoum",
            addressCountry: "EG",
          },
          areaServed: "Egypt",
          priceRange: "$$",
          openingHours: "Mo-Su 00:00-23:59",
          "@id": "/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Fleet />
          <WhyUs />
          <Areas />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}

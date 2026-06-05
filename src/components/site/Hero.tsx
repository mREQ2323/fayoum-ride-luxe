import { Phone, MessageCircle, Sparkles, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import heroImg from "@/assets/hero-limousine.jpg";

export function Hero() {
  const { t } = useLang();
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury limousine Fayoum"
          width={1920}
          height={1080}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-onyx/40" />
      </div>

      <div className="relative container mx-auto px-5 pt-32 pb-20 z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-border bg-onyx/40 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="size-4 text-gold" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-gold">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <span className="block text-foreground">{t.hero.title1}</span>
            <span className="block text-gradient-gold">{t.hero.title2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground/85 mb-4 max-w-2xl font-medium animate-in fade-in duration-1000 delay-200 fill-mode-both">
            {t.hero.subtitle}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-9 max-w-2xl leading-relaxed animate-in fade-in duration-1000 delay-300 fill-mode-both">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
            <a
              href="tel:01505663520"
              className="inline-flex items-center gap-2.5 bg-gradient-gold text-onyx px-7 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-gold"
            >
              <Phone className="size-5" />
              {t.cta.call}
            </a>
            <a
              href="https://wa.me/201505663520"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-foreground/10 backdrop-blur-sm text-foreground border border-foreground/20 px-7 py-4 rounded-full font-bold hover:bg-foreground/15 transition"
            >
              <MessageCircle className="size-5" />
              {t.cta.whatsapp}
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-gold hover:bg-gold/10 transition"
            >
              {t.cta.learnMore}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70 animate-bounce"
        aria-label="Scroll"
      >
        <ChevronDown className="size-7" />
      </a>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const sections = ["services", "fleet", "areas", "why", "contact"] as const;

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-gold/20 py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-5 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="مشوارك علينا ليموزين الفيوم"
            className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform"
            width={1024}
            height={512}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          <Link
            to="/"
            className="text-sm text-foreground/80 hover:text-gold transition-colors relative group"
          >
            {t.nav.home}
            <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
          </Link>
          {sections.map((s) => (
            <a
              key={s}
              href={`/#${s}`}
              className="text-sm text-foreground/80 hover:text-gold transition-colors relative group"
            >
              {t.nav[s]}
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
            </a>
          ))}
          <Link
            to="/blog"
            className="text-sm text-foreground/80 hover:text-gold transition-colors relative group"
          >
            {lang === "ar" ? "المدونة" : "Blog"}
            <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
          </Link>
          <Link
            to="/news"
            className="text-sm text-foreground/80 hover:text-gold transition-colors relative group"
          >
            {lang === "ar" ? "أحدث الأخبار" : "Latest News"}
            <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full gold-border text-xs font-semibold hover:bg-gold/10 transition"
            aria-label="Change language"
          >
            <Languages className="size-4 text-gold" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <a
            href="/#contact"
            className="hidden sm:inline-flex bg-gradient-gold text-onyx px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-gold"
          >
            {t.cta.book}
          </a>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-5 py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 px-2 text-foreground/80 hover:text-gold border-b border-gold/10"
            >
              {t.nav.home}
            </Link>
            {sections.map((s) => (
              <a
                key={s}
                href={`/#${s}`}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-foreground/80 hover:text-gold border-b border-gold/10"
              >
                {t.nav[s]}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className="py-3 px-2 text-foreground/80 hover:text-gold border-b border-gold/10"
            >
              {lang === "ar" ? "المدونة" : "Blog"}
            </Link>
            <Link
              to="/news"
              onClick={() => setOpen(false)}
              className="py-3 px-2 text-foreground/80 hover:text-gold border-b border-gold/10"
            >
              {lang === "ar" ? "أحدث الأخبار" : "Latest News"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

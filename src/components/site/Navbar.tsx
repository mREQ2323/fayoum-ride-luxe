import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/logo.png"
            alt="مشوارك علينا ليموزين الفيوم"
            className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform"
            width={1024}
            height={512}
          />
        </Link>

        <nav
          className={cn(
            "hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500",
            scrolled
              ? "bg-onyx/40 border border-gold/20 backdrop-blur-md shadow-[0_6px_24px_-12px_rgba(212,175,55,0.35)]"
              : "bg-onyx/25 border border-gold/10 backdrop-blur-sm",
          )}
        >
          <NavItem to="/" label={t.nav.home} />
          {sections.map((s) => (
            <NavAnchor key={s} href={`/#${s}`} label={t.nav[s]} />
          ))}
          <NavItem to="/blog" label={lang === "ar" ? "المدونة" : "Blog"} />
          <NavItem to="/news" label={lang === "ar" ? "أحدث الأخبار" : "Latest News"} />
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="group relative flex items-center gap-2 pl-1 pr-3 py-1 rounded-full gold-border bg-onyx/40 hover:bg-gold/10 transition-all overflow-hidden"
            aria-label="Change language"
            title={lang === "ar" ? "English" : "العربية"}
          >
            <span className="relative inline-flex size-7 rounded-full overflow-hidden ring-2 ring-gold/50 shadow-inner">
              {lang === "ar" ? <FlagUS /> : <FlagEG />}
            </span>
            <span className="text-xs font-bold tracking-wide text-gold">
              {lang === "ar" ? "EN" : "ع"}
            </span>
          </button>
          <a
            href="/#contact"
            className="hidden sm:inline-flex bg-gradient-gold text-onyx px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-gold"
          >
            {t.cta.book}
          </a>
          <button
            className="lg:hidden p-2 text-foreground rounded-full gold-border bg-onyx/40"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
          <nav className="container mx-auto px-5 py-4 flex flex-col gap-1">
            <MobileItem to="/" label={t.nav.home} onClick={() => setOpen(false)} />
            {sections.map((s) => (
              <MobileAnchor
                key={s}
                href={`/#${s}`}
                label={t.nav[s]}
                onClick={() => setOpen(false)}
              />
            ))}
            <MobileItem
              to="/blog"
              label={lang === "ar" ? "المدونة" : "Blog"}
              onClick={() => setOpen(false)}
            />
            <MobileItem
              to="/news"
              label={lang === "ar" ? "أحدث الأخبار" : "Latest News"}
              onClick={() => setOpen(false)}
            />
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      activeProps={{ className: "text-gold bg-gold/10" }}
      className="px-4 py-2 rounded-full text-sm font-medium text-foreground/85 hover:text-gold hover:bg-gold/10 transition-colors"
    >
      {label}
    </Link>
  );
}

function NavAnchor({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="px-4 py-2 rounded-full text-sm font-medium text-foreground/85 hover:text-gold hover:bg-gold/10 transition-colors"
    >
      {label}
    </a>
  );
}

function MobileItem({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={{ exact: true }}
      activeProps={{ className: "text-gold bg-gold/10" }}
      className="py-3 px-3 rounded-lg text-foreground/85 hover:text-gold hover:bg-gold/10 border-b border-gold/10 transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileAnchor({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="py-3 px-3 rounded-lg text-foreground/85 hover:text-gold hover:bg-gold/10 border-b border-gold/10 transition-colors"
    >
      {label}
    </a>
  );
}

function FlagEG() {
  return (
    <svg viewBox="0 0 6 4" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
      <rect width="6" height="4" fill="#ce1126" />
      <rect width="6" height="2.667" fill="#fff" />
      <rect width="6" height="1.333" fill="#000" />
      <circle cx="3" cy="2" r="0.5" fill="#c09300" />
    </svg>
  );
}

function FlagUS() {
  return (
    <svg viewBox="0 0 7410 3900" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="7410" height="3900" fill="#b22234" />
      <g fill="#fff">
        {[1, 3, 5, 7, 9, 11].map((i) => (
          <rect key={i} y={i * 300} width="7410" height="300" />
        ))}
      </g>
      <rect width="2964" height="2100" fill="#3c3b6e" />
    </svg>
  );
}

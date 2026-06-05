import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.91a8.16 8.16 0 0 0 4.77 1.53V7a4.85 4.85 0 0 1-1.84-.31z"/>
    </svg>
  );
}

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gold/20 bg-onyx/80 backdrop-blur">
      <div className="container mx-auto px-5 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="مشوارك علينا ليموزين الفيوم"
                className="h-12 w-auto object-contain"
                width={1024}
                height={512}
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gold">{t.footer.quick}</h4>
            <ul className="space-y-2 text-sm">
              {(["services", "fleet", "areas", "why", "contact"] as const).map((s) => (
                <li key={s}>
                  <a href={`/#${s}`} className="text-muted-foreground hover:text-gold transition">
                    {t.nav[s]}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-gold transition">
                  {t.dir === "rtl" ? "المدونة" : "Blog"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gold">{t.contact.phone}</h4>
            <div className="space-y-1 text-sm text-muted-foreground" dir="ltr">
              <a href="tel:01505663520" className="block hover:text-gold transition">01505663520</a>
              <a href="mailto:commandor764@gmail.com" className="block hover:text-gold transition break-all">
                commandor764@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/15 text-center text-xs text-muted-foreground">
          © {year} {t.brand} — {t.brandSub}. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}

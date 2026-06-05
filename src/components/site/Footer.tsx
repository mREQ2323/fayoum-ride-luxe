import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";

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

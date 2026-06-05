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

        {/* Social + Map — full width */}
        <div className="mt-12 grid lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-2xl gold-border p-6 bg-gradient-to-br from-onyx/60 to-onyx/30 flex flex-col justify-between">
            <div>
              <h4 className="text-gold font-bold text-lg mb-2">
                {t.dir === "rtl" ? "تابعنا على السوشيال ميديا" : "Follow us on Social Media"}
              </h4>
              <p className="text-sm text-muted-foreground mb-5">
                {t.dir === "rtl"
                  ? "أحدث العروض، الرحلات، ومحتوى حصري عن خدماتنا"
                  : "Latest offers, trips and exclusive content"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/LimousineFayoum"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group flex items-center gap-2 px-4 py-3 rounded-xl gold-border hover:bg-gold hover:text-onyx transition-all hover:scale-105"
              >
                <Facebook className="size-5" />
                <span className="text-sm font-semibold">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/mshwrk3lynalemozin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex items-center gap-2 px-4 py-3 rounded-xl gold-border hover:bg-gradient-to-r hover:from-[#f09433] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all hover:scale-105"
              >
                <Instagram className="size-5" />
                <span className="text-sm font-semibold">Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@muhammadsayed2088"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="group flex items-center gap-2 px-4 py-3 rounded-xl gold-border hover:bg-white hover:text-onyx transition-all hover:scale-105"
              >
                <TikTokIcon className="size-5" />
                <span className="text-sm font-semibold">TikTok</span>
              </a>
              <a
                href="https://maps.app.goo.gl/KELgUBCChBA1saju7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-gold text-onyx font-semibold transition-all hover:scale-105 shadow-gold"
              >
                <MapPin className="size-5" />
                <span className="text-sm">{t.dir === "rtl" ? "موقعنا على الخريطة" : "Our Location"}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl overflow-hidden gold-border h-[260px] lg:h-auto min-h-[260px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6958.119141198058!2d30.8410273!3d29.309928199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145979a9b2f1f13f%3A0xaf3df162950e432b!2z2YXYtNmI2KfYsdmDINi52YTZitmG2Kcg2YTZitmF2YjYstmK2YYg2KfZhNmB2YrZiNmFIExpbW91c2luZSBGYXlvdW0!5e0!3m2!1sen!2ssa!4v1780686379058!5m2!1sen!2ssa"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Limousine Fayoum Location"
            />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/15 text-center text-xs text-muted-foreground">
          © {year} {t.brand} — {t.brandSub}. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}

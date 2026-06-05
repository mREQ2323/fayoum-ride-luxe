import { Phone, Mail, MapPin, Facebook, Music2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeader } from "./Services";

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-5">
        <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 max-w-6xl mx-auto">
          <ContactCard icon={Phone} title={t.contact.phone}>
            <a href="tel:01505663520" className="block hover:text-gold transition" dir="ltr">01505663520</a>
          </ContactCard>
          <ContactCard icon={Mail} title={t.contact.email}>
            <a href="mailto:commandor764@gmail.com" className="break-all hover:text-gold transition">
              commandor764@gmail.com
            </a>
          </ContactCard>
          <ContactCard icon={MapPin} title={t.contact.location}>
            <a
              href="https://maps.app.goo.gl/KELgUBCChBA1saju7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition"
            >
              {t.brandSub}
            </a>
          </ContactCard>
          <ContactCard icon={Facebook} title={t.contact.social}>
            <div className="flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="size-10 rounded-full gold-border flex items-center justify-center hover:bg-gold hover:text-onyx transition">
                <Facebook className="size-4" aria-hidden="true" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="size-10 rounded-full gold-border flex items-center justify-center hover:bg-gold hover:text-onyx transition">
                <Music2 className="size-4" aria-hidden="true" />
              </a>
            </div>
          </ContactCard>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/201505663520"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-gold text-onyx px-10 py-5 rounded-full font-bold text-lg shadow-gold hover:scale-105 transition-transform"
          >
            {t.cta.book} — WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon, title, children,
}: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-card gold-border text-center hover:border-gold/60 transition">
      <div className="size-12 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
        <Icon className="size-5 text-onyx" />
      </div>
      <h3 className="font-bold mb-3 text-gold">{title}</h3>
      <div className="text-sm text-muted-foreground space-y-1">{children}</div>
    </div>
  );
}

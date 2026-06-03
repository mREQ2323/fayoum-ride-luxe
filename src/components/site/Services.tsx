import {
  Car, Route, Plane, Crown, Heart, Users, Bus, Clock,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Car, Route, Plane, Crown, Heart, Users, Bus, Clock];

export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-5">
        <SectionHeader eyebrow={t.brandSub} title={t.services.title} subtitle={t.services.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <article
                key={i}
                className="group relative p-7 rounded-2xl bg-card gold-border hover:border-gold/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 size-32 rounded-full bg-gold/5 group-hover:bg-gold/15 transition" />
                <div className="relative">
                  <div className="size-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-5 shadow-gold">
                    <Icon className="size-6 text-onyx" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle,
}: { eyebrow?: string; title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <div className="inline-block text-xs uppercase tracking-[0.3em] text-gold mb-4">
          — {eyebrow} —
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-gradient-gold">{title}</span>
      </h2>
      <p className="text-muted-foreground text-lg">{subtitle}</p>
    </div>
  );
}

import { Users } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeader } from "./Services";

export function Fleet() {
  const { t } = useLang();
  return (
    <section id="fleet" className="py-24 relative bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-5">
        <SectionHeader title={t.fleet.title} subtitle={t.fleet.subtitle} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {t.fleet.items.map((car, i) => (
            <article
              key={i}
              className="group relative rounded-2xl overflow-hidden gold-border bg-card hover:border-gold/60 transition-all hover:-translate-y-2 duration-500"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-onyx via-card to-onyx flex items-center justify-center relative overflow-hidden">
                <CarIllustration index={i} />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-gold bg-onyx/80 backdrop-blur px-3 py-1.5 rounded-full w-fit">
                  <Users className="size-3.5" />
                  {car.capacity}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                  {car.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{car.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarIllustration({ index }: { index: number }) {
  // Simple SVG silhouettes by type
  const paths = [
    // sedan
    "M30 130 L70 90 L140 80 L210 80 L260 95 L290 130 L290 160 L30 160 Z",
    // 7-seater minivan
    "M25 130 L60 80 L240 75 L290 100 L295 160 L25 160 Z",
    // SUV
    "M30 130 L70 80 L230 75 L285 95 L290 160 L30 160 Z",
    // Hiace 14-seater bus
    "M20 130 L40 70 L290 65 L300 160 L20 160 Z",
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full p-4 transition-transform duration-700 group-hover:scale-110">
      <defs>
        <linearGradient id={`g${index}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.15 88)" />
          <stop offset="100%" stopColor="oklch(0.55 0.12 70)" />
        </linearGradient>
      </defs>
      <path d={paths[index]} fill={`url(#g${index})`} opacity="0.95" />
      <circle cx="90" cy="165" r="18" fill="oklch(0.1 0 0)" stroke="oklch(0.78 0.13 78)" strokeWidth="2" />
      <circle cx="240" cy="165" r="18" fill="oklch(0.1 0 0)" stroke="oklch(0.78 0.13 78)" strokeWidth="2" />
      <circle cx="90" cy="165" r="7" fill="oklch(0.78 0.13 78)" />
      <circle cx="240" cy="165" r="7" fill="oklch(0.78 0.13 78)" />
    </svg>
  );
}

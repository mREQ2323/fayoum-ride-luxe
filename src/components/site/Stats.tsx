import { useLang } from "@/i18n/LanguageContext";

export function Stats() {
  const { t } = useLang();
  return (
    <section className="relative border-y border-gold/15 bg-card/40 backdrop-blur-sm">
      <div className="container mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {t.stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-5xl font-bold text-gradient-gold mb-2">
              {s.value}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

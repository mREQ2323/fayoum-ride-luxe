import { MapPin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeader } from "./Services";

export function Areas() {
  const { t } = useLang();
  return (
    <section id="areas" className="py-24 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-5">
        <SectionHeader title={t.areas.title} subtitle={t.areas.subtitle} />
        <div className="grid lg:grid-cols-2 gap-6 mt-14 max-w-5xl mx-auto">
          <AreaCard title={t.areas.inside} cities={t.areas.insideCities} highlight />
          <AreaCard title={t.areas.outside} cities={t.areas.outsideCities} />
        </div>
      </div>
    </section>
  );
}

function AreaCard({ title, cities, highlight }: { title: string; cities: string[]; highlight?: boolean }) {
  return (
    <div className={`relative p-8 rounded-2xl gold-border ${highlight ? "bg-gradient-to-br from-gold/10 to-card" : "bg-card"}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="size-11 rounded-full bg-gradient-gold flex items-center justify-center">
          <MapPin className="size-5 text-onyx" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map((c) => (
          <span
            key={c}
            className="px-4 py-2 rounded-full bg-onyx/50 gold-border text-sm hover:bg-gold/20 hover:text-gold transition cursor-default"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

import {
  Sparkles, BadgeDollarSign, UserCheck, Clock4, ShieldCheck, Timer, MapPinned, Crown,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { SectionHeader } from "./Services";

const icons = [Sparkles, BadgeDollarSign, UserCheck, Clock4, ShieldCheck, Timer, MapPinned, Crown];

export function WhyUs() {
  const { t } = useLang();
  return (
    <section id="why" className="py-24">
      <div className="container mx-auto px-5">
        <SectionHeader title={t.why.title} subtitle={t.why.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {t.why.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col items-start gap-3 p-6 rounded-xl bg-card/60 gold-border hover:bg-card transition-all hover:-translate-y-1"
              >
                <Icon className="size-9 text-gold" strokeWidth={1.5} />
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

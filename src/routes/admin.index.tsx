import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import { BookOpen, FileEdit, Gauge, Newspaper, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { label: "مقالات المدونة", value: articles.length, icon: Newspaper },
    { label: "الأدلة", value: guides.length, icon: BookOpen },
    { label: "الصفحات الثابتة", value: 4, icon: FileEdit },
    { label: "أدوات SEO", value: "٩+", icon: Gauge },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="size-6 text-gold" />
        <h1 className="text-3xl font-bold text-gradient-gold">مرحبا بك في لوحة التحكم</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        نظرة عامة سريعة على محتوى الموقع وأدوات التحكم المتاحة.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl bg-card gold-border p-5 hover:shadow-gold transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <Icon className="size-4 text-gold" />
              </div>
              <div className="text-3xl font-bold text-gradient-gold">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <QuickCard
          to="/admin/seo"
          title="تحليل السيو"
          desc="افحص كل مقال بمعايير مطابقة لـ Yoast — عنوان، وصف، كثافة الكلمة المفتاحية، وعناوين فرعية."
          icon={Gauge}
        />
        <QuickCard
          to="/admin/articles"
          title="إدارة المقالات"
          desc="أضف مقالاً جديداً أو حرّر أياً من مقالات المدونة والأدلة الحالية."
          icon={FileEdit}
        />
        <QuickCard
          to="/admin/gsc"
          title="Search Console"
          desc="اربط جوجل سيرش كونسول لعرض مؤشرات الظهور والنقرات والفهرسة."
          icon={Search}
        />
      </div>
    </div>
  );
}

function QuickCard({
  to,
  title,
  desc,
  icon: Icon,
}: {
  to: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl bg-card gold-border p-6 hover:shadow-gold hover:-translate-y-0.5 transition-all"
    >
      <div className="size-10 rounded-xl bg-gold/15 flex items-center justify-center mb-4 group-hover:bg-gold/25 transition-colors">
        <Icon className="size-5 text-gold" />
      </div>
      <h3 className="font-bold mb-1.5 group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </Link>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Search, ExternalLink, Plug, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/admin/gsc")({
  component: GscPage,
});

function GscPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Search className="size-6 text-gold" />
        <div>
          <h1 className="text-3xl font-bold text-gradient-gold">Google Search Console</h1>
          <p className="text-sm text-muted-foreground">
            راقب فهرسة الموقع ومؤشرات البحث مباشرة من لوحة التحكم.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-card gold-border p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
            <Plug className="size-6 text-gold" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">اربط حساب Google Search Console</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              نستخدم موصّل Lovable الرسمي لجلب بيانات جوجل بدون كشف أي مفتاح API في الكود.
              بعد الربط ستظهر هنا: مواقعك المتحقق منها، أعلى الاستعلامات، والصفحات، وحالة الفهرسة.
            </p>

            <ol className="text-sm space-y-2.5 text-foreground/85 list-decimal list-inside">
              <li>
                افتح إعدادات الموصّلات في مساحة العمل الخاصة بك على Lovable.
              </li>
              <li>
                اختر <span className="text-gold font-semibold">Google Search Console</span> واضغط
                Connect.
              </li>
              <li>
                امنح الصلاحيات المطلوبة لحساب جوجل الذي أضاف نطاق الموقع في Search Console.
              </li>
              <li>
                ارجع إلى هنا وستُعرض المواقع المتحقق منها تلقائياً.
              </li>
            </ol>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gold-border bg-onyx/60 text-gold px-4 py-2 rounded-lg text-sm hover:bg-gold/10 transition"
              >
                <ExternalLink className="size-4" />
                فتح Search Console
              </a>
              <a
                href="https://docs.lovable.dev/integrations/google-search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold hover:underline"
              >
                دليل الربط في Lovable ←
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <StatusCard
          icon={CheckCircle2}
          color="emerald"
          title="التحقق من الموقع"
          desc="سيتم تلقائياً بعد ربط الموصّل مع حسابك، لا حاجة لرفع ملفات HTML."
        />
        <StatusCard
          icon={AlertCircle}
          color="amber"
          title="بيانات الظهور والنقرات"
          desc="بعد الربط ستظهر آخر 28 يوماً من مقاييس النقر والانطباعات وموضع الترتيب."
        />
      </div>

      <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 text-amber-200/90 text-xs p-4 leading-relaxed">
        هذا القسم يعمل بالكامل بدون أي رصيد AI — يعتمد فقط على واجهة برمجة Search Console الرسمية
        عبر موصّل Lovable الآمن.
      </div>
    </div>
  );
}

function StatusCard({
  icon: Icon,
  color,
  title,
  desc,
}: {
  icon: React.ElementType;
  color: "emerald" | "amber";
  title: string;
  desc: string;
}) {
  const tone =
    color === "emerald"
      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
      : "border-amber-500/30 bg-amber-500/5 text-amber-400";
  return (
    <div className={`rounded-2xl border p-5 ${tone}`}>
      <Icon className="size-5 mb-2" />
      <div className="font-bold mb-1 text-foreground">{title}</div>
      <p className="text-xs text-foreground/70 leading-relaxed">{desc}</p>
    </div>
  );
}

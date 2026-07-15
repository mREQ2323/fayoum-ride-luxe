import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { adminLogin, adminMe } from "@/lib/admin.functions";
import { Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin-page-login")({
  head: () => ({
    meta: [
      { title: "لوحة الأدمن — تسجيل الدخول" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async () => {
    const me = await adminMe();
    if (me.authed) throw redirect({ to: "/admin" });
    return null;
  },
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const login = useServerFn(adminLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await login({ data: { email, password } });
      if (res.ok) {
        await router.navigate({ to: "/admin" });
      } else {
        setError("بيانات الدخول غير صحيحة.");
      }
    } catch {
      setError("حدث خطأ، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-gold shadow-gold mb-4">
            <ShieldCheck className="size-8 text-onyx" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-gold mb-2">لوحة تحكم الأدمن</h1>
          <p className="text-sm text-muted-foreground">صفحة خاصة — الدخول للمشرفين فقط</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-card gold-border p-7 shadow-elegant space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground/90">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gold" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-onyx/60 gold-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="example@mail.com"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground/90">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gold" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-onyx/60 gold-border text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-sm px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-onyx py-3 rounded-xl font-bold shadow-gold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
            {loading ? "جاري التحقق…" : "دخول"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            الجلسة مشفرة وتنتهي تلقائياً بعد 8 ساعات.
          </p>
        </form>
      </div>
    </div>
  );
}

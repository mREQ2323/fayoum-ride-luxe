import { createFileRoute, Link, Outlet, redirect, useRouter, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminLogout, adminMe } from "@/lib/admin.functions";
import { BarChart3, FileEdit, Gauge, LayoutDashboard, LogOut, Search, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الأدمن" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async () => {
    const me = await adminMe();
    if (!me.authed) throw redirect({ to: "/admin-page-login" });
    return { email: me.email };
  },
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { to: "/admin/seo", label: "أدوات السيو", icon: Gauge, exact: false },
  { to: "/admin/articles", label: "المقالات", icon: FileEdit, exact: false },
  { to: "/admin/gsc", label: "Search Console", icon: Search, exact: false },
] as const;

function AdminLayout() {
  const { email } = Route.useLoaderData();
  const router = useRouter();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const logout = useServerFn(adminLogout);

  async function onLogout() {
    await logout();
    await router.navigate({ to: "/admin-page-login" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex" dir="rtl">
      <aside className="w-64 shrink-0 border-l border-gold/15 bg-card/60 backdrop-blur-xl sticky top-0 h-screen p-5 flex flex-col">
        <Link to="/admin" className="flex items-center gap-2 mb-8 group">
          <div className="size-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
            <BarChart3 className="size-4 text-onyx" />
          </div>
          <div>
            <div className="text-sm font-bold text-gradient-gold">لوحة الأدمن</div>
            <div className="text-[10px] text-muted-foreground">Limousine Fayoum</div>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-gold/15 text-gold gold-border"
                    : "text-foreground/75 hover:text-gold hover:bg-gold/5"
                }`}
              >
                <Icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-gold/15 space-y-2">
          <div className="px-3 py-2 rounded-lg bg-onyx/40 text-[11px]">
            <div className="text-muted-foreground">مسجل الدخول</div>
            <div className="font-semibold text-foreground/90 truncate" dir="ltr">{email}</div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-foreground/70 hover:text-gold hover:bg-gold/5 transition-colors"
          >
            <ExternalLink className="size-3.5" />
            عرض الموقع
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-destructive/90 hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";

function timingSafeStringEq(a: string, b: string) {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { useSession } = await import("@tanstack/react-start/server");
    const { sessionCfg } = await import("./admin.server");
    type S = import("./admin.server").AdminSession;
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedEmail || !expectedPassword) {
      return { ok: false as const, error: "server-misconfigured" };
    }
    const emailOk = timingSafeStringEq(
      data.email.trim().toLowerCase(),
      expectedEmail.trim().toLowerCase(),
    );
    const passOk = timingSafeStringEq(data.password.trim(), expectedPassword.trim());
    if (!emailOk || !passOk) {
      console.warn("[adminLogin] mismatch", { emailOk, passOk, emailLen: data.email.length, expLen: expectedPassword.length });
      return { ok: false as const, error: "invalid" };
    }

    const session = await useSession<S>(sessionCfg());
    await session.update({
      email: expectedEmail,
      unlocked: true,
      loginAt: Date.now(),
    });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { useSession } = await import("@tanstack/react-start/server");
  const { sessionCfg } = await import("./admin.server");
  type S = import("./admin.server").AdminSession;
  const session = await useSession<S>(sessionCfg());
  await session.clear();
  return { ok: true as const };
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  const { useSession } = await import("@tanstack/react-start/server");
  const { sessionCfg } = await import("./admin.server");
  type S = import("./admin.server").AdminSession;
  const session = await useSession<S>(sessionCfg());
  if (!session.data.unlocked) return { authed: false as const };
  return {
    authed: true as const,
    email: session.data.email ?? "",
    loginAt: session.data.loginAt ?? 0,
  };
});


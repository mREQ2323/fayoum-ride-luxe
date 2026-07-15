import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

export type AdminSession = { email?: string; unlocked?: boolean; loginAt?: number };

function sessionCfg() {
  return {
    password: process.env.SESSION_SECRET!,
    name: "admin-session",
    maxAge: 60 * 60 * 8, // 8 hours
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

function timingSafeStringEq(a: string, b: string) {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedEmail || !expectedPassword) {
      return { ok: false as const, error: "server-misconfigured" };
    }
    const emailOk = timingSafeStringEq(
      data.email.trim().toLowerCase(),
      expectedEmail.trim().toLowerCase(),
    );
    const passOk = timingSafeStringEq(data.password, expectedPassword);
    if (!emailOk || !passOk) {
      return { ok: false as const, error: "invalid" };
    }
    const session = await useSession<AdminSession>(sessionCfg());
    await session.update({
      email: expectedEmail,
      unlocked: true,
      loginAt: Date.now(),
    });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionCfg());
  await session.clear();
  return { ok: true as const };
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionCfg());
  if (!session.data.unlocked) return { authed: false as const };
  return {
    authed: true as const,
    email: session.data.email ?? "",
    loginAt: session.data.loginAt ?? 0,
  };
});

/** Throw-if-not-admin used inside protected server fns. */
export async function requireAdminSession() {
  const session = await useSession<AdminSession>(sessionCfg());
  if (!session.data.unlocked) {
    throw redirect({ to: "/admin-page-login" });
  }
  return session;
}

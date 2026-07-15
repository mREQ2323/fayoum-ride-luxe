import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export type AdminSession = { email?: string; unlocked?: boolean; loginAt?: number };

export function sessionCfg() {
  return {
    password: process.env.SESSION_SECRET!,
    name: "admin-session",
    maxAge: 60 * 60 * 8,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

export async function requireAdminSession() {
  const session = await useSession<AdminSession>(sessionCfg());
  if (!session.data.unlocked) {
    throw redirect({ to: "/admin-page-login" });
  }
  return session;
}

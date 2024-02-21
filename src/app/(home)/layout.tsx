import { ReactNode } from "react";
import DashboardLayout from "./_components/dashboard";
import { getAdminToken } from "@/package/cookies/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const adminToken = await getAdminToken(cookies());
  if (adminToken === "") {
    redirect("/login")
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}

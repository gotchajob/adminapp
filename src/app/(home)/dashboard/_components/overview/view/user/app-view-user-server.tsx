import { GetDashboardUser } from "@/package/api/dash-board/user";
import { AppViewUser } from "./app-view-user";
import { getAdminToken } from "@/package/cookies/token";
import { cookies } from "next/headers";
import { getAllDaysInMonth } from "@/package/util";

export default async function AppViewUserServer({
  searchParams,
}: {
  searchParams: {
    month: number;
    year: number;
  };
}) {
  const accessToken = await getAdminToken(cookies());
  const data = await GetDashboardUser(
    {
      month: searchParams.month,
      year: searchParams.year,
    },
    accessToken
  );
  const labels = getAllDaysInMonth(searchParams.month, searchParams.year);
  return <AppViewUser data={data} labels={labels} />;
}

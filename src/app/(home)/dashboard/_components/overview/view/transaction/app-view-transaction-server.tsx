import { getAdminToken } from "@/package/cookies/token";
import { getAllDaysInMonth } from "@/package/util";
import { cookies } from "next/headers";
import { AppViewTransaction } from "./app-view-transaction";
import { GetDashboardTransaction } from "@/package/api/dash-board/transaction";

export default async function AppViewTransactionServer({
  searchParams,
}: {
  searchParams: {
    month: number;
    year: number;
  };
}) {
  const accessToken = await getAdminToken(cookies());
  const data = await GetDashboardTransaction(
    {
      month: searchParams.month,
      year: searchParams.year,
    },
    accessToken
  );
  const labels = getAllDaysInMonth(searchParams.month, searchParams.year);
  return <AppViewTransaction data={data} labels={labels} />;
}

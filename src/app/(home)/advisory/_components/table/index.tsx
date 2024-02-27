import { getAdminToken } from "@/package/cookies/token";
import { AdviseServiceTable } from "./table";
import { GetUser } from "@/package/api/user";
import { cookies } from "next/headers";
import { GetOrder } from "@/package/api/order-service";
import { UserCurrent } from "@/package/api/user/current";
import { GetAdvice } from "@/package/api/advice-service";

export default async function AdviseTableServer({
  searchParams,
}: {
  searchParams: {
    page?: number;
    rowsPerPage?: number;
  };
}) {
  const adminToken = await getAdminToken(cookies());
  const currentAdmin = await UserCurrent(adminToken);
  const data = await GetAdvice(
    {
      limit: searchParams?.rowsPerPage ? searchParams.rowsPerPage : 5,
      page: searchParams?.page ? searchParams.page : 1,
      sortBy: "createdAt",
      sortOrder: "asc",
    },
    adminToken
  );
  return (
    <AdviseServiceTable data={data.data.adviseList} total={data.data.total} currentAdmin={currentAdmin}/>
  );
}

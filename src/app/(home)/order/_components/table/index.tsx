import { getAdminToken } from "@/package/cookies/token";
import { OrderServiceTable } from "./table";
import { cookies } from "next/headers";
import { GetOrder } from "@/package/api/order-service";
import { UserCurrent } from "@/package/api/user/current";

export default async function OrderTableServer({
  searchParams,
}: {
  searchParams: {
    page?: number;
    rowsPerPage?: number;
  };
}) {
  const adminToken = await getAdminToken(cookies());
  const currentAdmin = await UserCurrent(adminToken);
  const data = await GetOrder(
    {
      limit: searchParams?.rowsPerPage ? searchParams.rowsPerPage : 5,
      page: searchParams?.page ? searchParams.page : 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    adminToken
  );
  return (
    <OrderServiceTable data={data.data.orderList} total={data.data.total} currentAdmin={currentAdmin}/>
  );
}

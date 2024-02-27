import { getAdminToken } from "@/package/cookies/token";
import { TransactionTable } from "./table";
import { cookies } from "next/headers";
import { UserCurrent } from "@/package/api/user/current";
import { GetAdvice } from "@/package/api/advice-service";
import { GetTransaction } from "@/package/api/transaction";

export default async function TransactionTableServer({
  searchParams,
}: {
  searchParams: {
    page?: number;
    rowsPerPage?: number;
  };
}) {
  const adminToken = await getAdminToken(cookies());
  const data = await GetTransaction(
    {
      limit: searchParams?.rowsPerPage ? searchParams.rowsPerPage : 5,
      page: searchParams?.page ? searchParams.page : 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    adminToken
  );
  return (
    <TransactionTable data={data.data.transactionList} total={data.data.total} />
  );
}

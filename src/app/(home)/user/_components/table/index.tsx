import { getAdminToken } from "@/package/cookies/token";
import { UserTable } from "./table";
import { GetUser } from "@/package/api/user";
import { cookies } from "next/headers";

export default async function UserTableServer({searchParams} : {searchParams: {
  page?: number, rowsPerPage?: number
}}) {
  const adminToken = await getAdminToken(cookies());
  const data = await GetUser(
    {
      limit: searchParams?.rowsPerPage ? searchParams.rowsPerPage : 5,
      page: searchParams?.page ? searchParams.page : 1,
      sortBy: "createdAt",
      sortOrder: "asc",
    },
    adminToken
  );
  return <UserTable data={data.data.userList} total={data.data.total}/>;
}

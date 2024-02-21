import { getAdminToken } from "@/package/cookies/token";
import { UserTable } from "./table";
import { GetUser } from "@/package/api/user";
import { cookies } from "next/headers";

export default async function UserTableServer() {
  const adminToken = await getAdminToken(cookies());
  const data = await GetUser(
    {
      limit: 10,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "asc",
    },
    adminToken
  );
  return <UserTable data={data.data.userList} total={data.data.total}/>;
}

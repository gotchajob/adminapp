import { getAdminToken, setAdminToken } from "@/package/cookies/token";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const params = await req.json();
  const adminToken = await getAdminToken(cookies());
  const path = searchParams.get("path") as string;

  const data = response(params, adminToken, path);

  return NextResponse.json(data);
}

const response = async (params: string, adminToken: string, path: string) => {
  switch (path) {
    case "login":
      setAdminToken("", cookies());
      return {};

    default:
      return {};
  }
};

import { UpdateAdviceStatus } from "@/package/api/advice-service/update-status";
import { errorSystem } from "@/package/api/api-fetch";
import { CreateOrderSerivce } from "@/package/api/order-service";
import { UpdateOrderStatus } from "@/package/api/order-service/update-status";
import { BanUser } from "@/package/api/user/ban-user";
import { UserLogin, UserLoginResponse } from "@/package/api/user/login";
import { getAdminToken, setAdminToken } from "@/package/cookies/token";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const params = await req.json();
  const adminToken = await getAdminToken(cookies());
  const path = searchParams.get("path") as string;
  const data = await response(params, adminToken, path);
  return NextResponse.json(data);
}

const response = async (params: any, adminToken: string, path: string) => {
  try {
    let res: any = {};
    switch (path) {
      case "login":
        res = await UserLogin(params);
        if (res.data.user.roleId === 1 && res.data.user.roleId === 1) {
          setAdminToken(res.data.token, cookies());
        } else {
          throw new Error("Sai tài khoản hoặc mật khẩu");
        }
        break;
      case "ban-user":
        res = await BanUser(params, adminToken);
        break;
      case "update-order-status":
        res = await UpdateOrderStatus(params, adminToken);
        break;
      case "update-advise-status":
        res = await UpdateAdviceStatus(params, adminToken);
        break;
      case "create-order-service":
        res = await CreateOrderSerivce(params);
        break;
      case "logout":
        setAdminToken("", cookies());
        res = {
          responseText: "Đăng xuất thành công",
          status: "success",
        };
        break;
      default:
        res = {};
    }
    return res;
  } catch (error: any) {
    return errorSystem(error.message, {});
  }
};

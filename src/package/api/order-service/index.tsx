import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetOrderSericeResponse {
  status: string;
  responseText: string;
  data: {
    orderList: OrderService[];
    total: number;
  };
}

export interface OrderService {
  id: string;
  email: string;
  name: string;
  phone: string;
  service: string;
  payment: string;
  status: number;
  created: string;
  total: number;
  processingBy: string;
}
export interface GetOrderSericeRequest {
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortOrder: "asc" | "desc";
}
export const GetOrder = async (
  params: GetOrderSericeRequest,
  accessToken: string
): Promise<GetOrderSericeResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("page", params.page + "");
    searchParams.set("limit", params.limit + "");
    searchParams.set("sortBy", params.sortBy);
    searchParams.set("sortOrder", params.sortOrder);

    const res = await apiServerFetch(
      "/order-service?" + searchParams.toString(),
      "GET",
      undefined,
      accessToken
    );
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể lấy thông tin", { token: "" });
  }
};

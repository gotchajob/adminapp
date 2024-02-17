import { apiServerFetch, errorSystem } from "../api-fetch";

export interface OrderServiceRequest {
  fullName: string;
  phone: string;
  email: string;
}
export interface OrderServiceResponse {
  status: string;
  responseText: string;
  data: {};
}
export const OrderSerivce = async (
  params: OrderServiceRequest
): Promise<OrderServiceResponse> => {
  try {
    const res = await apiServerFetch("/home/order-service", "POST", params);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể gửi yêu cầu", { token: "" });
  }
};

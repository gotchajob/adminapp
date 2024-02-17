import { apiServerFetch, errorSystem } from "../api-fetch";

export interface SubscribeNewsRequest {
  email: string;
}
export interface SubscribeNewsResponse {
  status: string;
  responseText: string;
  data: {};
}
export const SubscribeNews = async (
  params: SubscribeNewsRequest
): Promise<SubscribeNewsResponse> => {
  try {
    const res = await apiServerFetch("/home/subscribe-news", "POST", params);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể gửi yêu cầu", { token: "" });
  }
};

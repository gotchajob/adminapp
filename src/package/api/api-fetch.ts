export const apiClientFetch = async (
  url: string,
  body?: any,
  accessToken?: string
): Promise<any> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: accessToken || "",
    },
    cache: "no-cache",
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const apiServerFetch = async (
  url: string,
  method: "GET" | "POST",
  body?: any,
  accessToken?: string
): Promise<any> => {
  let headers: any = {
    "Content-type": "application/json",
  };
  let newBody: any = {};
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }
  if (body) {
    newBody = { body: JSON.stringify(body) };
  }
  const res = await fetch(process.env.PRIVATE_BACKEND_ENDPOINT + url, {
    method,
    headers,
    cache: "no-cache",
    ...newBody,
  });
  if (res.status !== 200) {
    throw new Error("Backend error");
  }
  return await res.json();
};

export const errorSystem = (error: string, data: any) => {
  return {
    status: "error",
    responseText: error,
    data,
  };
};

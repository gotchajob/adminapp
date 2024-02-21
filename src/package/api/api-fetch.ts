export const apiClientFetch = async (
  path: string,
  body?: any
): Promise<any> => {
  const res = await fetch("/api/admin?path=" + path, {
    method: "POST",
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
    console.log(body)
    console.log(await res.json())
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

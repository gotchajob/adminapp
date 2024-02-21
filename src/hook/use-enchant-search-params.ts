"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetSearchParams = (keys: string[]): any => {
  const searchParams = useSearchParams();
  const [res, setRes] = useState<any>({});

  useEffect(() => {
    let newRes = { ...res };
    keys.forEach((e) => {
      const data = searchParams.get(e);
      if (data === null && e === "page") {
        newRes = { ...newRes, page: 1 };
      } else if (e === "rowsPerPage" && data === null) {
        newRes = { ...newRes, rowsPerPage: 5 };
      } else {
        newRes = { ...newRes, [e]: data };
      }
    });
    setRes(newRes);
  }, [searchParams]);
  return res;
};

export const useSearchParamsNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const push = (
    params: [
      {
        name: string;
        value: string;
      }
    ],
    useCurrentSearchParams?: boolean
  ) => {
    const url = new URLSearchParams(
      useCurrentSearchParams ? searchParams.toString() : ""
    );
    params.forEach((e) => {
      if (url.get(e.name) || url.get(e.name) === "") {
        url.delete(e.name);
      }
      url.append(e.name, e.value);
    });
    router.push(pathname + "?" + url.toString());
  };
  return { push };
};

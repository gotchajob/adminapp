"use client";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSearchParamsNavigation } from "@/hook/use-enchant-search-params";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export const DateRouter = () => {
  const { push } = useSearchParamsNavigation();
  const router = useRouter()
  // useEffect(() => {
  //   setInterval(() => {
  //     router.refresh()
  //   }, 60*5)
  // },[])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={"Select day"}
        defaultValue={new Date()}
        views={["month", "year"]}
        onChange={(date: Date | null) => {
          if (date) {
            push(
              [
                { value: (date.getMonth() + 1).toString(), name: "month" },
                { name: "year", value: date.getFullYear().toString() },
              ],
              true
            );
          }
        }}
      />
    </LocalizationProvider>
  );
};

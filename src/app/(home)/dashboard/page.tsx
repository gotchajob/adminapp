import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppViewTransactionServer from "./_components/overview/view/transaction/app-view-transaction-server";
import AppViewUserServer from "./_components/overview/view/user/app-view-user-server";
import Box from "@mui/material/Box";
import { DateRouter } from "./_components/overview/view/app-date-router";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { month: number; year: number };
}) {
  const date = {
    month: searchParams.month || new Date().getMonth() + 1,
    year: searchParams.year || new Date().getFullYear(),
  };
  return (
    <Container maxWidth="xl">
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>
        <DateRouter />
      </Box>
      <Suspense fallback={null}>
        <AppViewUserServer searchParams={date} />
      </Suspense>
      <Box height={24}></Box>
      <Suspense fallback={null}>
        <AppViewTransactionServer searchParams={date} />
      </Suspense>
    </Container>
  );
}

import Iconify from "@/components/iconify/iconify";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { StyledSkeleton } from "@/components/skeleton/skeleton";
import OrderTableServer from "./_components/table";

export default async function Page({ searchParams }: { searchParams: any }) {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Orders</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Order
        </Button>
      </Stack>

      <Suspense fallback={<StyledSkeleton width={"100%"} height={500} />}>
        <OrderTableServer searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

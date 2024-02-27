import Iconify from "@/components/iconify/iconify";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import AdviseTableServer from "./_components/table";
import { StyledSkeleton } from "@/components/skeleton/skeleton";

export default async function Page0({ searchParams }: { searchParams: any }) {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Advisory</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Advisory
        </Button>
      </Stack>
      <Suspense fallback={<StyledSkeleton width={"100%"} height={500} />}>
        <AdviseTableServer searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

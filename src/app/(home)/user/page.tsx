import Iconify from "@/components/iconify/iconify";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UserTable } from "./_components/table/table";
import { GetUser } from "@/package/api/user";
import { getAdminToken } from "@/package/cookies/token";
import { cookies } from "next/headers";
import UserTableServer from "./_components/table";
import { Suspense } from "react";
import { StyledSkeleton } from "@/components/skeleton/skeleton";

export default async function Page({searchParams} : {searchParams: any}) {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Users</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>
      <Suspense fallback={<StyledSkeleton width={"100%"} height={463} />}>
        <UserTableServer searchParams={searchParams}/>
      </Suspense>
    </Container>
  );
}

"use client";
import { useState } from "react";

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";
import { ReactNode } from "react";

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children,
  username,
}: {
  children: ReactNode;
  username: string;
}) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} username={username} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav
          username={username}
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
        />
        {/* @ts-ignore */}
        <Main>{children}</Main>
      </Box>
    </>
  );
}

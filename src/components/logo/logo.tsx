import PropTypes from "prop-types";
import { forwardRef } from "react";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import Link from "next/link";
import Image from "next/image";
import { ImageCard } from "../common/image-card";
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }: any, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = <ImageCard width={180} src={"/assets/images/logo/logo.png"} />;

  if (disabledLink) {
    return logo;
  }

  return (
    <Link
      href="/dashboard"
      style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {logo}
    </Link>
  );
});

export default Logo;

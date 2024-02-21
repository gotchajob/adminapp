import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { StyledLabel } from "./styles";
import { ReactNode } from "react";

// ----------------------------------------------------------------------
export interface LabelProps {
  children: ReactNode;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  sx?: any;
  variant?: "filled" | "outlined" | "ghost" | "soft";
  color:
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
}
const Label = ({
  children,
  color = "default",
  variant = "soft",
  startIcon,
  endIcon,
  sx,
  ...other
}: any) => {
  const theme = useTheme();

  const iconStyles = {
    width: 16,
    height: 16,
    "& svg, img": { width: 1, height: 1, objectFit: "cover" },
  };

  return (
    <StyledLabel
      component="span"
      ownerState={{ color, variant }}
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
      theme={theme}
      {...other}
    >
      {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
    </StyledLabel>
  );
};

export default Label;

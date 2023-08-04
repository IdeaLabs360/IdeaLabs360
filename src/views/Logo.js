import * as React from "react";
import { Box, Typography } from "@mui/material";

export const Logo = ({ variant, fontSize }) => {
  return (
    <Box sx={{ mr: 2, display: "flex" }}>
      <Typography
        variant={variant}
        noWrap
        component="div"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: { fontSize },
        }}
      >
        Idea
      </Typography>

      <Typography
        variant={variant}
        noWrap
        component="div"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: { fontSize },
          color: "gray",
        }}
      >
        Labs
      </Typography>

      <Typography
        variant={variant}
        noWrap
        component="div"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: { fontSize },
          color: "lightgray",
        }}
      >
        360
      </Typography>
    </Box>
  );
};

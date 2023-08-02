import * as React from "react";
import { Box, Typography } from "@mui/material";

export const Logo = () => {
  return (
    <Box sx={{ mr: 2, display: "flex" }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "1.5rem" }}
      >
        Idea
      </Typography>

      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: "1.5rem",
          color: "gray",
        }}
      >
        Labs
      </Typography>

      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: "1.5rem",
          color: "lightgray",
        }}
      >
        360
      </Typography>
    </Box>
  );
};

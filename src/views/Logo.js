import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";

export const ShortLogo = () => {
  return (
    <Box sx={{ display: "flex", bgColor: "blue", m: 5 }}>
      <Paper
        elevation={1}
        sx={{
          p: 1,
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#FBFAF5",
          backgroundColor: "#6a747b",
        }}
      >
        IL3
      </Paper>
    </Box>
  );
};

export const Logo = ({ variant, fontSize }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant={variant}
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
        component="div"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: { fontSize },
          color: "text.secondary",
        }}
      >
        Labs
      </Typography>

      <Typography
        variant={variant}
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

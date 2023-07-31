import * as React from "react";
import { Box, Typography } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

export const Portfolio = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <WorkOutlineIcon sx={{ color: "icon.primary" }} />
      <Typography variant="h5" component="div" sx={{ marginLeft: "10px" }}>
        Portfolio
      </Typography>
    </Box>
  );
};

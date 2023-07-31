import * as React from "react";
import { Box, Typography } from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

export const Services = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ViewInArIcon sx={{ color: "icon.primary" }} />

        <Typography variant="h5" component="div" sx={{ marginLeft: "10px" }}>
          Services
        </Typography>
      </Box>

      <ul>
        <li>test 1</li>
        <li>test 2</li>
      </ul>
    </>
  );
};

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import BackupIcon from "@mui/icons-material/Backup";
import { materials } from "../../views/Home";

export const PrintHome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            component="div"
            variant="h4"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            On Demand Manufacturing
          </Typography>

          <Typography
            component="div"
            variant="h5"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            On Demand Manufacturing
          </Typography>
        </Box>

        <Box sx={{ mt: 2, mb: 4, color: "#676e8b" }}>
          <Typography variant="body1" component="div">
            Upload your design files to get pricing details, lead times, and
            design feedback. IdeaLabs360 serves as your comprehensive
            destination for tailored manufacturing solutions, offering a
            seamless and convenient experience.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            border: "1px dashed #676e8b78",
            borderRadius: "5px",
          }}
        >
          <Typography
            component="div"
            variant="body1"
            sx={{ textAlign: "center", fontWeight: "600" }}
          >
            Upload your design files
          </Typography>

          <Typography
            component="div"
            variant="body1"
            sx={{ pb: 2, textAlign: "center", fontWeight: "600" }}
          >
            get pricing, lead times, and design feedback
          </Typography>

          {/* Supported materials */}
          <Typography
            component="div"
            variant="body2"
            sx={{ color: "#566573", textAlign: "center" }}
          >
            {materials.join(" | ")} materials
          </Typography>

          {/* Files supported */}
          <Typography
            variant="body2"
            component="div"
            sx={{ pt: 0.5, color: "#566573", textAlign: "center" }}
          >
            STL | OBJ | AMF files
          </Typography>

          {/* Quote button */}
          <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              component="label"
              sx={{
                py: 1.5,
                px: 3,
                bgcolor: "icon.primary",
                textTransform: "none",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              <BackupIcon sx={{ mr: 2 }} />
              Start Your Instant Quote
              <input
                type="file"
                multiple
                hidden
                onClick={(e) => (e.target.value = null)}
                onChange={(e) => {
                  navigate("/print/quote", {
                    state: { uploadedFiles: [...e.target.files] },
                  });
                }}
              />
            </Button>
          </Box>

          {/* Security info */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#ABB2B9",
            }}
          >
            <LockIcon sx={{ mr: 1, fontSize: "1.1rem" }} />

            <Typography
              variant="body2"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              All uploads are secure and confidential.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

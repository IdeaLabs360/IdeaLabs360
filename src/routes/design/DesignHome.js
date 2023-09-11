import { Box, Button, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EngineeringIcon from "@mui/icons-material/Engineering";

export const DesignHome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box>
          <Typography
            component="div"
            variant="h4"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Innovative Design Solutions
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              component="div"
              variant="h5"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              Innovative Design Solutions
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 1 }}>
          {/* <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "text.secondary",
            }}
          >
            Product Design | 3D Modeling | Replacement Parts
          </Typography> */}

          <Box sx={{ mt: 2, mb: 4, color: "#676e8b" }}>
            <Typography variant="body1" component="div">
              {/* Request a quote and get pricing, lead time, and design feedback. */}
              Upload your design files to see instant pricing, lead times, and
              DFM feedback. With over a dozen available processes, including CNC
              machining, 3D printing, sheet cutting, injection molding, Xometry
              is your one-stop shop for custom manufacturing.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            border: "1.5px dashed #676e8b78",
            borderRadius: "10px",
          }}
        >
          {/* Files supported */}
          <Typography
            variant="body2"
            component="div"
            sx={{ pt: 1, color: "#566573", textAlign: "center" }}
          >
            STL | OBJ | X3D | 3MF files
          </Typography>

          {/* Quote button */}
          <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => window.open("/#/design/quote", "_self")}
              variant="contained"
              sx={{
                py: 1.5,
                px: 3,
                bgcolor: "icon.primary",
                textTransform: "none",
                textAlign: "left",
                fontWeight: "700",
              }}
            >
              <EngineeringIcon sx={{ mr: 2 }} />
              Request Your FREE Design Consultation
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
              Secure and Confidential Request
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

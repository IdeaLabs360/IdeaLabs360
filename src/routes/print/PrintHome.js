import { Box, Button, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { materials } from "../../views/Home";

export const PrintHome = () => {
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
            3D Print Your Designs
          </Typography>

          <Typography
            component="div"
            variant="h5"
            sx={{ display: { xs: "flex", md: "none" }, fontWeight: "700" }}
          >
            3D Print Your Designs
          </Typography>
        </Box>

        <Box sx={{ mt: 2, color: "#676e8b" }}>
          <Typography
            variant="body1"
            component="div"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Use cutting edge FDM printing and bring your ideas to life
          </Typography>
        </Box>

        <Box
          sx={{ display: { xs: "block", md: "flex" }, alignItems: "center" }}
        >
          <Typography
            component="div"
            variant="body1"
            sx={{ mr: 1, fontWeight: "700" }}
          >
            Materials we support
          </Typography>

          <Typography component="div" variant="body2" sx={{ color: "#676e8b" }}>
            {materials.join(", ")}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 4,
            p: 4,
            border: "2px dashed #676e8b78",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ pb: 2, display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => window.open("/#/print/quote", "_self")}
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
              <RequestQuoteIcon sx={{ mr: 2 }} />
              Get a FREE Quote Now
            </Button>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", color: "#676e8b" }}
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
              Secure and Confidential Quote
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

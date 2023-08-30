import { Box, Button, Typography } from "@mui/material";
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            component="div"
            variant="h4"
            sx={{ display: { xs: "none", md: "flex" }, fontWeight: "700" }}
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

        <Box sx={{ mt: 1, color: "#676e8b" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            Use cutting edge FDM printing and bring your ideas to life
          </Typography>

          <Typography
            variant="h7"
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              mt: 1,
            }}
          >
            Use cutting edge FDM printing
          </Typography>

          <Typography
            variant="h7"
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              color: "#676e8b",
              mt: 1,
            }}
          >
            Bring your ideas to life
          </Typography>
        </Box>

        <Box sx={{ my: 4, textAlign: "center" }}>
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
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
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
      </Box>
    </Box>
  );
};

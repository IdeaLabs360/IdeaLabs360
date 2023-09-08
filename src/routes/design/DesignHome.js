import { Box, Button, Typography } from "@mui/material";
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
            sx={{ display: { xs: "none", md: "flex" }, fontWeight: "700" }}
          >
            Innovative Design Solutions
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              component="div"
              variant="h5"
              sx={{ display: { xs: "flex", md: "none" }, fontWeight: "700" }}
            >
              Innovative Design Solutions
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "text.secondary",
            }}
          >
            Product Design | 3D Modeling | Replacement Parts
          </Typography>

          <Typography
            variant="h7"
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              color: "text.secondary",
              mt: 1,
            }}
          >
            Product Design | 3D Modeling
          </Typography>

          <Typography
            variant="h7"
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              color: "text.secondary",
              mt: 1,
            }}
          >
            Replacement Parts
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "inherit" },
            justifyContent: { xs: "center", md: "inherit" },
            mt: 4,
          }}
        >
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
            Request a FREE Consultation
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import EngineeringIcon from "@mui/icons-material/Engineering";

const data = ["3D Modeling", "Product Design", "Replacement Parts"];

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
        <Typography
          component="div"
          variant="h4"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          Digital Sculpting
        </Typography>

        <Typography
          component="div"
          variant="h5"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          Digital Sculpting
        </Typography>
      </Box>

      <Box sx={{ mt: 2, color: "#676e8b" }}>
        <Typography variant="body1" component="div">
          Reach out to our skilled engineers for a complimentary consultation
          and embark on your product development journey with us today.
        </Typography>

        <List sx={{ ml: 4, mt: 1 }}>
          {data.map((d, index) => (
            <ListItem key={index} disablePadding disableGutters>
              <CircleIcon sx={{ mr: 1, fontSize: "0.5rem" }} />
              <ListItemText primary={d} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => window.open("/#/design/quote", "_self")}
          variant="contained"
          sx={{
            py: 1.5,
            px: 3,
            bgcolor: "icon.primary",
            textTransform: "none",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          <EngineeringIcon sx={{ mr: 2 }} />
          Request Your Free Consultation
        </Button>
      </Box>
    </Box>
  );
};

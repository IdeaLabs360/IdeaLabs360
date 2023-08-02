import * as React from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";

export const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        IdeaLabs360
      </Typography>

      <Typography
        variant="body1"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "gray",
        }}
      >
        Bring Your Ideas To Life
      </Typography>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            <Card
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                maxWidth: 400,
              }}
            >
              <AttachMoneyOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Fair Price
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We believe everyone should have access to high-quality
                  products at a fair price. Experience the perfect balance of
                  affordability and excellence with us. Shop today and see the
                  difference that reasonable pricing can make in elevating your
                  overall buying experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            <Card
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                maxWidth: 400,
                marginLeft: "15px",
              }}
            >
              <ElectricBoltOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Fast Response and Open Communication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience the difference of working with a company that
                  values speed, efficiency, and client satisfaction above all
                  else. Choose us for your 3D printing prototype design needs,
                  and you'll witness the power of a "Fast Response" in action.
                  Let's turn your ideas into reality quickly and effectively -
                  together.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

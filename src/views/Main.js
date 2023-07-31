import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Portfolio } from "./Portfolio";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";

export const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
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

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      display: "flex",
                      maxWidth: 400,
                    }}
                  >
                    <AttachMoneyOutlinedIcon
                      sx={{
                        color: "icon.primary",
                        fontSize: "4rem",
                        paddingTop: "16px",
                        marginRight: "15px",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Fair Price
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        We believe everyone should have access to high-quality
                        products at a fair price. Experience the perfect balance
                        of affordability and excellence with us. Shop today and
                        see the difference that reasonable pricing can make in
                        elevating your overall buying experience.
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    elevation={0}
                    sx={{
                      display: "flex",
                      maxWidth: 400,
                      marginLeft: "15px",
                    }}
                  >
                    <ElectricBoltOutlinedIcon
                      sx={{
                        color: "icon.primary",
                        fontSize: "4rem",
                        paddingTop: "16px",
                        marginRight: "15px",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Fast Response and Open Communication
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Experience the difference of working with a company that
                        values speed, efficiency, and client satisfaction above
                        all else. Choose us for your 3D printing prototype
                        design needs, and you'll witness the power of a "Fast
                        Response" in action. Let's turn your ideas into reality
                        quickly and effectively - together.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Portfolio />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

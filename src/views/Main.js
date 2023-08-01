import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";

export const Main = () => {
  const images = [
    "1.jpg",
    "2.webp",
    "1.jpg",
    "2.webp",
    "1.jpg",
    "2.webp",
    "1.jpg",
    "2.webp",
  ];

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
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
              <Grid container spacing={4}>
                {images.map((image, index) => (
                  <Grid key={index} xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`./ui/img/${image}`}
                          // alt={`project ${image.split(".")[0]}`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Lizard
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

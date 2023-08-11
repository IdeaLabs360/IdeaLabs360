import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import { Logo } from "./Logo";

const CreateQuoteMotto = (icon, contentTitle, content) => {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        maxWidth: 410,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {contentTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const Home = () => {
  const images = ["1.jpg"];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      {/* Explain what services is provided */}

      <Box sx={{ marginBottom: "50px" }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <Logo variant={"div"} fontSize={"3.5rem"} />
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
          }}
        >
          <Logo variant={"div"} fontSize={"2.0rem"} />
        </Box>

        <Typography
          variant="h5"
          component="div"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          Product Design | Prototyping | 3D Printing
        </Typography>

        <Typography
          variant="h7"
          component="div"
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
          }}
        >
          Product Design | Prototyping | 3D Printing
        </Typography>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteMotto(
              <AttachMoneyOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />,
              "Fair Price",
              `We believe everyone should have access to high-quality
               products at a fair price. Experience the perfect balance of
               affordability and excellence with us. Shop today and see the
               difference that reasonable pricing can make in elevating your
               overall buying experience.`
            )}
          </Grid>

          <Grid
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteMotto(
              <ElectricBoltOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />,
              "Fast & Open Communication",
              `Experience the difference of working with a company that
               values speed, efficiency, and client satisfaction above all
               else. Choose us for your 3D printing prototype design needs,
               and you'll witness the power of a "Fast Response" in action.
               Let's turn your ideas into reality quickly and effectively -
               together.`
            )}
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Grid container spacing={4}>
          {images.map((image, index) => (
            <Grid
              item
              key={index}
              xs={12}
              // sm={6}
              // md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="345"
                    image={`./img/${image}`}
                    // alt={`project ${image.split(".")[0]}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      A custom addition meticulously crafted to perfectly match
                      the dimensions of the Mustang emblem.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

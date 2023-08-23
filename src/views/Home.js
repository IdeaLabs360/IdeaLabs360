import * as React from "react";

import {
  Card,
  CardContent,
  Container,
  Grid,
  Box,
  Button,
  Typography,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
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
  const descriptionTokens = [
    "3D Design Services",
    "Rapid Prototyping Services",
    "3D Printing Services",
  ];

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

      <Box>
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
          variant="h6"
          component="div"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            color: "gray",
          }}
        >
          {descriptionTokens.join(" | ")}
        </Typography>

        <Typography
          variant="h7"
          component="div"
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            color: "gray",
            mt: 1,
          }}
        >
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {`${descriptionTokens[0]} | ${descriptionTokens[1]}`}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {descriptionTokens[2]}
            </Grid>
          </Grid>
        </Typography>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "50px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center", md: "right" }}
            sx={{ display: "flex" }}
          >
            <Button
              onClick={() => window.open("tel:6513576817", "_self")}
              variant="contained"
              sx={{
                bgcolor: "icon.primary",
                width: "280px",
                padding: "10px",
                textTransform: "none",
              }}
            >
              <PhoneIcon sx={{ mr: 2 }} />
              +1 (651) 357-6817
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center", md: "left" }}
            sx={{ display: "flex" }}
          >
            <Button
              onClick={() =>
                window.open(
                  "mailto:idealabs360@gmail.com?subject=IdeaLabs360 - Quote Request",
                  "_self"
                )
              }
              variant="contained"
              sx={{
                bgcolor: "icon.primary",
                width: "280px",
                padding: "10px",
                textTransform: "none",
              }}
            >
              <EmailIcon sx={{ mr: 2 }} />
              idealabs360@gmail.com
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
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
    </Box>
  );
};

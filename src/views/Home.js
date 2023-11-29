import * as React from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { ReviewStar } from "../common/ReviewStar";
import { useNavigate } from "react-router-dom";

export const reviews = [
  {
    stars: (
      <>
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
      </>
    ),
    detail:
      "Great Printing. Very Smart. Great Personailty. Would highly suggest working with them.",
    name: "Travis Glanzer",
  },
  {
    stars: (
      <>
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
      </>
    ),
    detail: `To everyone in the twin series area there is a guy out here to do a damn good job in 
      prototype he's very reasonable nite y'all need to get with him he's excellent I don't 
      have nothing that's bad to say about him he's a good person please look out get with 
      him he's very reasonable thank you`,
    name: "Thomas Smith",
  },
  {
    stars: (
      <>
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
      </>
    ),
    detail: `The statuettes I order were very good and I am very pleased with the results 
    which came fast by mail and I will even give them away as Christmas gifts !!`,
    name: "Mario Fontenla",
  },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box
        sx={{
          pb: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component="div"
          variant="h1"
          sx={{
            fontFamily: "sans-serif",
            fontSize: { xs: "35px", sm: "35px", md: "50px", lg: "50px" },
            fontWeight: "900",
            lineHeight: "1.4em",
          }}
        >
          Welcome to IdeaLabs360
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea onClick={() => navigate("/print")}>
              <CardMedia
                sx={{ height: 200 }}
                image="/img/1.jpg"
                title="green iguana"
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "700" }}
                >
                  3D Print Your Designs
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  3D print your models, get instant cost estimates, and hassel
                  free checkout process
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea onClick={() => navigate("/design")}>
              <CardMedia
                sx={{ height: 200 }}
                image="/img/3.jpg"
                title="green iguana"
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "700" }}
                >
                  Product Design
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

import * as React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const Gallery = ({ testRef }) => {
  const images = [
    "1.jpg",
    "2.webp",
    "1.jpg",
    "2.webp",
    "1.jpg",
    "2.webp",
    "1.jpg",
  ];

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
      ref={testRef}
    >
      <Grid container spacing={4}>
        {images.map((image, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`./img/${image}`}
                  // alt={`project ${image.split(".")[0]}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

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

export const Gallery = () => {
  const images = [
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
                    A custom addition meticulously crafted to perfectly
                    match the dimensions of the Mustang emblem.
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

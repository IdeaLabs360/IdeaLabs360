import * as React from "react";
import { AppBar, Box, Button, Container, Link, Toolbar } from "@mui/material";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        color: "inherit",
        bgcolor: "white",
        borderBottom: "1px solid lightgray",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* XS */}

          <Box
            noWrap
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <LightbulbRoundedIcon
              sx={{
                display: { xs: "flex", md: "none" },
                color: "icon.primary",
                fontSize: "medium",
                mr: 1,
              }}
            />
            <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
              <Logo variant={"h6"} fontSize={"1.35rem"} />
            </Link>
          </Box>

          {/* MD */}

          <Box
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <LightbulbRoundedIcon
              sx={{
                display: { xs: "none", md: "flex" },
                color: "icon.primary",
                mr: 1,
              }}
            />
            <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
              <Logo variant={"h6"} fontSize={"1.5rem"} />
            </Link>
          </Box>

          {/* End of Sizes */}

          <Box sx={{}}>
            <Button
              href="/#/quote"
              variant="contained"
              sx={{
                px: "20px",
                py: "10px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Get a Quote
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

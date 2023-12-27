import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpIcon from "@mui/icons-material/Help";

export const createHeroText = (text) => {
  return (
    <Typography
      component="div"
      variant="h1"
      sx={{
        fontFamily: "sans-serif",
        fontSize: { xs: "35px", sm: "35px", md: "50px", lg: "60px" },
        fontWeight: "900",
        lineHeight: "1.4em",
      }}
    >
      {text}
    </Typography>
  );
};

export const createDescriptionText = (text) => {
  return (
    <>
      <Typography
        component="div"
        variant="body"
        sx={{
          lineHeight: "1.2em",
          fontWeight: "300",
          fontSize: { xs: "25px", sm: "25px", md: "25px", lg: "30px" },
        }}
      >
        {text}
      </Typography>
    </>
  );
};

export const createBenefit = (icon, title, text) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>{icon}</Box>

      <Box sx={{ p: 1, textAlign: "center" }}>
        <Typography
          component="div"
          variant="body"
          sx={{
            mb: 2,
            fontSize: "1.3rem",
            fontWeight: "bold",
            lineHeight: "1.1em",
          }}
        >
          {title}
        </Typography>

        <Typography component="div" variant="body" sx={{}}>
          {text}
        </Typography>
      </Box>
    </Paper>
  );
};

export const createFAQ = (id, question, answer) => {
  return (
    <Accordion elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="faq-id-content"
        id={`faq-${id}`}
      >
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
          <HelpIcon sx={{ fontSize: "1.0rem" }} />
        </Box>

        <Typography component="div" variant="body" sx={{ fontWeight: "bold" }}>
          {question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ ml: 3, display: "flex" }}>
        {answer}
      </AccordionDetails>
    </Accordion>
  );
};

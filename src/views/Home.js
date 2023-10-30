import * as React from "react";

import { Box, Paper } from "@mui/material";

import { DesignHome } from "../routes/design/DesignHome";
import { PrintHome } from "../routes/print/PrintHome";
import { ReviewStar } from "../common/ReviewStar";

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
];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
};

export const Home = () => {
  const [serviceTab] = React.useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper elevation={0}>
        <TabPanel value={serviceTab} index={0} dir={"x"}>
          <PrintHome />
        </TabPanel>

        <TabPanel value={serviceTab} index={1} dir={"x"}>
          <DesignHome />
        </TabPanel>
      </Paper>
    </Box>
  );
};

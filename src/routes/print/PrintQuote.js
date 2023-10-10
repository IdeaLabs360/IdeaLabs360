import * as React from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

import {
  Button,
  Container,
  Grid,
  Box,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import { displayPhoneNumber, email } from "../../views/Home";
import { PrintQuoteFile } from "./PrintQuoteFile";
import apiConfig from "../../config/apiConfig";

const stripePromise = loadStripe(
  "pk_test_51NvNSiFoMfdWQhxnqVYO2uHw9ky2XTb54Oh7q4YctPtudSgLCyVWIEUZFnqC5hdANwm6aD4wWi5WSLnepCA5F0Ho00JKCsScV1",
  {
    betas: ["embedded_checkout_beta_1"],
  }
);

export const PrintQuote = () => {
  const [open, setOpen] = React.useState(false);
  const [success] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState("");

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [quotes, setQuotes] = React.useState([]);

  const location = useLocation();

  const updateQuote = (id, quote) => {
    const newQuotes = [...quotes];

    if (quote === null) {
      newQuotes.splice(id, 1);
    } else {
      newQuotes[id] = quote;
    }

    setQuotes(newQuotes);
  };

  const createSession = async () => {
    try {
      const formData = new FormData();

      const url = `${apiConfig.api.baseUrl}/v1/payment`;
      const response = await axios.post(url, formData);
    } catch (err) {}
  };

  React.useEffect(() => {
    const quotes = location.state.uploadedFiles?.map((file) => {
      return {
        quantity: 1,
        material: "PLA",
        color: "Black",
        file: file,
      };
    });

    setQuotes(quotes);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          component="div"
          sx={{ my: 3, fontSize: "2.0rem", fontWeight: "bold" }}
        >
          Quote
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={8}>
            {quotes.map((quote, index) => (
              <Box key={`quote_${index}`} sx={{ mb: 2 }}>
                <PrintQuoteFile
                  id={index}
                  quote={quote}
                  updateQuote={updateQuote}
                />
              </Box>
            ))}
          </Grid>

          <Grid item xs={4}>
            <Paper elevation={0} sx={{ px: 3, py: 2 }}>
              <Box>
                <Button
                  variant="contained"
                  component="label"
                  onClick={() => {
                    createSession();
                  }}
                  sx={{
                    py: 1.5,
                    px: 3,
                    bgcolor: "icon.primary",
                    textTransform: "none",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Status Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            px: 6,
            py: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="div"
            sx={{
              mb: "16px",
              color: "#595e6c",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {success ? <>Request submitted</> : <>Something went wrong</>}
          </Typography>

          <Divider />

          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            {success ? (
              <>
                Thank you for submitting a request. We will be in touch with you
                within one business day.
              </>
            ) : (
              <>
                An issue occurred while submitting the request. Please make
                another attempt or contact us using the information provided
                below. We apologize for the inconvenience.
              </>
            )}
          </Typography>

          <Divider />

          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box sx={{ minWidth: "100px" }}>Call or Text</Box>
              <Box>{displayPhoneNumber}</Box>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box sx={{ minWidth: "100px" }}>Email</Box>
              <Box>{email}</Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

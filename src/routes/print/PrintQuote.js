import * as React from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import BackupIcon from "@mui/icons-material/Backup";

import { PrintQuoteFile } from "./PrintQuoteFile";
import apiConfig from "../../config/apiConfig";
import { statesInUSAShort } from "../../constants/constants";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    state: yup
      .string()
      .length(2, "State must be in short the form; MN")
      .required("State is required"),
    zipcode: yup
      .string()
      .length(5, "Zipcode must be 5 digits")
      .matches(/^\d+$/, "Zipcode must be a number")
      .required("Zipcode is required"),
  })
  .required();

export const PrintQuote = () => {
  const [quotes, setQuotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const updateQuote = (id, quote) => {
    const newQuotes = [...quotes];

    if (quote === null) {
      newQuotes.splice(id, 1);
    } else {
      newQuotes[id] = quote;
    }

    setQuotes(newQuotes);
  };

  const createSession = async ({
    name,
    company,
    street,
    city,
    state,
    zipcode,
  }) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("company", company);
      formData.append("name", name);
      formData.append("street", street);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zipcode", zipcode);

      for (const quote of quotes) {
        formData.append("quantity", quote.quantity);
        formData.append("material", quote.material);
        formData.append("color", quote.color);
        formData.append("file", quote.file);

        formData.append(
          "items",
          JSON.stringify({
            quantity: quote.quantity,
            material: quote.material,
            color: quote.color,
            file: quote.file,
          })
        );
      }

      const url = `${apiConfig.api.baseUrl}/v1/checkout`;
      const response = await axios.post(url, formData);

      window.location.href = await response.data.checkout_link;
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
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

  const addQuote = (file) => {
    if (file !== null && file.length === 1) {
      const newQuote = {
        quantity: 1,
        material: "PLA",
        color: "Black",
        file: file[0],
      };

      setQuotes([...quotes, newQuote]);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h5"
        component="div"
        sx={{ my: 3, fontSize: "2.0rem", fontWeight: "bold" }}
      >
        Quotes
      </Typography>

      <Grid container spacing={2}>
        <Grid item md={8} sm={8} xs={12}>
          <Box>
            {quotes.map((quote, index) => (
              <Box key={`quote_${index}`} sx={{ mb: 2 }}>
                <PrintQuoteFile
                  id={index}
                  quote={quote}
                  updateQuote={updateQuote}
                />
              </Box>
            ))}

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  py: 1.5,
                  px: 3,
                  bgcolor: "icon.primary",
                  textTransform: "none",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                <BackupIcon sx={{ mr: 2 }} />
                Add Another File
                <input
                  type="file"
                  hidden
                  onClick={(e) => (e.target.value = null)}
                  onChange={(e) => addQuote(e.target.files)}
                />
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item md={4} sm={4} xs={12}>
          <FormControl sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="company"
              label="Company"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.company?.message}
              helperText={errors.company?.message}
              {...register("company")}
              sx={{ mt: 0 }}
            />

            <TextField
              id="name"
              label="Name *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              {...register("name")}
            />

            <TextField
              id="street"
              label="Street *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.street?.message}
              helperText={errors.street?.message}
              {...register("street")}
            />

            <TextField
              id="city"
              label="City *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.city?.message}
              helperText={errors.city?.message}
              {...register("city")}
            />

            <Autocomplete
              disablePortal
              id="state"
              options={statesInUSAShort}
              sx={{
                my: 1,
                bgcolor: "white",
                color: "black",
                "&:hover": { bgcolor: "white" },
              }}
              renderInput={(params) => (
                <TextField {...params} label="State *" {...register("state")} />
              )}
            />

            <TextField
              id="zipcode"
              label="Zipcode *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.zipcode?.message}
              helperText={errors.zipcode?.message}
              {...register("zipcode")}
            />

            <Button
              variant="contained"
              onClick={handleSubmit(createSession)}
              disabled={quotes?.length === 0}
              sx={{
                mt: 2,
                py: 1,
                bgcolor: "icon.primary",
                textTransform: "none",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              {isLoading ? (
                <>
                  Processing...
                  <CircularProgress size={25} sx={{ ml: 2, color: "white" }} />
                </>
              ) : (
                <>
                  <LockIcon sx={{ mr: 0.5, fontSize: "1.1rem" }} />
                  Checkout
                </>
              )}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

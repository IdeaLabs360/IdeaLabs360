import * as React from "react";

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
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import BackupIcon from "@mui/icons-material/Backup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import apiConfig from "../../config/apiConfig";
import { PrintQuoteFile } from "./PrintQuoteFile";
import { statesInUSAShort } from "../../constants/constants";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
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
  const defaultAddress = {
    company: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  };

  const [step, setStep] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const [rates, setRates] = React.useState([]);
  const [selectedRateId, setSelectedRateId] = React.useState();

  const [quotes, setQuotes] = React.useState([]);
  const [address, setAddress] = React.useState(defaultAddress);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  React.useEffect(() => {
    const total = quotes.reduce((acc, quote) => {
      return acc + (quote?.priceTotal ?? 0);
    }, 0);

    setTotal(total);
  }, [quotes]);

  const postRequest = async (url, formData) => {
    const unknownError = (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body" component="div" sx={{ fontSize: "0.75rem" }}>
          We couldn't get an estimate for this model. Please try again.
        </Typography>

        <Typography variant="body" component="div" sx={{ fontSize: "0.75rem" }}>
          If the issue persists, please reachout to us.
        </Typography>
      </Box>
    );

    let result = { data: null, error: null };

    try {
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        const data = await response.data;
        result.data = data;
      } else {
        result.error = unknownError;
      }
    } catch (err) {
      console.log(err);

      switch (err?.response?.status) {
        case 400:
          result.error = err?.response?.data;
          break;

        default:
          result.error = unknownError;
      }
    }

    return result;
  };

  const getEstimate = async (quantity, material, file) => {
    const formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("material", material);
    formData.append("file", file);

    const url = `${apiConfig.api.baseUrl}/v1/estimate`;
    const result = await postRequest(url, formData);

    return result;
  };

  const getShippingRates = async ({
    company,
    firstName,
    lastName,
    street,
    city,
    state,
    zipcode,
  }) => {
    const currentAddress = {
      company,
      firstName,
      lastName,
      street,
      city,
      state,
      zipcode,
    };

    console.log("getting shipping", currentAddress);

    const formData = new FormData();
    formData.append("company", currentAddress.company);
    formData.append("firstname", currentAddress.firstName);
    formData.append("lastname", currentAddress.lastName);
    formData.append("street", currentAddress.street);
    formData.append("city", currentAddress.city);
    formData.append("state", currentAddress.state);
    formData.append("zipcode", currentAddress.zipcode);

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

    const url = `${apiConfig.api.baseUrl}/v1/shipping/rate`;

    const result = await postRequest(url, formData);

    setRates(result?.data ?? []);
    setAddress(currentAddress);
    setStep(3);
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

  const addQuote = async (file) => {
    if (file !== null && file.length === 1) {
      const estimate = await getEstimate(1, "PLA", file[0]);

      const newQuote = {
        error: estimate?.error,
        quantity: 1,
        material: "PLA",
        color: "WHITE",
        file: file[0],
        priceEach: estimate?.data?.price_each,
        priceTotal: estimate?.data?.price_total,
        unit: "mm",
        width: estimate?.data?.width,
        length: estimate?.data?.width,
        height: estimate?.data?.width,
      };

      setQuotes([...quotes, newQuote]);
    }
  };

  const updateQuote = async (id, updatedQuote) => {
    const newQuotes = [...quotes];

    if (updatedQuote === null) {
      newQuotes.splice(id, 1);
    } else {
      const estimate = await getEstimate(
        updatedQuote.quantity,
        updatedQuote.material,
        updatedQuote.file
      );

      newQuotes[id] = {
        ...updatedQuote,
        error: estimate?.error,
        priceEach: estimate?.data?.price_each,
        priceTotal: estimate?.data?.price_total,
        unit: "mm",
        width: estimate?.data?.width,
        length: estimate?.data?.length,
        height: estimate?.data?.height,
      };
    }

    setQuotes(newQuotes);
  };

  const ratesControlProps = (rateId) => ({
    checked: selectedRateId === rateId,
    onChange: (event) => setSelectedRateId(event.target.value),
    value: rateId,
    name: "shipping-rate-radio-button",
  });

  const Panel = (props) => {
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

  const createSummaryLine = (label, value) => {
    return (
      <Box sx={{ mb: 0.5, display: "flex", color: "gray" }}>
        <Typography variant="body2" component="div" sx={{ flex: "1" }}>
          {label}
        </Typography>

        <Typography variant="body2" component="div" sx={{ margin: "auto" }}>
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Step 1: Add design files */}
      <Panel index={1} value={step}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontSize: { xs: "1.4rem", md: "2.0rem" },
              fontWeight: "bold",
            }}
          >
            Upload Design Files to Get Started
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{ mt: 1, mb: 2, color: "gray", fontStyle: "italic" }}
          >
            Please reachout to us if you have model files that is not currently
            supported.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Box>
              <Box
                sx={{
                  mb: 2,
                  px: 6,
                  py: 2,
                  border: "1px dashed #676e8b78",
                  borderRadius: "5px",
                  bgcolor: "#0b076e0a",
                }}
              >
                <Typography
                  component="div"
                  variant="body1"
                  sx={{ textAlign: "center" }}
                >
                  Upload design files get pricing
                </Typography>

                {/* Files supported */}
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ pt: 0.5, color: "#566573", textAlign: "center" }}
                >
                  STL | OBJ | files
                </Typography>

                {/* Quote button */}
                <Box sx={{ py: 1, display: "flex", justifyContent: "center" }}>
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
                    Upload Design File(s)
                    <input
                      type="file"
                      hidden
                      onClick={(e) => (e.target.value = null)}
                      onChange={(e) => addQuote(e.target.files)}
                    />
                  </Button>
                </Box>

                {/* Security info */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#ABB2B9",
                  }}
                >
                  <LockIcon sx={{ mr: 1, fontSize: "1.1rem" }} />

                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    All uploads are secure and confidential.
                  </Typography>
                </Box>
              </Box>

              {quotes.map((quote, index) => (
                <Box key={`quote_${index}`} sx={{ my: 2 }}>
                  <PrintQuoteFile
                    id={index}
                    quote={quote}
                    updateQuote={updateQuote}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item md={4} xs={12}>
            <Box sx={{ p: 2 }}>
              {quotes.map((quote, index) => (
                <Box key={`quote_${index}`}>
                  {createSummaryLine(
                    quote.file.name,
                    `$${quote?.priceTotal?.toFixed(2)}`
                  )}
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {createSummaryLine("Subtotal", `$${total.toFixed(2)}`)}
              {createSummaryLine("Shipping", "Calculated later")}
              {createSummaryLine("Estimated Tax", "$1.52")}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 0.5, display: "flex" }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ flex: "1", fontSize: "1.0rem" }}
                >
                  Total
                </Typography>

                <Typography
                  variant="body2"
                  component="div"
                  sx={{ margin: "auto", fontSize: "1.5rem" }}
                >
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ mt: 1, display: "flex", justifyContent: "end" }}>
                <Button
                  variant="contained"
                  onClick={() => setStep(2)}
                  disabled={quotes?.length === 0}
                  sx={{
                    mt: 2,
                    px: 5,
                    py: 1.5,
                    bgcolor: "icon.primary",
                    textTransform: "none",
                    textAlign: "center",
                    // fontSize: "1.0rem",
                    // fontWeight: "700",
                  }}
                >
                  Continue To Checkout
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Panel>

      {/* Step 2: Shipping */}
      <Panel value={step} index={2}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12} sx={{ px: { xs: 0, md: 8 } }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                mb: 2,
                fontSize: "1.4rem",
                // fontWeight: "bold",
              }}
            >
              Shipping Information
            </Typography>

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

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  fullWidth
                  id="first-name"
                  label="First name *"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  {...register("firstName")}
                  sx={{ mr: 2 }}
                />

                <TextField
                  fullWidth
                  id="last-name"
                  label="Last name *"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  {...register("lastName")}
                />
              </Box>

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

              <TextField
                id="state"
                label="State *"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!errors.state?.message}
                helperText={errors.state?.message}
                {...register("state")}
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

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="text"
                  onClick={() => setStep(1)}
                  disabled={quotes?.length === 0}
                  sx={{
                    mt: 2,
                    py: 1,
                    color: "text.secondary",
                    textTransform: "none",
                  }}
                >
                  <ArrowBackIosIcon sx={{ fontSize: "0.9rem" }} />
                  Back to Quotes
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmit(getShippingRates)}
                  disabled={quotes?.length === 0}
                  sx={{
                    mt: 2,
                    py: 1,
                    textTransform: "none",
                  }}
                >
                  Proceed to Shipping
                </Button>
              </Box>
            </FormControl>
          </Grid>

          <Grid item md={4} xs={12}>
            {quotes.map((quote, index) => (
              <Box key={`quote_${index}`}>
                {createSummaryLine(quote.file.name, `$${quote.priceTotal}`)}
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {createSummaryLine("Subtotal", `$${total.toFixed(2)}`)}
            {createSummaryLine("Shipping", "Calculated later")}
            {createSummaryLine("Estimated Tax", "$1.52")}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 0.5, display: "flex" }}>
              <Typography
                variant="body1"
                component="div"
                sx={{ flex: "1", fontSize: "1.0rem" }}
              >
                Total
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{ margin: "auto", fontSize: "1.5rem" }}
              >
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Panel>

      {/* Step 3: Summary and Checkout */}
      <Panel value={step} index={3}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12} sx={{ px: { xs: 0, md: 8 } }}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "1px solid gray",
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "gray" }}
              >
                Shipping to
              </Typography>

              <Box sx={{ ml: 4, flex: 1 }}>
                <Typography variant="body2" component="div" sx={{}}>
                  {`${address.firstName} ${address.lastName}`}
                </Typography>

                <Typography variant="body2" component="div" sx={{}}>
                  {`${address.street}, ${address.state}, ${address.state}, ${address.zipcode}`}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h5"
              component="div"
              sx={{ mt: 6, mb: 2, fontSize: "1.4rem" }}
            >
              Shipping Method
            </Typography>

            <Box>
              <RadioGroup>
                {rates.map((rate) => (
                  <Box
                    sx={{
                      p: 0.5,
                      my: 1,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "5px",
                      border: "1px solid gray",
                    }}
                  >
                    <Radio {...ratesControlProps(rate.objectId)} />

                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ flex: 1 }}
                    >
                      {`${rate.provider} ${rate.serviceLevel}`}
                    </Typography>

                    <Typography variant="body2" component="div" sx={{ pr: 2 }}>
                      ${rate.rate}
                    </Typography>
                  </Box>
                ))}
              </RadioGroup>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="text"
                onClick={() => setStep(1)}
                disabled={quotes?.length === 0}
                sx={{
                  mt: 2,
                  py: 1,
                  color: "text.secondary",
                  textTransform: "none",
                }}
              >
                <ArrowBackIosIcon sx={{ fontSize: "0.9rem" }} />
                Back to shipping information
              </Button>

              <Button
                variant="contained"
                onClick={() => createSession()}
                disabled={quotes?.length === 0}
                sx={{
                  mt: 2,
                  py: 1,
                  textTransform: "none",
                }}
              >
                Proceed to Payment
              </Button>
            </Box>
          </Grid>

          <Grid item md={4} xs={12}>
            {quotes.map((quote, index) => (
              <Box key={`quote_${index}`}>
                {createSummaryLine(quote.file.name, `$${quote.priceTotal}`)}
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {createSummaryLine("Subtotal", `$${total.toFixed(2)}`)}
            {createSummaryLine("Shipping", "Calculated later")}
            {createSummaryLine("Estimated Tax", "$1.52")}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 0.5, display: "flex" }}>
              <Typography
                variant="body1"
                component="div"
                sx={{ flex: "1", fontSize: "1.0rem" }}
              >
                Total
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{ margin: "auto", fontSize: "1.5rem" }}
              >
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Panel>
    </Container>
  );
};

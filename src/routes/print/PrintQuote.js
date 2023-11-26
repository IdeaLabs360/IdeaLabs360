import * as React from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import BackupIcon from "@mui/icons-material/Backup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import apiConfig from "../../config/apiConfig";
import { PrintQuoteFile } from "./PrintQuoteFile";
import { postRequest } from "../../service/httpService";

const schema = yup
  .object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
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
  const [step, setStep] = React.useState(1);
  const [subtotal, setSubtotal] = React.useState(0);

  const [rates, setRates] = React.useState([]);
  const [address, setAddress] = React.useState({});
  const [sessionId, setSessionId] = React.useState(null);
  const [selectedRateId, setSelectedRateId] = React.useState(null);

  const [error, setError] = React.useState(null);
  const [quotes, setQuotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  React.useEffect(() => {
    const subtotal = quotes.reduce((acc, quote) => {
      return acc + (quote?.priceTotal ?? 0);
    }, 0);

    setSubtotal(subtotal);
  }, [quotes]);

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
    firstname,
    lastname,
    street,
    city,
    state,
    zipcode,
  }) => {
    setIsLoading(true);
    setAddress({
      company,
      firstname,
      lastname,
      street,
      city,
      state,
      zipcode,
    });
    setStep(3);
    setRates([]);
    setSelectedRateId(null);

    const formData = new FormData();
    formData.append("company", company);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipcode", zipcode);

    for (const quote of quotes) {
      formData.append("quantity", quote.quantity);
      formData.append("material", quote.material);
      formData.append("color", quote.color);
      formData.append("file", quote.file);
    }

    const url = `${apiConfig.api.baseUrl}/v1/checkout/shipping/rate`;
    const result = await postRequest(url, formData);

    if (result?.error) {
      setError(result.error);
    } else {
      const sessionId = result?.data?.session_id;
      const rates = result?.data?.shipping_rates ?? [];

      setSessionId(sessionId);
      setRates(rates);
    }

    setIsLoading(false);
  };

  const createSession = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("selected_shipping_rate", selectedRateId);

      const url = `${apiConfig.api.baseUrl}/v1/checkout`;
      const response = await axios.post(url, formData);

      window.location.href = await response.data.checkout_link;
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const addQuote = async (file) => {
    setIsLoading(true);

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

    setIsLoading(false);
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

  const isValidForCheckout = () => {
    return quotes?.filter((quote) => !quote.error)?.length > 0;
  };

  const ratesControlProps = (object_id) => ({
    checked: selectedRateId === object_id,
    onChange: (event) => setSelectedRateId(event.target.value),
    value: object_id,
    name: "shipping-rate-radio-button",
  });

  const getShippingRateAmount = () => {
    const rate = rates.find((rate) => rate.object_id === selectedRateId);

    if (rate && step === 3) {
      return `$${rate.amount?.toFixed(2)}`;
    } else {
      return "Calculated later";
    }
  };

  const getTotal = () => {
    const rate = rates.find((rate) => rate.object_id === selectedRateId);

    let total = subtotal;

    if (step === 3 && rate) {
      total += rate.amount;
    }

    return total.toFixed(2);
  };

  const Panel = (props) => {
    const { children, value, index, backward, forward, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && (
          <Box>
            <Box>{children}</Box>

            {/* Panel actions */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              {backward.enabled ? (
                <Typography
                  variant="body2"
                  component="div"
                  onClick={backward.action}
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    color: "text.secondary",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowBackIosIcon sx={{ fontSize: "0.9rem" }} />
                  {backward.label}
                </Typography>
              ) : (
                <Box></Box>
              )}

              <Button
                variant="contained"
                onClick={forward.action}
                disabled={forward.disabled()}
                sx={{ p: 2, textTransform: "none" }}
              >
                {forward.label}
              </Button>
            </Box>
          </Box>
        )}
      </div>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box sx={{ py: 6, px: { xs: 0, md: 2 }, flex: 2 }}>
          {/* Step 1: Add design files */}

          <Panel
            index={1}
            value={step}
            backward={{ enabled: false }}
            forward={{
              label: "Continue to Checkout",
              action: () => setStep(2),
              disabled: () => !isValidForCheckout(),
            }}
          >
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
                sx={{
                  mt: 1,
                  mb: 2,
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                Please reachout to us if you have model files that is not
                currently supported.
              </Typography>
            </Box>

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
                    startIcon={<BackupIcon sx={{ mr: 0.5 }} />}
                    disabled={isLoading}
                    sx={{
                      py: 1.5,
                      px: 3,
                      bgcolor: "icon.primary",
                      textTransform: "none",
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    {isLoading ? (
                      <>
                        Uploading File
                        <CircularProgress
                          size={30}
                          sx={{ ml: 2, color: "white" }}
                        />
                      </>
                    ) : (
                      "Upload Design File"
                    )}

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
                <Box key={`quote_${index}`} sx={{ my: 0.5 }}>
                  <PrintQuoteFile
                    id={index}
                    quote={quote}
                    updateQuote={updateQuote}
                  />
                </Box>
              ))}
            </Box>
          </Panel>

          {/* Step 2: Shipping */}

          <Panel
            value={step}
            index={2}
            backward={{
              enabled: true,
              label: "Back to quotes",
              action: () => setStep(1),
            }}
            forward={{
              label: "Proceed to shipping",
              action: handleSubmit(getShippingRates),
              disabled: () => !isValidForCheckout(),
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ mb: 3, fontSize: "1.4rem" }}
            >
              Shipping Information
            </Typography>

            <FormControl sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="company"
                label="Company"
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
                  id="firstname"
                  label="First name *"
                  margin="dense"
                  size="small"
                  error={!!errors.firstname?.message}
                  helperText={errors.firstname?.message}
                  {...register("firstname")}
                  sx={{ mr: 2 }}
                />

                <TextField
                  fullWidth
                  id="lastname"
                  label="Last name *"
                  margin="dense"
                  size="small"
                  error={!!errors.lastname?.message}
                  helperText={errors.lastname?.message}
                  {...register("lastname")}
                />
              </Box>

              <TextField
                id="street"
                label="Street *"
                margin="dense"
                size="small"
                error={!!errors.street?.message}
                helperText={errors.street?.message}
                {...register("street")}
              />

              <TextField
                id="city"
                label="City *"
                margin="dense"
                size="small"
                error={!!errors.city_?.message}
                helperText={errors.city?.message}
                {...register("city")}
              />

              <TextField
                id="state"
                label="State *"
                margin="dense"
                size="small"
                error={!!errors.state?.message}
                helperText={errors.state?.message}
                {...register("state")}
              />

              <TextField
                id="zipcode"
                label="Zipcode *"
                margin="dense"
                size="small"
                error={!!errors.zipcode?.message}
                helperText={errors.zipcode?.message}
                {...register("zipcode")}
              />
            </FormControl>
          </Panel>

          {/* Step 3: Summary and Checkout */}

          <Panel
            value={step}
            index={3}
            backward={{
              enabled: true,
              label: "Back to shipping information",
              action: () => setStep(2),
            }}
            forward={{
              label: "Proceed to payment",
              action: () => createSession(),
              disabled: () =>
                !selectedRateId || !address || rates?.length === 0,
            }}
          >
            {address && (
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "1px solid lightgray",
                }}
              >
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Shipping to
                </Typography>

                <Box sx={{ ml: 4, flex: 1 }}>
                  <Typography variant="body2" component="div" sx={{}}>
                    {`${address.firstname} ${address.lastname}`}
                  </Typography>

                  <Typography variant="body2" component="div" sx={{}}>
                    {`${address.street}, ${address.city}, ${address.state}, ${address.zipcode}`}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  component="div"
                  onClick={() => setStep(2)}
                  sx={{ color: "text.secondary", cursor: "pointer" }}
                >
                  Edit
                </Typography>
              </Box>
            )}

            <Typography
              variant="h5"
              component="div"
              sx={{ mt: 6, mb: 2, fontSize: "1.4rem" }}
            >
              Shipping Method
            </Typography>

            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Getting Shipping Rates
                <CircularProgress size={30} sx={{ ml: 2 }} />
              </Box>
            ) : (
              <>
                {error ? (
                  <Typography
                    variant="body"
                    component="div"
                    color="red"
                    sx={{ fontSize: "0.85rem" }}
                  >
                    {error}
                  </Typography>
                ) : (
                  <>
                    {rates.map((rate) => (
                      <Box
                        onClick={() => setSelectedRateId(rate.object_id)}
                        sx={{
                          p: 1,
                          my: 1,
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "5px",
                          border: "1px solid lightgray",
                          cursor: "pointer",
                        }}
                      >
                        <Radio {...ratesControlProps(rate.object_id)} />

                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" component="div">
                            {`${rate.provider} ${rate.service_level}`}
                          </Typography>

                          <Typography
                            variant="caption"
                            component="div"
                            sx={{ color: "text.secondary" }}
                          >
                            {rate.delivery_estimate_min} business days
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ pr: 2 }}
                        >
                          ${rate.amount.toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}
              </>
            )}
          </Panel>
        </Box>

        {/* Price Summary */}

        <Box
          sx={{
            p: 2,
            mt: { xs: 2, md: 0 },
            flex: 1,
            backgroundColor: "#fafafa",
            borderLeft: { xs: "", md: "1px solid lightgray" },
          }}
        >
          {/* xs */}
          <Accordion
            square
            elevation={0}
            disableGutters={true}
            sx={{
              display: { xs: "block", md: "none" },
              backgroundColor: "#fafafa",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ShoppingCartIcon sx={{ mr: 1 }} />

              <Typography
                variant="body1"
                component="div"
                sx={{ flex: 1, color: "text.secondary" }}
              >
                Order summary
              </Typography>

              <Typography variant="body1" component="div" sx={{}}>
                ${getTotal()}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{}}>
              {quotes.map((quote, index) =>
                quote.priceTotal ? (
                  <Box
                    key={`quote_${index}`}
                    sx={{ mb: 0.5, display: "flex", color: "text.secondary" }}
                  >
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ flex: "1" }}
                    >
                      {quote.file.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ margin: "auto" }}
                    >
                      ${quote?.priceTotal?.toFixed(2)}
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )
              )}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 0.5, display: "flex", color: "text.secondary" }}>
                <Typography variant="body2" component="div" sx={{ flex: "1" }}>
                  Subtotal
                </Typography>

                <Typography
                  variant="body2"
                  component="div"
                  sx={{ margin: "auto" }}
                >
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ mb: 0.5, display: "flex", color: "text.secondary" }}>
                <Typography variant="body2" component="div" sx={{ flex: "1" }}>
                  Shipping
                </Typography>

                <Typography
                  variant="body2"
                  component="div"
                  sx={{ margin: "auto" }}
                >
                  {getShippingRateAmount()}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 0.5, display: "flex" }}>
                <Typography variant="body1" component="div" sx={{ flex: "1" }}>
                  Total
                </Typography>

                <Typography
                  variant="body2"
                  component="div"
                  sx={{ margin: "auto", fontSize: "1.5rem" }}
                >
                  ${getTotal()}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* md */}
          <Box sx={{ py: 6, display: { xs: "none", md: "block" } }}>
            {quotes.map((quote, index) =>
              quote.priceTotal ? (
                <Box
                  key={`quote_${index}`}
                  sx={{ mb: 0.5, display: "flex", color: "text.secondary" }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ flex: "1" }}
                  >
                    {quote.file.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ margin: "auto" }}
                  >
                    ${quote?.priceTotal?.toFixed(2)}
                  </Typography>
                </Box>
              ) : (
                <></>
              )
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 0.5, display: "flex", color: "text.secondary" }}>
              <Typography variant="body2" component="div" sx={{ flex: "1" }}>
                Subtotal
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{ margin: "auto" }}
              >
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ mb: 0.5, display: "flex", color: "text.secondary" }}>
              <Typography variant="body2" component="div" sx={{ flex: "1" }}>
                Shipping
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{ margin: "auto" }}
              >
                {getShippingRateAmount()}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 0.5, display: "flex" }}>
              <Typography variant="body1" component="div" sx={{ flex: "1" }}>
                Total
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{ margin: "auto", fontSize: "1.5rem" }}
              >
                ${getTotal()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

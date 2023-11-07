import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import apiConfig from "../../config/apiConfig";
import {
  COLORS,
  MATERIALS,
  MAX_PRINTER_SIZE_IN,
  MAX_PRINTER_SIZE_MM,
} from "../../constants/constants";
import { ModelViewer } from "../../common/model/ModelViewer";

export const PrintQuoteFile = ({ id, quote, updateQuote }) => {
  const [unit, setUnit] = React.useState(quote?.unit ?? "mm");
  const [width] = React.useState(0.0);
  const [length] = React.useState(0.0);
  const [height] = React.useState(0.0);
  const [isLargePart, setIsLargePart] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage] = React.useState(null);

  const {
    watch,
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      quantity: quote.quantity,
      material: quote.material,
      color: quote.color,
    },
  });

  const quantity = watch("quantity");
  const material = watch("material");
  const color = watch("color");

  React.useEffect(() => {
    const isLargeInIn =
      width > MAX_PRINTER_SIZE_IN ||
      height > MAX_PRINTER_SIZE_IN ||
      length > MAX_PRINTER_SIZE_IN;

    const isLargeInMM =
      width > MAX_PRINTER_SIZE_MM ||
      height > MAX_PRINTER_SIZE_MM ||
      length > MAX_PRINTER_SIZE_MM;

    setIsLargePart(
      (unit === "mm" && isLargeInMM) || (unit === "in" && isLargeInIn)
    );
  }, [unit, height, length, width]);

  const save = ({ quantity, material, color }) => {
    setIsLoading(true);

    reset({ quantity, material, color });

    const updatedQuote = {
      ...quote,
      quantity,
      material,
      color,
    };

    updateQuote(id, updatedQuote);

    setIsLoading(false);
  };

  const remove = () => {
    updateQuote(id, null);
  };

  const handleQuantityChange = (value) => {
    const curValue = getValues("quantity");
    setValue("quantity", curValue + value, { shouldDirty: true });
  };

  const createUnknownErrorMessage = () => {
    return (
      <>
        <Typography variant="h6" component="div" sx={{ color: "red" }}>
          Something went wrong
        </Typography>

        <Typography variant="body" component="div" sx={{ my: 1.5 }}>
          We couldn't get an estimate for this model. Please try again.
        </Typography>

        <Typography variant="body" component="div">
          If the issue persists, please reachout to us.
        </Typography>
      </>
    );
  };

  const displayPrice = () => {
    if (isLoading) {
      return (
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          <Typography variant="body1" component="div" sx={{ mr: 1, flex: 1 }}>
            Getting Estimates
          </Typography>

          <Box sx={{ flex: 1, width: "100%" }}>
            <LinearProgress />
          </Box>
        </Box>
      );
    } else if (errorMessage) {
      return (
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "1px solid red",
            borderRadius: "5px",
          }}
        >
          {errorMessage}
        </Box>
      );
    } else if (isLargePart) {
      return (
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          <Typography variant="body" component="div" sx={{ mr: 1 }}>
            Part is too large. Please reachout to us for a quote.
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            width: "100%",
            border: "1px solid green",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="body"
            component="div"
            sx={{ mr: 1, color: "gray", fontSize: "1.1rem" }}
          >
            ${quote?.priceEach?.toFixed(2)} each
          </Typography>

          <Typography
            variant="body"
            component="div"
            sx={{ mr: 1, color: "gray", fontSize: "1.2rem" }}
          >
            x {quantity}
          </Typography>

          <Typography
            variant="body"
            component="div"
            sx={{ fontSize: "1.5rem", fontWeight: "600" }}
          >
            = ${quote?.priceTotal?.toFixed(2)}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <Paper elevation={0} sx={{ px: 3, py: 2, border: "1px solid lightgray" }}>
        {/* Title */}
        <Box sx={{ mb: 1, display: "flex" }}>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            {quote.file.name}
          </Typography>

          <IconButton
            onClick={remove}
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Configured Details */}
        <Box sx={{ mt: 2, mb: 1, fontSize: "0.9rem" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                alignItems: "start",
              }}
            >
              <ModelViewer file={quote.file} color={color} />
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      pl: { xs: 0, md: 0 },
                      // borderLeft: { xs: "", md: "5px solid gray" },
                    }}
                  >
                    <Box
                      sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ mr: 1, fontWeight: "bold" }}
                      >
                        Quantity
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          color="primary"
                          disabled={quantity <= 1}
                          onClick={() => handleQuantityChange(-1)}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography variant="h6">{quantity}</Typography>

                        <IconButton
                          color="primary"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 1, display: "flex" }}>
                      <Typography
                        variant="body"
                        component="div"
                        sx={{ mr: 1, fontWeight: "bold" }}
                      >
                        Dimension
                      </Typography>

                      <Box>
                        <Typography
                          variant="body"
                          component="div"
                          sx={{ fontSize: "0.8rem" }}
                        >
                          {`${quote?.width}${unit} x ${quote?.length}${unit} x ${quote?.height}${unit}`}
                        </Typography>

                        <RadioGroup
                          row
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                        >
                          <FormControlLabel
                            value="mm"
                            control={<Radio size="small" />}
                            label={
                              <Box
                                component="label"
                                sx={{ fontSize: "0.8rem" }}
                              >
                                mm
                              </Box>
                            }
                          />

                          <FormControlLabel
                            value="in"
                            control={<Radio size="small" />}
                            label={
                              <Box
                                component="label"
                                sx={{ fontSize: "0.8rem" }}
                              >
                                in
                              </Box>
                            }
                          />
                        </RadioGroup>
                      </Box>
                    </Box>

                    <Accordion elevation={1} disableGutters={true} square>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box>
                          <Typography
                            variant="body"
                            component="div"
                            sx={{ mr: 1, fontWeight: "bold" }}
                          >
                            Tech
                          </Typography>

                          <Typography
                            variant="body"
                            component="div"
                            sx={{
                              mr: 1,
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            FDM 3D Printing
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body"
                            component="div"
                            sx={{ mr: 1, fontWeight: "bold" }}
                          >
                            Material
                          </Typography>

                          <Typography
                            variant="body"
                            component="div"
                            sx={{
                              mr: 1,
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            {material}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body"
                            component="div"
                            sx={{ mr: 1, fontWeight: "bold" }}
                          >
                            Color
                          </Typography>

                          <Typography
                            variant="body"
                            component="div"
                            sx={{
                              mr: 1,
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            {color}
                          </Typography>
                        </Box>

                        {!quote?.error && (
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "end",
                            }}
                          >
                            <Typography
                              variant="body"
                              component="div"
                              sx={{
                                mr: 1,
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              ${quote?.priceEach?.toFixed(2)} ea
                            </Typography>

                            <Typography
                              variant="body"
                              component="div"
                              sx={{ mr: 1, color: "green", fontWeight: "bold" }}
                            >
                              ${quote?.priceTotal?.toFixed(2)}
                            </Typography>
                          </Box>
                        )}

                        {/* </Box> */}
                      </AccordionSummary>

                      <AccordionDetails sx={{}}>
                        <Box sx={{ mb: 1, display: "flex" }}>
                          <Typography
                            variant="body"
                            component="div"
                            sx={{ mr: 1, fontWeight: "bold" }}
                          >
                            Material
                          </Typography>

                          <select
                            style={{ width: 80, padding: "4px" }}
                            {...register("material")}
                          >
                            {MATERIALS.map((material, index) => (
                              <option
                                key={`material-option-${index}`}
                                value={material}
                              >
                                {material}
                              </option>
                            ))}
                          </select>
                        </Box>

                        <Box sx={{ mb: 1, display: "flex" }}>
                          <Typography
                            variant="body"
                            component="div"
                            sx={{ mr: 3.5, fontWeight: "bold" }}
                          >
                            Color
                          </Typography>

                          <select
                            style={{ width: 80, padding: "4px" }}
                            {...register("color")}
                          >
                            {COLORS.map((color, index) => (
                              <option
                                key={`color-option-${index}`}
                                value={color}
                              >
                                {color}
                              </option>
                            ))}
                          </select>
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    {quote?.error && (
                      <Box
                        sx={{
                          p: 1,
                          color: "red",
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        {quote?.error}
                      </Box>
                    )}

                    {isDirty && (
                      <Box
                        sx={{ mt: 1, display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            reset();
                          }}
                          sx={{
                            p: 0,
                            mr: 0.5,
                            color: "secondary",
                            textTransform: "none",
                          }}
                        >
                          Cancel
                        </Button>

                        <Button
                          autoFocus
                          variant="contained"
                          onClick={handleSubmit(save)}
                          sx={{
                            p: 0,
                            color: "secondary",
                            textTransform: "none",
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>

                {/* <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "start" }}
                >
                  {displayPrice()}
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/*  */}
      </Paper>
    </>
  );
};

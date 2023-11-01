import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
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

import apiConfig from "../../config/apiConfig";
import {
  COLORS,
  MATERIALS,
  MAX_PRINTER_SIZE_IN,
  MAX_PRINTER_SIZE_MM,
} from "../../constants/constants";
import { ModelViewer } from "../../common/model/ModelViewer";

export const PrintQuoteFile = ({ id, quote, updateQuote }) => {
  const [unit, setUnit] = React.useState("mm");
  const [width, setWidth] = React.useState(0.0);
  const [length, setLength] = React.useState(0.0);
  const [height, setHeight] = React.useState(0.0);
  const [isLargePart, setIsLargePart] = React.useState(false);

  const [priceEach, setPriceEach] = React.useState(0);
  const [priceTotal, setPriceTotal] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

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
    getEstimate();
    // eslint-disable-next-line
  }, []);

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

  const getEstimate = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("quantity", getValues("quantity"));
      formData.append("material", getValues("material"));
      formData.append("color", getValues("color"));
      formData.append("file", quote.file);

      const url = `${apiConfig.api.baseUrl}/v1/estimate`;
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        const data = await response.data;

        setWidth(data.width);
        setLength(data.length);
        setHeight(data.height);

        setPriceEach(data.price_each);
        setPriceTotal(data.price_total);

        setErrorMessage(null);
      } else {
        setErrorMessage(createUnknownErrorMessage());
      }
    } catch (err) {
      console.log(err);

      switch (err?.response?.status) {
        case 400:
          setErrorMessage(err?.response?.data);
          break;

        default:
          setErrorMessage(createUnknownErrorMessage());
      }
    }

    setIsLoading(false);
  };

  const save = ({ quantity, material, color }) => {
    reset({ quantity, material, color });

    const updatedQuote = {
      quantity,
      material,
      color,
      file: quote.file,
    };

    updateQuote(id, updatedQuote);

    getEstimate();
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
            ${priceEach} each
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
            = ${priceTotal}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <Paper elevation={1} sx={{ px: 3, py: 2 }}>
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
              md={6}
              sx={{
                display: "flex",
                alignItems: "start",
              }}
            >
              <ModelViewer file={quote.file} color={color} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ pl: 2, borderLeft: "5px solid gray" }}>
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

                    <Box sx={{ mb: 1 }}>
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
                        sx={{ fontSize: "0.8rem" }}
                      >
                        FDM 3D Printing
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="body"
                        component="div"
                        sx={{ mr: 1, fontWeight: "bold" }}
                      >
                        Dimension
                      </Typography>

                      <Box>
                        {`${width}${unit} x ${length}${unit} x ${height}${unit}`}

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

                    <TextField
                      select
                      fullWidth
                      id="material"
                      label="Material"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      value={material}
                      defaultValue={material}
                      InputProps={{ style: { fontSize: "0.9rem" } }}
                      {...register("material")}
                    >
                      {MATERIALS.map((material, index) => (
                        <MenuItem
                          key={`material-option-${index}`}
                          value={material}
                          sx={{ fontSize: "0.9rem" }}
                        >
                          {material}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      fullWidth
                      id="color"
                      label="Color"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      value={color}
                      defaultValue={color}
                      InputProps={{ style: { fontSize: "0.9rem" } }}
                      {...register("color")}
                    >
                      {COLORS.map((color, index) => (
                        <MenuItem
                          key={`color-option-${index}`}
                          value={color}
                          sx={{ fontSize: "0.9rem" }}
                        >
                          {color}
                        </MenuItem>
                      ))}
                    </TextField>
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

                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "start" }}
                >
                  {displayPrice()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/*  */}
      </Paper>
    </>
  );
};

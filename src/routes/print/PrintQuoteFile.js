import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import apiConfig from "../../config/apiConfig";
import {
  colors,
  materials,
  quantities,
  units,
  unknownErrorMessage,
} from "../../constants/constants";

export const PrintQuoteFile = ({ id, quote, updateQuote }) => {
  const [unit, setUnit] = React.useState("mm");
  const [width, setWidth] = React.useState(0.0);
  const [length, setLength] = React.useState(0.0);
  const [height, setHeight] = React.useState(0.0);

  const [priceEach, setPriceEach] = React.useState(0);
  const [priceTotal, setPriceTotal] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const {
    watch,
    reset,
    register,
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

  React.useEffect(() => {
    getEstimate();
    // eslint-disable-next-line
  }, []);

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
        setErrorMessage(unknownErrorMessage);
      }
    } catch (err) {
      console.log(err);

      switch (err?.response?.status) {
        case 400:
          setErrorMessage(err?.response?.data);
          break;

        default:
          setErrorMessage(unknownErrorMessage);
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

  const createDetails = (label, value) => {
    return (
      <Box>
        <Typography
          variant="body"
          component="div"
          sx={{ mr: 1, mb: 1, width: "60px", fontWeight: "bold" }}
        >
          {label}
        </Typography>

        <Typography
          variant="body"
          component="div"
          sx={{ mr: 1, fontSize: "0.8rem" }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const displayLoadingSpinner = () => {
    return (
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  const displayPrice = () => {
    if (errorMessage) {
      return (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Typography
            variant="body"
            component="div"
            sx={{ mr: 1, color: "red" }}
          >
            {errorMessage}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Typography
            variant="body"
            component="div"
            sx={{ mr: 1, color: "gray" }}
          >
            ${priceEach} x {quantity} =
          </Typography>

          <Typography
            variant="body"
            component="div"
            sx={{ fontSize: "1.5rem", fontWeight: "600" }}
          >
            ${priceTotal}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <Paper elevation={2} sx={{ px: 3, py: 2 }}>
        {/* Title */}
        <Box sx={{ mb: 2, display: "flex" }}>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            {quote.file.name}
          </Typography>

          <IconButton
            onClick={remove}
            variant="contained"
            sx={{
              mr: 1,
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
            <Grid item md={4} sm={4} xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {createDetails("Tech", "FDM 3D Printing")}
                </Grid>

                <Grid item xs={12}>
                  {createDetails(
                    "Size",
                    <Box>
                      <Box>
                        {`${width}${unit} x ${length}${unit} x ${height}${unit}`}
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <select
                          {...register("unit")}
                          onChange={(e) => setUnit(e.target.value)}
                          style={{
                            width: "100px",
                            height: "30px",
                          }}
                        >
                          {units.map((unit, index) => (
                            <option key={`unit-option-${index}`} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={4} sm={4} xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  {createDetails(
                    "Quantity",
                    <select
                      {...register("quantity")}
                      style={{
                        width: "100px",
                        height: "30px",
                      }}
                    >
                      {quantities.map((quantity, index) => (
                        <option
                          key={`quantity-option-${index}`}
                          value={quantity}
                        >
                          {quantity}
                        </option>
                      ))}
                    </select>
                  )}
                </Grid>

                <Grid item xs={6}>
                  {createDetails(
                    "Material",
                    <select
                      {...register("material")}
                      style={{
                        width: "100px",
                        height: "30px",
                      }}
                    >
                      {materials.map((material, index) => (
                        <option
                          key={`material-option-${index}`}
                          value={material}
                        >
                          {material}
                        </option>
                      ))}
                    </select>
                  )}
                </Grid>

                <Grid item xs={6}>
                  {createDetails(
                    "Color",
                    <select
                      {...register("color")}
                      style={{
                        width: "100px",
                        height: "30px",
                      }}
                    >
                      {colors.map((color, index) => (
                        <option key={`color-option-${index}`} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={4} sm={4} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {/* estimate */}
                {isLoading ? displayLoadingSpinner() : displayPrice()}
              </Box>
            </Grid>
          </Grid>

          {isDirty && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => reset()}
                sx={{
                  p: 0,
                  mr: 1,
                  color: "secondary",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
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

        {/*  */}
      </Paper>
    </>
  );
};

import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  Grid,
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import apiConfig from "../../config/apiConfig";
import {
  colors,
  materials,
  quantities,
  units,
} from "../../constants/constants";

export const PrintQuoteFile = ({ id, quote, updateQuote }) => {
  const [unit, setUnit] = React.useState("mm");
  const [width, setWidth] = React.useState(0.0);
  const [length, setLength] = React.useState(0.0);
  const [height, setHeight] = React.useState(0.0);

  const [priceEach, setPriceEach] = React.useState(0);
  const [priceTotal, setPriceTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

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
      } else {
      }

      // setSuccess(response.status === 200);
    } catch (err) {
      // setSuccess(false);
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
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="body"
          component="div"
          sx={{ mr: 1, width: "60px", fontWeight: "bold" }}
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
            <Grid item md={8} sm={8} xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {createDetails("Tech", "FDM 3D Printing")}
                </Grid>

                <Grid item xs={12}>
                  {createDetails(
                    "Size",
                    `${width}${unit} x ${length}${unit} x ${height}${unit}`
                  )}
                </Grid>

                <Grid item xs={12}>
                  {createDetails(
                    "Unit",
                    <select
                      {...register("unit")}
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      {units.map((unit, index) => (
                        <option key={`unit-option-${index}`} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  )}
                </Grid>

                <Grid item xs={12}>
                  {createDetails(
                    "Material",
                    <select {...register("material")}>
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

                <Grid item xs={12}>
                  {createDetails(
                    "Color",
                    <select {...register("color")}>
                      {colors.map((color, index) => (
                        <option key={`color-option-${index}`} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  )}
                </Grid>

                {isDirty && (
                  <Grid item xs={12} sx={{ mt: 1 }}>
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
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item md={4} sm={4} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {/* Quantity */}
                <TextField
                  select
                  label="Quantity"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  value={quantity}
                  {...register("quantity")}
                >
                  {quantities.map((quantity, index) => (
                    <MenuItem key={`quantity-option-${index}`} value={quantity}>
                      {quantity}
                    </MenuItem>
                  ))}
                </TextField>

                {/* estimate */}
                {isLoading ? (
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
                ) : (
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
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/*  */}
      </Paper>
    </>
  );
};

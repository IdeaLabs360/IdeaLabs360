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
import { colors, materials, quantities } from "../../views/Home";

export const PrintQuoteFile = ({ id, quote, updateQuote }) => {
  const [estimate, setEstimate] = React.useState(0);
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
      formData.append("file", quote.file);
      formData.append("material", getValues("material"));
      formData.append("color", getValues("color"));

      const url = `${apiConfig.api.baseUrl}/v1/estimate`;
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        const estimate = await response.data.estimate;
        setEstimate(estimate);
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
  };

  const remove = () => {
    updateQuote(id, null);
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
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="body"
                    component="label"
                    sx={{ mr: 1, fontWeight: "bold" }}
                  >
                    Size:
                  </Typography>
                  12mm 12mm 12mm
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body"
                    component="label"
                    sx={{ mr: 1, fontWeight: "bold" }}
                  >
                    Tech:
                  </Typography>
                  FDM 3D Printing
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body"
                    component="label"
                    sx={{ mr: 1, fontWeight: "bold" }}
                  >
                    Material:
                  </Typography>

                  <select {...register("material")}>
                    {materials.map((material, index) => (
                      <option key={`material-option-${index}`} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body"
                    component="label"
                    sx={{ mr: 3.4, fontWeight: "bold" }}
                  >
                    Color:
                  </Typography>

                  <select {...register("color")}>
                    {colors.map((color, index) => (
                      <option key={`color-option-${index}`} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
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

            <Grid item xs={6}>
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
                      ${estimate} x {quantity} =
                    </Typography>

                    <Typography
                      variant="body"
                      component="div"
                      sx={{ fontSize: "1.5rem", fontWeight: "600" }}
                    >
                      ${estimate * quantity}
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

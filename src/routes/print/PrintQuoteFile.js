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
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import apiConfig from "../../config/apiConfig";
import { colors, materials } from "../../views/Home";

export const PrintQuoteFile = ({ file }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({ defaultValues: { material: "PLA", color: "Black" } });

  React.useEffect(async () => {
    try {
      setIsLoading(true);

      const url = `${apiConfig.api.baseUrl}/v1/quote`;
      const response = await axios.post(url, formData);

      setSuccess(response.status === 200);
    } catch (err) {
      setSuccess(false);
    }
  }, []);

  const onSubmit = async ({ name, phone, email, material, details }) => {};

  return (
    <>
      <Paper elevation={2} sx={{ px: 3, py: 2 }}>
        {/* Title */}
        <Box sx={{ display: "flex" }}>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            {file.name}
          </Typography>

          <IconButton
            onClick={() => {}}
            variant="contained"
            sx={{
              mr: 1,
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <DeleteIcon sx={{ fontSize: "medium" }} />
          </IconButton>
        </Box>

        <Divider />

        {/* Configured Details */}
        <Box sx={{ mt: 3, mb: 1, fontSize: "0.9rem" }}>
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
                  // onClick={handleSubmit(onSubmit)}
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
        </Box>

        {/*  */}
      </Paper>
    </>
  );
};

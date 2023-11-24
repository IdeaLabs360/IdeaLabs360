import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Button, FormControl, Box, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import apiConfig from "../config/apiConfig";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone number is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be in this format; email@email.com"),
  })
  .required();

export const ContactUsForm = ({ title, detail }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ name, phone, email, details }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("details", details);

    try {
      setIsLoading(true);

      const url = `${apiConfig.api.baseUrl}/v1/quote`;
      await axios.post(url, formData);
    } catch (err) {}
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="body1" component="div">
        {title}
      </Typography>

      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
        }}
      >
        <TextField
          id="name"
          label="Name"
          margin="dense"
          size="small"
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          {...register("name")}
        />

        <TextField
          id="phone"
          label="Phone"
          margin="dense"
          size="small"
          error={!!errors.phone?.message}
          helperText={errors.phone?.message}
          {...register("phone")}
        />

        <TextField
          id="email"
          label="Email"
          margin="dense"
          size="small"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <TextField
          id="details"
          label="Additional Details"
          margin="dense"
          size="small"
          variant="outlined"
          defaultValue={detail}
          multiline
          rows={5}
          {...register("details")}
        />

        <Box sx={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            sx={{
              color: "secondary",
              width: "100px",
              height: "40px",
              px: "30px",
              py: "10px",
              textTransform: "none",
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

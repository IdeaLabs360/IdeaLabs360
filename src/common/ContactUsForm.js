import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Container,
  FormControl,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";

import apiConfig from "../config/apiConfig";
import { postRequest } from "../service/httpService";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be in this format; email@email.com"),
    details: yup.string().required("Detail is required"),
  })
  .required();

export const ContactUsForm = ({ title, detail }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", details: detail },
  });

  const onSubmit = async ({ name, email, details }) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("details", details);

    const url = `${apiConfig.api.baseUrl}/v1/contactus`;
    const result = await postRequest(url, formData);

    if (result?.error) {
      setIsSubmitted(false);
    } else {
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="md">
      {title}

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
          multiline
          rows={5}
          error={!!errors.details?.message}
          helperText={errors.details?.message}
          {...register("details")}
        />

        <Box sx={{ marginTop: "10px", display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading || isSubmitted}
            sx={{
              color: "secondary",
              px: 4,
              py: 1.5,
              textTransform: "none",
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : isSubmitted ? (
              <>
                <CheckIcon sx={{ mr: 1, color: "green" }} />
                <Typography variant="body1" container="div">
                  Submitted
                </Typography>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </FormControl>
    </Container>
  );
};

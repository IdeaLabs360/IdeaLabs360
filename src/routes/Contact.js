import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  CardMedia,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CircularProgress from "@mui/material/CircularProgress";

import apiConfig from "../config/apiConfig";
import { DISPLAY_PHONE_NUMBER, EMAIL } from "../constants/constants";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be in this format; email@email.com"),
    message: yup.string().required("Message is required"),
  })
  .required();

export const Contact = () => {
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ name, email, message }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      setIsLoading(true);

      const url = `${apiConfig.api.baseUrl}/v1/quote`;
      const response = await axios.post(url, formData);

      setSuccess(response.status === 200);
    } catch (err) {
      setSuccess(false);
    }

    setIsLoading(false);
  };

  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Container maxWidth="lg" sx={{ pt: 16, pb: 4 }}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "start" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ maxWidth: 400 }}>
                <Typography
                  component="div"
                  variant="h4"
                  sx={{
                    fontSize: {
                      xs: "35px",
                      sm: "35px",
                      md: "40px",
                      lg: "45px",
                    },
                    lineHeight: "1em",
                  }}
                >
                  Contact Us
                </Typography>
              </Box>

              <Box sx={{ mt: 3, mb: 5, maxWidth: 400 }}>
                <Typography
                  component="div"
                  variant="body2"
                  sx={{ lineHeight: "1.3em" }}
                >
                  Got an idea or need help with a project? Reach out to us we’re
                  always excited to hear from you! Whether you have questions
                  about our services or want to get started on a custom design,
                  we’re just a message away. Let's chat and bring your vision to
                  life, one step at a time. We can’t wait to work with you!
                </Typography>

                <Button
                  variant="contained"
                  onClick={() =>
                    window.open(`tel:${DISPLAY_PHONE_NUMBER}`, "_self")
                  }
                  sx={{
                    mt: 3,
                    py: 1,
                    px: 6,
                    bgcolor: "black",
                    borderRadius: 8,
                    textTransform: "none",
                  }}
                >
                  <EmailIcon sx={{ mr: 1, fontSize: "medium" }} />
                  {EMAIL}
                </Button>

                <Button
                  variant="contained"
                  onClick={() =>
                    window.open(`tel:${DISPLAY_PHONE_NUMBER}`, "_self")
                  }
                  sx={{
                    mt: 1,
                    py: 1,
                    px: 6,
                    bgcolor: "black",
                    borderRadius: 8,
                    textTransform: "none",
                  }}
                >
                  <PhoneIcon sx={{ mr: 1, fontSize: "medium" }} />
                  {DISPLAY_PHONE_NUMBER}
                </Button>
              </Box>

              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 4,
                }}
              >
                <TextField
                  id="name"
                  label="Name *"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  {...register("name")}
                />

                <TextField
                  id="email"
                  label="Email *"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  {...register("email")}
                />

                <TextField
                  id="message"
                  label="Message *"
                  variant="outlined"
                  multiline
                  rows={5}
                  margin="normal"
                  error={!!errors.message?.message}
                  helperText={errors.message?.message}
                  {...register("message")}
                />

                <Box sx={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    component="label"
                    sx={{
                      py: 1,
                      px: 8,
                      bgcolor: "black",
                      borderRadius: 8,
                      textTransform: "none",
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      "Send"
                    )}
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <CardMedia
              component="img"
              image={"/img/front-page.jpg"}
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

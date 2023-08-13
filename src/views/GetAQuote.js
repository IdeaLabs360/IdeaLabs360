import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  Button,
  Container,
  FormControl,
  Grid,
  Box,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import apiConfig from "../config/apiConfig";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    request: yup.string().required(),
  })
  .required();

export const GetAQuote = () => {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const body = {
      name: data?.name,
      email: data?.email,
      request: data?.request,
    };

    try {
      const url = `${apiConfig.api.baseUrl}/v1/quote`;
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(response.status === 200);
    } catch (err) {
      setSuccess(false);
    }

    handleOpen();
  };

  return (
    <>
      <Grid container spacing={0} sx={{ display: "flex" }}>
        <Grid item xs={12} sx={{ flexGrow: 1, marginTop: "30px" }}>
          <Container maxWidth="md">
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "#595e6c",
                fontSize: "2.0rem",
                fontWeight: "bold",
              }}
            >
              Request a Quote
            </Typography>

            <Typography variant="body2" component="div" sx={{ color: "gray" }}>
              We just need some information to get started
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
                variant="outlined"
                margin="normal"
                {...register("name")}
              />

              <Typography
                variant="body2"
                component="span"
                sx={{ color: "red" }}
              >
                {errors.name?.message}
              </Typography>

              <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                {...register("email")}
              />

              <Typography
                variant="body2"
                component="span"
                sx={{ color: "red" }}
              >
                {errors.email?.message}
              </Typography>

              <TextField
                id="request"
                label="Request"
                variant="outlined"
                multiline
                rows={5}
                margin="normal"
                {...register("request")}
              />

              <Typography
                variant="body2"
                component="span"
                sx={{ color: "red" }}
              >
                {errors.request?.message}
              </Typography>

              <Box sx={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    color: "secondary",
                    px: "30px",
                    py: "10px",
                    textTransform: "none",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </FormControl>
          </Container>
        </Grid>
      </Grid>

      {/* Status Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            px: 6,
            py: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="div"
            sx={{
              mb: "16px",
              color: "#595e6c",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {success ? <>Request submitted</> : <>Something went wrong</>}
          </Typography>

          <Divider />

          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            {success ? (
              <>
                Thank you for submitting the quote. We will be in touch with you
                within one business day. Please don't hesitate to make another
                attempt or contact us using the information provided below
              </>
            ) : (
              <>
                An issue occurred while submitting the quote. Please don't
                hesitate to make another attempt or contact us using the
                information provided below
              </>
            )}
          </Typography>

          <Divider />

          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box sx={{ minWidth: "100px" }}>Call or Text</Box>
              <Box>(651) 357-6817</Box>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box sx={{ minWidth: "100px" }}>Email</Box>
              <Box>idealabs360@gmail.com</Box>
            </Grid>
          </Grid>

          {/* <List sx={{ my: 2 }}>
            <ListItem disablePadding>
              <ListItemText primary={watch("name")} />
            </ListItem>

            <ListItem disablePadding>
              <ListItemText primary={watch("email")} />
            </ListItem>

            <ListItem disablePadding>
              <ListItemText
                primary={watch("request")}
                sx={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  borderTop: "1px dashed lightgray",
                  borderBottom: "1px dashed lightgray",
                  py: 1,
                }}
              />
            </ListItem>
          </List> */}
        </Box>
      </Modal>
    </>
  );
};

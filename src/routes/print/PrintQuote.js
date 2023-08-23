import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Box,
  Modal,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import apiConfig from "../../config/apiConfig";
import { materials } from "./PrintHome";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

export const PrintQuote = () => {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const file = watch("file");
  const userHasDesignFile = !watch("noFile");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("material", data?.material);

    if (userHasDesignFile && data?.file) {
      formData.append("file", data?.file[0]);
    }

    formData.append("comment", data?.comment);

    try {
      setIsLoading(true);

      const url = `${apiConfig.api.baseUrl}/v1/print/quote`;
      const response = await axios.post(url, formData);

      setSuccess(response.status === 200);
    } catch (err) {
      setSuccess(false);
    }

    setIsLoading(false);
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
                {errors.name?.message}
              </Typography>

              <TextField
                select
                id="material"
                label="Material"
                variant="outlined"
                margin="normal"
                {...register("material")}
              >
                {materials.map((material, index) => (
                  <MenuItem key={`material-option-${index}`} value={material}>
                    {material}
                  </MenuItem>
                ))}

                <Divider />

                <MenuItem
                  key="material-option-last"
                  value="OpenToRecommendation"
                >
                  Open To Recommendation
                </MenuItem>
              </TextField>

              <Box sx={{ ml: 2, mt: 1 }}>
                <FormControlLabel
                  id="no-file"
                  label="I don't have design file"
                  control={<Checkbox />}
                  {...register("noFile")}
                />

                <Button
                  variant="contained"
                  component="label"
                  disabled={watch("noFile")}
                >
                  <FileUploadIcon sx={{ mr: 1 }} />
                  Upload .STL File
                  <input type="file" hidden {...register("file")} />
                </Button>
              </Box>

              <Box sx={{ ml: 2, my: 1, color: "text.secondary" }}>
                {userHasDesignFile && file && file[0].name}
              </Box>

              <TextField
                id="comment"
                label="Comment"
                variant="outlined"
                multiline
                rows={5}
                margin="normal"
                {...register("comment")}
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
        </Box>
      </Modal>
    </>
  );
};

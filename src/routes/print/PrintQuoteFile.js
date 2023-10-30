import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import apiConfig from "../../config/apiConfig";
import {
  COLORS,
  MATERIALS,
  MAX_PRINTER_SIZE_IN,
  MAX_PRINTER_SIZE_MM,
  QUANTITIES,
} from "../../constants/constants";

export const PrintQuoteFile = ({ id, quote, updateQuote }) => {
  const [open, setOpen] = React.useState(false);

  const [unit, setUnit] = React.useState("mm");
  const [width, setWidth] = React.useState(0.0);
  const [length, setLength] = React.useState(0.0);
  const [height, setHeight] = React.useState(0.0);
  const [isLargePart, setIsLargePart] = React.useState(false);

  const [priceEach, setPriceEach] = React.useState(0);
  const [priceTotal, setPriceTotal] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    watch,
    reset,
    register,
    getValues,
    handleSubmit,
    // formState: { isDirty },
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
    handleClose();

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
      <Box sx={{ mb: 1, display: "flex" }}>
        <Typography
          variant="body"
          component="div"
          sx={{ mr: 1, fontWeight: "bold" }}
        >
          {label}
        </Typography>

        <Typography variant="body" component="div" sx={{ fontSize: "0.8rem" }}>
          {value}
        </Typography>
      </Box>
    );
  };

  const displayLoadingSpinner = () => {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  const createUnknownErrorMessage = () => {
    return (
      <>
        <Typography variant="h6" component="div" sx={{ color: "red" }}>
          Somthing went wrong
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
    if (errorMessage) {
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
            flexDirection: "column",
            alignItems: "end",
            width: "100%",
            border: "1px solid green",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="body"
            component="div"
            sx={{ mr: 1, color: "gray" }}
          >
            ${priceEach} each
          </Typography>

          <Typography
            variant="body"
            component="div"
            sx={{ mr: 1, color: "gray" }}
          >
            x {quantity}
          </Typography>

          <Typography
            variant="body"
            component="div"
            sx={{ mt: 1, fontSize: "1.5rem", fontWeight: "600" }}
          >
            ${priceTotal}
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
            <Grid item md={7} xs={12}>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ mb: 1, px: 1, py: 0.5 }}
              >
                Configure Part
              </Button>

              <Box sx={{ pl: 2, borderLeft: "5px solid gray" }}>
                {createDetails("Quantity", quantity)}

                {createDetails(
                  "Dimensions",
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
                          <Box component="label" sx={{ fontSize: "0.8rem" }}>
                            mm
                          </Box>
                        }
                      />

                      <FormControlLabel
                        value="in"
                        control={<Radio size="small" />}
                        label={
                          <Box component="label" sx={{ fontSize: "0.8rem" }}>
                            in
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </Box>
                )}

                {createDetails("Tech", "FDM 3D Printing")}

                {createDetails("Material", material)}
                {createDetails("Color", color)}
              </Box>
            </Grid>

            <Grid
              item
              md={5}
              xs={12}
              sx={{ display: "flex", alignItems: "start" }}
            >
              {isLoading ? displayLoadingSpinner() : displayPrice()}
            </Grid>
          </Grid>
        </Box>

        {/*  */}
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root": {
            px: 2,
            py: 1,
            width: "400px",
          },
        }}
      >
        <DialogTitle>{quote?.file?.name}</DialogTitle>

        <DialogContent>
          <FormControl sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              select
              id="quantity"
              label="Quantity"
              variant="outlined"
              margin="dense"
              size="small"
              value={quantity}
              defaultValue={quantity}
              {...register("quantity")}
            >
              {QUANTITIES.map((quantity, index) => (
                <MenuItem key={`quantity-option-${index}`} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              id="material"
              label="Material"
              variant="outlined"
              margin="dense"
              size="small"
              value={material}
              defaultValue={material}
              {...register("material")}
            >
              {MATERIALS.map((material, index) => (
                <MenuItem key={`material-option-${index}`} value={material}>
                  {material}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              id="color"
              label="Color"
              variant="outlined"
              margin="dense"
              size="small"
              value={color}
              defaultValue={color}
              {...register("color")}
            >
              {COLORS.map((color, index) => (
                <MenuItem key={`color-option-${index}`} value={color}>
                  {color}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              reset();
            }}
            sx={{
              p: 0,
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
        </DialogActions>
      </Dialog>
    </>
  );
};

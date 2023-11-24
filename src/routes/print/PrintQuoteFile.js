import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  COLORS,
  MATERIALS,
  MAX_PRINTER_SIZE_IN,
  MAX_PRINTER_SIZE_MM,
} from "../../constants/constants";
import { ModelViewer } from "../../common/model/ModelViewer";
import { ContactUsForm } from "../../common/ContactUsForm";

export const PrintQuoteFile = ({ id, quote, updateQuote }) => {
  const [unit, setUnit] = React.useState(quote?.unit ?? "mm");
  const [isLargePart, setIsLargePart] = React.useState(false);

  const {
    watch,
    reset,
    register,
    setValue,
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
  const material = watch("material");
  const color = watch("color");

  React.useEffect(() => {
    const isLargeInIn =
      quote.width > MAX_PRINTER_SIZE_IN ||
      quote.height > MAX_PRINTER_SIZE_IN ||
      quote.length > MAX_PRINTER_SIZE_IN;

    const isLargeInMM =
      quote.width > MAX_PRINTER_SIZE_MM ||
      quote.height > MAX_PRINTER_SIZE_MM ||
      quote.length > MAX_PRINTER_SIZE_MM;

    setIsLargePart(
      (unit === "mm" && isLargeInMM) || (unit === "in" && isLargeInIn)
    );
  }, [unit, quote]);

  const save = ({ quantity, material, color }) => {
    reset({ quantity, material, color });

    const updatedQuote = {
      ...quote,
      quantity,
      material,
      color,
    };

    updateQuote(id, updatedQuote);
  };

  const remove = () => {
    updateQuote(id, null);
  };

  const handleQuantityChange = (value) => {
    const curValue = getValues("quantity");
    setValue("quantity", curValue + value, { shouldDirty: true });
  };

  return (
    <>
      <Paper elevation={0} sx={{ p: 1, border: "1px solid lightgray" }}>
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
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "start" }}
            >
              <ModelViewer file={quote.file} color={color} />
            </Grid>

            <Grid item xs={12} sm={9}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ pl: { xs: 0, md: 0 } }}>
                    <Box
                      sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ mr: 1, fontWeight: "bold" }}
                      >
                        Quantity
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          color="primary"
                          disabled={quantity <= 1}
                          onClick={() => handleQuantityChange(-1)}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography variant="h6">{quantity}</Typography>

                        <IconButton
                          color="primary"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 1, display: "flex" }}>
                      <Typography
                        variant="body"
                        component="div"
                        sx={{ mr: 1, fontWeight: "bold" }}
                      >
                        Dimension
                      </Typography>

                      <Box>
                        <Typography
                          variant="body"
                          component="div"
                          sx={{ fontSize: "0.8rem" }}
                        >
                          {`${quote?.width ?? -1}${unit} x ${
                            quote?.length ?? -1
                          }${unit} x ${quote?.height ?? -1}${unit}`}
                        </Typography>

                        <RadioGroup
                          row
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                        >
                          <FormControlLabel
                            value="mm"
                            control={<Radio size="small" />}
                            label={
                              <Box
                                component="label"
                                sx={{ fontSize: "0.8rem" }}
                              >
                                mm
                              </Box>
                            }
                          />

                          <FormControlLabel
                            value="in"
                            control={<Radio size="small" />}
                            label={
                              <Box
                                component="label"
                                sx={{ fontSize: "0.8rem" }}
                              >
                                in
                              </Box>
                            }
                          />
                        </RadioGroup>
                      </Box>
                    </Box>

                    <Accordion
                      square
                      elevation={0}
                      disableGutters={true}
                      sx={{
                        border: "1px solid #e1e1e1",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: "flex" }}>
                          <Box>
                            <Typography
                              variant="body"
                              component="div"
                              sx={{ mr: 1, fontWeight: "bold" }}
                            >
                              Tech
                            </Typography>

                            <Typography
                              variant="body"
                              component="div"
                              sx={{
                                mr: 1,
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              FDM 3D Printing
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="body"
                              component="div"
                              sx={{ mr: 1, fontWeight: "bold" }}
                            >
                              Material
                            </Typography>

                            <Typography
                              variant="body"
                              component="div"
                              sx={{
                                mr: 1,
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              {material}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="body"
                              component="div"
                              sx={{ mr: 1, fontWeight: "bold" }}
                            >
                              Color
                            </Typography>

                            <Typography
                              variant="body"
                              component="div"
                              sx={{
                                mr: 1,
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              {color}
                            </Typography>
                          </Box>
                        </Box>

                        {!quote?.error && (
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "end",
                              minWidth: 80,
                            }}
                          >
                            <Typography
                              variant="body"
                              component="div"
                              sx={{
                                mr: 1,
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              ${quote?.priceEach?.toFixed(2)} ea
                            </Typography>

                            <Typography
                              variant="body"
                              component="div"
                              sx={{ mr: 1, color: "green", fontWeight: "bold" }}
                            >
                              ${quote?.priceTotal?.toFixed(2)}
                            </Typography>
                          </Box>
                        )}
                      </AccordionSummary>

                      <AccordionDetails sx={{}}>
                        <Box sx={{ mb: 1, display: "flex" }}>
                          <Typography
                            variant="body"
                            component="div"
                            sx={{ mr: 1, fontWeight: "bold" }}
                          >
                            Material
                          </Typography>

                          <select
                            style={{ width: 80, padding: "4px" }}
                            {...register("material")}
                          >
                            {MATERIALS.map((material, index) => (
                              <option
                                key={`material-option-${index}`}
                                value={material}
                              >
                                {material}
                              </option>
                            ))}
                          </select>
                        </Box>

                        <Box sx={{ mb: 1, display: "flex" }}>
                          <Typography
                            variant="body"
                            component="div"
                            sx={{ mr: 3.5, fontWeight: "bold" }}
                          >
                            Color
                          </Typography>

                          <select
                            style={{ width: 80, padding: "4px" }}
                            {...register("color")}
                          >
                            {COLORS.map((color, index) => (
                              <option
                                key={`color-option-${index}`}
                                value={color}
                              >
                                {color}
                              </option>
                            ))}
                          </select>
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    {quote?.error && true ? (
                      <ContactUsForm
                        title={`It seems like you have uploaded an image. 
                                An image is not a supported file type for
                                3D printing. But we can help turn your design
                                to 3D printable model. Please call, email, or fill
                                out the form below and one of our engineers will
                                contact you promptly.`}
                        detail="details"
                      />
                    ) : (
                      <Typography
                        variant="body"
                        component="div"
                        color="red"
                        sx={{ mt: 1, fontSize: "0.75rem" }}
                      >
                        {quote?.error}
                      </Typography>
                    )}

                    {isLargePart && (
                      <Box
                        sx={{
                          p: 1,
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Typography
                          variant="body"
                          component="div"
                          sx={{ mr: 1 }}
                        >
                          Part is too large. Please reachout to us for a quote.
                        </Typography>
                      </Box>
                    )}

                    {isDirty && (
                      <Box
                        sx={{ mt: 1, display: "flex", justifyContent: "end" }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            reset();
                          }}
                          sx={{ mr: 1, textTransform: "none" }}
                        >
                          Cancel
                        </Button>

                        <Button
                          autoFocus
                          variant="contained"
                          onClick={handleSubmit(save)}
                          sx={{ textTransform: "none" }}
                        >
                          Save
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/*  */}
      </Paper>
    </>
  );
};

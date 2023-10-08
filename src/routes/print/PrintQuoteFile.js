import * as React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import apiConfig from "../../config/apiConfig";
import { displayPhoneNumber, email, materials } from "../../views/Home";

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

export const PrintQuoteFile = ({ file }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ name, phone, email, material, details }) => {};

  return (
    <>
      <Card elevation={2} sx={{ minWidth: 275, marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {file.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

"use client";

import Iconify from "@/components/iconify/iconify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import { enqueueSnackbar } from "notistack";
import { CreateOrderSerivce } from "@/package/api/order-service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { apiClientFetch } from "@/package/api/api-fetch";
import { useRouter } from "next/navigation";

const initialValues = {
  email: "",
  name: "",
  phone: "",
  //   paymentId: 1,
  //   serviceId: 2,
  //   total: 0,
};
const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Bắt buộc"),
  name: yup.string().required("Bắt buộc"),
  phone: yup.string().required("Bắt buộc"),
});
const paymentList = [
  {
    paymentId: 1,
    paymentName: "Chuyển khoản ngân hàng",
  },
];
const serviceList = [
  {
    serviceId: 1,
    serviceName: "Mock Interview",
    total: 375000,
  },
  {
    serviceId: 3,
    serviceName: "CV",
    total: 200000,
  },
];
export const CreateOrderPopupButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payment, setPayment] = useState(paymentList[0]);
  const [service, setService] = useState(serviceList[0]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFormSubmit = async (value: typeof initialValues) => {
    try {
      setIsLoading(true);
      if (!payment || !service) {
        throw new Error("Điền đầy đủ thông tin");
      }

      console.log({
        ...value,
        serviceId: service.serviceId,
        paymentId: payment.paymentId,
        total: service.total,
      });
      const data = await apiClientFetch("create-order-service", {
        ...value,
        serviceId: service.serviceId,
        paymentId: payment.paymentId,
        total: service.total,
      });
      if (data.status === "error") {
        throw new Error(data.responseText);
      }
      enqueueSnackbar("Tạo đơn hàng thành công", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  const handleOpenPopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleOpenPopup}
      >
        New Order
      </Button>
      <Dialog
        open={isOpen}
        maxWidth={"sm"}
        fullWidth
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle>Tạo mới đơn hàng</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={(touched.email && errors.email) as string}
                  placeholder="Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phone"
                  onBlur={handleBlur}
                  value={values.phone}
                  onChange={handleChange}
                  error={!!touched.phone && !!errors.phone}
                  helperText={(touched.phone && errors.phone) as string}
                  placeholder="Phone"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={(touched.name && errors.name) as string}
                  placeholder="Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(o, v) => o.serviceId === v.serviceId}
                  disablePortal
                  value={service}
                  options={serviceList}
                  onChange={(e, newValue) => {
                    setService(newValue as any);
                  }}
                  getOptionLabel={(option) => option.serviceName}
                  renderInput={(params) => (
                    <TextField {...params} label="Service" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  isOptionEqualToValue={(o, v) => o.paymentId === v.paymentId}
                  disablePortal
                  value={payment}
                  options={paymentList}
                  onChange={(e, newValue) => {
                    setPayment(newValue as any);
                  }}
                  getOptionLabel={(option) => option.paymentName}
                  renderInput={(params) => (
                    <TextField {...params} label="Payment" />
                  )}
                />
              </Grid>
              <Grid item xs={12} marginTop={10}>
                <LoadingButton
                  variant="contained"
                  loading={isLoading}
                  type="submit"
                  fullWidth
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

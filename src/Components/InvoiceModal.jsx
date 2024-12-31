
import React from "react";
import { Modal, Box, Typography, Grid, Divider, Button, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import toast from "react-hot-toast";
import saleService from "../Services/saleService";
import { useNavigate } from "react-router-dom";

const InvoiceModal = ({
  open,
  onClose,
  patientName,
  doctorName,
  servicesName,
  patientId,
  invoiceId,
  doctorId,
  saleDate,
  salesRows,
}) => {
  const calculateTotal = () =>
    salesRows.reduce((acc, row) => acc + (row.quantity * row.unit_price || 0), 0);

  const formatCurrency = (amount) => {
    const validAmount = Number(amount) || 0;
    return `${validAmount.toFixed(2)}`;
  };

  const navigate = useNavigate();

  const handleSubmitSales = async () => {
    try {
      if (!salesRows.length) {
        toast.error("No sales data to submit.");
        return;
      }

      const salesData = salesRows.map((row) => ({
        services_id: row.services_id,
        quantity: parseInt(row.quantity, 10),
        unit_price: parseFloat(row.unit_price),
        patient_id: patientId,
        doctor_id: doctorId,
        sale_date: saleDate,
        invoice: invoiceId,
      }));

      await Promise.all(salesData.map((row) => saleService.createServicesSale(row)));
      toast.success("Sales submitted successfully!");
      onClose();
      navigate("/dispenser");
    } catch (error) {
      toast.error("Error submitting sales.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          height: "80vh",
          overflowY: "auto",
          backgroundColor: "white",
          mx: "auto",
          mt: 10,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Invoice# {invoiceId}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Patient:</strong> {patientName}
            </Typography>
            <Typography>
              <strong>Doctor:</strong> {doctorName}
            </Typography>
            <Typography>
              <strong>Sale Date:</strong> {saleDate}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Details:</Typography>
            <Table sx={{ mt: 2, minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Qty</strong></TableCell>
                  <TableCell align="right"><strong>Unit Price</strong></TableCell>
                  <TableCell align="right"><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{servicesName[index]}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(row.unit_price)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.quantity * row.unit_price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <strong>Total:</strong> {formatCurrency(calculateTotal())}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmitSales}>
              Confirm Sales
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;

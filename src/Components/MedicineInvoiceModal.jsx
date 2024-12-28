import React from "react";
import { Modal, Box, Typography, Grid, Divider, Button, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import toast from 'react-hot-toast';
import saleService from "../Services/saleService";
import { useNavigate } from "react-router-dom";

const MedicineInvoiceModal = ({
  open,
  onClose,
  patientName,
  doctorName,
  servicesName,
  patientId,
  doctorId,
  invoiceNumber,
  saleDate,
  salesRows,
}) => {
  // Calculate the total amount
  const calculateTotal = () =>
    salesRows.reduce(
      (acc, row) => acc + (row.quantity * row.unit_price || 0),
      0
    );

  // Format total as currency
  const formatCurrency = (amount) => {
    // Ensure the amount is a valid number, and use 0 if it's not
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
        stock_id: row.stock_id,
        quantity: parseInt(row.quantity, 10),
        unit_price: parseFloat(row.unit_price),
        patient_id: patientId,
        doctor_id: doctorId,
        sale_date: saleDate,
        invoice: invoiceNumber,
      }));

      await Promise.all(salesData.map((row) => saleService.create(row)));
      toast.success("Sales submitted successfully!");
      onClose(); 
      navigate("/dispenser");// Close the modal after success
    } catch (error) {
      toast.error("Error submitting sales.");
      
    }
  };

  const handleClose = () => {
    onClose(); // Close the modal
  
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 600, p: 4, backgroundColor: "white", mx: "auto", mt: 10 }}>
        <Typography variant="h6" gutterBottom>
          Invoice # {invoiceNumber}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          {/* Patient and Doctor Information */}
          <Grid item xs={12}>
            <Typography><strong>Patient:</strong> {patientName}</Typography>
            <Typography><strong>Doctor:</strong> {doctorName}</Typography>
            <Typography><strong>Sale Date:</strong> {saleDate}</Typography>
          </Grid>
          
          {/* Invoice Details Table */}
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

          {/* Total Amount */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <strong>Total:</strong> {formatCurrency(calculateTotal())}
            </Typography>
          </Grid>

          {/* Confirm Button */}
          <Grid item xs={12} className="text-center gap-10" sx={{ mt: 3}}>
            <Button variant="contained" color="primary" onClick={handleSubmitSales}>
              Confirm Sales
            </Button>
            
            <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
              Close
            </Button>
            
          </Grid>
 
        </Grid>
      </Box>
    </Modal>
  );
};

export default MedicineInvoiceModal;


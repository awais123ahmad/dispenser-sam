import React, { useRef ,useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
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
  doctorId,
  saleDate,
  salesRows,
}) => {
  const calculateTotal = () =>
    salesRows.reduce(
      (acc, row) => acc + (row.quantity * row.unit_price || 0),
      0
    );

  const formatCurrency = (amount) => {
    const validAmount = Number(amount) || 0;
    return `${validAmount.toFixed(2)}`;
  };

  const navigate = useNavigate();
  const receiptRef = useRef(null);
  const [invoiceId, setInvoiceId] = useState(null);

  const handleSubmitSales = async () => {
    try {
      if (!salesRows.length) {
        toast.error("No sales data to submit.");
        return;
      }

      // Step 1: Create the invoice
      let createdInvoiceId;
      try {
        const invoiceData = await saleService.createInvoices();
        createdInvoiceId = invoiceData.invoiceId; // Get the created invoice ID
        toast.success(`Invoice created successfully. ID: ${createdInvoiceId}`);
      } catch (error) {
        toast.error("Error creating invoice. Sales submission aborted.");
        return; // Exit if invoice creation fails
      }

      const salesData = salesRows.map((row) => ({
        services_id: row.services_id,
        quantity: parseInt(row.quantity, 10),
        unit_price: parseFloat(row.unit_price),
        patient_id: patientId,
        doctor_id: doctorId,
        sale_date: saleDate,
        invoice: createdInvoiceId,
      }));

      try {
      await Promise.all(
        salesData.map((row) => saleService.createServicesSale(row))
      );
      toast.success("Sales submitted successfully!");
      onClose();
      navigate("/dispenser");
    } catch (error) {
      toast.error("Error submitting sales data.");
    }
  } catch (error) {
    toast.error("Unexpected error occurred.");
  }
};

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Get month and pad with leading zero if needed
    const year = d.getFullYear(); // Get full year

    return `${day}-${month}-${year}`; // Return formatted date as DD-MM-YYYY
  };

  const handlePrint = () => {
    //const receiptContent = receiptRef.current.innerHTML;
    const receiptContent = receiptRef.current
      ? receiptRef.current.innerHTML.replace(/undefined|null|blank/g, "")
      : "";
    const printWindow = window.open("", "_blank", "width=400,height=600");
    printWindow.document.write(`
      <html>
      <head>
        <style>
          body { font-family: Calibri, sans-serif; font-size: 12px; margin: 0; padding: 0;}
          .receipt-container { width: 300px; margin: 0 auto; padding: 5px;}
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 4px; }
          th { border-bottom: 1px solid #000; }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${receiptContent}
      </body>
      </html>
    `);
    printWindow.document.close();
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
          Invoice 
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
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Qty</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Unit Price</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Total</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{servicesName[index]}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(row.unit_price)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(row.quantity * row.unit_price)}
                    </TableCell>
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

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitSales}
            >
              Confirm Sales
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handlePrint}
              sx={{ ml: 2 }}
            >
              Print POS Receipt
            </Button>
          </Grid>
        </Grid>

    
        <div ref={receiptRef} className="hidden">
          <div className="receipt-container w-[3in] font-calibri text-[10px]">
            <div className="flex justify-center w-full">
              <h1 className="text-lg font-bold text-center">
                Said Ahmed Memorial Medical Centre
              </h1>
            </div>
            <h3 className="text-lg">Invoice # {invoiceId || "N/A"}</h3>
            <p className="text-sm">
              <strong>Patient:</strong> {patientName || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Date: </strong>
              {formatDate(saleDate) || "N/A"}
            </p>
            <hr className="my-2 border-gray-300" />
            <table className="w-full text-lg border-collapse table-fixed">
              <thead>
                <tr>
                  <th className="text-left text-lg">Name</th>
                  <th className="text-left text-lg">Qty</th>
                  <th className="text-right text-lg">Unit Price</th>
                  <th className="text-right text-lg">Total</th>
                </tr>
              </thead>
              <tbody>
                {salesRows.map((row, index) => (
                  <tr key={index}>
                    <td className=" text-lg">{servicesName[index] || "N/A"}</td>
                    <td className=" text-lg">{row.quantity || "0"}</td>
                    <td className=" text-right text-lg">
                      {formatCurrency(row.unit_price || 0)}
                    </td>
                    <td className=" text-right text-lg">
                      {formatCurrency(
                        (row.quantity || 0) * (row.unit_price || 0)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="my-2 border-gray-300" />
            <div className="w-full text-right">
              <h2 className="text-2xl font-bold">
                Total: {formatCurrency(calculateTotal())}
              </h2>
              <p className="text-sm">Thank your for Your Purchase!</p>
            </div>
          </div>
        </div>

      </Box>
    </Modal>
  );
};

export default InvoiceModal;

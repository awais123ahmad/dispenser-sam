
import React, {useRef} from "react";
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
    const receiptRef = useRef(null);

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
          <div className="receipt-container w-[3.5in] font-calibri text-[10px] mx-auto">
            <h3 className="text-lg text-center font-bold">
              Said Ahmed Memorial Medical Centre
            </h3>
            <h4 className="text-lg mb-2">Invoice # {invoiceId || "N/A"}</h4>
            <p className="text-sm">
              <strong>Patient:</strong> {patientName || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Sale Date:</strong> {saleDate || "N/A"}
            </p>
            <hr className="my-2 border-gray-300" />
            <table className="w-full text-lg border-collapse">
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
            <h3 className="text-2xl text-right font-bold mb-2">
              Total: {formatCurrency(calculateTotal())}
            </h3>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;


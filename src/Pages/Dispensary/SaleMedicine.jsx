import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import medicineService from "../../Services/medicineService";
import saleService from "../../Services/saleService";
import doctorService from "../../Services/doctorService";

const SaleMedicine = () => {
  const [salesRows, setSalesRows] = useState([
    {
      stock_id: "",
      patient_id: "",
      doctor_id:"",
      quantity: "",
      unit_price: "",
      sale_date: "",
      invoice: "",
    },
  ]);
  const [medicineData, setMedicineData] = useState([]);
  const [patientss, setPatientss] = useState([]);
  const [doctors, setDoctor] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getMedicines = async () => {
  //     try {
  //       const response = await medicineService.fetchAll();
  //       setMedicineData(response.medicines);
  //     } catch (error) {
  //       toast.error("Error fetching medicines.");
  //     }
  //   };
  //   getMedicines();

  //   const getPatients = async () => {
  //     try {
  //       const response = await patientService.fetchAllPatients();
  //       setPatientss(response.patients);
  //     } catch (error) {
  //       toast.error("Error fetching patients.");
  //     }
  //   };
  //   getPatients();

  //   const getDoctors = async () => {
  //     try {
  //       const response = await doctorService.fetchAllDoctors();
  //       console.log(response);
  //       setDoctor(response.doctor);
  //     } catch (error) {
  //       toast.error("Error fetching patients.");
  //     }
  //   };
  //   getDoctors(); 

  // }, []);

  useEffect(() => {
    const getMedicines = async () => {
      try {
        const response = await medicineService.fetchAll();
        setMedicineData(response.medicines || []); // Fallback to empty array if undefined
      } catch (error) {
        toast.error("Error fetching medicines.");
      }
    };
    getMedicines();

    const getPatients = async () => {
      try {
        const response = await patientService.fetchAllPatients();
        setPatientss(response.patients || []); // Fallback to empty array if undefined
      } catch (error) {
        toast.error("Error fetching patients.");
      }
    };
    getPatients();

    const getDoctors = async () => {
      try {
        const response = await doctorService.fetchAllDoctors();
        console.log(response);
        setDoctor(response.doctors || []); // Fallback to empty array if undefined
      } catch (error) {
        toast.error("Error fetching doctors.");
      }
    };
    getDoctors();
  }, []);
  
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...salesRows];
    updatedRows[index][field] = value;

    if (field === "stock_id") {
      const selectedMedicine = medicineData.find((med) => med.id === value);
      if (selectedMedicine) {
        updatedRows[index].unit_price = selectedMedicine.price;
      }
    }
    setSalesRows(updatedRows);
  };

  const handleAddRow = () => {
    setSalesRows([
      ...salesRows,
      {
        stock_id: "",
        doctor_id:"",
        patient_id: "",
        quantity: "",
        unit_price: "",
        sale_date: "",
        invoice: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    setSalesRows(salesRows.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        salesRows.map(async (row) => {
          await saleService.create(row);
        })
      );
      toast.success("Sales added successfully!");
      navigate("/dispenser");
    } catch (error) {
      toast.error("Error saving sales.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] m-auto">
      <h1 className="m-[30px] text-center font-[700] text-[20px]">
        {id ? "Edit Sales" : "Record Sales"}
      </h1>
      <Divider />
      {salesRows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-8 gap-5 my-[20px] items-center"
        >
          <FormControl fullWidth>
            <InputLabel>Medicine Name</InputLabel>
            <Select
              label="Medicine Name"
              name="stock_id"
              value={row.stock_id}
              onChange={(e) =>
                handleRowChange(index, "stock_id", e.target.value)
              }
              required
            >
              {medicineData.map((medicines) => (
                <MenuItem key={medicines.id} value={medicines.id}>
                  {medicines.medicine_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Patient Name</InputLabel>
            <Select
              label="Patient Name"
              name="patient_id"
              value={row.patient_id}
              onChange={(e) =>
                handleRowChange(index, "patient_id", e.target.value)
              }
              required
            >
              {patientss.map((patients) => (
                <MenuItem key={patients.patient_id} value={patients.patient_id}>
                  {patients.full_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Doctor Name</InputLabel>
            <Select
              label="Doctor Name"
              name="doctor_id"
              value={row.doctor_id}
              onChange={(e) => handleRowChange(index, "doctor_id", e.target.value)}
              required
            >
              {doctors.map((doctors) => (
                <MenuItem key={doctors.id} value={doctors.id}>
                  {doctors.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            type="number"
            name="quantity"
            value={row.quantity}
            onChange={(e) => handleRowChange(index, "quantity", e.target.value)}
            required
          />

          <TextField
            label="Unit Price"
            variant="outlined"
            fullWidth
            type="number"
            name="unit_price"
            value={row.unit_price}
            onChange={(e) =>
              handleRowChange(index, "unit_price", e.target.value)
            }
            required
          />

          <TextField
            label="Sale Date"
            variant="outlined"
            fullWidth
            type="date"
            name="sale_date"
            value={row.sale_date}
            onChange={(e) =>
              handleRowChange(index, "sale_date", e.target.value)
            }
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Invoice"
            variant="outlined"
            fullWidth
            type="number"
            name="invoice"
            value={row.invoice}
            onChange={(e) => handleRowChange(index, "invoice", e.target.value)}
            required
          />

          <div className="flex">
            <IconButton color="primary" onClick={handleAddRow}>
              <Add />
            </IconButton>
            {salesRows.length > 1 && (
              <IconButton
                color="secondary"
                onClick={() => handleRemoveRow(index)}
              >
                <Remove />
              </IconButton>
            )}
          </div>
        </div>
      ))}

      <div className="text-center my-[30px]">
        <Button type="submit" variant="contained" color="primary">
          Save Sales
        </Button>
      </div>
    </form>
  );
};

export default SaleMedicine;

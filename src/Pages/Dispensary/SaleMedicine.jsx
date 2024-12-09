
// import React, { useState, useEffect } from "react";
// import { Button, Divider, Grid, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import patientService from "../../Services/patientService";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import medicineService from "../../Services/medicineService";
// import saleService from "../../Services/saleService";

// const SaleMedicine = () => {
//   const [patientData, setPatientData] = useState({
//     stock_id: "",
//     patient_id: "",
//     quantity: "",
//     unit_price: "",
//     sale_date: "",
//     invoice: ""
//   });

//   const [medicineData, setMedicineData] = useState([]); 
//   const [patientss, setPatientss] = useState([]); 

//   const { id } = useParams(); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       // Fetch patient data for editing
//       const fetchPatientData = async () => {
//         try {
//           const response = await patientService.fetchPatientById(id); // Use the fetchPatientById service method
//           setMedicineData(response.patient); // Assuming response has a 'patient' object
//         } catch (error) {
//           toast.error("Error fetching patient data.");
//         }
//       };

//       fetchPatientData();
//     }
//   }, [id]);

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const response = await medicineService.fetchAll();
//         setMedicineData(response.medicines); // Access the doctors array within response
//       } catch (error) {
//         toast.error('Error fetching Doctors');
//       }
//     };
//     getProducts();
//   }, []);

//   useEffect(() => {
//     const getPatients = async () => {
//       try {
//         const response = await patientService.fetchAllPatients();
//         setPatientss(response.patients); // Access the doctors array within response
//       } catch (error) {
//         toast.error('Error fetching Doctors');
//       }
//     };
//     getPatients();
//   }, []);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setPatientData({ ...patientData, [name]: value });
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData({ ...patientData, [name]: value });

//     // Update unit_price when medicine is selected
//     if (name === "stock_id") {
//       const selectedMedicine = medicineData.find((med) => med.id === value);
//       if (selectedMedicine) {
//         setPatientData((prevState) => ({
//           ...prevState,
//           unit_price: selectedMedicine.price,
//         }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await saleService.update(id, patientData);
//         toast.success("Medicine updated successfully!");
//       } else {
//         await saleService.save(patientData);
//         toast.success("Medicine added successfully!");
//       }
//       navigate("/patients");
//     } catch (error) {
//       toast.error("Error saving patient.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-[90%] m-auto">
//       <h1 className="m-[30px] text-center font-[700] text-[20px]">{id ? "Edit Sales" : "Record Sales"}</h1>
//       <Divider />
//       <div>
        

//         {/* Medicine Stock Fields */}
//         <Divider className="my-[20px]" />

//         <div className="grid grid-cols-6 gap-10 my-[20px]">
//         <div>
//           <FormControl fullWidth>
//             <InputLabel>Medicine Name</InputLabel>
//             <Select
//               label="Medicine Name"
//               name="stock_id"
//               value={patientData.stock_id} // Set the selected doctor's ID
//               onChange={handleChange}
//               required
//             >
//               {medicineData.map((medicines) => (
//                   <MenuItem key={medicines.id} value={medicines.id}>
//                     {medicines.medicine_name}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </div>

//         <div>
//           <FormControl fullWidth>
//             <InputLabel>Patient Name</InputLabel>
//             <Select
//               label="Patient Name"
//               name="patient_id"
//               value={patientData.patient_id} // Set the selected doctor's ID
//               onChange={handleChange}
//               required
//             >
//               {patientss.map((patients) => (
//                   <MenuItem key={patients.patient_id} value={patients.patient_id}>
//                     <p>{patients.full_name}</p>
//                     {patients.patient_id}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </div>
//           <div>
//             <TextField
//               label="Quantity"
//               variant="outlined"
//               fullWidth
//               type="number"
//               name="quantity"
//               value={patientData.quantity}
//               onChange={handleChange}
//               required
//             />
//           </div>
         

//         <div>
//             <TextField
//               label="Unit Price"
//               variant="outlined"
//               fullWidth
//               type="number"
//               name="unit_price"
//               value={patientData.unit_price}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <TextField
//               label="Purchase Date"
//               variant="outlined"
//               fullWidth
//               type="date"
//               name="sale_date"
//               value={patientData.sale_date}
//               onChange={handleChange}
//               required
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </div>

//           <div>
//             <TextField
//               label="Invoice"
//               variant="outlined"
//               fullWidth
//               type="number"
//               name="invoice"
//               value={patientData.invoice}
//               onChange={handleChange}
//               required
//             />
//           </div>
              
//         </div>

//         <div className="text-center my-[30px]">
//           <Button type="submit" variant="contained" color="primary">
//             {id ? "Update Medicine" : "Add Medicine"}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SaleMedicine;

import React, { useState, useEffect } from "react";
import { Button, Divider, Grid, TextField, MenuItem, Select, InputLabel, FormControl, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import patientService from "../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import medicineService from "../../Services/medicineService";
import saleService from "../../Services/saleService";

const SaleMedicine = () => {
  const [salesRows, setSalesRows] = useState([
    {
      stock_id: "",
      patient_id: "",
      quantity: "",
      unit_price: "",
      sale_date: "",
      invoice: "",
    },
  ]);
  const [medicineData, setMedicineData] = useState([]);
  const [patientss, setPatientss] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMedicines = async () => {
      try {
        const response = await medicineService.fetchAll();
        setMedicineData(response.medicines);
      } catch (error) {
        toast.error("Error fetching medicines.");
      }
    };
    getMedicines();

    const getPatients = async () => {
      try {
        const response = await patientService.fetchAllPatients();
        setPatientss(response.patients);
      } catch (error) {
        toast.error("Error fetching patients.");
      }
    };
    getPatients();
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
          await saleService.save(row);
        })
      );
      toast.success("Sales added successfully!");
      navigate("/dispensary");
    } catch (error) {
      toast.error("Error saving sales.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] m-auto">
      <h1 className="m-[30px] text-center font-[700] text-[20px]">{id ? "Edit Sales" : "Record Sales"}</h1>
      <Divider />
      {salesRows.map((row, index) => (
        <div key={index} className="grid grid-cols-7 gap-10 my-[20px] items-center">
          <FormControl fullWidth>
            <InputLabel>Medicine Name</InputLabel>
            <Select
              label="Medicine Name"
              name="stock_id"
              value={row.stock_id}
              onChange={(e) => handleRowChange(index, "stock_id", e.target.value)}
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
              onChange={(e) => handleRowChange(index, "patient_id", e.target.value)}
              required
            >
              {patientss.map((patients) => (
                <MenuItem key={patients.patient_id} value={patients.patient_id}>
                  {patients.full_name}
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
            onChange={(e) => handleRowChange(index, "unit_price", e.target.value)}
            required
          />

          <TextField
            label="Sale Date"
            variant="outlined"
            fullWidth
            type="date"
            name="sale_date"
            value={row.sale_date}
            onChange={(e) => handleRowChange(index, "sale_date", e.target.value)}
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
              <IconButton color="secondary" onClick={() => handleRemoveRow(index)}>
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

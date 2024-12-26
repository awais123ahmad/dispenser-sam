// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Divider,
//   Grid,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   IconButton,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import patientService from "../../Services/patientService";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import medicineService from "../../Services/medicineService";
// import saleService from "../../Services/saleService";
// import doctorService from "../../Services/doctorService";

// const SaleMedicine = () => {
//   const [salesRows, setSalesRows] = useState([
//     {
//       stock_id: "",
//       patient_id: "",
//       doctor_id:"",
//       quantity: "",
//       unit_price: "",
//       sale_date: "",
//       invoice: "",
//     },
//   ]);
//   const [medicineData, setMedicineData] = useState([]);
//   const [patientss, setPatientss] = useState([]);
//   const [doctors, setDoctor] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getMedicines = async () => {
//       try {
//         const response = await medicineService.fetchAll();
//         setMedicineData(response.medicines || []); // Fallback to empty array if undefined
//       } catch (error) {
//         toast.error("Error fetching medicines.");
//       }
//     };
//     getMedicines();

//     const getPatients = async () => {
//       try {
//         const response = await patientService.fetchAllPatients();
//         setPatientss(response.patients || []); // Fallback to empty array if undefined
//       } catch (error) {
//         toast.error("Error fetching patients.");
//       }
//     };
//     getPatients();

//     const getDoctors = async () => {
//       try {
//         const response = await doctorService.fetchAllDoctors();
//         console.log(response);
//         setDoctor(response.doctors || []); // Fallback to empty array if undefined
//       } catch (error) {
//         toast.error("Error fetching doctors.");
//       }
//     };
//     getDoctors();
//   }, []);

//   const handleRowChange = (index, field, value) => {
//     const updatedRows = [...salesRows];
//     updatedRows[index][field] = value;

//     if (field === "stock_id") {
//       const selectedMedicine = medicineData.find((med) => med.id === value);
//       if (selectedMedicine) {
//         updatedRows[index].unit_price = selectedMedicine.price;
//       }
//     }
//     setSalesRows(updatedRows);
//   };

//   const handleAddRow = () => {
//     setSalesRows([
//       ...salesRows,
//       {
//         stock_id: "",
//         doctor_id:"",
//         patient_id: "",
//         quantity: "",
//         unit_price: "",
//         sale_date: "",
//         invoice: "",
//       },
//     ]);
//   };

//   const handleRemoveRow = (index) => {
//     setSalesRows(salesRows.filter((_, i) => i !== index));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await Promise.all(
//   //       salesRows.map(async (row) => {
//   //         await saleService.saveSale(row);
//   //       })
//   //     );
//   //     toast.success("Sales added successfully!");
//   //     navigate("/dispenser");
//   //   } catch (error) {
//   //     toast.error("Error saving sales.");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await Promise.all(
//         salesRows.map(async (row) => {
//           const response = await saleService.create(row);
//           console.log(response); // Debugging
//         })
//       );
//       toast.success("Sales added successfully!");
//       navigate("/dispenser");
//     } catch (error) {
//       console.error(error); // Log the error for clarity
//       toast.error("Error saving sales.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-[90%] m-auto">
//       <h1 className="m-[30px] text-center font-[700] text-[20px]">
//         {id ? "Edit Sales" : "Record Sales"}
//       </h1>
//       <Divider />
//       {salesRows.map((row, index) => (
//         <div
//           key={index}
//           className="grid grid-cols-8 gap-5 my-[20px] items-center"
//         >

//           <FormControl fullWidth>
//             <InputLabel>Medicine Name</InputLabel>
//             <Select
//               label="Medicine Name"
//               name="stock_id"
//               value={row.stock_id}
//               onChange={(e) =>
//                 handleRowChange(index, "stock_id", e.target.value)
//               }
//               required
//             >
//               {medicineData.map((medicines) => (
//                 <MenuItem key={medicines.id} value={medicines.id}>
//                   {medicines.medicine_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Patient Name</InputLabel>
//             <Select
//               label="Patient Name"
//               name="patient_id"
//               value={row.patient_id}
//               onChange={(e) =>
//                 handleRowChange(index, "patient_id", e.target.value)
//               }
//               required
//             >
//               {patientss.map((patients) => (
//                 <MenuItem key={patients.patient_id} value={patients.patient_id}>
//                   {patients.full_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Doctor Name</InputLabel>
//             <Select
//               label="Doctor Name"
//               name="doctor_id"
//               value={row.doctor_id}
//               onChange={(e) => handleRowChange(index, "doctor_id", e.target.value)}
//               required
//             >
//               {doctors.map((doctors) => (
//                 <MenuItem key={doctors.id} value={doctors.id}>
//                   {doctors.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Quantity"
//             variant="outlined"
//             fullWidth
//             type="number"
//             name="quantity"
//             value={row.quantity}
//             onChange={(e) => handleRowChange(index, "quantity", e.target.value)}
//             required
//           />

//           <TextField
//             label="Unit Price"
//             variant="outlined"
//             fullWidth
//             type="number"
//             name="unit_price"
//             value={row.unit_price}
//             onChange={(e) =>
//               handleRowChange(index, "unit_price", e.target.value)
//             }
//             required
//           />

//           <TextField
//             label="Sale Date"
//             variant="outlined"
//             fullWidth
//             type="date"
//             name="sale_date"
//             value={row.sale_date}
//             onChange={(e) =>
//               handleRowChange(index, "sale_date", e.target.value)
//             }
//             required
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="Invoice"
//             variant="outlined"
//             fullWidth
//             type="number"
//             name="invoice"
//             value={row.invoice}
//             onChange={(e) => handleRowChange(index, "invoice", e.target.value)}
//             required
//           />

//           <div className="flex">
//             <IconButton color="primary" onClick={handleAddRow}>
//               <Add />
//             </IconButton>
//             {salesRows.length > 1 && (
//               <IconButton
//                 color="secondary"
//                 onClick={() => handleRemoveRow(index)}
//               >
//                 <Remove />
//               </IconButton>
//             )}
//           </div>
//         </div>
//       ))}

//       <div className="text-center my-[30px]">
//         <Button type="submit" variant="contained" color="primary">
//           Save Sales
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default SaleMedicine;

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
import { useNavigate } from "react-router-dom";
import medicineService from "../../Services/medicineService";
import doctorService from "../../Services/doctorService";
import saleService from "../../Services/saleService";

const SaleMedicine = () => {
  const [salesRows, setSalesRows] = useState([
    {
      stock_id: "",
      quantity: "",
      unit_price: "",
    },
  ]);
  const [medicineData, setMedicineData] = useState([]);
  const [patientss, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);


  const [searchMedicineData, setSearchMedicineData] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicines = await medicineService.fetchAll();
        setMedicineData(medicines.medicines || []);

        // const patients = await patientService.fetchAllPatients();
        // console.log("Fetched patients data:", patients); // Debug log
        // setPatients(patients.patients || []);

        const doctors = await doctorService.fetchAllDoctors();
        setDoctors(doctors.doctors || []);
      } catch (error) {
        toast.error("Error fetching data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await patientService.fetchAllPatients();
        setPatients(response.patients);
      } catch (error) {
        toast.error("Error fetching Patients");
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
      { stock_id: "", quantity: "", unit_price: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    setSalesRows(salesRows.filter((_, i) => i !== index));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const dataToSubmit = salesRows.map((row) => ({
  //       ...row,
  //       patient_id: selectedPatientId,
  //       doctor_id: selectedDoctor,
  //       sale_date: saleDate,
  //     }));

  //     await Promise.all(dataToSubmit.map((row) => saleService.create(row)));
  //     toast.success("Sales added successfully!");
  //     navigate("/dispenser");
  //   } catch (error) {
  //     toast.error("Error saving sales.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) {
      toast.error("Please select a patient before submitting.");
      return;
    }
    try {
      const dataToSubmit = salesRows.map((row) => ({
        ...row,
        patient_id: selectedPatientId,
        doctor_id: selectedDoctor,
        sale_date: saleDate,
      }));
  
      await Promise.all(dataToSubmit.map((row) => saleService.create(row)));
      toast.success("Sales added successfully!");
      navigate("/dispenser");
    } catch (error) {
      toast.error("Error saving sales.");
    }
  };
  
 const handlePatientSelect = (patient) => {
    setSelectedPatient(patient); 
    setSelectedPatientId(patient.patient_id); 
    setSearchData(""); 
    setPatients((prevData) => ({
      ...prevData,
      patient_id: patient.patient_id, 
    }));

  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine); // Save the selected patient
    setSearchMedicineData(""); // Clear search input
    setMedicineData((prevData) => ({
      ...prevData,
      stock_id: medicine.id, // Store patient_id in checkupData
    }));

    // Ensure patient name is set correctly for the dialog confirmation
    //setSelectedPatientName(patient.full_name || "");
  };

  
  return (
    <form onSubmit={handleSubmit} className="w-[90%] m-auto">
      <h1 className="m-[30px] text-center font-[700] text-[20px]">
        Record Sales
      </h1>
      <Divider />

      <div className="mt-10">

      <Grid container spacing={3} className="my-[20px] mb-">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              label="Search Patients"
              placeholder="Type to search patients..."
              value={searchData || selectedPatient?.full_name || ""}
              onChange={(e) => {
                setSearchData(e.target.value);
                if (selectedPatient) setSelectedPatient(null);
              }}
              variant="outlined"
              fullWidth
            />
            {searchData && (
              <div className="relative">
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto mt-2">
                  <li className="px-4 py-2 font-bold bg-gray-100">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-sm font-bold">Patient No.</th>
                          <th className="text-sm font-bold">Name</th>
                          <th className="text-sm font-bold">Phone No.</th>
                        </tr>
                      </thead>
                    </table>
                  </li>

                  {/* Render Patient Data */}
                  {patientss
                    .filter(
                      (patient) =>
                        patient.full_name
                          ?.toLowerCase()
                          .includes(searchData.toLowerCase()) ||
                        patient.patient_id
                          ?.toString()
                          .toLowerCase()
                          .includes(searchData.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((patient) => (
                      <li
                        key={patient.patient_id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handlePatientSelect(patient)} // Use updated function
                      >
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="text-sm">{patient.patient_id}</td>
                              <td className="text-sm text-gray-600 px-10">
                                {patient.full_name}
                              </td>
                              <td className="text-sm text-gray-600">
                                {patient.contact_number}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </FormControl>

          {/* 
          <FormControl fullWidth>
            <InputLabel>Patient Name</InputLabel>
            <Select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              required
            >
              {patientss.map((patient) => (
                <MenuItem key={patient.patient_id} value={patient.patient_id}>
                  {patient.full_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          
        </Grid>
        
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Doctor Name</InputLabel>
            <Select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Sale Date"
            type="date"
            fullWidth
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
      </Grid>

      {salesRows.map((row, index) => (
        <Grid container spacing={3} key={index} className="my-[20px]">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Medicine Name</InputLabel>
              <Select
                value={row.stock_id}
                onChange={(e) =>
                  handleRowChange(index, "stock_id", e.target.value)
                }
                required
              >
                {medicineData.map((medicine) => (
                  <MenuItem key={medicine.id} value={medicine.id}>
                    {medicine.medicine_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

        
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={row.quantity}
              onChange={(e) =>
                handleRowChange(index, "quantity", e.target.value)
              }
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Unit Price"
              type="number"
              fullWidth
              value={row.unit_price}
              onChange={(e) =>
                handleRowChange(index, "unit_price", e.target.value)
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      ))}

      <div className="text-center my-[30px]">
        <Button type="submit" variant="contained" color="primary">
          Save Sales
        </Button>
      </div>
      </div>
    </form>
  );
};

export default SaleMedicine;

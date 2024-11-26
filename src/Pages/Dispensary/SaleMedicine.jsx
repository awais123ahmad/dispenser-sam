import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import patientService from "../../Services/patientService"; // Assuming this fetches patient data
import toast from "react-hot-toast";

const SaleMedicine = () => {
  const [cnic, setCnic] = useState("");
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([{ name: "", quantity: "" }]);

  const handleSearch = async () => {
    if (!cnic) {
      toast.error("Please enter a CNIC number");
      return;
    }
    try {
      setLoading(true);
      const response = await patientService.fetchAllPatients(); // Assuming this returns all patients

      // Filter the patient based on CNIC
      const foundPatient = response.patients.find((p) => p.CNIC === cnic);

      if (foundPatient) {
        setPatient(foundPatient); // Set the found patient
      } else {
        toast.error("No patient found for this CNIC");
        setPatient(null); // Clear the patient if not found
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching patient data");
    }
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", quantity: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const handleMedicineChange = (index, e) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][e.target.name] = e.target.value;
    setMedicines(updatedMedicines);
  };

  return (
    <div className="p-4">
      <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">
        Sale Medicine
      </h1>

      <div className="mt-4 flex justify-between">
        <div className="w-[40%]">
          <span className="bold">Search CNIC</span>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="block w-[90%] pl-10 text-gray-900 p-2 rounded-md border-gray-800 bg-white focus:outline-none"
            />
            <SearchIcon
              className="text-gray-700 ml-2 cursor-pointer absolute top-2 right-2"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {patient && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Patient Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Patient Id:</label>
              <input
                type="text"
                value={patient.patient_id}
                readOnly
                className="text-gray-700 p-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600">Name:</label>
              <input
                type="text"
                value={patient.full_name}
                readOnly
                className="text-gray-700 p-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600">CNIC:</label>
              <input
                type="text"
                value={patient.CNIC}
                readOnly
                className="text-gray-700 p-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600">Record Date:</label>
              <input
                type="text"
                value={patient.checkup_date}
                readOnly
                className="text-gray-700 p-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Medicine Section */}
      {patient && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Add Medicines
          </h3>

          {/* Medicine Input Fields */}
          {medicines.map((medicine, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <div className="flex flex-col w-2/5">
                <label className="text-gray-600">Medicine Name:</label>
                <input
                  type="text"
                  name="name"
                  value={medicine.name}
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="text-gray-700 p-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none"
                  disabled={!patient} // Disable input if patient is not found
                />
              </div>

              <div className="flex flex-col w-1/12">
                <label className="text-gray-600">Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={medicine.quantity}
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="text-gray-700 p-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none"
                  disabled={!patient} // Disable input if patient is not found
                />
              </div>

              {/* Remove Button */}
              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(index)}
                  className="text-red-500 ml-4 self-center flex-row mt-3"
                  disabled={!patient} // Disable remove button if patient is not found
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Button to Add More Medicine */}
          <button
            onClick={handleAddMedicine}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            disabled={!patient} // Disable the button if patient is not found
          >
            + Add Medicine
          </button>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-neutral-700 text-white rounded-md disabled:bg-gray-300"
          disabled={!patient} // Disable the button if patient is not found
        >
          + Update Form and Medicine
        </button>
      </div>
    </div>
  );
};

export default SaleMedicine;

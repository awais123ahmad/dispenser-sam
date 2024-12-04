import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MedicalStore from "./Pages/Dispensary/MedicalStore";
import SaleMedicine from "./Pages/Dispensary/SaleMedicine";
import LoginPage from "./Pages/Login/Login";
import AddEditMedicalStore from "./Pages/Dispensary/AddEditMedicalStore";

function App() {
  return (
    // Set the base path to '/dispenser' for subdirectory deployment
    <BrowserRouter basename="/dispenser">
      <PortalLayout>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Dispensary Routes */}
          <Route path="/dispensary" element={<MedicalStore />} />
          <Route
            path="/dispensary/add-edit-medical"
            element={<AddEditMedicalStore />}
          />
          <Route path="/dispensary/sale-medicine" element={<SaleMedicine />} />
        </Routes>
      </PortalLayout>
    </BrowserRouter>
  );
}

export default App;

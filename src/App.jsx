import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MedicalStore from "./Pages/Dispensary/MedicalStore";
import SaleMedicine from "./Pages/Dispensary/SaleMedicine";
import LoginPage from "./Pages/Login/Login";
import AddEditMedicalStore from "./Pages/Dispensary/AddEditMedicalStore";

function App() {
  return (
    <BrowserRouter basename="/dispenser">
      <PortalLayout>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dispensary" element={<MedicalStore />} />
          <Route
            path="/dispensary/add-edit-medical"
            element={<AddEditMedicalStore />}
          />
          <Route path="/dispensary/SaleMedicine" element={<SaleMedicine />} />
        </Routes>
      </PortalLayout>
    </BrowserRouter>
  );
}

export default App;

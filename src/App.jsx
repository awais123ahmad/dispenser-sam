import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import {
  Navigate,
  Route,
  Routes,
  Redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Cookies from "js-cookie";

import MedicalStore from "./Pages/Dispensary/MedicalStore";
import SaleMedicine from "./Pages/Dispensary/SaleMedicine";
import LoginPage from "./Pages/Login/Login";
import AddEditMedicalStore from "./Pages/Dispensary/AddEditMedicalStore";
import { Toaster } from "react-hot-toast"; 

function App() {
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Check authentication status on page load
  useEffect(() => {
    setIsAuthenticated(
      Boolean(
        Cookies.get("XIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1LRVk=")
      )
    );
  }, [location.pathname]);

  return (
    <>
      <Toaster position="top-center" />
      <PortalLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/dispensary" element={<MedicalStore />} />
          <Route
            path="/dispensary/AddEditMedical"
            element={<AddEditMedicalStore />}
          />
          <Route path="/dispensary/SaleMedicine" element={<SaleMedicine />} />
        </Routes>
      </PortalLayout>
    </>
  );
}

export default App;

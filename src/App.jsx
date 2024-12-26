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
import Login from "./Pages/Login/Login";
import AddEditMedicalStore from "./Pages/Dispensary/AddEditMedicalStore";
import { Toaster } from "react-hot-toast"; 
import SaleServices from "./Pages/Dispensary/SaleServices";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    const token = Cookies.get("XIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1LRVk=");
    if (token) {
      setIsAuthenticated(true);  // User is authenticated
    } else {
      setIsAuthenticated(false); // No token found, set to false
    }
  }, [location.pathname]);  // Check authentication on path change
  
  return (
   
          <Routes>
            
          <Route path="/" element={<Navigate to="/dispenser" replace />} />
          <Route path="/dispenser" element={isAuthenticated ?  <PortalLayout> <MedicalStore /> </PortalLayout>  : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dispenser" />} />
          <Route path="/dispenser/AddEditMedical" element={isAuthenticated ?  <PortalLayout> <AddEditMedicalStore /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/dispenser/SaleMedicine" element={isAuthenticated ?  <PortalLayout> <SaleMedicine /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/dispenser/SaleServices" element={isAuthenticated ?  <PortalLayout> <SaleServices /> </PortalLayout> : <Navigate to="/login" />} />
         
          </Routes>
  );
}

export default App;

// import React, { useState } from "react";
// import { Button, Grid, TextField, IconButton } from "@mui/material";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import loginService from "../../Services/loginService";
// import Cookies from 'js-cookie';

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // Handle changes in input fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   // Handle form submission (login)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginService.login(loginData);
//       toast.success("Login successful!");

//       // Set authentication cookie
//       Cookies.set("XIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1LRVk=", response.token, { expires: 1 });

//       // Redirect to dashboard
//       navigate("/dispensary");
//     } catch (error) {
//       toast.error(error.message || "Login failed. Please try again.");
//     }
//   };

//   // Toggle password visibility
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//         <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//           <div className="relative px-4 py-10 bg-zinc-200 shadow-lg sm:rounded-md sm:p-20">
//             <div className="max-w-md mx-auto">
//               <div>
//                 <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
//                 <h2 className="text-xl font-semibold text-center mb-6">Said Ahmed Memorial Hospital</h2>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 <form onSubmit={handleSubmit}>
//                   <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                     {/* Email Input */}
//                     <div className="relative">
//                       <TextField
//                         label="User Email"
//                         variant="outlined"
//                         fullWidth
//                         name="email"
//                         value={loginData.email}
//                         onChange={handleChange}
//                         required
//                         className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                       />
//                     </div>
//                     {/* Password Input with Show/Hide Feature */}
//                     <div className="relative top-4">
//                       <TextField
//                         label="Password"
//                         variant="outlined"
//                         fullWidth
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         value={loginData.password}
//                         onChange={handleChange}
//                         required
//                         className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                         InputProps={{
//                           endAdornment: (
//                             <IconButton
//                               position="end"
//                               onClick={handleClickShowPassword}
//                               edge="end"
//                             >
//                               {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           ),
//                         }}
//                       />
//                     </div>

//                     {/* Submit Button */}
//                     <div className="relative top-6">
//                       <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
//                         <Button
//                           variant="contained"
//                           type="submit"
//                           color="primary"
//                           size="large"
//                           className="!bg-[#007fff] !text-white"
//                           style={{ borderRadius: "10px" }}
//                         >
//                           Login
//                         </Button>
//                       </Grid>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import loginService from "../../Services/loginService";
import { Button, Grid, TextField, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [regex] = useState({
    email: /.+@.+\..+/,
    password: /.{6,}/,
  });

  const handleChange = (value, field) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await loginService.login(data);
      toast.success("Login successful!");
      // Set authentication cookie
      Cookies.set(
        "XIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1LRVk=",
        response.token,
        { expires: 1 }
      );
      // Update authentication state in App component
      setIsAuthenticated(true); // This will trigger the redirect
      // Redirect to /receptionist after successful login
      navigate("/dispensary");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-zinc-200 shadow-lg sm:rounded-md sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-center mb-6">
                  Login
                </h1>
                <h2 className="text-xl font-semibold text-center mb-6">
                  Said Ahmed Memorial Hospital
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={data.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  onKeyDown={handleKeyDown}
                  className="border-b-2 rounded-md border-gray-200 p-2 w-[90%] mt-10 focus:outline-none font-normal"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={(e) => handleChange(e.target.value, "password")}
                  onKeyDown={handleKeyDown}
                  className="border-b-2 rounded-md border-gray-200 p-2 w-[90%] mt-5 focus:outline-none focus:border-[#1EA56C]"
                />

                <IconButton
                  onClick={handleClickShowPassword}
                  className="absolute right-12 top-4 transform -translate-y-1/2"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>

                {/* Show error message */}
                {error && <p className="text-red-500 mt-3">{error}</p>}

                <div className="flex justify-center">
                  <button
                    className={`bg-[#0077B6] hover:border-none text-white hover:text-white p-2 px-10 rounded-md mt-10 font-semibold shadow-md hover:shadow-slate-700 duration-300 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

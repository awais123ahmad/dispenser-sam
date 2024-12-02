// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { UserLogin } from "../../Api/Reducers/authReducer";
// import { SESSION_IS_AUTHENTICATED } from "../../Utills/Constants";

// const Login = () => {

//   return (
//     <div>
//       {/* <Toaster position="top-center" reverseOrder={true} /> */}
//       <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//         <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//           <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//             <div className="max-w-md mx-auto">
//               <div>
//                 <h1 className="text-2xl font-semibold text-center mb-6">
//                   Login{" "}
//                 </h1>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                   <div className="relative">
//                     <input
//                       autocomplete="off"
//                       // value={data.email}
//                       // onChange={(e) =>
//                       //   setData({ ...data, email: e.target.value })
//                       // }
//                       id="email"
//                       name="email"
//                       type="text"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="User name"
//                     />
//                     <label
//                       for="email"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       User Email
//                     </label>
//                   </div>
//                   <div className="relative top-2">
//                     <input
//                       autocomplete="off"
//                       id="password"
//                       // value={data.password}
//                       // onChange={(e) =>
//                       //   setData({ ...data, password: e.target.value })
//                       // }
//                       name="password"
//                       type="password"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="Password"
//                     />
//                     <label
//                       for="password"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Password
//                     </label>
//                   </div>
//                   <div className="relative top-2">
//                     <button
//                       // onClick={() => handleSubmit()}
//                       className="bg-blue-500 text-white rounded-md px-2 py-1"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from "react";
// import {
//   Button,
//   Divider,
//   Grid,
//   TextField,
// } from "@mui/material";
// import toast from "react-hot-toast";
// import userService from "../../Services/userService";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await userService.login(loginData); // Assume a login method in userService
//       toast.success("Login successful!");
//       localStorage.setItem("user", JSON.stringify(response)); // Save user info
//       navigate("/admin"); // Redirect to a dashboard or main page
//     } catch (error) {
//       toast.error(error.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-[90%] m-auto">
//       <h1 className="m-[30px] text-center font-[700] text-[20px]">Login</h1>
//       <Divider />
//       <div>
//         <div className="mt-[20px]">
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             name="email"
//             value={loginData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mt-[20px]">
//           <TextField
//             label="Password"
//             variant="outlined"
//             fullWidth
//             name="password"
//             type="password"
//             value={loginData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
//           <Button
//             variant="contained"
//             type="submit"
//             color="primary"
//             size="large"
//             className="!bg-[#007fff] !text-white"
//             style={{ borderRadius: "10px" }}
//           >
//             Login
//           </Button>
//         </Grid>
//       </div>
//     </form>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { Button, Divider, Grid, TextField } from "@mui/material";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import userService from "../../Services/userService"; // Adjust path as needed

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

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
//       const response = await userService.login(loginData); // Assume login method in userService
//       toast.success("Login successful!");
//       localStorage.setItem("user", JSON.stringify(response)); // Save user info in localStorage
//       navigate("/admin"); // Redirect to admin or dashboard page
//     } catch (error) {
//       toast.error(error.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//         <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//           {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
//           <div className="relative px-4 py-10 bg-slate-200 shadow-lg sm:rounded-md sm:p-20">
//             <div className="max-w-md mx-auto">
//               <div>
//                 <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
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
//                     {/* Password Input */}
//                     <div className="relative top-2 mt-6">
//                       <TextField
//                         label="Password"
//                         variant="outlined"
//                         fullWidth
//                         name="password"
//                         type="password"
//                         value={loginData.password}
//                         onChange={handleChange}
//                         required
//                         className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                       />
//                     </div>
//                     {/* Submit Button */}
//                     <div className="relative top-2">
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
import { Button, Divider, Grid, TextField, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/userService"; // Adjust path as needed
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(loginData); // Assume login method in userService
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response)); // Save user info in localStorage
      navigate("/"); // Redirect to admin or dashboard page
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
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
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                <h2 className="text-xl font-semibold text-center mb-6">Said Ahmed Memorial Hospital</h2>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {/* Email Input */}
                    <div className="relative">
                      <TextField
                        label="User Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    {/* Password Input with Show/Hide Feature */}
                    <div className="relative top-4">
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={handleChange}
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              position="end"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          ),
                        }}
                      />
                    </div>

                    {/* <div className="relative top-8">
                      <FormControl fullWidth required>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                          labelId="role-label"
                          id="role-select"
                          value={loginData.role}
                          name="role"
                          onChange={handleChange}
                          label="Role"
                          fullWidth
                          className="peer placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="dispenser">Dispenser</MenuItem>
                          <MenuItem value="patient">Patient</MenuItem>
                        </Select>
                      </FormControl>
                    </div> */}
                    {/* Submit Button */}
                    <div className="relative top-6">
                      <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          size="large"
                          className="!bg-[#007fff] !text-white"
                          style={{ borderRadius: "10px" }}
                        >
                          Login
                        </Button>
                      </Grid>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



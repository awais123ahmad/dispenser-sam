import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

import { FaFirstAid, FaUserInjured } from 'react-icons/fa';

import { Popover, Transition } from "@headlessui/react";

import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsIcon from "@mui/icons-material/Notifications";

import BadgeIcon from "@mui/icons-material/Badge";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import WindowIcon from "@mui/icons-material/Window";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import WidgetsIcon from "@mui/icons-material/Widgets";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import {
  SESSION_IS_AUTHENTICATED,
  SESSION_USERINFO,
} from "../Utills/Constants";
//import { useDispatch } from "react-redux";
import { logout } from "../Api/Reducers/authReducer";
import { MedicalInformation, PeopleAltRounded } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function PortalLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };
  const route = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [out, setOut] = React.useState();
  const handleClick = () => setOut(!open);

  const [open1, setOpen1] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleSelection = (index) => {
    let op = [...open1];
    op[index] = !op[index];
    setOpen1(op);
  };

  const [auth, setAuth] = useState(
    sessionStorage.getItem(SESSION_IS_AUTHENTICATED)
  );
  console.log(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === "false") {
      route("/login");
    }
  }, []);

  //const dispatch = useDispatch();
  console.log("user info", sessionStorage.getItem(SESSION_USERINFO));

  // const handleLogout = () => {
  //   dispatch(logout())
  //   route('/login')
  // }

  return (
    <>
      {location.pathname === "/login" ? (
        children
      ) : (
        <>
          <div className=" !flex !items-center">
            <CssBaseline />
            <AppBar
              className={`!bg-white    !rounded-3xl !shadow-none mt-[-7px] ${
                open ? `!w-[84%]"` : `!w-[94%]`
              }`}
              sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
              open={open}
            >
              <Toolbar>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawer}
                  edge="start"
                  sx={{ marginLeft: 1 }}
                >
                  <MenuIcon className="text-gray-600 mt-[4px] " />
                </IconButton>
                {/* <div className="w-[50%] m-auto relative mt-[16px]">
                                    <input
                                        type="search"
                                        className="w-full border-2 rounded-xl px-10 py-[4px] focus:outline-none text-gray-600"
                                        placeholder="Search"
                                    />
                                    <SearchIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-600 " />
                                </div> */}

                <div className="ml-auto flex gap-2 items-center">
                  <NotificationsIcon
                    className="text-gray-600 "
                    sx={{ fontSize: 20 }}
                  />

                  <div className="flex items-center gap-2">
                    <AccountCircleIcon
                      className="text-gray-600 "
                      sx={{ fontSize: 22 }}
                    />
                    <Popover className="ml-auto">
                      <Popover.Button
                        onClick={toggleMenu}
                        className="flex gap-2 outline-none md:mr-6 cursor-pointer text-gray-700"
                      >
                        <IoIosArrowDown
                          className={`w-4 h-4 ${
                            isOpen
                              ? "-rotate-180 duration-300"
                              : "rotate-0 duration-300"
                          }    `}
                        />
                      </Popover.Button>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                      >
                        <Popover.Panel className="absolute right-10 bg-gray-50 border-2 border-gray-300 shadow-lg rounded-md  w-[150px] text-black">
                          <div>
                            <div
                              className="flex text-gray-600 gap-6 p-2 cursor-pointer"
                              //onClick={() => handleLogout()}
                            >
                              <PowerSettingsNewIcon className="text-gray-600" />
                              <h1>LogOut</h1>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              open={open}
              sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  borderWidth: 0,
                  boxSizing: "border-box",
                  borderTopRightRadius: 40,
                  borderBottomRightRadius: 40,
                  backgroundColor: "#F9F9F9",
                  zIndex: "9999",
                  boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
                },
                border: "none",
              }}
            >
              <div>
                <img
                  src={logo}
                  alt=""
                  className={`${
                    open ? "w-[5rem]" : "w-[3rem]"
                  }  ml-auto mr-auto my-4`}
                />
              </div>

              <div className="px-4">
                <div
                  onClick={() => route("/")}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                    location.pathname === "/"
                      ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                      : " mr-2 rounded-md"
                  }`}
                >
                  <SpaceDashboardIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem] ${
                      location.pathname === "/" ? "bg-white text-gray-600" : ""
                    } `}
                    sx={{
                      boxShadow:
                        location.pathname === "/"
                          ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                          : "",
                    }}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Dashboard
                  </span>
                </div>
                
                <div
                  class
                  onClick={() => handleSelection(0)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <FaUserInjured
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Patients
                  </span>
                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[0]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>
                <ul className={`${open1[0] ? "" : "hidden"} w-[100%]`}>
                  
                  <li>
                    <div
                      onClick={() => route("/patient/patientdashboard")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/patient/patientdashboard" ||
                        location.pathname === "/patient/patientdashboard/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <SpaceDashboardIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/patient/patientdashboard"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/patient/patientdashboard"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Patient Dashboard
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => route("/patient/patients")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/patient/patients" ||
                        location.pathname === "/patient/patients/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <Inventory2Icon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/patient/patients"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/patient/patients"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Patients
                      </span>
                    </div>
                  </li>
       
                </ul>

                <div
                  onClick={() => handleSelection(1)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <BadgeIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Dispensaries
                  </span>
                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[1]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>

                <ul className={`${open1[1] ? "" : "hidden"} w-[100%]`}>
                 
                  <li>
                    <div
                      onClick={() => route("/dispensaries/dispensary")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/dispensaries/dispensary"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <Inventory2Icon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/dispensaries/dispensary"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/dispensaries/dispensary"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Dashboard
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => route("/dispensaries/dispensary")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/dispensaries/dispensary"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <Inventory2Icon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/dispensaries/dispensary"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/dispensaries/dispensary"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Medical Store
                      </span>
                    </div>
                  </li>
                  
                </ul>

                <div
                  onClick={() => handleSelection(3)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <AccountCircleIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Admin
                  </span>

                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[3]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>
                
                <ul className={`${open1[3] ? "" : "hidden"} w-[100%]`}>

                  <li>
                    <div
                      onClick={() => route("/admin/admindasboard")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/admin/admindasboard" ||
                        location.pathname === "/admin/admindasboard/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PeopleAltRounded
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/admin/admindasboard"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/admin/admindasboard"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Admin Dashboard
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => route("/admin/register")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/admin/register" ||
                        location.pathname === "/admin/register/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PeopleAltRounded
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/admin/register"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/admin/register"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Register Users
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => route("/admin/staff")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/admin/staff" ||
                        location.pathname === "/admin/staff/AddEditStaff"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PeopleAltRounded
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/admin/staff"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/admin/staff"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Manage Staff
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => route("/admin/doctor")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/admin/doctor" ||
                        location.pathname === "/admin/doctor/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <FaFirstAid
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/admin/doctor"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/admin/doctor"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Manage Doctors
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/admin/patients")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/admin/patients" ||
                        location.pathname === "/admin/patients/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <FaUserInjured
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/admin/patients"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/admin/patients"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                         Patients
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => route("/admin/medicines")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/admin/medicines" ||
                        location.pathname === "/admin/medicines/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <MedicalInformation
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/admin/medicines"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/admin/medicines"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Medicines
                      </span>
                    </div>
                  </li>
                  
                </ul> 
              
                <div
                  onClick={() => handleSelection(4)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <AccountCircleIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Account
                  </span>

                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[4]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>

                <ul className={`${open1[4] ? "" : "hidden"} w-[100%]`}>

                  <li>
                    <div
                      onClick={() => route("/account/purchasemedicine")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/purchasemedicine" ||
                        location.pathname === "/account/purchasemedicine/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <Inventory2Icon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/purchasemedicine"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/purchasemedicine"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Purchase Medicine
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => route("/account/income")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/income" ||
                        location.pathname === "/account/income/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <CleanHandsIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/income"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/income"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Income
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/expense")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/expense" ||
                        location.pathname === "/account/expense/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PaidIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/expense"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/expense"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Expense
                      </span>
                    </div>
                  </li>
                  
                </ul> 
              </div>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
              <DrawerHeader />

              <div
                className={`${
                  location.pathname === "/login" || location.pathname === "/"
                    ? "p-4"
                    : "bg-gray-100 min-h-[80vh]  p-6 rounded-xl m-4"
                } `}
              >
                {children}
              </div>
            </Box>
          </div>
        </>
      )}
    </>
  );
}

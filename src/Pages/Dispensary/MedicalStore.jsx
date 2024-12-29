
import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PaginationComponent from "../../Components/PaginationComponent";
import toast from 'react-hot-toast';
import medicineService from "../../Services/medicineService";

const MedicalStore = () => {
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMedicines = async () => {
      try {
        setLoading(true);
        const response = await medicineService.fetchAll();
        console.log(response); // Log the response to confirm the structure
        setRecords(response.medicines); // Access the patients array within response
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Error fetching Patients');
      }
    };
    getMedicines();
  }, []);
  

  useEffect(() => {
    const filteredResult = records?.filter(
      (item) =>
        item?.medicine_name?.toLowerCase().includes(searchData.toLowerCase())
    ) || [];
    setFilteredData(filteredResult);
    setCurrentPage(1);
  }, [searchData, records]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData?.slice(startIndex, endIndex) || []);
  }, [currentPage, filteredData]);

  return (
    <div>
      <div className="p-4">
        <h1 className="ml-[3%] text-[19px] text-gray-700 font-[700]">Medicine Records</h1>
        <h1 className="ml-[3%] text-[13px] text-gray-700 mb-4">{filteredData?.length || 0} records found</h1>
        
        <div className="flex mt-8 flex-row-reverse justify-between px-[3%]">
          {/* <Link to='AddEditMedical'>
            <button className="bg-[#232233] h-[2rem] px-4 rounded-md text-white font-[600] text-[14px]">
              + Add Medicine
            </button>
          </Link> */}
          <Link to='SaleMedicine'>
            <button className="bg-[#a6a6a6] text-white h-[2rem] px-4 rounded-md font-[600] text-[14px]">
              + Sale Medicine
            </button>
          </Link>

          <Link to='SaleServices'>
            <button className="bg-[#f8f8f8] h-[2rem] px-4 rounded-md text-black font-[600] text-[14px] border-2">
              + Sale Services
            </button>
          </Link>
          <div className="w-[40%]">
            <input
              type="search"
              placeholder="Search Here..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="block w-[90%] pl-10 text-gray-900 p-2 rounded-md border-gray-800 bg-white focus:outline-none"
            />
            <SearchIcon className="mt-[-4rem] text-gray-700 ml-2" />
          </div>
        </div>

        <div className="mx-[3%]">
          <table className="w-[100%]">
            <thead>
              <tr className="text-[#101418] capitalize leading-normal">
                <th className="py-[1%] w-[10%] text-[.8rem] text-gray-700 text-left pl-4">Sr No.</th>
                <th className="py-[1%] w-[20%] text-[.8rem] text-gray-700 text-left pl-4">Medicine Name</th>
                <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-left">Qty</th>
                <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-left">Price</th>
                <th className="py-[1%] w-[15%] text-[.8rem] text-gray-700 text-left">Supplier Name</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((patient) => (
                <tr key={patient?.patient_id} className="bg-white text-gray-600 text-sm font-light border-t-[1px] border-gray-200">
                  <td className="py-[1%] w-[10%] text-left pl-4">
                    <p className="font-[600] text-gray-600 text-[14px]">{patient?.id}</p>
                  </td>
                  <td className="w-[20%] text-left pl-4">
                    <p className="font-[600] text-gray-600 text-[14px]">{patient?.medicine_name}</p>
                  </td>
                  <td className="py-[2%] px-2 w-[15%] text-left">
                    <span className="font-[400]">{patient?.quantity_in_stock}</span>
                  </td>
                  <td className="py-[2%] w-[15%] text-left">
                    <span className="font-[400]">{patient?.price}</span>
                  </td>
                
                  <td className="py-[2%] px-2 w-[15%] text-left">
                    <span className="font-[400]">{patient?.supplier_name}</span>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationComponent
          filteredData={filteredData}
          setPaginatedData={setPaginatedData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MedicalStore;


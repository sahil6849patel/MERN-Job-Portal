import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Button } from "@base-ui/react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies =()=>{
    useGetAllCompanies();
    const [input, SetInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return(
        <div>
            <Navbar/>
            <div className="max-w-6xl mx-auto px-4 my-10">
               <div className="flex items-center justify-between my-5">
                 <input 
                className="w-fit border rounded-md  px-3 py-2"
                placeholder="filter by name"
                onChange={(e)=> SetInput(e.target.value)}
                />
                <Button onClick={()=> navigate("/admin/companies/create")} className="bg-gray-800 text-white px-4 py-2 rounded-md">New Company</Button>
               </div>
               <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies;
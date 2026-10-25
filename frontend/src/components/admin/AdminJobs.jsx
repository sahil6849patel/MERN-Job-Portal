import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Button } from "@base-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, SetInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 my-10">
        <div className="flex items-center justify-between my-5">
          <input
            className="w-fit border rounded-md  px-3 py-2"
            placeholder="filter by name, role"
            onChange={(e) => SetInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;

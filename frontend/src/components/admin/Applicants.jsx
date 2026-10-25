import React, { useEffect } from "react";
import Navbar from "../shared/navbar";
import AplicantsTable from "./AplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";
import store from "@/redux/store";

const Applicants =()=>{
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application)
    useEffect(()=>{
        const fetchAllApplicants = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials:true});
                // dispatch(setApplicants(res.data.applications));
                dispatch(setApplicants(res.data.job.applications));
            }catch(error){
                console.log(error)
            }
        }
        fetchAllApplicants();
    },[]);
    return(
        <div>
            <Navbar/>
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">Applicancts {applicants?.length || 0 }</h1>
                <AplicantsTable/>
            </div>
        </div>
    )
}

export default Applicants;
// import {createSlice} from "@reduxjs/toolkit"; 

// const jobSlice = createSlice({
//     name:"job",
//     initialState:{
//         allJobs:(state,action)=>{
//             state.allJobs = action.payload;
//         }
//     }
// });

// export const {setAllJobs} = jobSlice.actions;
// export default jobSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",

    initialState: {
        allJobs: [],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],  
        searchedQueary:"",
    },

    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state, action)=>{
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs = action.payload;
        },
        setSearchedQueary:(state,action)=>{
            state.searchedQueary = action.payload;
        }
    },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs,  setSearchedQueary } = jobSlice.actions;

export default jobSlice.reducer;
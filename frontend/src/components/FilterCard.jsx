import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQueary } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bengelore", "Hydrabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industory",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const Changehandler = (value) =>{
    setSelectedValue(value);
  }
  useEffect(()=>{
      dispatch(setSearchedQueary(selectedValue));
  },[selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3"/>
      <RadioGroup value={selectedValue} onValueChange={Changehandler}>
        {
            filterData.map((data, index)=>{
                return (
    <div key={index}>
      <h1 className="font-bold text-lg">{data.filterType}</h1>
      {
        data.array.map((item, idx)=>{
          const itemId = `id${index}-${idx}`
            return(
                <div key={itemId} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={`${data.filterType}:${item}`} id={itemId}/>
                    {/* <Label>{item}</Label> */}
                    <Label htmlFor={itemId}>{item}</Label>
                </div>
            )
        })
      }
    </div>
  );
            })
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

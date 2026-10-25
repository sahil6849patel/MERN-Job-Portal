import { setSearchedQueary } from "@/redux/jobSlice";
import { Button } from "@base-ui/react";
import { Search } from "lucide-react";
import react, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQueary] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQueary(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit
          reiciendis optio vitae dicta?
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => setQueary(e.target.value)}
            className="outline-none border-none w-full py-2 border-gray-500"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6a38c2] py-2"
          >
            <Search className="h-7 w-13 " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

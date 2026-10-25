import { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINTS } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const {loading, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const changeFileHandler = (event) => {
    setInput({ ...input, file: event.target.files?.[0] ?? null });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("fullName", input.fullName);
    // formData.append("email", input.email);
    // formData.append("phoneNumber", input.phoneNumber);
    // formData.append("password", input.password);
    // formData.append("role", input.role);
    const formData = {
    fullname: input.fullName,
    email: input.email,
    phoneNumber: input.phoneNumber,
    password: input.password,
    role: input.role
};
    //if (input.file) formData.append("file", input.file);

    try {
     dispatch(setLoading(true));
      // const response = await axios.post(`${USER_API_END_POINTS}/register`, formData, {
      //   // headers: { "Content-Type": "multipart/form-data" },
      //   withCredentials: true,
      // });
      const response = await axios.post(
    `${USER_API_END_POINTS}/register`,
    formData,
    {
        withCredentials: true
    }
);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Signup failed");
    }finally{
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
        if(user){
          navigate("/");
        }
      },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2"><Label>Full Name</Label><Input name="fullName" value={input.fullName} onChange={changeEventHandler} placeholder="Enter name" /></div>
          <div className="my-2"><Label>Email</Label><Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter email" /></div>
          <div className="my-2"><Label>Phone Number</Label><Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Enter phone number" /></div>
          <div className="my-2"><Label>Password</Label><Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter password" /></div>
          <RadioGroup className="flex items-center gap-4 my-5">
            <label className="flex items-center gap-2"><Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} />Student</label>
            <label className="flex items-center gap-2"><Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} />Recruiter</label>
          </RadioGroup>
          <div className="my-2"><Label>Profile</Label><Input accept="image/*" type="file" onChange={changeFileHandler} /></div>
        {/* <Button type="submit" className="w-full my-4">Signup</Button> */}
        {
            loading ? <Button  className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : 
               <Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-400">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
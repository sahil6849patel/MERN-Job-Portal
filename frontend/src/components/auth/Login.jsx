import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { USER_API_END_POINTS } from "@/utils/constant";
import { Label } from "../ui/label";
import axios from "axios";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser  } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {

    const [input, setInput] = useState({
        email:"",
        password:"",
        role:""
    }) 
    const {loading, user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    const submitHandler = async (e)=>{
        e.preventDefault();
            // if(input.file){
            //     FormData.append("file", input.file);
            // }
        try{
          dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINTS}/login`, input, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            });
            if(res.data.success){
              dispatch(setUser(res.data.user));
              navigate("/");
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
          dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
      if(user){
        navigate("/");
      }
    },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Enter email"
             autoComplete="email" />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="Enter Password"
            autoComplete="current-password" />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : 
               <Button type="submit" className="w-full my-4">Login</Button>
          }
          <span className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-400">Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;

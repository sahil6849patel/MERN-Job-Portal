import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log("Received Data:", req.body);
console.log("Role:", role);
console.log("Fullname:", fullname);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file
    let cloudResponse;

if (file) {
  const fileUri = getDataUri(file);

  const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
    resource_type: "auto",
  });
}
    // const file = file.file;
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPasword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPasword,
      role,
      profile:{
        profilePhoto:cloudResponse?.secure_url || "",
      }
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    //Check role
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exists with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Wellcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req,res)=>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        })
    }catch(error){
        console.log(error);
    }
}

export const updateProfile = async (req,res) =>{
    try{
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        // const file = req.file;
        // console.log("RESUME FILE:", file);
        // let cloudResponse;
        const file = req.files?.file?.[0];
const photo = req.files?.profilePhoto?.[0];

let cloudResponse;
let photoResponse;

        //Coloudinary file setup
        if (file) {
    const fileUri = getDataUri(file);

    cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
    });
    console.log("CLOUDINARY RESPONSE:", cloudResponse);
}

if (photo) {
    const photoUri = getDataUri(photo);

    photoResponse = await cloudinary.uploader.upload(
        photoUri.content,
        { resource_type: "image" }
    );
}

    const userId = req.id;
    let user = await User.findById(userId);

    if(!user){
        return res.status(400).json({
            message:"User not found.",
            success:false
        })
    }
    //UpdatingData
    if(fullname)user.fullname = fullname
    if(email)user.email = email
    if(phoneNumber)user.phoneNumber = phoneNumber
    if(bio)user.profile.bio = bio
    if(skills)user.profile.skills = skills;


       
     

       //resume comes latters here
       if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url//Save the cloudinary url 
        user.profile.resumeOriginalName = file.originalname //Save the original name
        }

        if (photoResponse) {
    user.profile.profilePhoto = photoResponse.secure_url;
}


       await user.save();
       user = {
        _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
       }

       return res.status(200).json({
        message:"Profile updates successfilly.",
        user,
        success:true
       })
    }catch(error){
        console.log(error);
    }
}
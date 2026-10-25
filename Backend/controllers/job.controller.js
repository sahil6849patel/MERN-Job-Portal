import { Job } from "../models/job.model.js";
//Admin Jb post
export const postJob = async (req,res)=>{
    try{
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "Something is missing",
                success:false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"New job created successfully.",
            job,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

//User
export const getAllJobs = async (req,res)=>{
     console.log("getAllJobs API called");
    try{
        const keyword = req.query.keyword || "";
        const queary = {
            $or:[
                {title:{$regex:keyword, $options: "i"}},
                {description:{$regex:keyword, $options: "i"}},
            ]
        };
        // const jobs = await Job.find().populate({
        //     path:"company"
        // }).sort({createdAt: -1});
        // console.log("Total jobs from database:", jobs.length);
        const jobs = await Job.find(queary)
    .populate("company")
    .sort({ createdAt: -1 });

console.log("Total jobs:", jobs.length);
        if(jobs.length === 0){
            return res.status(404).json({
                message: "Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch(error){
        console.log(error); 
    }
}


//user
export const getJobById = async (req, res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message:"Jobs not found",
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        })
    }catch(error){
        console.log(error);
    }
}

//Admin job create
export const  getAdminJobs = async (req, res)=>{
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company'
        })
        .sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch(error){
        console.log(error);
    }
} 
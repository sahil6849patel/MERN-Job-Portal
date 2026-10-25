import React, { useState, useEffect } from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { ChartNoAxesColumnIncreasing, Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable =()=>{
    const { companies = [], searchCompanyByText = "" } = useSelector((store) => store.company);
    const [filtercompany, setFilterCompany] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);
    return(
        <div>
            <Table>
                <TableCaption>A List of your recent registered Companies</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!companies || companies.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4}>You haven't registered any companies yet.</TableCell>
                        </TableRow>
                    ) : (
                        filtercompany.map((company) => (
                            <TableRow key={company?._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={company?.logo}
                                            alt={company?.name}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company?.name}</TableCell>
                                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

        </div>
    )
}

export default CompaniesTable;






{/* <TableCell>
                        <Avatar>
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkwQODCMslc6kQ662ffuc3_O9ZhfOGKNB6FXL5C_Vpw&s=10" alt="logo"/>
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>9-10-2026</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className="flex items-center gap-2 w-fit cursor-pointer">
                                    <Edit2 className="w-4"/>
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell> */}

import React from "react";
import Navbar from "./shared/navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQueary } = useSelector((store) => store.jobs);

  const filterJobs = allJobs.filter((job) => {
    if (!searchedQueary) return true;

    const [filterType, filterValue] = searchedQueary.includes(":")
      ? searchedQueary.split(/:(.*)/s, 2)
      : ["", searchedQueary];
    const normalize = (value) =>
      String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const query = normalize(filterValue);

    if (!filterType) {
      return [job.title, job.description, job.location].some((value) =>
        normalize(value).includes(query),
      );
    }

    if (filterType === "Location") {
      const locationAliases = {
        bengelore: ["bengaluru", "bangalore"],
        hydrabad: ["hyderabad"],
      };
      const locationQueries = [
        query,
        ...(locationAliases[query] ?? []).map(normalize),
      ];

      return locationQueries.some((location) =>
        normalize(job.location).includes(location),
      );
    }

    if (filterType === "Industory") {
      return [job.industry, job.category, job.title].some((value) =>
        normalize(value).includes(query),
      );
    }

    if (filterType === "Salary") {
      const salaryInLakh = Number.parseFloat(job.salary);
      if (!Number.isFinite(salaryInLakh)) return false;

      if (query === "040k") return salaryInLakh <= 0.4;
      if (query === "421lakh") {
        return salaryInLakh >= 0.42 && salaryInLakh <= 1;
      }
      if (query === "1lakhto5lakh") {
        return salaryInLakh >= 1 && salaryInLakh <= 5;
      }
    }

    return false;
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            {/* Filter Page */}
            <FilterCard />
          </div>
          {/* Job Card */}
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

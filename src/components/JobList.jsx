import React from "react";
import JobCard from "./JobCard";

function JobList({ jobs, onDelete, onEdit }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        No jobs found. Try adding some!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default JobList;

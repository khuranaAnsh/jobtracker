import React, { useState, useEffect } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import FilterBar from "../components/FilterBar";
import Stats from "../components/Stats";

// Main dashboard which will be visible on home page
function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAddJob = (job) => {
    let updatedJobs;
    if (editingJob) {
      updatedJobs = jobs.map((j) =>
        j.id === editingJob.id ? { ...j, ...job } : j
      );
      setEditingJob(null);
    } else {
      updatedJobs = [{ ...job, id: Date.now() }, ...jobs];
    }
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const stored = localStorage.getItem("jobs");
    if (stored) setJobs(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-7xl p-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Job Tracker Dashboard
        </h2>

        <div className="space-y-8">
          <JobForm onAddJob={handleAddJob} editingJob={editingJob} />
          <FilterBar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <JobList
            jobs={filteredJobs}
            onDelete={handleDeleteJob}
            onEdit={handleEditJob}
          />
          <Stats jobs={filteredJobs} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

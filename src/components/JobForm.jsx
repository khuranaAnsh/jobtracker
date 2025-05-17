import React, { useState, useEffect } from "react";

// Job form for adding company, role, date and status

function JobForm({ onAddJob, editingJob }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    date: "",
    status: "Applied",
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        role: editingJob.role,
        date: editingJob.date,
        status: editingJob.status,
      });
    } else {
      setFormData({
        company: "",
        role: "",
        date: "",
        status: "Applied",
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role || !formData.date)
      return alert("All fields are required");

    onAddJob(formData); // No need to add id here, it will be handled in Dashboard
    setFormData({ company: "", role: "", date: "", status: "Applied" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={formData.company}
        onChange={handleChange}
        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="role"
        placeholder="Job Role"
        value={formData.role}
        onChange={handleChange}
        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option>Applied</option>
        <option>Interviewed</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {editingJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}

export default JobForm;

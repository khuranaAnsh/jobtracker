import React from "react";

function JobCard({ job, onDelete, onEdit }) {
  const { id, company, role, date, status } = job;

  return (
    <div className="border border-gray-300 rounded-lg p-5 mb-4 bg-white hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800">{company}</h3>
      <p className="text-gray-600 mt-1">
        <span className="font-medium">Role:</span> {role}
      </p>
      <p className="text-gray-600 mt-1">
        <span className="font-medium">Date Applied:</span> {date}
      </p>
      <p className="text-gray-600 mt-1 mb-4">
        <span className="font-medium">Status:</span> {status}
      </p>

      <div className="flex space-x-3">
        <button
          onClick={() => onEdit(job)}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;

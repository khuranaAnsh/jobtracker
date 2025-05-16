// src/components/FilterBar.jsx
import React from "react";

function FilterBar({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search by company or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-60 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-48 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
    </div>
  );
}

export default FilterBar;

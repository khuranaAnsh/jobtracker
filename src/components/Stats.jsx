import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Stats({ jobs }) {
  const countByStatus = ["Applied", "Interview", "Rejected", "Offer"].map(
    (status) => ({
      status,
      count: jobs.filter((job) => job.status === status).length,
    })
  );

  return (
    <div className="mt-8 p-6 bg-white shadow-lg rounded-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Job Application Stats
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={countByStatus}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;

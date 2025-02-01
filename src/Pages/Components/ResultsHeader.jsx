import React, { useState } from "react";
import { List, Grid } from "lucide-react";

const ResultsHeader = ({ totalResults, sortBy, setSortBy, viewMode, setViewMode }) => {
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white shadow-md rounded-lg">
      <div className="text-lg font-semibold text-[#314352]">
        {totalResults} Results <span className="text-[#FF9540]">Classified Ads</span>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-gray-600">Sort by:</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-gray-700"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="relevant">Most Relevant</option>
          <option value="latest">Latest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>

        <button
          className={`p-2 rounded-md ${viewMode === "grid" ? "bg-[#FF9540]" : "bg-gray-200"}`}
          onClick={() => setViewMode("grid")}
        >
          <Grid size={20} color={viewMode === "grid" ? "#fff" : "#314352"} />
        </button>

        <button
          className={`p-2 rounded-md ${viewMode === "list" ? "bg-[#FF9540]" : "bg-gray-200"}`}
          onClick={() => setViewMode("list")}
        >
          <List size={20} color={viewMode === "list" ? "#fff" : "#314352"} />
        </button>
      </div>
    </div>
  );
};

export default ResultsHeader;

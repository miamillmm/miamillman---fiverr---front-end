import React, { useState } from "react";
import ResultsHeader from "./ResultsHeader";

const ClassifiedAdsPage = () => {
  const [sortBy, setSortBy] = useState("relevant");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div>
      <ResultsHeader totalResults={16} sortBy={sortBy} setSortBy={setSortBy} viewMode={viewMode} setViewMode={setViewMode} />
      {/* Your classified ads grid or list goes here */}
    </div>
  );
};

export default ClassifiedAdsPage;

import React, { useState } from "react";
import SolvedNonRegShopReport from "./SolvedNonRegShopReport";
import UnsolvedNonRegShopReport from "./UnsolvedNonRegShopReport";
import "../style/ReportPage.css"; // Import CSS file for styling

const NonRegReportPage = () => {
  const [showNonRegReport, setShowNonRegReport] = useState(false);

  const handleSolvedNonRegReportClick = () => {
    setShowNonRegReport(true);
  };

  const handleUnsolvedNonRegReportClick = () => {
    setShowNonRegReport(false);
  };

  return (
    <div className="report-page-container">
      <h1 className="report-page-heading">Non Registered Shop Reports</h1>
      <div className="report-buttons-container">
        <button className={`report-button ${showNonRegReport ? 'active' : ''}`} onClick={handleSolvedNonRegReportClick}>Solved Report</button>
        <button className={`report-button ${!showNonRegReport ? 'active' : ''}`} onClick={handleUnsolvedNonRegReportClick}>Unsolved Report</button>
      </div>
      <div className="report-content">
        {showNonRegReport ? <
          SolvedNonRegShopReport /> : <UnsolvedNonRegShopReport />}
      </div>
    </div>
  );
};

export default NonRegReportPage;

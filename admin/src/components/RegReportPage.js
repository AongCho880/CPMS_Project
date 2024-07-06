import React, { useState } from "react";
import SolvedRegShopReport from "./SolvedRegShopReport";
import UnsolvedRegShopReport from "./UnsolvedRegShopReport";
import "../style/ReportPage.css"; // Import CSS file for styling

const RegReportPage = () => {
  const [showRegReport, setShowRegReport] = useState(false);

  const handleSolvedRegReportClick = () => {
    setShowRegReport(true);
  };

  const handleUnsolvedRegReportClick = () => {
    setShowRegReport(false);
  };

  return (
    <div className="report-page-container">
      <h1 className="report-page-heading">Registered Shop Reports</h1>
      <div className="report-buttons-container">
        <button
          className={`report-button ${showRegReport ? "active" : ""}`}
          onClick={handleSolvedRegReportClick}
        >
          Solved Report
        </button>
        <button
          className={`report-button ${!showRegReport ? "active" : ""}`}
          onClick={handleUnsolvedRegReportClick}
        >
          Unsolved Report
        </button>
      </div>
      <div className="report-content">
        {showRegReport ? <SolvedRegShopReport /> : <UnsolvedRegShopReport />}
      </div>
    </div>
  );
};

export default RegReportPage;

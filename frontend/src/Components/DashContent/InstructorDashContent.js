import React from "react";
function InsDashContent() {
  return (
    <div className="boxes">
      <div className="box box-1">
        <i className="uil uil-graduation-cap"></i>
        <span className="text">Total Students</span>
        <span className="number">23</span>
      </div>

      <div className="box box2">
        <i className="uil uil-presentation"></i>
        <span className="text">Total Classes Assigned</span>
        <span className="number">100</span>
      </div>

      <div className="box box3">
        <i className="uil uil-suitcase"></i>
        <span className="text">Total Employees</span>
        <span className="number">35</span>
      </div>
    </div>
  );
}

export default InsDashContent;

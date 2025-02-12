import React from "react";
import "./EmptyPage.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"; 

export default function EmptyPage(props) {
  const { pageName, children } = props;

  return (
    <div className="empty-page">
      <SentimentVeryDissatisfiedIcon className="sad-icon" /> 
      <div className="empty-message">No {pageName}s Registered</div>
      {children}
    </div>
  );
}

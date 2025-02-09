import React from 'react';
import './EmptyPage.css';
import { Icon } from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';

export default function EmptyPage(props) {
  const pageName = props.pageName;

  return (
    <div className="empty-page">
      <Icon component={SentimentVeryDissatisfied} className="sad-icon" />
      <div className="empty-message">No {pageName}s Registered</div>
      {props.children}
    </div>
  );
}
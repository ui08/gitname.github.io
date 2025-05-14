// Import necessary libraries
import React from 'react';
import './SystematicTransactions.scss';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SystematicTransactions = ({ data }) => {
  return (
    <div className="systematic-transactions">
      <div className="header">
      </div>
      <div className="transaction-item">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faSyncAlt} className="transaction-icon" />
        </div>
        <div className="transaction-details">
          <h3 className="title">{data.activeSIPs} SIP's Active</h3>
          <p className="subtitle">{data.primaryFund} &amp; {data.additionalFunds} more</p>
        </div>
        <div className="amount">
          <span>Rs {data.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SystematicTransactions;

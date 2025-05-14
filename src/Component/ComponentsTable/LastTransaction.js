// Import necessary libraries
import React from 'react';
import './LastTransaction.scss'; // Add styles here
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const transactions = [
  {
    amount: "123,000",
    type: "Purchase",
    date: "3Aug 2018",
    fund: "Axis Equity Savor Fund"
  },
  {
    amount: "142,323",
    type: "Redemption",
    date: "3Aug 2018",
    fund: "Kotak Bond Short Term - Growth"
  },
  {
    amount: "250,000",
    type: "Purchase",
    date: "3Aug 2018",
    fund: "SBI Arbitrage Opportunities Fund - Growth"
  }
];

const LastTransaction = () => {
  return (
    <div className="last-transaction">
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            <div className="step-line">
              <span className="rupee-icon">
                <FontAwesomeIcon icon={faIndianRupeeSign} />
              </span>
              {index < transactions.length - 1 && <div className="line"></div>}
            </div>
            <div className="transaction-details-container">
              <div className="transaction-details">
                <span className="amount">₹ {transaction.amount}</span>
                <span className="type">- {transaction.type}</span>
                <span className="date"> - {transaction.date}</span>
              </div>
              <div className="fund">{transaction.fund}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastTransaction;

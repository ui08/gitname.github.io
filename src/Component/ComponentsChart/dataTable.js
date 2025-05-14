// DataTable.js
import React from 'react';
import './DataTable.scss';

const DataTable = ({ title = "Share Holder Details", columns, data }) => {
  return (
    <div className="table-container">
      <h4 className="table-title"><strong>{title}</strong></h4>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="table-header">
                <span className="header-text">{col}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="table-cell">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

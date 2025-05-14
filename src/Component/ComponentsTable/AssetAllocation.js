import React from "react";
import './AssetAllocation.scss';

export const AssetAllocation = ({ data }) => {
  return (
    <div className="asset-allocation-container">
      <table className="asset-allocation-table">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="asset-allocation-row">
              <td className="asset-allocation-label">{item.type}</td>
              <td className="asset-allocation-value">
                {item.value.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

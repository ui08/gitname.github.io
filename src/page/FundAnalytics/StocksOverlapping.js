import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./StocksOverlapping.scss";

function StocksOverlapping() {
  return (
    <div className="StocksOverlappingDiv">
      <table className="StocksOverlappingtable">
        <thead style={{ borderBottom: "1px solid grey" }}>
          <tr>
            <th>Reliance Equity Savings G</th>
            <th>Portfolio Overlap</th>
            <th>ICICI Pru Equity Savings G</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FontAwesomeIcon icon={faSquareFull} className="pinkbar" />
              ACC Ltd
            </td>
            <td>
              <div className="custom-progresss-container">
                <ProgressBar
                  className="pinkbar-progresss"
                  now={60}
                  variant="pinkbar-progresss"
                />
                <ProgressBar
                  className="bluebar-progresss"
                  now={40}
                  variant="bluebar-progresss"
                />
              </div>
            </td>
            <td>
              <FontAwesomeIcon icon={faSquareFull} className="bluebar" />
              ACC Ltd
            </td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon icon={faSquareFull} className="pinkbar" />
              Ambuja Cement Ltd
            </td>
            <td>
              <div className="custom-progresss-container">
                <ProgressBar
                  className="pinkbar-progresss"
                  now={40}
                  variant="pinkbar-progresss"
                />
                <ProgressBar
                  className="bluebar-progresss"
                  now={10}
                  variant="bluebar-progresss"
                />
              </div>
            </td>
            <td>
              <FontAwesomeIcon icon={faSquareFull} className="bluebar" />
              Ambuja Cement Ltd
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StocksOverlapping;

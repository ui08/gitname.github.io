import React, { useState } from "react";
import "../FundAnalytics/SecurityHolding.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";

function SecurityHolding() {
  // Dynamic data for the top section
  const topSectionData = [
    { value: "529", description: "Reliance Equity Savings G", stock: " "},
    { value: "70.05%", description: "Reliance Equity Savings G", stock:" "},
    { value: "20,389,780,000", description: "Reliance Equity Savings G", stock:"Sundaram Ultra Short Term - Reg- Growth" },
  ];

  // Dynamic table data
  const [tableData, setTableData] = useState([
    {
      schemeName: "ICICI Prudential Technology",
      currentValue: "17.89L",
      fundPercentage: "35.15%",
      amountInvested: "1,614,360,000",
    },
    {
      schemeName: "ICICI Prudential Technology",
      currentValue: "17.89L",
      fundPercentage: "35.15%",
      amountInvested: "1,614,360,000",
    },
    {
      schemeName: "ICICI Prudential Technology",
      currentValue: "17.89L",
      fundPercentage: "35.15%",
      amountInvested: "1,614,360,000",
    },
    {
      schemeName: "ICICI Prudential Technology",
      currentValue: "17.89L",
      fundPercentage: "35.15%",
      amountInvested: "1,614,360,000",
    },
    {
      schemeName: "ICICI Prudential Technology",
      currentValue: "17.89L",
      fundPercentage: "35.15%",
      amountInvested: "1,614,360,000",
    },
  ]);

  return (
    <div className="container-fluid">
      {/* Top Section */}
      <div className="row text-center headerDiv py-3">
        {topSectionData.map((item, index) => (
          <div
            className={`col-12 col-md-4 d-flex flex-column justify-content-center position-relative`}
            key={index}
          >
            {/* Card Content */}
            <small>{item?.stock}</small>
            <h4>{item?.value}</h4>
            <small>{item?.description}</small>

            {/* Vertical Separator */}
            {index < topSectionData.length - 1 && (
              <div className="separatingLine position-absolute"></div>
            )}
          </div>
        ))}
      </div>

      {/* Header Section */}
      <div className="row py-2 p-2 mt-3">
        <div className="col-12 d-flex justify-content-between">
          <h6><strong>Schemes Holding the Security</strong></h6>
          <div>
            <small className="mx-2 smallClass">
              Compare <FontAwesomeIcon icon={faAngleDown} />
            </small>
            <small className="mx-2 smallClass">
              Overlap <FontAwesomeIcon icon={faAngleDown} />
            </small>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="row">
        <div className="col-12 tableDiv">
          <div className="table-responsive p-3">
            <table className="table table-bordered align-middle text-center">
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <h6 className="mb-1">{row.schemeName}</h6>
                    </td>
                    <td>
                      <p className="mb-0 text-muted">Current Value</p>
                      <p>{row.currentValue}</p>
                    </td>
                    <td>
                      <p className="mb-0">In this Fund</p>
                      <h6>{row.fundPercentage}</h6>
                    </td>
                    <td>
                      <p className="mb-0">Amount Invested</p>
                      <h6>{row.amountInvested}</h6>
                    </td>
                    <td>
                    {/* <div className=" d-flex justify-content-space-around">
                      <ButtonComp
                        wrapperName="btn_wrapper"
                        type="button"
                        btnStyle="box"
                        btnText={"SIP"}
                        onClick={() => alert("SIP Clicked!")}
                      />
                      <ButtonComp
                        wrapperName="btn_wrapper"
                        type="button"
                        btnStyle="box"
                        btnText={"BUY"}
                        onClick={() => alert("BUY Clicked!")}
                      />
                       </div> */}
                      <button className="button-class-div me-2 disabled">SIP</button>
                      <button className="button-class-div ">Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityHolding;

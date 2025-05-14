import React, { useContext, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useTranslation } from "react-i18next";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import ButtonComp from "../ButtonComp/ButtonComp";
import AgTable from "../ComponentsTable/AgTable";
import "./AccordionComponent.scss";

export default function AccordionComponent({ pageSt, Accordiondata }) {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [rowData, setRowData] = useState([]);

  function CustomToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      // <button
      //   type="button"
      //   style={{ backgroundColor: "pink" }}
      //   onClick={decoratedOnClick}
      // >
      //   {children}
      // </button>
      <ButtonComp
        key={"Accordion Collapse"}
        wrapperName={"btn_wrapper "}
        type="button"
        btnStyle="round"
        btnText={isCurrentEventKey ? "Accordion Open" : "Accordion Close"}
        onClick={decoratedOnClick}
      />
    );
  }

  const handleAccordionOpen = async (productName) => {
    console.log("productName", productName);
    setRowData([]);
    // let holding_name;
    // let name = decodeURIComponent(productName);
    // if (name == "Bonds / Debentures") {
    //   holding_name = "Bonds_Debentures";
    // } else {
    //   holding_name = name;
    // }
    // console.log("productName", name);

    try {
      const response = await axiosInstance.get(
        Apiurl.individualHolding + productName
      );
      setRowData(response?.data);
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      // setLoading(false);
    }
  };

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },

    {
      headerName: "Instrument Name",
      field: "instrumentName",
      sortable: true,
      minWidth: 150,
      filter: true,
    },

    {
      headerName: "Current Value",
      field: "currentValue",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.currentValue ? params.data?.currentValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Invested Value",
      field: "investedValue",
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.investedValue ? params.data?.investedValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      minWidth: 150,
      filter: true,
    },
    {
      headerName: "Annualised Returns",
      field: "xirr",
      minWidth: 180,
      cellRenderer: (params) => {
        return params.data?.xirr ? Math.abs(params.data?.xirr) + "%" : "-";
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Unrealized Gain/Loss",
      field: "unrealizedGainLoss",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data?.unrealizedGainLoss == null
          ? "0.00 Cr"
          : params.data?.unrealizedGainLoss;
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Realized Gain/Loss",
      field: "realizedGainLoss",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data?.realizedGainLoss == null
          ? "0.00 Cr"
          : params.data?.realizedGainLoss;
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "STCG",
      field: "stcg",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.stcg ? params.data?.stcg : "-");
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "LTCG",
      field: "ltcg",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.ltcg ? params.data?.ltcg : "-");
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Weight",
      field: "weight",
      cellRenderer: (params) => {
        return params?.data?.weight + "%";
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 120,
      sortable: true,
      filter: true,
    },
  ];
  return (
    <Accordion>
      {Accordiondata.map((item, index) => {
        return (
          <div key={index} className={!pageSt ? "card" : pageSt}>
            <div
              className={!pageSt ? "card-header" : "Dashbord_Accordion_Header"}
            >
              <div
                style={{
                  width: "100px",
                }}
              >
                <p>{item?.productName === "" ? "-" : item?.productName}</p>
              </div>
              <div>
                <p>Current Value</p>
                <p>{item?.currentValue}</p>
              </div>
              <div>
                <p>Invested Value</p>
                <p>{item?.investedValue === "" ? "-" : item?.investedValue}</p>
              </div>
              <div>
                <p>Annualised Returns (%)</p>
                <p>{item?.xirr === "" ? "-" : item?.xirr}</p>
              </div>
              <div>
                <p>Unrealized Gain/Loss</p>
                <p>
                  {item?.unrealizedGainLoss === ""
                    ? "-"
                    : item?.unrealizedGainLoss}
                </p>
              </div>
              <div>
                <p>Realized Gain/Loss</p>
                <p>
                  {item?.realizedGainLoss === "" ? "-" : item?.realizedGainLoss}
                </p>
              </div>
              <div>
                <p>STCG</p>
                <p>{item?.stcg === "" ? "-" : item?.stcg}</p>
              </div>
              <div>
                <p>LTCG</p>
                <p>{item?.ltcg === "" ? "-" : item?.ltcg}</p>
              </div>
              <div>
                <p>Weight (%)</p>
                <p>{item?.weight === "" ? "-" : item?.weight} </p>
              </div>
              <div>
                <CustomToggle eventKey={index}>dd</CustomToggle>
              </div>
            </div>
            <Accordion.Collapse
              eventKey={index}
              onEnter={() => {
                handleAccordionOpen(item?.productId);
                setRowData([]);
              }}
            >
              <div
                className={!pageSt ? "card-body" : "Dashbord_Accordion_body"}
              >
                {/* Hello! I am the body {item?.productName} */}
                <AgTable
                  columnDefs={columnDefs}
                  rowData={rowData}
                  filenames="Instrument List"
                  StyleClass="btn btn-primary"
                  type="table"
                  gridOptions={{
                    getRowStyle,
                  }}
                />
              </div>
            </Accordion.Collapse>
          </div>
        );
      })}
    </Accordion>
  );
}

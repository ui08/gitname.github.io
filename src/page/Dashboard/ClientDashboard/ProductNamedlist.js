import React, { useState } from "react";

import { useEffect } from "react";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import AgTable from "./../../../Component/ComponentsTable/AgTable";
import Chartloader from "./../../../Component/NewChartComponent/Chartloader";
import ErrorLoader from "./../../../Component/NewChartComponent/ErrorLoader";
import NoresultLoader from "./../../../Component/NewChartComponent/NoresultLoader";

export default function ProductNamedlist({ Accordiondata }) {
  const [rowData, setRowData] = useState([]);

  const [ProductLoader, setProductLoader] = useState("call");
  useEffect(() => {
    handleAccordionOpen();
  }, []);

  const handleAccordionOpen = async () => {
    setRowData([]);
    setProductLoader("call");
    // let holding_name;
    // let name = decodeURIComponent(productName);
    // if (name == "Bonds / Debentures") {
    //   holding_name = "Bonds_Debentures";
    // } else {
    //   holding_name = name;
    // }
    // console.log("productName", name);
    console.log(Accordiondata);
    try {
      const response = await axiosInstance.get(
        Apiurl.individualHolding + Accordiondata
      );
      setProductLoader(result ? "result" : "noresult");
      setRowData(response?.data);
    } catch (error) {
      setProductLoader("error");
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

  const ProductNamedcolumnDefs = [
    {
      headerName: "Sr.no",
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

  const getLastTransaction = () => {
    // console.log("selectedOption", selectedOption);
    if (ProductLoader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (ProductLoader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (ProductLoader === "result") {
      return (
        <div className="LastTransaction">
          <AgTable
            columnDefs={ProductNamedcolumnDefs}
            rowData={rowData}
            filenames="Instrument List"
            StyleClass="btn btn-primary"
            type="table"
            gridOptions={{
              getRowStyle,
            }}
          />
        </div>
      );
    } else if (ProductLoader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };
  return <>{getLastTransaction()}</>;
}

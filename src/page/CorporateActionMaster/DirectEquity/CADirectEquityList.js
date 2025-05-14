import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../../util/apiurl";
import { getMomentFromDate } from "../../../util/Authenticate";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import { formattedAmount } from "./../../../util/CurrencyFormattar/formattedAmount";

export default function CADirectEquityList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);

  // custom pageable

  const { t } = useTranslation(["Common", "Messages", "Form"]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.CADirectEquityList);
      setRowData(response?.data);
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
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
      headerName: "Fin Code",
      field: "corpeventsDataId.fincode",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Company Name",
      field: "securityName",
      minWidth: 250,
      maxWidth: 250,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (
          params?.data?.securityName === "" ||
          params?.data?.securityName == null
        ) {
          return "-";
        } else {
          return params.data.securityName;
        }
      },
    },
    {
      headerName: "S Date",
      field: "corpeventsDataId.sdate",
      cellRenderer: (params) => {
        return getMomentFromDate(params.data.corpeventsDataId.sdate, "Date");
      },
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Corporate Action",
      field: "corpoAction",
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Record Date",
      field: "recordDate",
      minWidth: 150,
      maxWidth: 150,
      cellRenderer: (params) => {
        if (params.data.recordDate === "") {
          return "-";
        } else {
          return getMomentFromDate(params.data?.recordDate, "Date");
        }
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Details",
      field: "details",
      minWidth: 210,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (params.data.details === "") {
          return "-";
        } else {
          return params.data.details;
        }
      },
    },
    {
      headerName: "Offer Price",
      field: "offerPrice",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      cellRenderer: (params) => {
        if (params.data.offerPrice === "" || params.data.offerPrice === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.offerPrice);
        }
      },
    },
    {
      headerName: "Ratio 1",
      field: "ratio1",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (params.data.ratio1 === "" || params.data.ratio1 === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.ratio1);
        }
      },
    },
    {
      headerName: "Ratio 2",
      field: "ratio2",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (params.data.ratio2 === "" || params.data.ratio2 === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.ratio2);
        }
      },
    },
    {
      headerName: "Aggregate Amount",
      field: "aggregateAmnt",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      cellRenderer: (params) => {
        if (
          params.data.aggregateAmnt === "" ||
          params.data.aggregateAmnt === null
        ) {
          return "-";
        } else {
          return formattedAmount(params.data?.aggregateAmnt);
        }
      },
    },
    {
      headerName: "Amount",
      field: "amount",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      cellRenderer: (params) => {
        if (params.data.amount === "" || params.data.amount === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.amount);
        }
      },
    },
    {
      headerName: "Dividend Type",
      field: "dividendType",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (
          params.data.dividendType === "" ||
          params.data.dividendType === null
        ) {
          return "-";
        } else {
          return params.data.dividendType;
        }
      },
    },
    {
      headerName: "Face Value",
      field: "faceValue",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (params.data.faceValue === "" || params.data.faceValue === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.faceValue);
        }
      },
    },
    {
      headerName: "Face Value Two",
      field: "faceValueTwo",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (
          params.data.faceValueTwo === "" ||
          params.data.faceValueTwo === null
        ) {
          return "-";
        } else {
          return formattedAmount(params.data?.faceValueTwo);
        }
      },
    },
    {
      headerName: "From Shares",
      field: "fromShares",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (params.data.fromShares === "" || params.data.fromShares === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.fromShares);
        }
      },
    },
    {
      headerName: "To Shares",
      field: "toShares",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (params.data.toShares === "" || params.data.toShares === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.toShares);
        }
      },
    },
    {
      headerName: "Number Of Shares",
      field: "noOfShares",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if (params.data.noOfShares === "" || params.data.noOfShares === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.noOfShares);
        }
      },
    },
    // {
    //   headerName: "Offered Unit",
    //   field: "offeredUnit",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Held Unit",
    //   field: "heldUnit",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "New Code",
    //   field: "newCode",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Old Code",
    //   field: "oldCode",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Instrument Bos Code",
    //   field: "instrumentBosCode",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Exchange Code Type",
    //   field: "exchangeCodeType",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Event Id",
    //   field: "eventId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Event Priority",
    //   field: "eventPriority",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Event Operation",
    //   field: "eventOperation",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Cost Of Acquisition",
    //   field: "costOfAcquisition",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Status",
    //   field: "status",
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Remark",
    //   field: "remark",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Corporate Action Source",
    //   field: "corporateActionSource",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Settings",
    //   field: "settings",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "is Active",
    //   field: "isActive",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Created By",
    //   field: "createdBy",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Modified By",
    //   field: "modifiedBy",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Last Modified Date",
    //   field: "lastModifiedDate",
    //   cellRenderer: (params) => {
    //     return getMomentFromDate(params.data.lastModifiedDate, "Date");
    //   },
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
    // },
  ];

  const breadcrumbItems = [
    {
      label: "Direct Equity - Corporate Actions Master",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  const handleTableFunction = (params, action) => {
    if (action === "handleEdit") {
      handleEdit(params.data);
    } else if (action === "handleView") {
      handleView(params.data);
    } else if (action === "handleDelete") {
      setModalData([]);
      setModalData(params.data);
      setDeleteModalOpen(true);
    }
  };
  const handleEdit = (data) => {
    navigate(
      "/" +
        encrypt("CreateInstrumentFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("CreateInstrumentFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };

  const handleDelete = () => {
    deleteUnit(modalData.id);
    setDeleteModalOpen(false);
  };

  // Delete unit/course
  const deleteUnit = async (unitId) => {
    try {
      const response = await axiosInstance.delete(
        Apiurl.deleteUnit + "/" + unitId
      );
      const result = await response.data;
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00272")}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              filenames="Corporate Action - Direct Equity"
              StyleClass="btn btn-primary"
              type="table"
              gridOptions={{
                getRowStyle,
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
function ActionButtonsFunction(params, keycloak, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      // buttonConfigs={[
      //   {
      //     text: "View",
      //     icon: faEye,
      //     action: "handleView",
      //     show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
      //   },
      //   {
      //     text: "Edit",
      //     icon: faPen,
      //     action: "handleEdit",
      //     show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
      //     disabled: currentDisabled(params.data, [
      //       "Pending_For_Approval",
      //       "Approved",
      //     ]),
      //   },
      //   {
      //     text: "Delete",
      //     icon: faTrashCan,
      //     action: "handleDelete",
      //     disabled: currentDisabled(params.data, "Delete"),
      //     disabled: currentDisabled(params.data, [
      //       "Pending_For_Approval",
      //       "Approved",
      //     ]),
      //   },
      // ]}
      handleFunction={handleTableFunction}
    />
  );
}

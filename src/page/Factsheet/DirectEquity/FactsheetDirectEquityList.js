import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import Pagehader from "../../../Layout/Pagehader";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { FactsheetMasterPageurl } from "../FactsheetMasterPageurl";

export default function FactsheetDirectEquityList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { t } = useTranslation(["Common", "Messages", "Form"]);

  useEffect(() => {
    fetchData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const fetchData = async () => {};

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
      headerName: "ISIN",
      field: "",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "StockName",
      field: "",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Nse Code",
      field: "",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Bse Code",
      field: "",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Sector ID",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Accord Updation Flag",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "TAX Asset Class",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Entity Asset Class",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ISIN",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "NSE Symbol",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "BSE Code",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Instrument Category",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Listing Status",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Instrument Risk",
      field: "",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Benchmark Indices",
      field: "status",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      minWidth: 250,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, keycloak, handleTableFunction),
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
            breadcrumbItems={ FactsheetMasterPageurl.Directlist}
           
          ></Pagehader>
          <div className="pagebody">
            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              filenames="Credit_Rating"
              StyleClass="btn btn-primary"
              type="table"
              gridOptions={{
                getRowStyle,
              }}
              showDatePicker={false}
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

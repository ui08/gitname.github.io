import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import DatefilterParams from "../../../Component/ComponentsTable/agFiler";
import AppModal from "../../../Component/Modal/AppModal";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";

export default function IncentiveRateUploadHistory() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

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
      headerName: t("Common:App_lms_Common_00071"),
      field: "name",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00046"),
      field: "description",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00060"),
      field: "createdBy",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00061"),
      field: "approvedOrRejectedByUser",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00062"),
      field: "approvalDateTime",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00077"),
      field: "lastModifiedDate",
      sortable: true,
      minWidth: 215,
      filterParams: DatefilterParams,

      cellRenderer: (params) => {
        return moment(params.data.lastModifiedDate).format("DD-MM-YYYY");
      },
    },
    {
      headerName: t("Common:App_lms_Common_00021"),
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

  const breadcrumbItems = [
    {
      label: "History",
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
          <AgTable
            columnDefs={columnDefs}
            rowData={rowData}
            filenames="Credit_Rating"
            StyleClass="btn btn-primary"
            type="table"
            gridOptions={{
              getRowStyle,
            }}
          />
          <AppModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            handleActon={handleDelete}
            buttonConfigs={[
              {
                text: "Delete",
                icon: faTrashCan,
                action: "handleDelete",
              },
            ]}
            Modaldata={modalData}
            Modalsize={"lg"}
            ModalTitle={"Delete Confirmation"}
            ModalBody={"Are you sure you want to delete  ?"}
            btnText={"Deleted"}
            show={true}
          />
        </>
      )}
    </>
  );
}
function ActionButtonsFunction(params, keycloak, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "View",
          icon: faEye,
          action: "handleView",
          show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
          disabled: currentDisabled(params.data, [
            "Pending_For_Approval",
            "Approved",
          ]),
        },
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          disabled: currentDisabled(params.data, "Delete"),
          disabled: currentDisabled(params.data, [
            "Pending_For_Approval",
            "Approved",
          ]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

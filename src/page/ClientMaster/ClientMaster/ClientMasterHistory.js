import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import { uploadEnum } from "../../Uploads/data";

export default function ClientMasterProductHistory() {
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

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.uploadHistory}${uploadEnum.CLIENT_MASTER_BULK_UPLOAD}`
      );
      if (response) {
        toast.success(response.data.message);
        let result = response.data;
        setRowData(result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFile = async (fileId) => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.bulkHistory}/${fileId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      toast.success(t("Messages:FileDownload"));
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
    }
  };

  const handleErrorLog = async (data) => {
    setLoading(true);
    console.log("first", data.rejectionFileId);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.bulkHistory}/${data}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${data}.xlsx`);
      document.body.appendChild(link);
      link.click();
      setLoading(false);
      toast.success(t("Messages:FileDownload"));
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
    }
  };

  const columnDefs = [
    {
      headerName: "File Id",
      field: "fileId",
      sortable: true,
      filter: true,
      minWidth: 300,
      cellRenderer: (params) => {
        const fileId = params.value;
        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDownloadFile(fileId);
            }}
          >
            {params.value}
          </a>
        );
      },
    },

    {
      headerName: "Record Count",
      field: "recordCount",
      cellRenderer: (params) => {
        return params.value != null ? params.value : 0;
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Success Count",
      field: "successCount",
      cellRenderer: (params) => {
        return params.value != null ? params.value : 0;
      },

      sortable: true,
      filter: true,
    },
    {
      headerName: "Error Count",
      field: "errorCount",
      sortable: true,
      filter: true,

      cellRenderer: (params) => {
        console.log("first", params.data.rejectionFileId);

        return (
          <a
            href=""
            style={{
              pointerEvents:
                params.data.rejectionFileId == null ? "none" : "auto",
              color: params.data.rejectionFileId == null ? "gray" : "blue",
              textDecoration:
                params.data.rejectionFileId == null ? "none" : "underline",
            }}
            onClick={(e) => {
              e.preventDefault();
              handleErrorLog(params.data.rejectionFileId);
            }}
          >
            {params.value != null ? params.value : 0}
          </a>
        );
      },
    },

    // {
    //   headerName: "Created By",
    //   field: "createdBy",
    //   // cellRenderer: (params) => ,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Created Date",
      field: "createdDate",
      cellRenderer: (params) =>
        moment(params.data.startTime).format("DD/MM/YYYY HH:mm:ss"),
      sortable: true,
      filter: true,
      maxWidth : 90

    },
    {
      headerName: "Upload Status",
      field: "uploadStatus",
      sortable: true,
      filter: true,
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
            showDatePicker={false}
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

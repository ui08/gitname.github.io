import { faCircle, faFileLines } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleDot,
  faEye,
  faList,
  faPen,
  faToggleOn,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ActionButtons from "../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../Component/ComponentsTable/AgTable";
import DatefilterParams from "../../Component/ComponentsTable/agFiler";
import { currentDisabled } from "../../Component/ComponentsTable/currentDisabled";
import AppModal from "../../Component/Modal/AppModal";
import Pagehader from "../../Layout/Pagehader";
import { decryptData, encrypt, encryptData } from "../../util/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";

export default function Reportslist() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const modes = decryptData(useParams().mode);
  const [mode, setMode] = useState(modes);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [mode]);
  const isAddMode = mode === "Individual";
  const isuploadMode = mode === "bulk";
  useEffect(() => {
    if (mode === "Individual") {
      setRowData("");
      fetchData();
    } else {
    }
    if (mode === "bulk") {
      setRowData("");
      fetchUploadData();
    } else {
    }
  }, [mode]);

  // Fetch school list data
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.schoolList);
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setRowData(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadData = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.SchoolHistory);
      // console.log("result", response);
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setRowData(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 100,
      maxWidth: 120,
    },
    {
      headerName: t("Common:App_lms_Common_00027"),
      field: "schoolName",
      minWidth: 260,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00041"),
      field: "schoolId",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00042"),
      field: "state",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00043"),
      field: "city",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00044"),
      minWidth: 130,
      field: "pincode",
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00021"),
      field: "status",
    },
    {
      headerName: "Actions",
      minWidth: 250,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];
  const uploadcolumnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: t("Common:App_lms_Common_00051"),
      field: "createdDate",
      minWidth: 150,
      sortable: true,
      filterParams: DatefilterParams,
      cellRenderer: (params) => {
        return moment(params.data.JourneyDate).format("DD-MM-YYYY");
      },
    },
    {
      headerName: t("Common:App_lms_Common_00052"),
      field: "fileUploadType",
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00053"),
      field: "fileId",
      minWidth: 200,
      sortable: true,
      filter: true,
      minWidth: 350,
    },
    {
      headerName: t("Common:App_lms_Common_00054"),
      field: "uploadStatus",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00055"),
      field: "recordCount",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00056"),
      field: "errorCount",
      minWidth: 140,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00057"),
      field: "successCount",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
  ];
  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00119"),
      href: "/",
      icon: <FontAwesomeIcon icon={faFileLines} />,
    },
    {
      label: t("Common:App_lms_Common_00247"),
      icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  const handleTableFunction = (params, action) => {
    if (action === "handleEdit") {
      handleEdit(params.data);
    } else if (action === "handleView") {
      handleView(params.data);
    } else if (action === "handleSendForApproval") {
      setModalData([]);
      setModalData(params.data);
      setApprovalModalOpen(true);
    } else if (action === "handleDelete") {
      setModalData([]);
      setModalData(params.data);
      setDeleteModalOpen(true);
    } else if (action === "handleToggle") {
      setModalData([]);
      setModalData(params.data);
      setModalText(
        params.data.status === "Active"
          ? t("Messages:toggleDeactivate")
          : t("Messages:toggleActivate")
      );
      setToggleModalOpen(true);
    }
  };

  const handleEdit = (data) => {
    navigate(
      "/" +
        encrypt("SchoolFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.schoolId)}`
    );
  };

  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("SchoolFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.schoolId)}`
    );
  };

  const handleApproval = () => {
    alert("Approve");
    setApprovalModalOpen(false);
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
    deleteSchool(modalData.schoolId);
  };

  // Delete school
  const deleteSchool = async (schoolId) => {
    try {
      const response = await axiosInstance.delete(
        Apiurl.deleteSchool + "/" + schoolId
      );
      const result = await response.data;
      toast.success(
        t("Messages:DeleteMessage", { mode: t("Common:App_lms_Common_00004B") })
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (data) => {
    const Data = {
      schoolId: data.schoolId,
      active: data.status === "Active" ? false : true,
    };
    try {
      const response = await axiosInstance.patch(
        Apiurl.schoolActiveDeactive,
        Data
      );
      toast.success(
        t(
          data.status === "Active"
            ? "Messages:InactiveMessage"
            : "Messages:ActivateMessage",
          { mode: t("Common:App_lms_Common_00004B") }
        )
      );
      setToggleModalOpen(false);
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlenavigate = (e) => {
    setMode(e);
    navigate("/" + encrypt("Schoollist") + `/${encryptData(e)}`);
  };
  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00004")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00004D")}
            BtnName={t("Common:App_lms_Common_00005", {
              mode: t("Common:App_lms_Common_00001A"),
              label: t("Common:App_lms_Common_00004B"),
            })}
            btnnav={
              "/" +
              encrypt("SchoolFormComponent") +
              `/${encryptData("add")}` +
              `/${encryptData("ss")}`
            }
            btnshow={true}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            {ModeFunction(isAddMode, isuploadMode, mode, handlenavigate, t)}
            <AgTable
              columnKeys={isAddMode ? columnDefs.field : uploadcolumnDefs.field}
              columnDefs={isAddMode ? columnDefs : uploadcolumnDefs}
              rowData={rowData}
              filenames={
                isAddMode
                  ? t("Common:App_lms_Common_00004B")
                  : t("Common:App_lms_Common_00127")
              }
              downloadbtnstext={true}
              // onSelectionChanged={onSelectionChangedContribution}
            />

            {/* Delete modal */}
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
            {/* Approval modal */}
            <AppModal
              isOpen={approvalModalOpen}
              onClose={() => setApprovalModalOpen(false)}
              handleActon={handleApproval}
              buttonConfigs={[
                {
                  text: "Submit",
                  icon: faTrashCan,
                  action: "handleApproval",
                },
              ]}
              Modaldata={modalData}
              Modalsize={"lg"}
              ModalTitle={"Send For Approval"}
              ModalBody={"Are you sure you want to send for approval  ?"}
              show={true}
            />

            {/* Toggle modal */}
            <AppModal
              isOpen={toggleModalOpen}
              onClose={() => setToggleModalOpen(false)}
              handleActon={handleToggleStatus}
              buttonConfigs={[
                {
                  text: "Yes",
                  icon: "",
                  action: "handleToggleStatus",
                },
              ]}
              Modaldata={modalData}
              Modalsize={"lg"}
              ModalTitle={modalText}
              ModalType={"Toggle"}
              show={true}
            />
          </div>
        </>
      )}
    </>
  );
}
function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "Toggle",
          icon: faToggleOn,
          action: "handleToggle",
          // show: currentRealmRole( [userUIRole.iap_superadmin]),
          disabled: currentDisabled(params.data, "View"),
        },
        {
          text: "View",
          icon: faEye,
          action: "handleView",
          // show: currentRealmRole( [userUIRole.iap_superadmin]),
          disabled: currentDisabled(params.data, "View"),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          // show: currentRealmRole( [userUIRole.iap_superadmin]),
          disabled: currentDisabled(params.data, "Edit"),
        },
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          disabled: currentDisabled(params.data, "Delete"),
          // show: currentRealmRole( [userUIRole.iap_superadmin]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

function ModeFunction(isAddMode, isuploadMode, mode, handlenavigate, t) {
  return isAddMode || isuploadMode ? (
    <div className="d-flex">
      <button
        onClick={() => handlenavigate("Individual")}
        className={mode === "Individual" ? "modebtn modebtnactive" : "modebtn"}
      >
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={mode === "Individual" ? faCircleDot : faCircle}
            size="2xl"
          />
          <h3 className="ms-2"> {t("Common:App_lms_Common_00004F")}</h3>{" "}
        </div>
      </button>
      <button
        onClick={() => handlenavigate("bulk")}
        className={mode === "bulk" ? "modebtn modebtnactive" : "modebtn"}
      >
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={mode === "bulk" ? faCircleDot : faCircle}
            size="2xl"
          />
          <h3 className="ms-2">{t("Common:App_lms_Common_00127")}</h3>{" "}
        </div>
      </button>
    </div>
  ) : null;
}

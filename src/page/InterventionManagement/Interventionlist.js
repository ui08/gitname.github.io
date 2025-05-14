import {
    faEye,
    faHouse,
    faList,
    faPen,
    faPlus,
    faToggleOn,
    faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../Component/ComponentsTable/AgTable";
import { currentDisabled } from "../../Component/ComponentsTable/currentDisabled";
import AppModal from "../../Component/Modal/AppModal";
import Pagehader from "../../Layout/Pagehader";
import { encrypt, encryptData } from "../../util/CryptoJS";
import Loader from "../../util/Loader";
import axiosInstance from "../../util/axiosInstance";
import { Apiurl } from "./../../util/apiurl";

export default function Interventionlist() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.interventionlist);
      // console.log("result",response);
      if (!response.statusText == "OK") throw new Error("Network response was not ok");
      const result = await response.data;
      setRowData(result)
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    // {
    //   headerName: t("Common:App_lms_Common_00039"),
    //   field: "interventionId",
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: t("Common:App_lms_Common_00040"),
      field: "interventionName",
      minWidth: 350,
      sortable: true,
      filter: true,
    },
    {
      headerName: t("Common:App_lms_Common_00021"),
      field: "status",  
    },

    {
      headerName: "Actions",
      minWidth: 200,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00001"),
      href: "/",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      label: t("Common:App_lms_Common_00004"),
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
    } else if (action === "handleDelete") {
      setModalData([]);
      setModalData(params.data);
      setDeleteModalOpen(true);
    } else if (action === "handleToggle") {
      setModalData([]);
      setModalData(params.data);
      setModalText(params.data.status === "Active" ? t("Messages:toggleDeactivate") : t("Messages:toggleActivate"))
      setToggleModalOpen(true);
    }
  };

  const handleEdit = (data) => {
    navigate(
      "/" +
        encrypt("InterventionFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("InterventionFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };


  const handleToggleStatus = async (data) => {
    const Data = {
        id: data.id,
        active : data.status === "Active" ? false : true
    }
    try {
      const response = await axiosInstance.patch(Apiurl.interventionToggle, Data);
      toast.success(
        t(data.status === "Active" ? "Messages:InactiveMessage" : "Messages:ActivateMessage", { mode: t("Common:App_lms_Common_00004") })
      );
      setToggleModalOpen(false);
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = () => {
    deleteIntervention(modalData.id)
    setDeleteModalOpen(false);
  };

   // Delete Intervention
   const deleteIntervention= async (interventionId) => {
    try {
      const response = await axiosInstance.delete(Apiurl.interventionDelete+'/'+interventionId);
      const result = await response.data;
      toast.success(
        t("Messages:DeleteMessage", { mode: t("Common:App_lms_Common_00004") })
      );
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <>
    {/* <LoaderFetch /> */}
    {/* <LoaderSuccess /> */}
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00004")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00009")}
            BtnName={t("Common:App_lms_Common_00005", {
              mode: t("Common:App_lms_Common_00001A"),
              label: "",
            })}
            Btnicon={<FontAwesomeIcon icon={faPlus} className="c_btn_icon" />}
            btnnav={
              "/" +
              encrypt("InterventionFormComponent") +
              `/${encryptData("add")}` +
              `/${encryptData("ss")}`
            }
            btnshow={true}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            {/* Breadcrumb */}

            {/* <NoDataFound /> */}
            {/* <LoaderFetch /> */}

            <AgTable
              columnKeys={columnDefs.field}
              columnDefs={columnDefs}
              rowData={rowData}
              filenames={t("Common:App_lms_Common_00004")}
              downloadbtnstext={true}
              showDatePicker={false}
              // onSelectionChanged={onSelectionChangedContribution}
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
              ModalType = {"Toggle"}
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

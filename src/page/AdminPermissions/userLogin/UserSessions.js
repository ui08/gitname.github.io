import {
  faCircleDot,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//   import DatefilterParams from "../../../Component/ComponentsTable/agFiler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import toast from "react-hot-toast";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import Pageheader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import { getMomentFromDate } from "../../../util/Authenticate";

export default function UserSessions() {
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

  const fetchData = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.allsessions);
      setLoading(false);
      setRowData([]);

      Object.values(response.data)
        .filter((x) => x.isSessionActive === true)
        .map((item) => {
          setRowData((prev) => [...prev, item]);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
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
      headerName: "Full Name",
      field: "fullName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Login Time",
      field: "lastLoginTime",
      cellRenderer: (params) =>
        getMomentFromDate(params.data.lastLoginTime, "Date&Time"),
      sortable: true,
      minWidth: 150,
      filter: true,
    },
    // {
    //   headerName: "Last Logout Time",
    //   field: "lastLogoutTime",
    //   cellRenderer: (params) =>
    //     getMomentFromDate(params.data.lastLogoutTime, "Date&Time"),
    //   minWidth: 210,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Session Active",
      field: "isSessionActive",
      cellRenderer: (params) => {
        return (
          <p>
            {params.data.isSessionActive ? (
              <FontAwesomeIcon
                icon={faCircleDot}
                // fade
                style={{ color: "#44ff00" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleDot}
                style={{ color: "#c7c7c7" }}
              />
            )}{" "}
          </p>
        );
      },

      minWidth: 180,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Actions",
      minWidth: 180,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const breadcrumbItems = [
    {
      label: "User Sessions list",
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

  const handleEdit = async (data) => {
    try {
      const response = await axiosInstance.get(
        Apiurl.forcelogout + data.userId
      );
      const result = await response.data;
      setLoading(result);
      toast.success("Force Logout Successfull");
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("UserRoleMasterFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.roleId)}`
    );
  };

  const handleDelete = () => {
    deleteUnit(modalData.roleId);
    setDeleteModalOpen(false);
  };

  // Delete unit/course
  const deleteUnit = async (Id) => {
    try {
      const response = await axiosInstance.get(Apiurl.roledelete + "/" + Id);
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
        <Loader pagename={t("Common:App_lms_Common_00272")} />
      ) : (
        <>
          <Pageheader
            pagename={t("Common:App_lms_Common_00272")}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pageheader>
          <div className="pagebody">
            {/* Breadcrumb */}

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
          text: "LogOut",
          icon: faPen,
          action: "handleEdit",
          show: true,
          disabled: params.data.isSessionActive ? false : true,
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

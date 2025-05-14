import {
    faEye,
    faPen,
    faToggleOff,
    faToggleOn,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../Component/ComponentsTable/AgTable";
//   import DatefilterParams from "../../../Component/ComponentsTable/agFiler";
import { toast } from "react-hot-toast";
import AppModal from "../../Component/Modal/AppModal";
import { Apiurl } from "../../util/apiurl";
import { getMomentFromDate, getsessionStorage } from "../../util/Authenticate";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import { userRole } from "../../util/Authenticate/Rolename";
import axiosInstance from "../../util/axiosInstance";
import RouteCurrentAuthorities from "./../../util/Authenticate/AuthorizedFunction";

export default function UserCreationList({ UploadModalOpen }) {
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
  }, [UploadModalOpen]);

  const fetchData = async (value) => {
    try {
      const response = await axiosInstance.get(Apiurl.userlist);
      setRowData([]);
      if (getsessionStorage(encrypt("Login_Type")) === "super_admin") {
        Object.values(response.data)
          .filter((x) => x.userRoles != "client")
          .map((item) => {
            setRowData((prev) => [...prev, item]);
          });
      } else {
        Object.values(response.data)
          .filter(
            (x) => x.userRoles != "client" && x.userRoles != "super_admin"
          )
          .map((item) => {
            setRowData((prev) => [...prev, item]);
          });
      }
    } catch (error) {
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
      headerName: "Name",
      field: "firstName",
      cellRenderer: (params) => {
        return params.data.otherUserDetails === null ? (
          <p>{params.data.fullName}</p>
        ) : (
          <p>
            {params.data.otherUserDetails.firstName +
              " " +
              params.data.otherUserDetails.lastName}
          </p>
        );
      },

      sortable: true,
      filter: true,
      minWidth: 70,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },

    {
      headerName: "Mobile No",
      field: "mobileNo",
      cellRenderer: (params) => {
        return params.data.otherUserDetails === null
          ? params.data.mobileNo
          : params.data.otherUserDetails.mobileNo;
      },
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "User Role",
      field: "userRoles",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Supervisor  Name",
      field: "supervisorUserName",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data.supervisorUserName === null
          ? "NA"
          : params.data.supervisorUserName;
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Supervisor  Role",
      field: "supervisorRoleName",
      cellRenderer: (params) => {
        return params.data.supervisorRoleName === null
          ? "NA"
          : params.data.supervisorRoleName;
      },
      minWidth: 150,
      sortable: true,
      filter: true,
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
      label: "User Creation",
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
    } else if (action === "handleActivation") {
      handleViewActivation(params.data);
    }
  };
  const handleEdit = (data) => {
    navigate(
      "/" +
        encrypt("UserCreationFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.userId)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("UserCreationFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.userId)}`
    );
  };
  const handleViewActivation = (data) => {
    if (data.activeFlag) {
      navigate(
        "/" +
          encrypt("UserCreationFormComponent") +
          `/${encryptData("Deactivation")}` +
          `/${encryptData(data.userId)}`
      );
    }
    if (data.activeFlag === false || data.activeFlag === null) {
      navigate(
        "/" +
          encrypt("UserCreationFormComponent") +
          `/${encryptData("Activation")}` +
          `/${encryptData(data.userId)}`
      );
    }
  };
  const handleDelete = () => {
    deleteUnit(modalData.userId);
    setDeleteModalOpen(false);
  };

  // Delete unit/course
  const deleteUnit = async (userId) => {
    setRowData([]);
    try {
      const response = await axiosInstance.get(
        Apiurl.userdelete + "/" + userId
      );
      const result = await response.data;
      fetchData();
      toast.success("User successfully Remove");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AgTable
        columnDefs={columnDefs}
        rowData={rowData}
        filenames={"User_List" + getMomentFromDate(new Date(), "Date&Time")}
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
        Modalsize={"md"}
        ModalTitle={"Delete Confirmation"}
        ModalBody={"Are you sure you want to delete  ?"}
        btnText={"Deleted"}
        show={true}
      />
    </>
  );
}
function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: params.data.activeFlag ? "Activate" : "Deactivate",
          icon: params.data.activeFlag ? faToggleOn : faToggleOff,
          action: "handleActivation",
          show: RouteCurrentAuthorities([userRole.User_Activate_DeActivate]),

          // disabled: params.data.activeFlag ? false :true,
        },
        {
          text: "View",
          icon: faEye,
          action: "handleView",
          show: RouteCurrentAuthorities([userRole.User_Details, ,]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: RouteCurrentAuthorities([userRole.User_Edit]),
          // disabled: params.data.activeFlag ? false :true,
        },

        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          show: RouteCurrentAuthorities([userRole.User_Delete]),
          // disabled: params.data.activeFlag ? false :true,
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

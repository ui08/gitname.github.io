import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../Component/ComponentsTable/AgTable";
//   import DatefilterParams from "../../../Component/ComponentsTable/agFiler";
import Pagehader from "../../../src/Layout/Pagehader";
import AppModal from "../../Component/Modal/AppModal";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";

export default function UserHierarchyMappingList() {
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
      const response = await axiosInstance.get(Apiurl.userlist);
      setLoading(false);
      setRowData(response.data);
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
        return (params.data.otherUserDetails === null
          ? params.data.mobileNo
          : params.data.otherUserDetails.mobileNo);
      },
      sortable: true,
      filter: true,
    },

    {
      headerName: "Supervisor Role Name",
      field: "supervisorRoleName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Supervisor  Name",
      field: "supervisorUserName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "User Roles",
      field: "userRoles",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Actions",
      minWidth: 250,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const breadcrumbItems = [
    {
      label: "User Hierarchy Mapping List",
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

  const handleDelete = () => {
    deleteUnit(modalData.userId);
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
        <Loader pagename={t("Common:App_lms_Common_00272")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00272")}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            {/* Breadcrumb */}
            {/* <FilterComponent /> */}
            {/* <div className="d-flex">
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Add New"}
                  onClick={() =>
                    navigate(
                      "/" +
                        encrypt("UserHierarchyMappingFormComponent") +
                        `/${encryptData("add")}` +
                        `/${encryptData("ss")}`
                    )
                  }
                />
              </div> */}

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
      buttonConfigs={[
        {
          text: "View",
          icon: faEye,
          action: "handleView",
          // show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          // show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
          // disabled: currentDisabled(params.data, [
          //   "Pending_For_Approval",
          //   "Approved",
          // ]),
        },
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          // disabled: currentDisabled(params.data, "Delete"),
          // disabled: currentDisabled(params.data, [
          //   "Pending_For_Approval",
          //   "Approved",
          // ]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

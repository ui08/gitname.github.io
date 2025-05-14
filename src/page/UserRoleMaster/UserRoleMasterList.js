import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../Component/ComponentsTable/AgTable";
//   import DatefilterParams from "../../../Component/ComponentsTable/agFiler";
import Pagehader from "../../../src/Layout/Pagehader";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import AppModal from "../../Component/Modal/AppModal";
import { Apiurl } from "../../util/apiurl";
import RouteCurrentAuthorities from "../../util/Authenticate/AuthorizedFunction";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import { userRole } from "../../util/Authenticate/Rolename";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import {
  getAssumingRole,
  getMomentFromDate,
} from "./../../util/Authenticate/index";

export default function UserRoleMasterList() {
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
    setRowData(null);
    try {
      const response = await axiosInstance.get(Apiurl.getallrole);
      setLoading(false);
      const temRowData = [];
      Object.values(response.data)
        .filter(
          (x) =>
            x.roleName != getAssumingRole()[0] &&
            x.roleName != "client" &&
            x.roleName != "super_admin"
        )
        .map((item) => {
          let SingleData = {
            roleId: item.roleId,
            roleName: item.roleName,
            displayName: item.displayName,
            supervisorRoleName: item.supervisorRoleName,
            createdDate: getMomentFromDate(item.createdDate, "Date&Time"),
            status: item.status,
            active: item.active,
            deleted: item.deleted,
          };
          temRowData.push(SingleData);
        });
      setRowData(temRowData);
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
      headerName: "Role Name",
      field: "roleName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Display Name",
      field: "displayName",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Supervisor Name",
      field: "supervisorRoleName",
      sortable: true,
      minWidth: 150,
      filter: true,
    },
    {
      headerName: "Created Date",
      field: "createdDate",

      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "status",
      field: "status",
      sortable: true,
      minWidth: 150,
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
      label: "User Role Master",
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
        encrypt("UserRoleMasterFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.roleId)}`
    );
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
      toast.success("Role successfully Remove");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleViewActivation = (data) => {
    if (data.active) {
      navigate(
        "/" +
          encrypt("UserRoleMasterFormComponent") +
          `/${encryptData("Deactivation")}` +
          `/${encryptData(data.roleId)}`
      );
    }
    if (data.active === false || data.active === null) {
      navigate(
        "/" +
          encrypt("UserRoleMasterFormComponent") +
          `/${encryptData("Activation")}` +
          `/${encryptData(data.roleId)}`
      );
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
            <div className="d-flex">
              {RouteCurrentAuthorities([userRole.User_Role_Create]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Add New"}
                  onClick={() =>
                    navigate(
                      "/" +
                        encrypt("UserRoleMasterFormComponent") +
                        `/${encryptData("add")}` +
                        `/${encryptData("ss")}`
                    )
                  }
                />
              )}
            </div>

            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              filenames={
                "User_Role_Master_List" +
                getMomentFromDate(new Date(), "Date&Time")
              }
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
              Modalsize={"ms"}
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
          text: params.data.active ? "Activate" : "Deactivate",
          action: "handleActivation",
          show: RouteCurrentAuthorities([
            userRole.User_Role_Activate_DeActivate,
          ]),
        },

        {
          text: "View",
          action: "handleView",
          show: RouteCurrentAuthorities([userRole.User_Role_Details]),
        },
        {
          text: "Edit",
          action: "handleEdit",
          show: RouteCurrentAuthorities([userRole.User_Role_Edit]),
        },
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          disabled: params.data.deleted,
          show: RouteCurrentAuthorities([userRole.User_Role_Delete]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

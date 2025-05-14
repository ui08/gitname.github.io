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
import { getAssumingRole, getMomentFromDate } from "../../util/Authenticate";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import { userRole } from "../../util/Authenticate/Rolename";
import Loader from "../../util/Loader";
import { Apiurl } from "./../../util/apiurl";
import RouteCurrentAuthorities from './../../util/Authenticate/AuthorizedFunction';
import axiosInstance from "./../../util/axiosInstance";

export default function AccessRightMasterList() {
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
    setRowData(null);
    try {
      const response = await axiosInstance.get(Apiurl.getallrole);

      const temRowData = [];
      Object.values(response.data)
        .filter((x) => x.roleName != getAssumingRole()[0])
        .map((item) => {
          let SingleData = {
            roleId: item.roleId,
            roleName: item.roleName,
            roleDescription: item.roleDescription,
            displayName: item.displayName,
            status: item.status,
          };
          temRowData.push(SingleData);
        });
      setRowData(temRowData);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
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
    {
      headerName: "Role Name",
      field: "roleName",
      maxWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Display Name",
      field: "displayName",
      maxWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Role Description",
      field: "roleDescription",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      maxWidth: 150,
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
      label: "Access Right Mapping",
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
        encrypt("AccessRightMasterActivateorDeactivate") +
        `/${encryptData(data.roleId)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("UserRoleMasterFormComponent") +
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
            {RouteCurrentAuthorities([userRole.Access_Mapping_update]) && (
              <div className="d-flex gap-3">
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Access Right Mapping"}
                  onClick={() =>
                    navigate(
                      "/" +
                        encrypt("AccessRightMasterFormComponent") +
                        `/${encryptData("update")}` +
                        `/${encryptData("ss")}`
                    )
                  }
                />
              </div>
            )}
            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              filenames={
                "Access_Right_Master_list" +
                getMomentFromDate(new Date(), "Date&Time")
              }
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
          text: "Edit",
          action: "handleEdit",
          show: RouteCurrentAuthorities([userRole.Access_Mapping_Edit]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../Component/ComponentsTable/AgTable";
//   import DatefilterParams from "../../../Component/ComponentsTable/agFiler";
import { useParams } from "react-router-dom";
import Pagehader from "../../../src/Layout/Pagehader";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import AppModal from "../../Component/Modal/AppModal";
import { getMomentFromDate } from "../../util/Authenticate";
import {
    decryptData,
    encrypt,
    encryptData,
} from "../../util/Authenticate/CryptoJS";
import Loader from "../../util/Loader";

import { userRole } from "../../util/Authenticate/Rolename";
import { Apiurl } from "./../../util/apiurl";
import RouteCurrentAuthorities from "./../../util/Authenticate/AuthorizedFunction";
import axiosInstance from "./../../util/axiosInstance";
export default function AccessRightMasterActivateorDeactivate() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const id = decryptData(useParams().id);
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
        Apiurl.viewpermissionmappingbyid + parseInt(id)
      );

      setRowData(response.data);
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
      headerName: "Permission Name",
      field: "permissionName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Permission  Description",
      field: "permissionDesc",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "activeFlag",
      cellRenderer: (params) => {
        return (
          <strong
            className={
              params.data.mappingActiveFlag
                ? "useractiveFlag"
                : "userdeactiveFlag"
            }
          >
            {params.data.mappingActiveFlag ? "Active" : "Deactive"}
          </strong>
        );
      },
      minWidth: 210,
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
      label: "Access Right Master",
      patth: "/" + encrypt("AccessRightMasterList"),
    },
    {
      label: "Activate or Deactivate",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  const handleTableFunction = (params, action) => {
    if (action === "handleActivation") {
      handleActivation(params.data);
    } else if (action === "handleView") {
      handleView(params.data);
    } else if (action === "handleDelete") {
      setModalData([]);
      setModalData(params.data);
      setDeleteModalOpen(true);
    }
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
    deleteUnit(modalData);
    setDeleteModalOpen(false);
  };
  const handleActivation = async (data) => {
    let payload = {
      id: parseInt(data.rolePermissionMappingId),
      activeFlag: data.mappingActiveFlag ? false : true,
    };

    try {
      const response = await axiosInstance.post(
        Apiurl.permissionactivation,
        payload
      );
      const result = await response.data;
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Delete unit/course
  const deleteUnit = async (data) => {
    console.log(data);
    let payload = {
      roleId: parseInt(id),
      permissionId: parseInt(data.id),
    };
    try {
      const response = await axiosInstance.post(
        Apiurl.permissiondelete,
        payload
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
            <div className="d-flex">
              {RouteCurrentAuthorities([userRole.Access_Mapping_update]) && (
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
              )}
            </div>

            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              filenames={
                "Access_Right_Master_Activate_or_Deactivate_list" +
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
          text: params.data.mappingActiveFlag ? "Activate" : "Deactivate",
          action: "handleActivation",
          show: RouteCurrentAuthorities([
            userRole.Access_Mapping_Activate_DeActivate,
          ]),
        },
        {
          text: "Delete",
          action: "handleDelete",
          show: RouteCurrentAuthorities([userRole.Access_Mapping_Delete]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

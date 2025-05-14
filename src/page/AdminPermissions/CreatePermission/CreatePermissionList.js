import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
//   import DatefilterParams from "../../../Component/ComponentsTable/agFiler";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import Pageheader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import AppModal from "../../../Component/Modal/AppModal";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";

export default function Rolepermissionlist() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  

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
      const response = await axiosInstance.get(Apiurl.viewpermissions);
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
      headerName: "Permission Name",
      field: "permissionName",
      minWidth: 150,
      maxWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Permission Short Name",
      field: "permissionShortName",
      minWidth: 150,
      maxWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Permission Desc",
      field: "permissionDesc",
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
      label: "Role Permission list",
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
          encrypt("CreatePermissionFormComponent") +
          `/${encryptData("edit")}` +
          `/${encryptData(data.id)}`
      );
    };
    const handleView = (data) => {
      navigate(
        "/" +
          encrypt("CreatePermissionFormComponent") +
          `/${encryptData("view")}` +
          `/${encryptData(data.id)}`
      );
    };
  
    const handleDelete = () => {
      deleteAssetClass(modalData.id);
      setDeleteModalOpen(false);
    };
  
    const deleteAssetClass = async (id) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          Apiurl.deletePermission + "/" + id
        );
        const result = await response.data;
        fetchData(currentPage, perPagesize, selectedDate);
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
            {/* <FilterComponent /> */}
            <div className="d-flex">
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Add New"}
                onClick={() =>
                  navigate(
                    "/" +
                      encrypt("CreatePermissionFormComponent") +
                      `/${encryptData("add")}` +
                      `/${encryptData("ss")}`
                  )
                }
              />
            </div>

            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              columnKeys={columnDefs.field}
              filenames="Role_permission_list"
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
          text: "View",
          icon: faEye,
          action: "handleView",
          show: true,
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: true,

        },
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          show: true,
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

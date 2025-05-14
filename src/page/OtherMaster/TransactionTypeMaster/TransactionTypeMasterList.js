import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../../util/Authenticate/Rolename";

export default function TransactionTypeMasterList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { t } = useTranslation(["Common", "Messages", "Form"]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.TransactionTypeList);
      setRowData(response?.data);
    } catch (error) {
      console.error("Error during GET request:", error.message);
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
      headerName: "Transaction Type Name",
      field: "trxnType",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.trxnType === null || params.data.trxnType === ""
          ? `-`
          : params.data.trxnType;
      },
    },

    {
      headerName: "Transaction Type Description",
      field: "trxnDisc",
      cellRenderer: (params) => {
        return params.data.trxnDisc == null || params.data.trxnDisc == ""
          ? "-"
          : params.data.trxnDisc;
      },
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Transaction Type Effect",
      field: "effect",
      cellRenderer: (params) => {
        return params.data.effect == 1
          ? "Buy"
          : params.data.effect == -1
          ? "Sell"
          : "Other";
      },

      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Product ID",
    //   field: "",
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Product Type",
    //   field: "",
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Actions",
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const breadcrumbItems = [
    {
      label: "Transaction Type Master",
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
        encrypt("TransactionTypeMasterFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("TransactionTypeMasterFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };

  const handleDelete = () => {
    deleteTransactionData(modalData.id);
    setDeleteModalOpen(false);
  };

  // Delete unit/course
  const deleteTransactionData = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        Apiurl.deleteTransaction + "/" + id
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
        <Loader pagename={t("Common:App_lms_Common_00268")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00268")}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex">
                {RouteCurrentAuthorities([
                        userRole.Transaction_Master_Create
                      ]) && (
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle={ "tableHeader"}     
               btnText={"Add New"}
                onClick={() =>
                  navigate(
                    "/" +
                      encrypt("TransactionTypeMasterFormComponent") +
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
function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "View",
          icon: faEye,
          action: "handleView",
          show: RouteCurrentAuthorities([
            userRole.Transaction_Master_Details,
          ]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: RouteCurrentAuthorities([
            userRole.Transaction_Master_Edit,
          ]),
        },
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          show: RouteCurrentAuthorities([
            userRole.Transaction_Master_Delete,
          ]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

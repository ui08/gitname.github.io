import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { Apiurl } from "../../../util/apiurl";
import { getMomentFromDate } from "../../../util/Authenticate";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";

export default function ClientMasterList({ UploadModalOpen }) {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const hasRun = useRef(false); //To prevent multiple reders of useEffect
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Callback for Search
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Callback for Date Picker
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  // Callback for Export Button
  const handleExportClick = () => {
    console.log("Export Button Clicked");
  };

  // Callback for Reset Button
  const handleResetClick = () => {
    console.log("Reset Button Clicked");
  };

  useEffect(() => {
    if (!hasRun.current) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        fetchData();
      }, 2000);
      hasRun.current = true;
    }
  }, [UploadModalOpen]);

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.allClientsList}`
      );
      if (response) {
        toast.success(response.data.message);
        let result = response.data;
        setRowData(result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  // const handleDownloadFile = async (fileId) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `${Apiurl.bulkHistory}/${fileId}`,
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `${fileId}.xlsx`);
  //     document.body.appendChild(link);
  //     link.click();
  //     toast.success(t("Messages:FileDownload"));
  //   } catch (error) {
  //     console.error("Login error: ", error);
  //     toast.error(t(""));
  //   } finally {
  //   }
  // };

  // const handleErrorLog = async (data) => {
  //   setLoading(true);
  //   console.log("first", data.rejectionFileId);
  //   try {
  //     const response = await axiosInstance.get(
  //       `${Apiurl.bulkHistory}/${data}`,
  //       {
  //         responseType: "blob",
  //       }
  //     );

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `${data}.xlsx`);
  //     document.body.appendChild(link);
  //     link.click();
  //     setLoading(false);
  //     toast.success(t("Messages:FileDownload"));
  //   } catch (error) {
  //     console.error("Login error: ", error);
  //     toast.error(t(""));
  //   } finally {
  //   }
  // };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Account ID",
      field: "accountIds",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.accountIds == null || params.data.accountIds === "" ? "-" : params.data.accountIds;
      },
    },
    {
      headerName: "Client Name",
      field: "namePAN",
      minWidth: 250,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.namePAN == null || params.data.namePAN === "" ? "-" : params.data.namePAN;
      },
    },
    {
      headerName: "Mobile No",
      field: "contactNumber",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.contactNumber == null || params.data.contactNumber === "" ? "-" : params.data.contactNumber;
      },
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.email == null || params.data.email === "" ? "-" : params.data.email;
      },
    },
    {
      headerName: "PAN",
      field: "pan",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.pan == null || params.data.pan === "" ? "-" : params.data.pan;
      },
    },
    {
      headerName: "DOB",
      field: "dateOfBirth",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.dateOfBirth == null || params.data.dateOfBirth === "" ? "-" : getMomentFromDate(params.data.dateOfBirth, "Date");
      },
    },
    {
      headerName: "Gender",
      field: "gender",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.gender == null || params.data.gender === "" ? "-" : params.data.gender;
      },
    },
    {
      headerName: "Investor Type",
      field: "investorType",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return params.data.investorType == null || params.data.investorType === "" ? "-" : params.data.investorType;
      },
    },
    // {
    //   headerName: "Family Head",
    //   field: "isFamilyHead",
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
    //   cellRenderer: (params) => {
    //     return params.data.isFamilyHead == null || params.data.isFamilyHead === "" ? "-" : params.data.isFamilyHead;
    //   },
    // },
    {
      headerName: "Actions",
      minWidth: 250,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ]

  // const columnDefs = [
  //   {
  //     headerName: t("Common:App_lms_Common_00006"),
  //     valueGetter: "node.rowIndex + 1",
  //     minWidth: 120,
  //     maxWidth: 120,
  //   },
  //   {
  //     headerName: "Account ID",
  //     minWidth: 150,
  //     sortable: true,
  //     filter: true,
  //     valueGetter: (params) => {
  //       const accountId =
  //         params.data.clientAccountDetailEntityDtoList?.[0]?.accountUniqueId;
  //       return accountId && accountId !== "" ? accountId : "-";
  //     },
  //   },
  //   {
  //     headerName: "Client Name",
  //     field: "clientMasterEntityDTO.name",
  //     minWidth: 250,
  //     sortable: true,
  //     filter: true,
  //     cellRenderer: (params) => {
  //       return params.data.clientMasterEntityDTO.name == null ||
  //         params.data.clientMasterEntityDTO.name === ""
  //         ? "-"
  //         : params.data.clientMasterEntityDTO.name;
  //     },
  //   },
  //   {
  //     headerName: "Mobile No",
  //     field: "clientMasterEntityDTO.mobileNo",
  //     minWidth: 150,
  //     maxWidth: 150,
  //     sortable: true,
  //     filter: true,
  //     cellRenderer: (params) => {
  //       return params.data.clientMasterEntityDTO.mobileNo == null ||
  //         params.data.clientMasterEntityDTO.mobileNo === ""
  //         ? "-"
  //         : params.data.clientMasterEntityDTO.mobileNo;
  //     },
  //   },
  //   {
  //     headerName: "Email",
  //     field: "clientMasterEntityDTO.email",
  //     minWidth: 150,
  //     sortable: true,
  //     filter: true,
  //     cellRenderer: (params) => {
  //       return params.data.clientMasterEntityDTO.email == null ||
  //         params.data.clientMasterEntityDTO.email === ""
  //         ? "-"
  //         : params.data.clientMasterEntityDTO.email;
  //     },
  //   },
  //   {
  //     headerName: "PAN",
  //     field: "clientMasterEntityDTO.userCode",
  //     minWidth: 150,
  //     maxWidth: 150,
  //     sortable: true,
  //     filter: true,
  //     cellRenderer: (params) => {
  //       return params.data.clientMasterEntityDTO.pan == null ||
  //         params.data.clientMasterEntityDTO.pan === ""
  //         ? "-"
  //         : params.data.clientMasterEntityDTO.pan;
  //     },
  //   },
  //   {
  //     headerName: "DOB",
  //     field: "clientMasterEntityDTO.dateOfBirth",
  //     minWidth: 150,
  //     maxWidth: 150,
  //     sortable: true,
  //     filter: true,
  //     cellRenderer: (params) => {
  //       return params.data.clientMasterEntityDTO.dateOfBirth == null ||
  //         params.data.clientMasterEntityDTO.dateOfBirth === ""
  //         ? "-"
  //         : getMomentFromDate(
  //             params.data.clientMasterEntityDTO.dateOfBirth,
  //             "Date"
  //           );
  //     },
  //   },
  //   {
  //     headerName: "Gender",
  //     field: "clientMasterEntityDTO.gender",
  //     minWidth: 150,
  //     sortable: true,
  //     filter: true,
  //     cellRenderer: (params) => {
  //       return params.data.clientMasterEntityDTO.gender == null ||
  //         params.data.clientMasterEntityDTO.gender === ""
  //         ? "-"
  //         : params.data.clientMasterEntityDTO.gender;
  //     },
  //   },
  //   {
  //     headerName: "Investor Type",
  //     field: "clientMasterEntityDTO.investorType",
  //     minWidth: 150,
  //     sortable: true,
  //     filter: true,
  //     cellRenderer: (params) => {
  //       return params.data.clientMasterEntityDTO.investorType == null ||
  //         params.data.clientMasterEntityDTO.investorType === ""
  //         ? "-"
  //         : params.data.clientMasterEntityDTO.investorType;
  //     },
  //   },
  //   // {
  //   //   headerName: "Family Head",
  //   //   field: "isFamilyHead",
  //   //   minWidth: 150,
  //   //   sortable: true,
  //   //   filter: true,
  //   //   cellRenderer: (params) => {
  //   //     return params.data.isFamilyHead == null || params.data.isFamilyHead === "" ? "-" : params.data.isFamilyHead;
  //   //   },
  //   // },
  //   {
  //     headerName: "Actions",
  //     minWidth: 250,
  //     cellRenderer: (params) =>
  //       ActionButtonsFunction(params, handleTableFunction),
  //   },
  // ];

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00268"),
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
        encrypt("ClientOnboarding") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}` +
        `/${encryptData(data.lastStepId)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("ClientMasterFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };

  const handleDelete = () => {
    deleteUnit(modalData.id);
    setDeleteModalOpen(false);
  };

  return (
    <div className=" ">
      <div>
        <AgTable
          columnDefs={columnDefs}
          rowData={rowData}
          filenames="Credit_Rating"
          StyleClass="btn btn-primary"
          type="table"
          gridOptions={{
            getRowStyle,
          }}
          onSearchChange={handleSearchChange}
          onDateChange={handleDateChange}
          onExportClick={handleExportClick}
          onResetClick={handleResetClick}
          showDatePicker={false}
        />
      </div>
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
  );
}
function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        // {
        //   text: "View",
        //   icon: faEye,
        //   action: "handleView",
        //   show: true,
        // },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          disabled : params.data.stepperId == null ? true : false,
                    // disabled: currentDisabled(params.data, "Delete"),

          show: params.data.stepperId == null ? false : true,
        },
        // {
        //   text: "Delete",
        //   icon: faTrashCan,
        //   action: "handleDelete",

        // },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

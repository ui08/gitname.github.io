import { faEye, faPen, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../../util/Authenticate/Rolename";

export default function FamilyClientUngroupingList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectContent, setSelectContent] = useState([]);

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
    fetchData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.familyClientMappingList);
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
      headerName: "Family Name",
      field: "familyMasterName",
      minWidth: 250,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Client Name",
      field: "memberClientNames",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data.memberClientNames.map((item) => item);
      },

      sortable: true,
      filter: true,
    },
    {
      headerName: "Relation",
      field: "relation",
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
    } else if (action === "handleToggle") {
      setModalData([]);
      setModalData(params.data);
      setModalText(
        params.data.activeFlag == true
          ? t("Messages:toggleDeactivate")
          : t("Messages:toggleActivate")
      );
      setToggleModalOpen(true);
    }
  };
  const handleEdit = (data) => {
    console.log("ddd", data);
    onSelectionChangedother(data);
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("FamilyClientMappingFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.memberClientIds[0])}`
    );
  };

  const handleToggleStatus = async (data) => {
    console.log("lll", data.Modaldata.familyId);

    let url;
    if (data.Modaldata.activeFlag == true) {
      url = Apiurl.deactivateFamily;
    } else {
      url = Apiurl.activateFamily;
    }
    try {
      const response = await axiosInstance.get(
        `${url}${data.Modaldata.familyId}`
      );
      toast.success("Deactivated");
      fetchData();
      setToggleModalOpen(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSelectionChangedother = (event) => {
    setSelectContent(event.memberClientIds[0]);
    unGroupMembers(event.memberClientIds[0]);
  };

  const unGroupMembers = async (value) => {
    setLoading(true);
    let Data = {
      clientIds: [value],
    };
    try {
      const response = await axiosInstance.post(Apiurl.ungroupClient, Data);
      toast.success("Successfully Removed Mapping");
      setTimeout(() => {
        navigate(
          "/" +
            encrypt("FamilyClientUngroupingLanding") +
            `/${encryptData("List")}`
        );
      }, 200);
    } catch (error) {
      toast.error(error.response.data);

      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
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
          // onSelectionChanged={onSelectionChangedother}
        />
      </div>
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
        ModalType={"Toggle"}
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
        //   text: "Toggle",
        //   icon: faToggleOn,
        //   action: "handleToggle",
        //   disabled: false,
        //   show: RouteCurrentAuthorities([
        //                   userRole.Client_Master_Family_Remapping_ActiveOrInactive,
        //                 ])
        // },
        // {
        //   text: "View",
        //   icon: faEye,
        //   action: "handleView",
        //   show: RouteCurrentAuthorities([
        //     userRole.Client_Master_Family_Remapping_View,
        //   ])
        // },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: true,
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

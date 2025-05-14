import {
  faEye,
  faPen,
  faToggleOn,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import { getMomentFromDate } from "../../../util/Authenticate";

export default function OtherProductList({ UploadModalOpen }) {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
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

  const { t } = useTranslation(["Common", "Messages", "Form"]);

  useEffect(() => {
    fetchData();
  }, [UploadModalOpen]);

  const fetchData = async () => {
    setLoading(true);
    setRowData(null);

    try {
      const response = await axiosInstance.get(Apiurl.IMotherProductList);
      setLoading(false);
      const RowData = [];
      Object.values(response?.data).map((item, index) => {
        let SingleData = {
          id : item.id,
          securityID:
            item.securityID === "" || item.securityID === null
              ? `-`
              : item.securityID,
          instrumentName:
            item.instrumentName === "" || item.instrumentName === null || item.instrumentName === '"'
              ? `-`
              : item.instrumentName,
          instrumentFullName:
            item.instrumentFullName === "" || item.instrumentFullName === null || item.instrumentFullName === '"'
              ? `-`
              : item.instrumentFullName,
          instrumentDescription:
            item.instrumentDescription === "" || item.instrumentDescription === '"' ||
            item.instrumentDescription === null
              ? `-`
              : item.instrumentDescription,
          productName:
            item.productName === "" || item.productName === null
              ? `-`
              : item.productName,
          assetName:
            item.assetName === "" || item.assetName === null
              ? `-`
              : item.assetName,
          taxAssetName:
            item.taxAssetName === "" || item.taxAssetName === null || item.taxAssetName === '"'
              ? `-`
              : item.taxAssetName,
          entityAssetName:
            item.entityAssetName === "" || item.entityAssetName === null || item.entityAssetName === '"'
              ? `-`
              : item.entityAssetName,
          instrumentCategoryName:
            item.instrumentCategoryName === "" ||
            item.instrumentCategoryName === null
              ? `-`
              : item.instrumentCategoryName,
          serviceProviderNameAmcIssuerName:
            item.serviceProviderNameAmcIssuerName === "" ||
            item.serviceProviderNameAmcIssuerName === null
              ? `-`
              : item.serviceProviderNameAmcIssuerName,
          isin: item.isin === "" || item.isin === null ? `-` : item.isin,
          rtaCode:
            item.rtaCode === "" || item.rtaCode === null ? `-` : item.rtaCode,
          listingStatus:
            item.listingStatus === "" || item.listingStatus === null
              ? `-`
              : item.listingStatus,
          benchmarkIndice:
            item.benchmarkIndice === "" || item.benchmarkIndice === null
              ? `-`
              : item.benchmarkIndice,
          pricingMethod:
            item.pricingMethod === "" || item.pricingMethod === null
              ? `-`
              : item.pricingMethod,
          instrumentRisk:
            item.instrumentRisk === "" || item.instrumentRisk === null
              ? `-`
              : item.instrumentRisk,
          issueOpenDate:
            item.issueOpenDate === "" || item.issueOpenDate === null
              ? `-`
              : getMomentFromDate(item.issueOpenDate, "Date"),
          issueCloseDate:
            item.issueCloseDate === "" || item.issueCloseDate === null
              ? `-`
              : getMomentFromDate(item.issueCloseDate, "Date"),
          maturityDate:
            item.maturityDate === "" || item.maturityDate === null
              ? `-`
              : getMomentFromDate(item.maturityDate, "Date"),
          faceValue:
            item.faceValue === "" || item.faceValue === null
              ? `-`
              : item.faceValue,
          status:
            item.status === "" || item.status === null ? `-` : item.status,
        };
        RowData.push(SingleData);
      });
      setRowData(RowData);
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
      // valueGetter: "node.rowIndex + 1",
      valueGetter: (params) => {
        return params.node?.rowIndex != null ? params.node.rowIndex + 1 : '';
      },      minWidth: 120,
      maxWidth: 120,
      sortable : false
    },
    // {
    //   headerName: "Id",
    //   field: "id",
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Security Id",
      field: "securityID",
      // maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Instrument Name",
      field: "instrumentName",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Instrument Full Name",
      field: "instrumentFullName",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Service Provider Name / AMC/ Issuer Name",
      field: "serviceProviderNameAmcIssuerName",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Pricing Method",
      field: "pricingMethod",

      maxWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Asset Name",
      field: "assetName",
      maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Product Name",
      field: "productName",
      minWidth: 210,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Tax Asset Name",
      field: "taxAssetName",
      maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Entity Asset Name",
      field: "entityAssetName",
      maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Instrument Description",
      field: "instrumentDescription",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Instrument Category Name",
      field: "instrumentCategoryName",
      minWidth: 210,
      sortable: true,
      filter: true,
    },

    {
      headerName: "ISIN",
      field: "isin",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "RTA Code",
      field: "rtaCode",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Listing Status",
      field: "listingStatus",
      maxWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Benchmark Indice",
      field: "benchmarkIndice",
      minWidth: 210,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Instrument Risk",
      field: "instrumentRisk",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issue Open Date Risk",
      field: "issueOpenDate",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issue Close Date",
      field: "issueCloseDate",
      maxWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Maturity Date",
      field: "maturityDate",
      maxWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Face Value",
      field: "faceValue",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 150,
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
    } else if (action === "handleToggle") {
      setModalData([]);
      setModalData(params.data);
      setModalText(
        params.data.status === "Active"
          ? t("Messages:toggleDeactivate")
          : t("Messages:toggleActivate")
      );
      setToggleModalOpen(true);
    }
  };
  const handleEdit = (data) => {
    navigate(
      "/" +
        encrypt("OtherProductFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("OtherProductFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };

  const handleToggleStatus = async (data) => {
    console.log("lll", data.Modaldata.id);
let url = data.Modaldata.status === "Active" ? Apiurl.IMDeactive : Apiurl.IMReactive
    try {
      const response = await axiosInstance.get(
        `${url}${data.Modaldata.id}`
      );
      toast.success("Deactivated");
      setToggleModalOpen(false);
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
    <div className=" ">
      <div>
        <AgTable
          columnDefs={columnDefs}
          rowData={rowData}
          filenames={
            "Instrument_Other_List_" +
            getMomentFromDate(new Date(), "Date&Time")
          }
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
        {
          text: "Toggle",
          icon: faToggleOn,
          action: "handleToggle",
          disabled: false,

          show: RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Activate_DeActivate]),

          // disabled: currentDisabled(params.data, "View"),
        },

        {
          text: "View",
          icon: faEye,
          action: "handleView",
          disabled: false,
          show: RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Details]),

          // show: currentRealmRole(, [userUIRole.iap_superadmin]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Edit]),
         
          disabled: false,
        },
        // {
        //   text: "Delete",
        //   icon: faTrashCan,
        //   action: "handleDelete",
        //   disabled: currentDisabled(params.data, "Delete"),
        //   disabled: currentDisabled(params.data, [
        //     "Pending_For_Approval",
        //     "Approved",
        //   ]),
        // },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

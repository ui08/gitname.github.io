import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

export default function ClientMappingList({UploadModalOpen}) {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
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

  const hasRun = useRef(false); //To prevent multiple reders of useEffect

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
      const response = await axiosInstance.get(Apiurl.remappingView);
      setLoading(false);
      setRowData(response.data);
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
      headerName: "Client Name",
      field: "clientName",
      cellRenderer: (params) =>
        params.data?.clientName + "-" + params.data?.pan,
      sortable: true,
      filter: true,
      minWidth: 250,
    },
    {
      headerName: "Client Login ID",
      field: "clientLoginId",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "RM Name",
      field: "currentUserName",
      cellRenderer: (params) =>
        params.data?.currentUserName == "" || params.data?.currentUserName == null ? "-" : params.data?.currentUserName,
      sortable: true,
      filter: true,
    },
    {
      headerName: "RM Email",
      field: "currentUserEmail",
      cellRenderer: (params) =>
        params.data?.currentUserEmail == "" || params.data?.currentUserEmail == null ? "-" : params.data?.currentUserEmail,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Re-Mapping Date",
      field: "remappingDate",
      cellRenderer: (params) =>
        params.data?.remappingDate
          ? moment(params.data?.remappingDate).format("DD/MM/YYYY")
          : "",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Previous Mapped RM User Name",
      field: "previousMappedUserName",
      cellRenderer: (params) =>
        params.data?.previousMappedUserName == "" || params.data?.previousMappedUserName == null ? "-" : params.data?.previousMappedUserName,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Remark",
      field: "remark",
      cellRenderer: (params) =>
        params.data?.remark == "" || params.data?.remark == null ? "-" : params.data?.remark,
      sortable: true,
      filter: true,
    },
  ];

  //EDIT USER
  const navigate = useNavigate();

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
    </div>
  );
}

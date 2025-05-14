import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

export default function CommissionUploadViewReport({type}) {
  // const [rowData, setRowData] = useState();
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

  const [rowData, setRowData] = useState([
    {
      schemeName : "HDFC Large Cap",
      year1 : "0.75",
      year2 : "0.5",
      year3 : '0.5'
    },
    {
      schemeName : "HDFC Flexi Cap",
      year1 : "0.75",
      year2 : "0.5",
      year3 : '0.5'
    },
    {
      schemeName : "HDFC Mid-Cap Opportuinities Gr.",
      year1 : "0.75",
      year2 : "0.5",
      year3 : '0.5'
    },
    {
      schemeName : "HDFC Focused 30",
      year1 : "0.75",
      year2 : "0.5",
      year3 : '0.5'
    }
  ])

  const [rowDataAIF, setRowDataAIF] = useState([
    {
      schemeName : "Abakkus Growth Fund - 1",
      upfront : "1%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    },
    {
      schemeName : "Abakkus Emerging Opportuinities Fund - 1",
      upfront : "1.5%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    },
    {
      schemeName : "Abakkus Growth Fund - 2",
      upfront : "1%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    },
    {
      schemeName : "Abakkus Diversified Alpha Fund",
      upfront : "2%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    },
    {
      schemeName : "Abakkus Diversified Alpha Fund - 2",
      upfront : "2%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    }
  ])

  const [rowDataPMS, setRowDataPMS] = useState([
    {
      schemeName : "Abakkus All Cap Approach",
      upfront : "1%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    },
    {
      schemeName : "Abakkus Emerging Opportuinities Approach",
      upfront : "1.5%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    },
    {
      schemeName : "Abakkus Diversified Alpha Approach",
      upfront : "1%",
      year1 : "0.67",
      year2 : "0.75",
      year3 : '1.25'
    },
  ])

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.allClientsList}`);
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

  

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Scheme Name",
      field: "schemeName",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 1 (%)",
      field: "year1",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 2 (%)",
      field: "year2",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 3 (%)",
      field: "year3",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
  ];

  const columnDefsAIF = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "AIF Scheme Name",
      field: "schemeName",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Upfront Percentage %",
      field: "upfront",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 1 (%)",
      field: "year1",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 2 (%)",
      field: "year2",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 3 (%)",
      field: "year3",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
  ];

  const columnDefsPMS = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "PMS / AIF Scheme Name",
      field: "schemeName",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Upfront Percentage %",
      field: "upfront",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 1 (%)",
      field: "year1",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 2 (%)",
      field: "year2",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Year 3 (%)",
      field: "year3",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
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

 
  return (
    <div className=" ">
      <div>
        <AgTable
          columnDefs={type == "AIF" ? columnDefsAIF :  type == "PMS" ? columnDefsPMS : columnDefs}
          rowData={type == "AIF" ? rowDataAIF : type == "PMS" ? rowDataPMS : rowData}
          filenames="Commission Upload Master"
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


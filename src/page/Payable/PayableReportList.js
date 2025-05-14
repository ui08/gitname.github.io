import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AgTable from "../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";

export default function PayableDefineList() {
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
      clientCode : "14.82",
      clientName : "Sachin Agarwal - AGDPK4718L",
      rmCode : "MW123",
      rmName : "Manjo Waghle",
      amcName : "Abakkus Asset Manager LLP",
      securityId : "PMS4789",
      securityName : "Abakkus All Cap Approach",
      commission : "50000",
      percentPayable : "50%",
      payableAmount : "25000"

    }
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
    // {
    //   headerName: "Client Code",
    //   field: "clientCode",
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
      
    // },
    // {
    //   headerName: "Client Name - PAN",
    //   field: "clientName",
    //   minWidth: 250,
    //   sortable: true,
    //   filter: true,
      
    // },
    // {
    //   headerName: "RM Code",
    //   field: "rmCode",
    //   minWidth: 150,
    //   maxWidth: 150,      sortable: true,
    //   filter: true,
      
    // },
    // {
    //   headerName: "RM Name",
    //   field: "rmName",
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
     
    // },
    {
      headerName: "AMC Name",
      field: "amcName",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
     
    },
    {
      headerName: "Security ID",
      field: "securityId",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
     
    },
    {
      headerName: "Security Name",
      field: "securityName",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Upfront Commission Received",
      field: "commission",
      minWidth: 150,
      sortable: true,
      filter: true,
     
    },
    {
      headerName: "% Payable",
      field: "percentPayable",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Payable Amt.",
      field: "payableAmount",
      minWidth: 150,
      sortable: true,
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


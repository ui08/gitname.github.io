import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";


export default function IncentiveReportListRM() {
  // const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedValuePC, setSelectedValuePC] = useState("");
  const [selectedValueFN, setSelectedValueFN] = useState("");
  const [selectedValueRM, setSelectedValueRM] = useState("");
  const [selectedValuePCS, setSelectedValuePCS] = useState("");
  const [selectedValueSN, setSelectedValueSN] = useState("");
  const [showProductTableModal, setShowProductTableModal] = useState(false);
  const [showFamilyTableModal, setShowFamilyTableModal] = useState(false);
  const [showFamilyProductTableModal, setShowFamilyProductTableModal] = useState(false);
  const [showSecurityTableModal, setShowSecurityTableModal] = useState(false);
  const [showRMTable, setShowRMTable] = useState(false);
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

  const handleViewByProductCategory = (name) => {
    setSelectedValuePC(name)
    setShowProductTableModal(true)
  }

  

  const columnDefs = [
     {
       headerName: t("Common:App_lms_Common_00006"),
       valueGetter: "node.rowIndex + 1",
       minWidth: 120,
       maxWidth: 120,
     },
     {
       headerName: "Product Category",
       field: "productCategory",
       minWidth: 150,
       sortable: true,
       filter: true,
 
       cellRenderer: (params) => {
         const category = params.value;
       
         return (
           <a
             href="#"
             onClick={(e) => {
               e.preventDefault();
               handleViewByProductCategory(category);
             }}
           >
             {params.value}
           </a>
         );
     
       },
       
     },
     {
       headerName: "From Date",
       field: "fromDate",
       minWidth: 150,
       sortable: true,
       filter: true,
      
     },
     {
       headerName: "To Date",
       field: "toDate",
       minWidth: 150,
       maxWidth: 150,      sortable: true,
       filter: true,
       
     },
     
     {
       headerName: "Upfront Commission",
       field: "upfrontCommission",
       cellClass: "textright",
      headerClass: "ag-right-aligned-header",
       minWidth: 150,
       maxWidth: 150,      sortable: true,
       filter: true,
      
     },
     {
       headerName: "Trail Commission",
       field: "trailCommission",
       cellClass: "textright",
      headerClass: "ag-right-aligned-header",
       minWidth: 150,
       maxWidth: 150,      sortable: true,
       filter: true,
      
     },
     {
       headerName: "Total Commission",
       field: "totalCommission",
       cellClass: "textright",
      headerClass: "ag-right-aligned-header",
       minWidth: 150,
       sortable: true,
       filter: true,
       
     },
     
   ];
 
   const [rowData, setRowData] = useState([
     {
       productCategory : "Equity",
       toDate : "28/02/2025",
       fromDate : "01/02/2025",
       upfrontCommission : "5,00,000",
       trailCommission : "0",
       totalCommission : "5,00,000"
     },
     {
       productCategory : "Bond",
       toDate : "28/02/2025",
       fromDate : "01/02/2025",
       upfrontCommission : "7,50,000",
       trailCommission : "0",
       totalCommission : "7,50,000"
     },
    
     {
       productCategory : "MF",
       toDate : "28/02/2025",
       fromDate : "01/02/2025",
       upfrontCommission : "0",
       trailCommission : "25,00,000",
       totalCommission : "25,00,000"
     },
     {
       productCategory : "AIF",
       toDate : "28/02/2025",
       fromDate : "01/02/2025",
       upfrontCommission : "1,00,000",
       trailCommission : "12,00,000",
       totalCommission : "22,00,000"
     },
     {
       productCategory : "PMS",
       toDate : "28/02/2025",
       fromDate : "01/02/2025",
       upfrontCommission : "15,00,000",
       trailCommission : "13,00,000",
       totalCommission : "28,00,000"
     },
     
   ])

   const columnDefsProductType = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Product Category",
      field: "productCategory",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "From Date",
      field: "fromDate",
      minWidth: 150,
      sortable: true,
      filter: true,
     
    },
    {
      headerName: "To Date",
      field: "toDate",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Family Name",
      field: "familyName",
      minWidth: 250,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const name = params.value;
       
        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleViewByRMName(name);
            }}
          >
            {params.value}
          </a>
        );
      
      },
      
    },
    {
      headerName: "Client Name",
      field: "clientName",
      minWidth: 250,
      sortable: true,
      filter: true,
      
    },
  
    
    
    {
      headerName: "Upfront Commission",
      field: "upfrontCommission",
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
     
    },
    {
      headerName: "Trail Commission",
      field: "trailCommission",
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
     
    },
    {
      headerName: "Total Commission",
      field: "totalCommission",
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    
  ];

 const [rowDataProductType, setRowDataProductType] = useState([
     {
       
       productCategory : "PMS",
       fromDate : "01/02/2025",
       toDate : "28/02/2025",
       familyName : "Saha Family",
       clientName : "Amit Shah",      
       upfrontCommission : "0",
       trailCommission : "12,587",
       totalCommission : "12,587"
     },
    
     {
       productCategory : "PMS",      
       fromDate : "01/02/2025",
       toDate : "28/02/2025",
       familyName : "Viren Joshi Family",
       clientName : "Smita Joshi",   
       upfrontCommission : "2,147",
       trailCommission : "13,896",
       totalCommission : "16,043"
     },
   
   ])

  
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

        <AppModal
                isOpen={showProductTableModal}
                onClose={() => setShowProductTableModal(false)}
                // handleAction={handleFileUpload}
                Modalsize={"xl"}
                buttonConfigs={[]}
                ModalTitle = {"Product Category" + " ->" + selectedValuePC}
                ModalBody={
                 
                  <AgTable
          columnDefs={columnDefsProductType}
          rowData={ rowDataProductType}
          filenames="Product_Type"
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
        
                }
              />
              
      </div>
    
    </div>
  );
}


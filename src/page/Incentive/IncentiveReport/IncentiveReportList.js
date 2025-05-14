import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

export default function IncentiveReportList() {
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

   const handleViewByRMName = (name) => {
    setSelectedValueRM(name)
    setShowRMTable(true)
  }

  const handleViewByFamily = (name) => {
    setSelectedValueFN(name)
    setShowFamilyTableModal(true)
  }

  const handleViewByFamilyProduct = (name) => {
    setSelectedValuePCS(name)
    setShowFamilyProductTableModal(true)
  }

  const handleViewBySecurity = (name) => {
    setSelectedValueSN(name)
    setShowSecurityTableModal(true)
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
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      upfrontCommission : "5,00,000",
      trailCommission : "0",
      totalCommission : "5,00,000"
    },
    {
      productCategory : "Bond",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      upfrontCommission : "7,50,000",
      trailCommission : "0",
      totalCommission : "7,50,000"
    },
    {
      productCategory : "MF",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      upfrontCommission : "0",
      trailCommission : "25,00,000",
      totalCommission : "25,00,000"
    },
    {
      productCategory : "AIF",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      upfrontCommission : "10,00,000",
      trailCommission : "12,00,000",
      totalCommission : "22,00,000"
    },
    {
      productCategory : "PMS",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
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
      headerName: "RM Name",
      field: "rmName",
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
      headerName: "RM ID",
      field: "rmId",
      minWidth: 250,
      sortable: true,
      filter: true,
      
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
      rmName : "Manoj Waghle",
      rmId : "MW123",
      productCategory : "MF",
      commissionReceivable : "8,000",
      toDate : "28/02/2025",
      fromDate : "01/02/2025",
      productCategory : "MF",
      upfrontCommission : "0",
      trailCommission : "12,587",
      totalCommission : "12,587"
      
    },
    {
      rmName : "Harshad Makhana",
      rmId : "HM147",
      productCategory : "MF",
      commissionReceivable : "15,000",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      productCategory : "MF",
      upfrontCommission : "0",
      trailCommission : "13,896",
      totalCommission : "16,043"
    },
   
    
  
  ])

  const columnDefsRM = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
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
              handleViewByFamily(name);
            }}
          >
            {params.value}
          </a>
        );
     
      },
      
    },
    {
      headerName: "RM Name",
      field: "rmName",
      minWidth: 250,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "RM ID",
      field: "rmId",
      minWidth: 250,
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
      headerName: "Product Category",
      field: "productCategory",
      minWidth: 150,
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

  const [rowDataRM, setRowDataRM] = useState([
    {
      familyName : "Amit Shah Family",
      rmName : "Manoj Waghle",
      rmId : "MW123",
      productCategory : "MF",
      toDate : "28/02/2025",
      fromDate : "01/02/2025",
      productCategory : "MF",
      upfrontCommission : "0",
      trailCommission : "6,258",
      totalCommission : "6,258"
    },
    {
      familyName : "Viren Joshi Family",
      rmName : "Manoj Waghle",
      rmId : "MW123",
      productCategory : "MF",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      productCategory : "MF",
      upfrontCommission : "0",
      trailCommission : "6,329",
      totalCommission : "6,329"
    },
   
   
  
  ])

  const columnDefsFamily = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Client Name",
      field: "clientName",
      minWidth: 250,
      cellRenderer: (params) => {
        const name = params.value;
       
        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleViewByFamilyProduct(name);
            }}
          >
            {params.value}
          </a>
        );
      
      },
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Family Name",
      field: "familyName",
      minWidth: 250,
      sortable: true,
      filter: true,
      
      
    },
    {
      headerName: "RM Name",
      field: "rmName",
      minWidth: 250,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "RM ID",
      field: "rmId",
      minWidth: 250,
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
      headerName: "Product Category",
      field: "productCategory",
      minWidth: 150,
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

  const [rowDataFamily, setRowDataFamily] = useState([
    {
      clientName : "Amit Shah",
      familyName : "Amit Shah Family",
      rmName : "Manoj Waghle",
      rmId : "MW123",
      productCategory : "MF",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      productCategory : "MF",
      upfrontCommission : "0",
      trailCommission : "3,129",
      totalCommission : "3,129"
    },
   
    {
      clientName : "Hetal Shah",
      familyName : "Amit Shah Family",
      rmName : "Manoj Waghle",
      rmId : "MW123",
      productCategory : "MF",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      productCategory : "MF",
      upfrontCommission : "0",
      trailCommission : "3,129",
      totalCommission : "3,129"
    },
  
  ])

  const columnDefsFamilyProduct = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Security Name",
      field: "securityName",
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
              handleViewBySecurity(name);
            }}
          >
            {params.value}
          </a>
        );
     
      },
    },
    {
      headerName: "Security ID",
      field: "securityId",
      minWidth: 250,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Product Category",
      field: "productCategory",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Family Name",
      field: "familyName",
      minWidth: 250,
      sortable: true,
      filter: true,
      
      
    },
    {
      headerName: "Client Name",
      field: "clientName",
      minWidth: 250,
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
      headerName: "RM Name",
      field: "rmName",
      minWidth: 250,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "RM ID",
      field: "rmId",
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
    
    
  ];

  const [rowDataFamilyProduct, setRowDataFamilyProduct] = useState([
    {
      securityName : "Franklin India Opportunities Gr",
      securityId : "INF090I01841",
      productCategory : "MF",
      familyName : "Amit Shah Family",
      clientName : "Amit Shah",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      rmName : "Manoj Waghle",
      rmId : "MW123",
      upfrontCommission : "-",
      trailCommission : "2,300",
    },
   
    {
      securityName : "Motilal Oswal Flexicap Reg Gr",
      securityId : "INF247L01478",
      productCategory : "MF",
      familyName : "Amit Shah Family",
      clientName : "Amit Shah",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      rmName : "Manoj Waghle",
      rmId : "MW123",
      upfrontCommission : "-",
      trailCommission : "1,478",
    },
    {
      securityName : "Axis Multicap",
      securityId : "INF846K013E0",
      productCategory : "MF",
      familyName : "Amit Shah Family",
      clientName : "Amit Shah",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      rmName : "Manoj Waghle",
      rmId : "MW123",
            upfrontCommission : "-",
      trailCommission : "1,078",
    },
  ])

  const columnDefsSecurity = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Security Name",
      field: "securityName",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Security ID",
      field: "securityId",
      minWidth: 250,
      sortable: true,
      filter: true,
      
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
      headerName: "Transaction Type",
      field: "transactionType",
      minWidth: 250,
      sortable: true,
      filter: true,
      
      
    },
    {
      headerName: "Date of Transaction",
      field: "date",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Amount",
      field: "amount",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
   
   
    {
      headerName: "Family Name",
      field: "familyName",
      minWidth: 250,
      sortable: true,
      filter: true,
      
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
    
    
  ];

  const [rowDataSecurity, setRowDataSecurity] = useState([
    {
      securityName : "Franklin India Opportunities Gr",
      securityId : "INF090I01841",
      productCategory : "MF",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      transactionType : "Purchase",
      date : "7-Aug-23",
      amount : "1,00,000",
      familyName : "Amit Shah Family",
      clientName : "Amit Shah",
            upfrontCommission : "-",
      trailCommission : "750",
    },
   
    {
      securityName : "Franklin India Opportunities Gr",
      securityId : "INF090I01841",
      productCategory : "MF",
      fromDate : "01/02/2025",
      toDate : "28/02/2025",
      transactionType : "Additional Purchase",
      date : "15-Jan-25",
      amount : "1,50,000",
      familyName : "Amit Shah Family",
      clientName : "Amit Shah",
      upfrontCommission : "-",
      trailCommission : "253",
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
               <AppModal
                isOpen={showRMTable}
                onClose={() => setShowRMTable(false)}
                // handleAction={handleFileUpload}
                Modalsize={"xl"}
                ModalTitle = {"RM Name" + " ->" + selectedValueRM}
                buttonConfigs={[]}
                ModalBody={
                 
                  <AgTable
          columnDefs={ columnDefsRM}
          rowData={ rowDataRM}
          filenames="RM_Name"
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
               <AppModal
                isOpen={showFamilyTableModal}
                onClose={() => setShowFamilyTableModal(false)}
                // handleAction={handleFileUpload}
                Modalsize={"xl"}
                buttonConfigs={[]}
                ModalTitle = {"Family Name" + " ->" + selectedValueFN}
                ModalBody={
                 
                  <AgTable
          columnDefs={ columnDefsFamily}
          rowData={ rowDataFamily}
          filenames="Family_Name"
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
              <AppModal
                isOpen={showFamilyProductTableModal}
                onClose={() => setShowFamilyProductTableModal(false)}
                // handleAction={handleFileUpload}
                Modalsize={"xl"}
                buttonConfigs={[]}
                ModalTitle = {"Client Name" + " ->" + selectedValuePCS}
                ModalBody={
                 
                  <AgTable
          columnDefs={ columnDefsFamilyProduct}
          rowData={ rowDataFamilyProduct}
          filenames="Family_Product_Name"
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
               <AppModal
                isOpen={showSecurityTableModal}
                onClose={() => setShowSecurityTableModal(false)}
                // handleAction={handleFileUpload}
                Modalsize={"xl"}
                buttonConfigs={[]}
                ModalTitle = {"Security Name" + " ->" + selectedValueSN}
                ModalBody={
                 
                  <AgTable
          columnDefs={ columnDefsSecurity}
          rowData={ rowDataSecurity}
          filenames="Security_Name"
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


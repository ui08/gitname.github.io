import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { getMomentFromDate } from "../../../util/Authenticate";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";

const ViewMoreTableModal = ({
  isOpen,
  onClose,
  handleActon,
  ModalTitle,
  Modalsize,
  buttonConfigs,
  Modaldata,
  ModalBody,
  ModalType,
  ReactOdometervalue,
  ModalScrollable,
  value
}) => {

    const { t } = useTranslation(["Common", "Messages", "Form"]);
  

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const columnDefs = [
    {
      headerName: "Scheme Name",
      field: "SchemeName",
      minWidth: 100,
      maxWidth: 120,
    },
    {
      headerName: "Invest",
      field: "Invest",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.Invest);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "DIV Paid",
      field: "DIVpaid",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.DIVPaid);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "DIV Reinv",
      field: "DivReinv",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.DIVReinv);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
   
    {
      headerName: "AUM",
      field: "aum",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.aum);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "XIRR Return(%)",
      field: "XIRR",
      minWidth: 250,
      sortable: true,
      filter: true,
    }
    
  ];

  const [rowData, setRowData] = useState([
      {
        SchemeName: "Aditya Birla Sun Life Banking & PSU Debt Fund",
        Invest: 1200000,
        DIVpaid: 0.0,
        DivReinv: 0.0,
        aum: 200000,
        XIRR: 3.8
        
      },
      
    ]);

     const ClientwiseSIPcolumnDefs = [
        {
          headerName: "Sr.no",
          valueGetter: "node.rowIndex + 1",
          minWidth: 120,
          maxWidth: 120,
        },
        {
          headerName: "Folio Number",
          field: "folioNumber",
          minWidth: 120,
        },
    
        {
          headerName: "Sip Frequency",
          field: "sipFrequency",
          minWidth: 120,
          maxWidth: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "sipRegistrationNo",
          field: "sipRegistrationNo",
    
          minWidth: 210,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Sip Start Date",
          field: "sipStartDate",
    
          minWidth: 215,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Sip End Date",
          field: "sipEndDate",
    
          minWidth: 215,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Sip Amount",
          field: "sipAmount",
          cellRenderer: (params) => {
            return formattedAmount(params.data?.sipAmount);
          },
          sortable: true,
          minWidth: 150,
          filter: true,
          cellClass: "textright",
      headerClass: "ag-right-aligned-header",
        },
        {
          headerName: "Sip Date",
          field: "sipDate",
    
          minWidth: 215,
          sortable: true,
          filter: true,
        },
    
        {
          headerName: "Acc Details",
          field: "accDetails",
    
          sortable: true,
          minWidth: 150,
          filter: true,
        },
    
        {
          headerName: "XIRR Return(%)",
          field: "xirr",
          cellRenderer: (params) => {
            return formattedAmount(params.data?.xirr);
          },
          sortable: true,
          minWidth: 150,
          filter: true,
          cellClass: "textright",
      headerClass: "ag-right-aligned-header",
        },
      ];
      const [ClientwiseSIProwData, setClientwiseSIPRowData] = useState([
        {
          srNo: 1,
          schemeName: "Bajaj Finserv Banking and PSU Fund",
          folioNumber: "9844322344",
          sipFrequency: "Monthly",
          sipRegistrationNo: "2385454545",
          sipStartDate: "1/1/2025",
          sipEndDate: "12/31/2027",
          sipAmount: 20000,
          sipDate: "2/10/2025",
          accDetails: "HDFC-4233",
          xirr: 15.0,
        },
      ]);
  
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      size={Modalsize}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={ModalScrollable ? true : false}
    >
     
        <Modal.Header closeButton>
          <Modal.Title>{ModalTitle}</Modal.Title>
        </Modal.Header>
      
      <Modal.Body style={{ minHeight: "10vh" }}>
      <AgTable
                      columnDefs={value == "AUM" ? columnDefs : ClientwiseSIPcolumnDefs}
                      rowData={value == "AUM" ? rowData : ClientwiseSIProwData }
                      filenames={"" + getMomentFromDate(new Date(), "Date&Time")}
                      StyleClass="btn btn-primary"
                      type="table"
                      gridOptions={{
                        getRowStyle,
                      }}
                    />
      
      </Modal.Body>
     
    </Modal>
  );
};

export default ViewMoreTableModal;

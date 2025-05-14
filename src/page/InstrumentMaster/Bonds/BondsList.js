import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputText from "../../../Component/ComponentsInput/InputText";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../../util/apiurl";
import { getMomentFromDate } from "../../../util/Authenticate";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";
import { InstrumentMasterPageurl } from "../InstrumentMasterPageurl";

export default function BondsList() {
  const [rowData, setRowData] = useState();
  const [totalElements, setTotalElements] = useState(2);

  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  // custom pageable

  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    fetchData(currentPage, perPagesize);
  }, []);
  // Callback for Search
  const [SearchValue, setSearchValue] = useState();
  const handleSearchChange = (value) => {
    console.log("Search", value);
    setSearchValue(value);
  };

  // Callback for Date Picker
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

 const [ExportClickvalue, setExportClickvalue] = useState();
   // Callback for Export Button
   const handleExportClick = () => {
     setExportClickvalue(true);
     setResetClickvalue(false);
     setTimeout(() => {
       setExportClickvalue(false);
       setResetClickvalue(false);
     }, 100);
   };
 
   const [ResetClickvalue, setResetClickvalue] = useState();
 
   const handleResetClick = () => {
     setExportClickvalue(false);
     setResetClickvalue(true);
     setTimeout(() => {
       setExportClickvalue(false);
       setResetClickvalue(false);
     }, 100);
   };

  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const handlePageChange = useCallback(
    (page, perPagesizeX) => {
      setCurrentPage(page);

      getfetchData(page, perPagesizeX);
    },
    [perPagesize]
  );

  const handlePageSizeChange = useCallback((x) => {
    setPerPagesize(x.target.value);
    setCurrentPage(1);
    getfetchData(1, x.target.value);
  }, []);
  const getfetchData = (getcurrentPage, getperPagesize) => {
    fetchData(getcurrentPage, getperPagesize);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  } = useForm();
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };
  const fetchData = async (getcurrentPage, getperPagesize) => {
    setRowData(null);

    setRowLoading(false);
    setExportClickvalue(false);
    setResetClickvalue(false);
    setSearchValue("");
    try {
      const response = await axiosInstance.get(
        Apiurl.IMBondsList + `?page=${getcurrentPage}&size=${getperPagesize}`
      );
      // custom pageable
      setRowLoading(true);
      setPerPagesize(response?.data?.size);
      setTotalPages(response?.data?.totalPages);

      setTotalElements(response?.data?.totalElements);

      const RowData = [];
      let pageNumber = response?.data?.pageable.pageNumber;
      let pageSize = response?.data?.pageable.pageSize;
      Object.values(response?.data?.content).map((item, index) => {
        let SingleData = {
          srNo: pageNumber * pageSize + index + 1,
          issueId:
            item.issueId === "" || item.issueId === null ? `-` : item.issueId,
          isin: item.isin === "" || item.isin === null ? `-` : item.isin,
          figi: item.figi === "" || item.figi === null ? `-` : item.figi,
          bloombergTicker:
            item.bloombergTicker === "" || item.bloombergTicker === null
              ? `-`
              : item.bloombergTicker,
          cfi: item.cfi === "" || item.cfi === null ? `-` : item.cfi,
          convertibility:
            item.convertibility === "" || item.convertibility === null
              ? `-`
              : item.convertibility == 0 ? "No" : 'Yes',
          bondType:
            item.bondType === "" || item.bondType === null
              ? `-`
              : item.bondType,
          updatingDate:
            item.updatingDate === "" || item.updatingDate === null
              ? `-`
              : getMomentFromDate(item.updatingDate, "Date"),
          couponFrequency:
            item.couponFrequency === "" || item.couponFrequency === null
              ? `-`
              : item.couponFrequency,
          currencyId:
            item.currencyId === "" || item.currencyId === null
              ? `-`
              : item.currencyId,
          currency:
            item.currency === "" || item.currency === null
              ? `-`
              : item.currency,
          cusip: item.cusip === "" || item.cusip === null ? `-` : item.cusip,
          endOfPlacementDate:
            item.endOfPlacementDate === "" || item.endOfPlacementDate === null
              ? `-`
              : getMomentFromDate(item.endOfPlacementDate, "Date"),
          startOfTrading:
            item.startOfTrading === "" || item.startOfTrading === null
              ? `-`
              : item.startOfTrading,
          estartOfPlacementDate:
            item.estartOfPlacementDate === "" ||
            item.estartOfPlacementDate === null
              ? `-`
              : getMomentFromDate(item.estartOfPlacementDate, "Date"),
          issueNameEng:
            item.issueNameEng === "" || item.issueNameEng === null
              ? `-`
              : item.issueNameEng,
          earlyRedemptionDate:
            item.earlyRedemptionDate === "" || item.earlyRedemptionDate === null
              ? `-`
              : getMomentFromDate(item.earlyRedemptionDate, "Date"),
          issuerId:
            item.issuerId === "" || item.issuerId === null
              ? `-`
              : item.issuerId,
          guarantorId:
            item.guarantorId === "" || item.guarantorId === null
              ? `-`
              : item.guarantorId,
          integralMultiple:
            item.integralMultiple === "" || item.integralMultiple === null
              ? `-`
              : item.integralMultiple,
          issuekindId: item.issuekind === null ? `-` : item.issuekind,
          margin: item.margin === null ? `-` : item.margin,
          maturityDate:
            item.maturityDate === "" || item.maturityDate === null
              ? `-`
              : getMomentFromDate(item.maturityDate, "Date"),
          calculationAmount:
            item.calculationAmount === "" || item.calculationAmount === null
              ? `-`
              : item.calculationAmount,
          issueNumber:
            item.issueNumber === "" || item.issueNumber === null
              ? `-`
              : item.issueNumber,
          referrenceRate:
            item.referrenceRate === "" || item.referrenceRate === null
              ? `-`
              : item.referrenceRate,
          settlementDate:
            item.settlementDate === "" || item.settlementDate === null
              ? `-`
              : getMomentFromDate(item.settlementDate, "Date"),
          stateRegistrationNumber:
            item.stateRegistrationNumber === "" ||
            item.stateRegistrationNumber === null
              ? `-`
              : item.stateRegistrationNumber,
          issueStatus: item.issueStatus === null ? `-` : item.issueStatus,
          issueSubtypeId: item.issueSubtype === null ? `-` : item.issueSubtype,
          subordinatedDebt:
            item.subordinatedDebt === "" || item.subordinatedDebt === null
              ? `-`
              : item.subordinatedDebt == 0 ? "No" : 'Yes',
          sovereignBondsTypeId:
            item.sovereignBondsTypeId === "" ||
            item.sovereignBondsTypeId === null
              ? `-`
              : item.sovereignBondsTypeId,
          couponRate:
            item.couponRate === "" || item.couponRate === null
              ? `-`
              : item.couponRate,
          kind: item.kind === "" || item.kind === null ? `-` : item.kind,
          issuerCountry:
            item.issuerCountry === "" || item.issuerCountry === null
              ? `-`
              : item.issuerCountry,
          issuerRegion:
            item.issuerRegion === "" || item.issuerRegion === null
              ? `-`
              : item.issuerRegion,
          issuerSubregion:
            item.issuerSubregion === "" || item.issuerSubregion === null
              ? `-`
              : item.issuerSubregion,
          issuer:
            item.issuer === "" || item.issuer === null ? `-` : item.issuer,
          nextOfferDate:
            item.nextOfferDate === "" || item.nextOfferDate === null
              ? `-`
              : getMomentFromDate(item.nextOfferDate, "Date"),
          updateTime:
            item.updateTime === "" || item.updateTime === null
              ? `-`
              : getMomentFromDate(item.updateTime, "Date&Time"),
          mortageBonds:
            item.mortageBonds === "" || item.mortageBonds === null
              ? `-`
              : item.mortageBonds == 0 ? "No" : 'Yes',
          restructuring:
            item.restructuring === "" || item.restructuring === null
              ? `-`
              : item.restructuring == 0 ? "No" : 'Yes',
          perpetual:
            item.perpetual === "" || item.perpetual === null
              ? `-`
              : item.perpetual == 0 ? "No" : 'Yes',
            volumeInCirculation:
            item.volumeInCirculation === "" || item.volumeInCirculation === null
              ? `-`
              : item.volumeInCirculation,
          coveredDebt:
            item.coveredDebt === "" || item.coveredDebt === null
              ? `-`
              : item.coveredDebt == 0 ? "No" : 'Yes',
          calAmountInternationalBonds:
            item.calAmountInternationalBonds === "" ||
            item.calAmountInternationalBonds === null
              ? `-`
              : item.calAmountInternationalBonds,
          structuredProducts:
            item.structuredProducts === "" || item.structuredProducts === null
              ? `-`
              : item.structuredProducts == 0 ? "No" : 'Yes',
          tinOfTheIssuer:
            item.tinOfTheIssuer === "" || item.tinOfTheIssuer === null
              ? `-`
              : item.tinOfTheIssuer,
          formalIssuer:
            item.formalIssuer === "" || item.formalIssuer === null
              ? `-`
              : item.formalIssuer,
          issuerType:
            item.issuerType === "" || item.issuerType === null
              ? `-`
              : item.issuerType,
          issueAmount: item.issueAmount == null ? `-` : item.issueAmount,
          placementAmount:
            item.placementAmount === "" || item.placementAmount === null
              ? `-`
              : item.placementAmount,
          amountInCirculations:
            item.amountInCirculations === "" ||
            item.amountInCirculations === null
              ? `-`
              : item.amountInCirculations,
          indexsation:
            item.indexsation === "" || item.indexsation === null
              ? `-`
              : item.indexsation,
          orderBook:
            item.orderBook === "" || item.orderBook === null
              ? `-`
              : item.orderBook,
          daycountconvention:
            item.daycountconvention === "" || item.daycountconvention === null
              ? `-`
              : item.daycountconvention,
          bigDecimalingRate:
            item.bigDecimalingRate === "" || item.bigDecimalingRate === null
              ? `-`
              : item.bigDecimalingRate,
          outstandingCalculationAmount:
            item.outstandingCalculationAmount === "" ||
            item.outstandingCalculationAmount === null
              ? `-`
              : item.outstandingCalculationAmount,
        };
        RowData.push(SingleData);
      });
      setRowData(RowData);

      
    } catch (error) {
      console.error("Error during POST request:", error.message);
      setRowLoading(false);
    } finally {
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
      field: "srNo",
      pinned: 'left',
      minWidth: 180,
      maxWidth: 180,
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
      headerName: "Issue ID",
      field: "issueId",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Security Name",
      field: "issueNameEng",
      pinned: 'left',
      minWidth: 215,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Bloomberg Ticker",
      field: "bloombergTicker",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issuer",
      field: "issuer",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Rate",
      field: "couponRate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Kind",
      field: "kind",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Maturity Date",
      field: "maturityDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "FIGI",
      field: "figi",
      maxWidth: 210,
      minWidth: 210,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "CFI",
      field: "cfi",
      maxWidth: 180,
      minWidth: 180,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "Convertibility",
      field: "convertibility",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Bond Type",
      field: "bondType",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date of Updation",
      field: "updatingDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Frequency",
      field: "couponFrequency",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Currency Id",
    //   field: "currencyId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Currency",
      field: "currency",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "CUSIP 144A",
      field: "cusip",
      maxWidth: 180,
      minWidth: 180,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "End Of Placement Date",
      field: "endOfPlacementDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Start Of Trading",
      field: "startOfTrading",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Start Of Placement Date",
      field: "estartOfPlacementDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Early Redemption Date",
      field: "earlyRedemptionDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Issuer Id",
    //   field: "issuerId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Guarantor Id",
    //   field: "guarantorId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Integral Multiple",
      field: "integralMultiple",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.integralMultiple);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      maxWidth: 180,
      minWidth: 180,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issue Kind ID",
      field: "issuekindId",
      maxWidth: 180,
      minWidth: 180,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "Margin",
      field: "margin",
      minWidth: 215,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Calculation Amount",
      field: "calculationAmount",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.calculationAmount);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issue Number",
      field: "issueNumber",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Reference Rate",
      field: "referrenceRate",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.referrenceRate);
      },
      // cellClass: "textright",
      minWidth: 215,
      maxWidth : 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Settlement Date",
      field: "settlementDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "State Registration Number",
      field: "stateRegistrationNumber",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issue Status",
      field: "issueStatus",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issue Sub Type",
      field: "issueSubtypeId",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Subordinated Debt",
      field: "subordinatedDebt",
      minWidth: 215,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Issuer Country",
      field: "issuerCountry",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issuer Region",
      field: "issuerRegion",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issuer Subregion",
      field: "issuerSubregion",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Next Offer Date",
      field: "nextOfferDate",
      maxWidth: 180,
      minWidth: 180,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "Update Date Time",
      field: "updateTime",
      maxWidth: 280,
      minWidth: 280,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "Mortage Bonds",
      field: "mortageBonds",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Restructuring",
      field: "restructuring",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Perpetual",
      field: "perpetual",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Volume in circulation",
      field: "volumeInCirculation",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Covered Debt",
      field: "coveredDebt",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Calculate Amount International Bonds",
      field: "calAmountInternationalBonds",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.calAmountInternationalBonds);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Structured Products",
      field: "structuredProducts",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "TIN Of The Issuer",
      field: "tinOfTheIssuer",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Formal Issuer",
      field: "formalIssuer",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issuer Type",
      field: "issuerType",
      maxWidth: 180,
      minWidth: 180,      
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issue Amount",
      field: "issueAmount",
      cellRenderer: (params) => {
        if (params.data.issueAmount == null) {
          return "-";
        } else {
          return formattedAmount(params.data?.issueAmount);
        }
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Placement Amount",
      field: "placementAmount",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.placementAmount);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Amount In Circulations",
      field: "amountInCirculations",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.amountInCirculations);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",

      minWidth: 215,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Indexsation",
      field: "indexsation",
      minWidth: 215,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Order Book",
      field: "orderBook",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Day Count Convention",
      field: "daycountconvention",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Day Count Convention",
    //   field: "daycountconventionID",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Big Decimaling Rate",
      field: "bigDecimalingRate",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Outstanding Calculation Amount",
      field: "outstandingCalculationAmount",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.outstandingCalculationAmount);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
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
        encrypt("BondsFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("BondsFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
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
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00272")}
            Breadcrumbshow={true}
            breadcrumbItems={InstrumentMasterPageurl.BondsList}
          ></Pagehader>
          <div className="pagebody">
            {rowLoading && (
              <div className="row">
                <div className="col-12 col-md-3 col-lg-3">
                  <InputText
                    {...useFromProps}
                    useForm={useForm}
                    readOnly={false}
                    disabled={false}
                    type="text"
                    labelName="Search..."
                    registerName={"name"}
                    name={"name"}
                    mandatory={false}
                    onPaste={false}
                    onCopy={false}
                    previewFlag={false}
                    onChange={(e) => {
                      handleSearchChange(e.target.value);
                    }}
                    divClassName={"divClassName"}
                  />
                </div>
                <div className="col-12 col-md-3 col-lg-3"></div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="table_btn_div">
                    {" "}
                    <ButtonComp
                      wrapperName={"btn_wrapper table_btn"}
                      type="button"
                      btnStyle="box"
                      btnText={"Export"}
                      onClick={handleExportClick}
                    />
                    <ButtonComp
                      wrapperName={"btn_wrapper table_btn"}
                      type="button"
                      btnStyle="box"
                      btnText={"Reset Filter"}
                      onClick={handleResetClick}
                    />
                  </div>
                </div>
              </div>
            )}
            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              StyleClass="btn btn-primary"
              type="table"
              rowLoading={rowLoading}
              gridOptions={{
                getRowStyle,
              }}
              filenames={
                "Instrument_Master_Bonds_List_" +
                getMomentFromDate(new Date(), "Date&Time")
              }
              onResetClick={handleResetClick}
              ResetClickvalue={ResetClickvalue}
              onExportClick={handleExportClick}
              ExportClickvalue={ExportClickvalue}
              onSearchClick={handleSearchChange}
              SearchClickvalue={SearchValue}
              pagination={false}
              showSearchBar={false}
              showDatePicker={false}
              showExportButton={false}
              showResetButton={false}
            />
            {/* // custom pageable */}
            {rowLoading && (
              <div className="row mt-3 px-2">
                <div className="col-md-6 col-12">
                  <div className="row">
                    <div className="col-6  selectedPageSize">
                    Page Size : {" "}

                      <select
                        id="page-size"
                        value={perPagesize}
                        onChange={handlePageSizeChange}
                      >
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={500}>500</option>
                        <option value={1000}>1000</option>
                      </select>
                    </div>
                    <div className="col-6  selectedPageSize">
                      Number Of Records : {totalElements}
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-12 d-flex
              justify-content-end "
                >
                  <ResponsivePaginationComponent
                    total={totalPages}
                    current={currentPage}
                    onPageChange={(page) => handlePageChange(page, perPagesize)}
                    previousLabel="Previous"
                    nextLabel="Next"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

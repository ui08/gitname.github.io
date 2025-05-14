import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputText from "../../../Component/ComponentsInput/InputText";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import Pagehader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import { getMomentFromDate } from "../../../util/Authenticate";
import axiosInstance from "../../../util/axiosInstance";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";

export default function CABondsList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);

  // custom pageable

  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
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
  };

  const [ResetClickvalue, setResetClickvalue] = useState();

  const handleResetClick = () => {
    setResetClickvalue(true);
    setExportClickvalue(false);
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
    try {
      const response = await axiosInstance.get(
        Apiurl.CABondCouponList +
          `?page=${getcurrentPage}&size=${getperPagesize}`
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
          masterId:
            item.masterId === "" || item.masterId === null
              ? `-`
              : item.masterId,
          issueId:
            item.issueId === "" || item.issueId === null ? `-` : item.issueId,
          couponStartDate:
            item.couponStartDate === ""
              ? `-`
              : getMomentFromDate(item.couponStartDate, "Date"),
          paymentDate:
            item.paymentDate === "" || item.paymentDate === null
              ? `-`
              : getMomentFromDate(item.paymentDate, "Date"),
          couponNumber:
            item.couponNumber === "" || item.couponNumber === null
              ? `-`
              : item.couponNumber,
          recordDate:
            item.recordDate === "" || item.recordDate === null
              ? `-`
              : getMomentFromDate(item.recordDate, "Date"),
          couponRate:
            item.couponRate === "" || item.couponRate === null
              ? `-`
              : item.couponRate,
          ratePublishedDate:
            item.ratePublishedDate === "" || item.ratePublishedDate === null
              ? `-`
              : getMomentFromDate(item.ratePublishedDate, "Date"),
          couponSum:
            item.couponSum === "" || item.couponSum === null
              ? `-`
              : item.couponSum,

          actualPaymentDate:
            item.actualPaymentDate === "" || item.actualPaymentDate === null
              ? `-`
              : getMomentFromDate(item.actualPaymentDate, "Date"),

          redemptionAmount:
            item.redemptionAmount === "" || item.redemptionAmount === null
              ? `-`
              : item.redemptionAmount,

          remainingShareUnpaid:
            item.remainingShareUnpaid === "" ||
            item.remainingShareUnpaid === null
              ? `-`
              : item.remainingShareUnpaid,

          startNonTradingPeriod:
            item.startNonTradingPeriod === "" ||
            item.startNonTradingPeriod === null
              ? `-`
              : item.startNonTradingPeriod,

          endNonTradingPeriod:
            item.endNonTradingPeriod === "" || item.endNonTradingPeriod === null
              ? `-`
              : item.endNonTradingPeriod,

          tradingNotPaused:
            item.tradingNotPaused === "" || item.tradingNotPaused === null
              ? `-`
              : item.tradingNotPaused,

          daysBetweenCoupons:
            item.daysBetweenCoupons === "" || item.daysBetweenCoupons === null
              ? `-`
              : item.daysBetweenCoupons,

          capitalizedCouponPart:
            item.capitalizedCouponPart === "" ||
            item.capitalizedCouponPart === null
              ? `-`
              : item.capitalizedCouponPart,

          redemptionPercentage:
            item.redemptionPercentage === "" ||
            item.redemptionPercentage === null
              ? `-`
              : item.redemptionPercentage,

          issueStatusId:
            item.issueStatusId === "" || item.issueStatusId === null
              ? `-`
              : item.issueStatusId,

          emissionKind:
            item.emissionKind === "" || item.emissionKind === null
              ? `-`
              : item.emissionKind,

          integralMultiple:
            item.integralMultiple === "" || item.integralMultiple === null
              ? `-`
              : item.integralMultiple,

          minTradingLot:
            item.minTradingLot === "" || item.minTradingLot === null
              ? `-`
              : item.minTradingLot,

          mortgageBond:
            item.mortgageBond === "" || item.mortgageBond === null
              ? `-`
              : item.mortgageBond,

          securitization:
            item.securitization === "" || item.securitization === null
              ? `-`
              : item.securitization,

          amortizingSecurity:
            item.amortizingSecurity === "" || item.amortizingSecurity === null
              ? `-`
              : item.amortizingSecurity,

          placementStartDate:
            item.placementStartDate === "" || item.placementStartDate === null
              ? `-`
              : getMomentFromDate(item.placementStartDate, "Date"),

          placementEndDate:
            item.placementEndDate === "" || item.placementEndDate === null
              ? `-`
              : getMomentFromDate(item.placementEndDate, "Date"),

          maturityDate:
            item.maturityDate === "" || item.maturityDate === null
              ? `-`
              : getMomentFromDate(item.maturityDate, "Date"),

          isin: item.isin === "" || item.isin === null ? `-` : item.isin,
          securityName:
            item.securityName === "" || item.securityName === null
              ? `-`
              : item.securityName,
          isin144a:
            item.isin144a === "" || item.isin144a === null
              ? `-`
              : item.isin144a,

          issuerId:
            item.issuerId === "" || item.issuerId === null
              ? `-`
              : item.issuerId,

          countryOfIssuer:
            item.countryOfIssuer === "" || item.countryOfIssuer === null
              ? `-`
              : item.countryOfIssuer,

          regionOfIssuer:
            item.regionOfIssuer === "" || item.regionOfIssuer === null
              ? `-`
              : item.regionOfIssuer,

          subregionOfIssuer:
            item.subregionOfIssuer === "" || item.subregionOfIssuer === null
              ? `-`
              : item.subregionOfIssuer,

          issuerBranchId:
            item.issuerBranchId === "" || item.issuerBranchId === null
              ? `-`
              : item.issuerBranchId,

          issuerTypeId:
            item.issuerTypeId === "" || item.issuerTypeId === null
              ? `-`
              : item.issuerTypeId,

          currency:
            item.currency === "" || item.currency === null
              ? `-`
              : item.currency,

          showru:
            item.showru === "" || item.showru === null ? `-` : item.showru,

          showem:
            item.showem === "" || item.showem === null ? `-` : item.showem,

          showpl:
            item.showpl === "" || item.showpl === null ? `-` : item.showpl,

          showua:
            item.showua === "" || item.showua === null ? `-` : item.showua,

          showib:
            item.showib === "" || item.showib === null ? `-` : item.showib,

          couponSumFromLot:
            item.couponSumFromLot === "" || item.couponSumFromLot === null
              ? `-`
              : item.couponSumFromLot,
          floatingRate:
            item.floatingRate === "" || item.floatingRate === null
              ? ` -`
              : item.floatingRate,

          redemptionSumFromLot:
            item.redemptionSumFromLot === "" ||
            item.redemptionSumFromLot === null
              ? `-`
              : item.redemptionSumFromLot,

          couponSumFromFaceValue:
            item.couponSumFromFaceValue === "" ||
            item.couponSumFromFaceValue === null
              ? `-`
              : item.couponSumFromFaceValue,

          redemptionFromFaceValue:
            item.redemptionFromFaceValue === "" ||
            item.redemptionFromFaceValue === null
              ? `-`
              : item.redemptionFromFaceValue,

          couponAmmountFromMinTrading:
            item.couponAmmountFromMinTrading === "" ||
            item.couponAmmountFromMinTrading === null
              ? `-`
              : item.couponAmmountFromMinTrading,

          redemptionFromMinTrading:
            item.redemptionFromMinTrading === "" ||
            item.redemptionFromMinTrading === null
              ? `-`
              : item.redemptionFromMinTrading,

          unScheduledPayment:
            item.unScheduledPayment === "" || item.unScheduledPayment === null
              ? `-`
              : item.unScheduledPayment,

          additionalInformation:
            item.additionalInformation === "" ||
            item.additionalInformation === null
              ? `-`
              : item.additionalInformation,

          creationDate:
            item.creationDate === "" || item.creationDate === null
              ? `-`
              : getMomentFromDate(item.creationDate, "Date"),

          renewalDate:
            item.renewalDate === "" || item.renewalDate === null
              ? `-`
              : getMomentFromDate(item.renewalDate, "Date"),
          calculationAmount:
            item.calculationAmount === "" || item.calculationAmount === null
              ? `-`
              : item.calculationAmount,
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
      field: "srNo",
      valueGetter: "node.rowIndex + 1",
      pinned: "left",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Master Id",
      field: "masterId",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ISIN",
      field: "isin",
      minWidth: 180,
      maxWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Start Date",
      field: "couponStartDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment Date",
      field: "paymentDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Record Date",
      field: "recordDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Number",
      field: "couponNumber",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Rate",
      field: "couponRate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Rate Published Date",
      field: "ratePublishedDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Sum",
      field: "couponSum",
      cellClass: "textright",
      cellRenderer: (params) => {
        if (params.data.couponSum === "" || params.data.couponSum === null) {
          return "-";
        } else {
          return formattedAmount(params.data?.couponSum);
        }
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actual Payment Date",
      field: "actualPaymentDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Redemption Amount",
      field: "redemptionAmount",
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Remaining Share Unpaid",
      field: "remainingShareUnpaid",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Start Non Trading Period",
      field: "startNonTradingPeriod",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "End Non Trading Period",
      field: "endNonTradingPeriod",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Trading Not Paused",
      field: "tradingNotPaused",
      minWidth: 150,
      sortable: true,
      cellRenderer: (params) => {
        if (
          params.data.tradingNotPaused == "" ||
          params.data.tradingNotPaused == null
        ) {
          return "-";
        } else if (params.data.tradingNotPaused == true) {
          return "true";
        } else {
          ("false");
        }
      },
      filter: true,
    },
    {
      headerName: "Floating Rate",
      field: "floatingRate",
      minWidth: 150,
      cellRenderer: (params) => {
        if (
          params.data.floatingRate == "" ||
          params.data.floatingRate == null
        ) {
          return "-";
        } else if (params.data.floatingRate == true) {
          return "true";
        } else {
          ("false");
        }
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Days Between Coupons",
      field: "daysBetweenCoupons",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Capitalized Coupon Part",
      field: "capitalizedCouponPart",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Redemption Percentage",
      field: "redemptionPercentage",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Issue Status Id",
    //   field: "issueStatusId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Emission Kind",
      field: "emissionKind",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Integral Multiple",
      field: "integralMultiple",
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      cellRenderer: (params) => {
        if (
          params.data.integralMultiple === "" ||
          params.data.integralMultiple === null
        ) {
          return "-";
        } else {
          return formattedAmount(params.data?.integralMultiple);
        }
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Minimum Trading Lot",
      field: "minTradingLot",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Calculation Amount",
      field: "calculationAmount",
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Mortgage Bond",
      field: "mortgageBond",
      cellRenderer: (params) => {
        if (
          params.data.mortgageBond == "" ||
          params.data.mortgageBond == null
        ) {
          return "-";
        } else if (params.data.mortgageBond == true) {
          return "true";
        } else {
          ("false");
        }
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Securitization",
      field: "securitization",

      cellRenderer: (params) => {
        if (
          params.data.securitization == "" ||
          params.data.securitization == null
        ) {
          return "-";
        } else if (params.data.securitization == true) {
          return "true";
        } else {
          ("false");
        }
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Amortizing Security",
      field: "amortizingSecurity",

      cellRenderer: (params) => {
        if (
          params.data.amortizingSecurity == "" ||
          params.data.amortizingSecurity == null
        ) {
          return "-";
        } else if (params.data.amortizingSecurity == true) {
          return "true";
        } else {
          ("false");
        }
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Placement Start Date",
      field: "placementStartDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Placement End Date",
      field: "placementEndDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Maturity Date",
      field: "maturityDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ISIN 144A",
      field: "isin144a",
      minWidth: 150,
      maxWidth: 150,
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
    {
      headerName: "Country Of Issuer",
      field: "countryOfIssuer",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Region Of Issuer",
      field: "regionOfIssuer",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Subregion Of Issuer",
      field: "subregionOfIssuer",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Issuer Branch Id",
    //   field: "issuerBranchId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Issuer Type Id",
    //   field: "issuerTypeId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Currency",
      field: "currency",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Show R U",
      field: "showru",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Show E M",
      field: "showem",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Show P L",
      field: "showpl",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Show U A",
      field: "showua",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Show I B",
      field: "showib",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Sum From Lot",
      field: "couponSumFromLot",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Redemption Sum From Lot",
      field: "redemptionSumFromLot",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Sum From Face Value",
      field: "couponSumFromFaceValue",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Redemption From Face Value",
      field: "redemptionFromFaceValue",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Amount From Min Trading",
      field: "couponAmmountFromMinTrading",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.couponAmmountFromMinTrading);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Redemption From Min Trading",
      field: "redemptionFromMinTrading",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Unscheduled Payment",
      field: "unScheduledPayment",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Additional Information",
      field: "additionalInformation",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Creation Date",
      field: "creationDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Renewal Date",
      field: "renewalDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
  ];

  const breadcrumbItems = [
    {
      label: "Bonds - Coupon Payments Master",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00272")}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
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
              filenames={
                "Bonds_Coupon_Payments_Master" +
                getMomentFromDate(new Date(), "Date&Time")
              }
              onResetClick={handleResetClick}
              ResetClickvalue={ResetClickvalue}
              onExportClick={handleExportClick}
              ExportClickvalue={ExportClickvalue}
              onSearchClick={handleSearchChange}
              SearchClickvalue={SearchValue}
              rowLoading={rowLoading}
              StyleClass="btn btn-primary"
              type="table"
              gridOptions={{
                getRowStyle,
              }}
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
                      Page Size :{" "}
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

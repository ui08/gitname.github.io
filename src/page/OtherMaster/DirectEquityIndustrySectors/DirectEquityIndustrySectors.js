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
import axiosInstance from "../../../util/axiosInstance";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";

export default function DirectEquityIndustrySectorsList() {
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
    try {
      const response = await axiosInstance.get(
        Apiurl.getAllDirectEquity +
          `?pageNumber=${getcurrentPage}&pageSize=${getperPagesize}`
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
          srNo: pageNumber * pageSize + index + 1, // Dynamically calculated
          isin: item.isin === null || item.isin === "" ? `-` : item.isin,
          stockName:
            item.stockName === null || item.stockName === ""
              ? `-`
              : item.stockName,
          marketcap:
            item.marketcap === null || item.marketcap === ""
              ? `-`
              : item.marketcap,
          divYield:
            item.divYield === null || item.divYield === ""
              ? `-`
              : item.divYield,
          price52WeekHigh:
            item.price52WeekHigh === null || item.price52WeekHigh === ""
              ? `-`
              : item.price52WeekHigh,
          price52WeekLow:
            item.price52WeekLow === null || item.price52WeekLow === ""
              ? `-`
              : item.price52WeekLow,
          dailyTradedVolume:
            item.dailyTradedVolume === null || item.dailyTradedVolume === ""
              ? `-`
              : item.dailyTradedVolume,
          lastClosingPrice:
            item.lastClosingPrice === null || item.lastClosingPrice === ""
              ? `-`
              : item.lastClosingPrice,
          classificationID:
            item.classificationID === null || item.classificationID === ""
              ? `-`
              : item.classificationID,
          directEquiyDTO:
            item.directEquiyDTO === null || item.directEquiyDTO === ""
              ? `-`
              : item.directEquiyDTO.stockName,
          masterMfsectorDTO:
            item.masterMfsectorDTO === null || item.masterMfsectorDTO === ""
              ? `-`
              : item.masterMfsectorDTO.sector,
          equityMarketCapClassificationDTO:
            item.equityMarketCapClassificationDTO === null ||
            item.equityMarketCapClassificationDTO === ""
              ? `-`
              : item.equityMarketCapClassificationDTO,
          pe:
            item.pe === null || item.pe === "" || item.pe === "null"
              ? `-`
              : item.pe,
          pb:
            item.pb === null || item.pb === "" || item.pb === "null"
              ? `-`
              : item.pb,
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
      minWidth: 120,
      maxWidth: 120,
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
      headerName: "Stock Name",
      field: "stockName",
      minWidth: 300,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Market cap",
      field: "marketcap",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.marketcap);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Dividend Yield",
      field: "divYield",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Price 52 Week High",
      field: "price52WeekHigh",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.price52WeekHigh);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Price 52 Week Low",
      field: "price52WeekLow",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.price52WeekLow);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Daily Traded Volume",
      field: "dailyTradedVolume",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.dailyTradedVolume);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Last Closing Price",
      field: "lastClosingPrice",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.lastClosingPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Classification Name",
      field: "classificationID",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Direct Equiy",
      field: "directEquiyDTO",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Master Mf sector",
      field: "masterMfsectorDTO",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Equity MarketCap Classification",
      field: "equityMarketCapClassificationDTO",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "PE",
      field: "pe",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if(params.data?.pe === null || params.data?.pe === undefined || params.data?.pe === ""){
          return '-';
        }else return formattedAmount(params.data?.pe);
      },
    },
    {
      headerName: "PB",
      field: "pb",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        if(params.data?.pb === null || params.data?.pb === undefined || params.data?.pb === ""){
          return '-';
        }else return formattedAmount(params.data?.pb);
      },
    },
  ];

  //EDIT USER
  const navigate = useNavigate();
  const breadcrumbItems = [
    {
      label: "Direct Equity - Industry Sector",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];

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
              StyleClass="btn btn-primary"
              type="table"
              rowLoading={rowLoading}
              gridOptions={{
                getRowStyle,
              }}
              pagination={false}
              filenames={
                "Instrument_Master_Direct_Equity_List" +
                getMomentFromDate(new Date(), "Date&Time")
              }
              onResetClick={handleResetClick}
              ResetClickvalue={ResetClickvalue}
              onExportClick={handleExportClick}
              ExportClickvalue={ExportClickvalue}
              onSearchClick={handleSearchChange}
              SearchClickvalue={SearchValue}
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

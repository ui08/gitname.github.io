import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../../util/apiurl";
import { getMomentFromDate } from "../../../util/Authenticate";
import axiosInstance from "../../../util/axiosInstance";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";
import { VMPageurl } from "../VMPageurl";
import InputDatePickerWithMoment from "./../../../Component/ComponentsInput/InputDatePickerWithMoment";

export default function VMDirectEquityList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [filterData, setFilterData] = useState({ label: "", value: "" });

  // custom pageable const [filterData, setFilterData] = useState({label : "", value : ""});
  const [allFilter, setAllFilter] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).subtract(1, "days")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    fetchFilter();
    setValue("SelectDate", moment(new Date()).subtract(1, "days"));
    fetchData(currentPage, perPagesize, selectedDate);
  }, []);

  // Callback for Search
  const [SearchValue, setSearchValue] = useState();
  const createRowData = (value) => {
    setLoading(true);
    const RowData = [];
    let pageNumber = value?.pageable.pageNumber;
    let pageSize = value?.pageable.pageSize;
    Object.values(value?.content).map((item, index) => {
      let SingleData = {
        srNo: pageNumber * pageSize + index + 1,
        isin: item.isin === "" || item.isin === null ? `-` : item.isin,
        date:
          item.date === "" || item.date === null
            ? `-`
            : getMomentFromDate(item.date, "Date"),
        stockName:
          item.stockName === "" || item.stockName === null
            ? `-`
            : item.stockName,
        closingPrice:
          item.closingPrice === "" || item.closingPrice === null
            ? `-`
            : item.closingPrice,
      };
      RowData.push(SingleData);
    });
    setRowData(RowData);

    setLoading(false);
  };

  const handleClear = () => {
    setValue("name", "");
    // setValue("Filter", "");
    setFilterData({ label: "", value: "" });
    fetchData(currentPage, perPagesize);
  };

  const handleSearchChange = async (SearchValue) => {
    if (SearchValue.length == 0) {
      fetchData(currentPage, perPagesize);
    }
    if (SearchValue.length >= 2) {
      setRowData(null);
      // setLoading(true);
      try {
        const response = await axiosInstance.get(
          Apiurl.globalSearchVMDE +
            SearchValue +
            "/" +
            filterData.label +
            `?date=${getMomentFromDate(
              selectedDate,
              "MonthDateYYYY"
            )}&page=${currentPage}&size=${perPagesize}`
        );
        let result = response.data;
        createRowData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error during POST request:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Callback for Date Picker

  const handleDateChange = useCallback(
    (value) => {
      console.log(value);

      setValue("SelectDate", value);
      getfetchData(1, 100, getMomentFromDate(value, "MonthDateYYYY"));
      setSelectedDate(value);
    },
    [selectedDate]
  );

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

      getfetchData(page, perPagesizeX, selectedDate);
    },
    [perPagesize, selectedDate]
  );

  const handlePageSizeChange = useCallback(
    (x) => {
      setPerPagesize(x.target.value);
      setCurrentPage(1);
      getfetchData(1, x.target.value, selectedDate);
    },
    [selectedDate]
  );
  const getfetchData = (getcurrentPage, getperPagesize, getselectedDate) => {
    fetchData(getcurrentPage, getperPagesize, getselectedDate);
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

  const fetchFilter = async () => {
    try {
      const response = await axiosInstance.get(
        Apiurl.globalSearchFilter + "/" + "VM_DIRECT_EQUITY"
      );
      let result = response.data;
      setAllFilter([]);
      Object.values(result).map((item) => {
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllFilter((prev) => [...prev, SingleData]);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilterData({ label: e.label, value: e.value });
    setValue("name", null);
    fetchData(currentPage, perPagesize);
  };

  const fetchData = async (getcurrentPage, getperPagesize, getselectedDate) => {
    setRowData(null);
    setRowLoading(false);
    setExportClickvalue(false);
    setResetClickvalue(false);
    try {
      const response = await axiosInstance.get(
        Apiurl.VMDirectEquityList +
          `?date=${moment(getselectedDate).format(
            "YYYY-MM-DD"
          )}&page=${getcurrentPage}&size=${getperPagesize}`
      );
      // custom pageable
      setValue("SelectDate", getselectedDate);
      setPerPagesize(response?.data?.size);

      setTotalPages(response?.data?.totalPages);
      setTotalElements(response?.data?.totalElements);

      // const RowData = [];
      // let pageNumber = response?.data?.pageable.pageNumber;
      // let pageSize = response?.data?.pageable.pageSize;
      // Object.values(response?.data?.content).map((item, index) => {
      //   let SingleData = {
      //     srNo: pageNumber * pageSize + index + 1,
      //     isin: item.isin === "" || item.isin === null ? `-` : item.isin,
      //     date:
      //       item.date === "" || item.date === null
      //         ? `-`
      //         : getMomentFromDate(item.date, "Date"),
      //     stockName:
      //       item.stockName === "" || item.stockName === null
      //         ? `-`
      //         : item.stockName,
      //     closingPrice:
      //       item.closingPrice === "" || item.closingPrice === null
      //         ? `-`
      //         : item.closingPrice,
      //   };
      //   RowData.push(SingleData);
      // });
      // setRowData(RowData);
      createRowData(response?.data);

      //
      setRowLoading(true);
    } catch (error) {
      setRowLoading(false);
      console.error("Error during POST request:", error.message);
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
      sortable: true,
      filter: true,
      maxWidth: 180,
      minWidth: 180,
    },

    {
      headerName: "Stock Name",
      field: "stockName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      maxWidth: 150,
      minWidth: 150,
    },
    {
      headerName: "Closing Price",
      field: "closingPrice",
      sortable: true,
      filter: true,
      minWidth: 215,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.closingPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
  ];

  const breadcrumbItems = [
    {
      label: "Direct Equity",
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
            breadcrumbItems={VMPageurl.Directlist}
          ></Pagehader>
          <div className="pagebody">
            {rowLoading && (
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="Filter"
                    mandatory={false}
                    labelName="Select Filter"
                    options={allFilter}
                    previewFlag={false}
                    onSelect={(e) => handleFilterChange(e)}
                    divClassName={"divClassName"}
                  />
                </div>
                {filterData.value ? (
                  <>
                    <div className="col-12 col-md-3 col-lg-3 crossbtnDiv">
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
                      {getValues("name") && (
                        <button
                          type="button"
                          className="btn crossbtn"
                          onClick={() => handleClear()}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      )}
                    </div>
                  </>
                ) : null}
                <div className="col-12 col-md-3 col-lg-3">
                  <InputDatePickerWithMoment
                    control={control}
                    setValue={setValue}
                    errors={errors}
                    labelName="Select Date"
                    registerName="SelectDate"
                    mandatory={true}
                    dateformat="DD/MM/YYYY"
                    disabled={false}
                    dateviews={"year"}
                    minDateVal={null}
                    maxDateVal={moment().subtract(1, "days")}
                    onSelect={(value) => handleDateChange(value)}
                  />
                </div>

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
                "Valuation_Master_Direct_Equity_List_" +
                getMomentFromDate(new Date(), "Date&Time")
              }
              onResetClick={handleResetClick}
              ResetClickvalue={ResetClickvalue}
              onExportClick={handleExportClick}
              ExportClickvalue={ExportClickvalue}
              // onSearchClick={handleSearchChange}
              // SearchClickvalue={SearchValue}
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
                    onPageChange={(page) =>
                      handlePageChange(page, perPagesize, selectedDate)
                    }
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

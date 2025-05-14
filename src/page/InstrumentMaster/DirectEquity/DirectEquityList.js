import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
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
import Loader from "../../../util/Loader";
import { InstrumentMasterPageurl } from "../InstrumentMasterPageurl";

export default function DirectEquityList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({ label: "", value: "" });
  const [allFilter, setAllFilter] = useState([]);

  // custom pageable

  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    fetchFilter();
    fetchData(currentPage, perPagesize);
  }, []);
  // Callback for Search
  const [SearchValue, setSearchValue] = useState();

  const createRowData = (value) => {
    const RowData = [];
    let pageNumber = value?.pageable.pageNumber;
    let pageSize = value?.pageable.pageSize;
    Object.values(value?.content).map((item, index) => {
      let SingleData = {
        srNo: pageNumber * pageSize + index + 1,
        isin: item.isin === "" ? `-` : item.isin,
        stockName: item.stockName === "" ? `-` : item.stockName,
        nseCode: item.nseCode === "" ? `-` : item.nseCode,
        bseCode: item.bseCode === "" ? `-` : item.bseCode,
        sectorName: item.sectorName === "" ? `-` : item.sectorName,
      };
      RowData.push(SingleData);
    });
    setRowData(RowData);
  };

  const handleClear = () => {
    setValue("name", "");
    // setValue("Filter", "");
    setFilterData({ label: "", value: "" });
    fetchData(currentPage, perPagesize);
  };

  const handleSearchChange = async (value) => {
    if(value.length ==0) {
      fetchData(currentPage, perPagesize);
    }
    if(value.length >=2) {
    setRowData(null);
    // setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.globalSearchIMDE +
        value +  "/" + filterData.label +
          `?page=${currentPage}&size=${perPagesize}`
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

  const fetchFilter = async () => {
    try {
      const response = await axiosInstance.get(
        Apiurl.globalSearchFilter + "/" + "IM_DIRECT_EQUITY"
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

  const fetchData = async (getcurrentPage, getperPagesize) => {
    setRowData(null);
    setRowLoading(false);
    setExportClickvalue(false);
    setResetClickvalue(false);
    try {
      const response = await axiosInstance.get(
        Apiurl.IMDirectEquityList +
          `?page=${getcurrentPage}&size=${getperPagesize}`
      );
      // custom pageable
      setRowLoading(true);
      setPerPagesize(response?.data?.size);
      setTotalPages(response?.data?.totalPages);

      setTotalElements(response?.data?.totalElements);
      createRowData(response?.data);

      // const RowData = [];
      // let pageNumber = response?.data?.pageable.pageNumber;
      // let pageSize = response?.data?.pageable.pageSize;
      // Object.values(response?.data?.content).map((item, index) => {
      //   let SingleData = {
      //     srNo: pageNumber * pageSize + index + 1,
      //     isin: item.isin === "" ? `-` : item.isin,
      //     stockName: item.stockName === "" ? `-` : item.stockName,
      //     nseCode: item.nseCode === "" ? `-` : item.nseCode,
      //     bseCode: item.bseCode === "" ? `-` : item.bseCode,
      //     sectorName: item.sectorName === "" ? `-` : item.sectorName,
      //   };
      //   RowData.push(SingleData);
      // });
      // setRowData(RowData);
      // 
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
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Stock Name",
      field: "stockName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "NSE Code",
      field: "nseCode",
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "BSE Code",
      field: "bseCode",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Sector Name",
      field: "sectorName",
      maxWidth: 250,
      minWidth: 150,
      sortable: true,
      filter: true,
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
            breadcrumbItems={InstrumentMasterPageurl.Directlist}
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
                      {getValues('name') &&
                      <button
                        type="button"
                        className="btn crossbtn"
                        onClick={() => handleClear()}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>}
                    </div>
                  </>
                ) : null}
                {!filterData.value ?                     <div className="col-12 col-md-3 col-lg-3"></div>
: null}
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

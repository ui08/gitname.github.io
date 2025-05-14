import { faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { getMomentFromDate } from "../../../util/Authenticate";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

export default function TransactionDirectEquityList({ UploadModalOpen }) {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [clearFlag, setClearFlag] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const hasRun = useRef(false); //To prevent multiple reders of useEffect
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState({ label: "", value: "" });
  const [allFilter, setAllFilter] = useState([]);

  // Callback for Search
  const [SearchValue, setSearchValue] = useState();

  const createRowData = (value) => {
    setLoading(true);
    const RowData = [];
    let pageNumber = value?.pageable.pageNumber;
    let pageSize = value?.pageable.pageSize;

    Object.values(value?.content).map((item, index) => {
      let SingleData = {
        srNo: pageNumber * pageSize + index + 1, // Dynamically calculated
        transactionReferenceNumber:
          item.transactionReferenceNumber === null ||
          item.transactionReferenceNumber === ""
            ? `-`
            : item.transactionReferenceNumber,
        masterProductName:
          item.masterProductName === null || item.masterProductName === ""
            ? `-`
            : item.masterProductName,
        isin: item.isin === null || item.isin === "" ? `-` : item.isin,
        trxnDisc:
          item.trxnDisc === null || item.trxnDisc === "" ? `-` : item.trxnDisc,
        bseCode:
          item.bseCode === null || item.bseCode === "" ? `-` : item.bseCode,
        nseCode:
          item.nseCode === null || item.nseCode === "" ? `-` : item.nseCode,
        transactionDate:
          item.transactionDate === null || item.transactionDate === ""
            ? `-`
            : getMomentFromDate(item.transactionDate, "Date"),
        instrumentSourceId:
          item.instrumentSourceId === null || item.instrumentSourceId === ""
            ? `-`
            : item.instrumentSourceId,
        accountUniqueId:
          item.accountUniqueId === null || item.accountUniqueId === ""
            ? `-`
            : item.accountUniqueId,
        pricePerUnit:
          item.pricePerUnit === null || item.pricePerUnit === ""
            ? `-`
            : item.pricePerUnit,
        quantity:
          item.quantity === null || item.quantity === "" ? `-` : item.quantity,
        totalAmount:
          item.totalAmount === null || item.totalAmount === ""
            ? `-`
            : item.totalAmount,
        folioNumber:
          item.folioNumber === null || item.folioNumber === ""
            ? `-`
            : item.folioNumber,
        serviceProviderName:
          item.serviceProviderName === null || item.serviceProviderName === ""
            ? `-`
            : item.serviceProviderName,
        serviceProviderAccountType:
          item.serviceProviderAccountType === null ||
          item.serviceProviderAccountType === ""
            ? `-`
            : item.serviceProviderAccountType,
        stampDuty:
          item.stampDuty === null || item.stampDuty === ""
            ? `-`
            : item.stampDuty,
        brokerageAmount:
          item.brokerageAmount === null || item.brokerageAmount === ""
            ? `-`
            : item.brokerageAmount,
        remark: item.remark === null || item.remark === "" ? `-` : item.remark,
        instrumentName:
          item.instrumentName === null || item.instrumentName === ""
            ? `-`
            : item.instrumentName,
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

  const handleSearchChange = async (value) => {
    if(SearchValue.length ==0) {
      fetchData(currentPage, perPagesize);
    }
    if (value.length >= 2) {
      setRowData(null);
      // setLoading(true)
      try {
        const response = await axiosInstance.get(
          Apiurl.globalSearchTransaction +
            value +
            "/" +
            filterData.label +
            `?insType=DIRECT_EQUITY&page=${currentPage}&size=${perPagesize}`
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


  // Callback for Export Button
  const handleExportClick = () => {
    setExportClickvalue(true);
    setResetClickvalue(false);
    setTimeout(() => {
      setExportClickvalue(false);
      setResetClickvalue(false);
    }, 100);
  };


  const handleResetClick = () => {
    setExportClickvalue(false);
    setResetClickvalue(true);
    setTimeout(() => {
      setExportClickvalue(false);
      setResetClickvalue(false);
    }, 100);
  };

  useEffect(() => {
    if (!hasRun.current) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      hasRun.current = true;
    }
  }, []);

  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    fetchFilter();
    fetchData(currentPage, perPagesize);
  }, [UploadModalOpen]);

  // Callback for Search

  // Callback for Date Picker

  const [ExportClickvalue, setExportClickvalue] = useState();
  // Callback for Export Button

  const [ResetClickvalue, setResetClickvalue] = useState();

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
        Apiurl.globalSearchFilter + "/" + "TRANSACTION_DIRECT_EQUITY"
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
        Apiurl?.transactionListEQ +
          `&page=${getcurrentPage}&size=${getperPagesize}`
      );
      // custom pageable
      setPerPagesize(response?.data?.size);
      setTotalPages(response?.data?.totalPages);

      setTotalElements(response?.data?.totalElements);
      // setRowData(response?.data?.content);
      // const RowData = [];
      // let pageNumber = response?.data?.pageable.pageNumber;
      // let pageSize = response?.data?.pageable.pageSize;

      // Object.values(response?.data?.content).map((item, index) => {
      //   let SingleData = {
      //     srNo: pageNumber * pageSize + index + 1, // Dynamically calculated
      //     transactionReferenceNumber:
      //       item.transactionReferenceNumber === null ||
      //       item.transactionReferenceNumber === ""
      //         ? `-`
      //         : item.transactionReferenceNumber,
      //     masterProductName:
      //       item.masterProductName === null || item.masterProductName === ""
      //         ? `-`
      //         : item.masterProductName,
      //     isin: item.isin === null || item.isin === "" ? `-` : item.isin,
      //     trxnDisc:
      //       item.trxnDisc === null || item.trxnDisc === ""
      //         ? `-`
      //         : item.trxnDisc,
      //     bseCode:
      //       item.bseCode === null || item.bseCode === "" ? `-` : item.bseCode,
      //     nseCode:
      //       item.nseCode === null || item.nseCode === "" ? `-` : item.nseCode,
      //     transactionDate:
      //       item.transactionDate === null || item.transactionDate === ""
      //         ? `-`
      //         : getMomentFromDate(item.transactionDate, "Date"),
      //     instrumentSourceId:
      //       item.instrumentSourceId === null || item.instrumentSourceId === ""
      //         ? `-`
      //         : item.instrumentSourceId,
      //     accountUniqueId:
      //       item.accountUniqueId === null || item.accountUniqueId === ""
      //         ? `-`
      //         : item.accountUniqueId,
      //     pricePerUnit:
      //       item.pricePerUnit === null || item.pricePerUnit === ""
      //         ? `-`
      //         : item.pricePerUnit,
      //     quantity:
      //       item.quantity === null || item.quantity === ""
      //         ? `-`
      //         : item.quantity,
      //     totalAmount:
      //       item.totalAmount === null || item.totalAmount === ""
      //         ? `-`
      //         : item.totalAmount,
      //     folioNumber:
      //       item.folioNumber === null || item.folioNumber === ""
      //         ? `-`
      //         : item.folioNumber,
      //     serviceProviderName:
      //       item.serviceProviderName === null || item.serviceProviderName === ""
      //         ? `-`
      //         : item.serviceProviderName,
      //     serviceProviderAccountType:
      //       item.serviceProviderAccountType === null ||
      //       item.serviceProviderAccountType === ""
      //         ? `-`
      //         : item.serviceProviderAccountType,
      //     stampDuty:
      //       item.stampDuty === null || item.stampDuty === ""
      //         ? `-`
      //         : item.stampDuty,
      //     brokerageAmount:
      //       item.brokerageAmount === null || item.brokerageAmount === ""
      //         ? `-`
      //         : item.brokerageAmount,
      //     remark:
      //       item.remark === null || item.remark === "" ? `-` : item.remark,
      //     instrumentName:
      //     item.instrumentName === null || item.instrumentName === "" ? `-` : item.instrumentName,
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
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Product Name",
      field: "masterProductName",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 150,
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
      field: "instrumentName",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Transaction Reference Number",
      field: "transactionReferenceNumber",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Transaction Type",
      field: "transactionType",
      
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "BSE Code",
      field: "bseCode",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      headerName: "NSE Code",
      field: "nseCode",
      sortable: true,
      filter: true,
      maxWidth: 180,
      minWidth: 200,
    },
    {
      headerName: "Instrument Source Id",
      field: "instrumentSourceId",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Account Unique Id",
      field: "accountUniqueId",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      headerName: "Folio Number",
      field: "folioNumber",
      sortable: true,
      filter: true,
      maxWidth: 180,
      minWidth: 200,
    },
    {
      headerName: "Transaction Description",
      field: "trxnDisc",
      sortable: true,
      filter: true,
      minWidth: 150,
    },

    {
      headerName: "Transaction Date",
      field: "transactionDate",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 150,
    },

    {
      headerName: "Price Per Unit",
      field: "pricePerUnit",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.pricePerUnit);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Quantity",
      field: "quantity",

      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Total Amount",
      field: "totalAmount",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.totalAmount);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
      minWidth: 150,
    },

    {
      headerName: "Service Provider Name",
      field: "serviceProviderName",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Service Provider Account Type",
      field: "serviceProviderAccountType",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Stamp Duty",
      field: "stampDuty",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "Brokerage Amount",
      field: "brokerageAmount",
      sortable: true,
      filter: true,
      minWidth: 150,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.brokerageAmount);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Remark",
      field: "remark",
      sortable: true,
      filter: true,
      minWidth: 150,
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
        encrypt("TransactionDirectEquityFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("TransactionDirectEquityFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <div>
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
                {!filterData.value ? (
                  <div className="col-12 col-md-3 col-lg-3"></div>
                ) : null}
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
                "Transaction_Direct_Equity_List_" +
                getMomentFromDate(new Date(), "Date&Time")
              }
              onResetClick={handleResetClick}
              ResetClickvalue={ResetClickvalue}
              onExportClick={handleExportClick}
              ExportClickvalue={ExportClickvalue}
              // onSearchClick={handleSearchChange}
              // SearchClickvalue={SearchValue}
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
function ActionButtonsFunction(params, keycloak, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          disabled: currentDisabled(params.data, [
            "Pending_For_Approval",
            "Approved",
          ]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputText from "../../../Component/ComponentsInput/InputText";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { getMomentFromDate } from "../../../util/Authenticate";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

export default function IncentiveRateUploadList({ UploadModalOpen }) {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const hasRun = useRef(false); //To prevent multiple reders of useEffect
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Callback for Search
  const [SearchValue, setSearchValue] = useState();

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Callback for Date Picker
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  // Callback for Export Button
  const handleExportClick = () => {
    setExportClickvalue(true);
    setResetClickvalue(false);
  };

  const handleResetClick = () => {
    setResetClickvalue(true);
    setExportClickvalue(false);
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
  const fetchData = async (getcurrentPage, getperPagesize) => {
    setRowData(null);
    setRowLoading(false);
    setExportClickvalue(false);
    setResetClickvalue(false);

    try {
      const response = await axiosInstance.get(
        Apiurl?.transactionListOtherProduct +
          `&page=${getcurrentPage}&size=${getperPagesize}`
      );
      // custom pageable
      setPerPagesize(response?.data?.size);
      setTotalPages(response?.data?.totalPages);

      setTotalElements(response?.data?.totalElements);
      // setRowData(response?.data?.content);
      const RowData = [];
      let pageNumber = response?.data?.pageable.pageNumber;
      let pageSize = response?.data?.pageable.pageSize;

      Object.values(response?.data?.content).map((item, index) => {
        let SingleData = {
          srNo: pageNumber * pageSize + index + 1,
          ProductCategory:
            item.masterProductName === null || item.masterProductName === ""
              ? `-`
              : item.masterProductName,
          AssetCategory: item.isin === null || item.isin === "" ? `-` : "All",
          SchemeName:
            item.trxnDisc === null || item.trxnDisc === "" ? `-` : "All",
          RMName:
            item.transactionDate === null || item.transactionDate === ""
              ? `-`
              : item.RMName,
          RMCode:
            item.opInstrumentName === null || item.opInstrumentName === ""
              ? `-`
              : item.opInstrumentName,
          FromDate:
            item.instrumentSourceId === null || item.instrumentSourceId === ""
              ? `-`
              : item.instrumentSourceId,
          ToDate:
            item.accountUniqueId === null || item.accountUniqueId === ""
              ? `-`
              : item.accountUniqueId,
          FromValue:
            item.pricePerUnit === null || item.pricePerUnit === ""
              ? `-`
              : item.pricePerUnit,
          ToValue:
            item.quantity === null || item.quantity === ""
              ? `-`
              : item.quantity,
          CommissionUpfront:
            item.totalAmount === null || item.totalAmount === ""
              ? `-`
              : item.totalAmount,
          Commissionannually:
            item.stampDuty === null || item.stampDuty === ""
              ? `-`
              : item.stampDuty,
          BranchID:
            item.brokerageAmount === null || item.brokerageAmount === ""
              ? `-`
              : item.brokerageAmount,
          ZoneID:
            item.remark === null || item.remark === "" ? `-` : item.remark,
        };
        RowData.push(SingleData);
      });

      setRowData(RowData);
      
      setRowLoading(true);
    } catch (error) {
      setRowLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };
   const [incentiveData, setIncentiveData] = useState([
      {
        srNo: 1,
        ProductCategory: "PMS",
        AssetCategory: "All",
        SchemeName: "All",
        // RMName: "Manoj Waghle",
        // RMCode: "MW123",
        FromDate: "1/03/2025",
        ToDate: "30/03/2025",
        FromValue: "-",
        ToValue: 1000000,
        CommissionUpfront: 1,
        Commissionannually: 0,
        BranchID: "GHK001",
        ZoneID: "WEST",
      },
      {
        srNo: 2,
        ProductCategory: "PMS",
        AssetCategory: "All",
        SchemeName: "All",
        // RMName: "Manoj Waghle",
        // RMCode: "MW123",
        FromDate: "1/03/2025",
        ToDate: "30/03/2025",
        FromValue:  1000001,
        ToValue: 3000000,
        CommissionUpfront: 1.50,
        Commissionannually: 1.50,
        BranchID: "GHK001",
        ZoneID: "WEST",
      },
      {
        srNo: 3,
        ProductCategory: "PMS",
        AssetCategory: "All",
        SchemeName: "All",
        // RMName: "Manoj Waghle",
        // RMCode: "MW123",
        FromDate: "1/03/2025",
        ToDate: "30/03/2025",
        FromValue: 3000000,
        ToValue: "Any Limit",
        CommissionUpfront: 2,
        Commissionannually: 2,
        BranchID: "GHK001",
        ZoneID: "WEST",
      },
      
    ]);

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      field: "srNo",
      minWidth: 100,
    },
    {
      headerName: "Product Category",
      field: "ProductCategory",
      sortable: true,
      filter: true,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      headerName: "Asset Category",
      field: "AssetCategory",
      sortable: true,
      filter: true,
      minWidth: 180,
      maxWidth: 180,
    },
    {
      headerName: "Scheme Name",
      field: "SchemeName",
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    // {
    //   headerName: "RM Name",
    //   field: "RMName",
    //   sortable: true,
    //   filter: true,
    //   minWidth: 180,
    // },
    // {
    //   headerName: "RM Code",
    //   field: "RMCode",
    //   sortable: true,
    //   filter: true,
    //   minWidth: 150,
    // },
    {
      headerName: "From Date",
      field: "FromDate",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "ToDate",
      field: "ToDate",
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "From Value",
      field: "FromValue",
       cellRenderer: (params) => {
              return formattedAmount(params.data?.FromValue);
            },
            cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "To Value",
      field: "ToValue",
       cellRenderer: (params) => {
              return formattedAmount(params.data?.ToValue);
            },
            cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "% of Commission for Upfront",
      field: "CommissionUpfront",
        cellRenderer: (params) => {
              return  (params.data.CommissionUpfront == "-" ? "-" : params.data.CommissionUpfront + "%");
            },
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      headerName: "% of Commission for Trail annually",
      field: "Commissionannually",
      cellRenderer: (params) => {
        return (params.data.Commissionannually == "-" ? "-" : params.data.Commissionannually + "%");
      },
      sortable: true,
      filter: true,
      minWidth: 200,
    },
    {
      headerName: "Branch ID",
      field: "BranchID",
      sortable: true,
      filter: true,
      minWidth: 150,
     
    },
    {
      headerName: "Zone ID",
      field: "ZoneID",
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
          <div>
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
              rowData={incentiveData}
              filenames={
                "Transaction_Other_Product_List_" +
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
                      Number Of Records : 4
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

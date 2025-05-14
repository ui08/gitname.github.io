import React, { useCallback, useEffect, useState } from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../../util/apiurl";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";
import { getMomentFromDate } from "./../../../util/Authenticate/index";
import { InstrumentMasterPageurl } from "./../InstrumentMasterPageurl";

export default function MutualFundsList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
        fundHouse: item.fundHouse === "" ? `-` : item.fundHouse,
        schemeName: item.schemeName === "" ? `-` : item.schemeName,
        amfiCode: item.amfiCode === "" ? `-` : item.amfiCode,
        lookupAssetClassDescription:
          item.lookupAssetClassDescription === ""
            ? `-`
            : item.lookupAssetClassDescription,
        lookupAssetSubClassDescription:
          item.lookupAssetSubClassDescription === ""
            ? `-`
            : item.lookupAssetSubClassDescription,
        schemeOption: item.schemeOption === "" ? `-` : item.schemeOption,
        closeEndedFlag: item.closeEndedFlag === "" ? `-` : item.closeEndedFlag,
        schemeInceptionDate:
          item.schemeInceptionDate === ""
            ? `-`
            : getMomentFromDate(item.schemeInceptionDate, "Date"),
        regularDirectFlag:
          item.regularDirectFlag === "" ? `-` : item.regularDirectFlag,
        schemeEndDate:
          item.schemeEndDate === ""
            ? `-`
            : getMomentFromDate(item.schemeEndDate, "Date"),
        exitLoadAndPeriod:
          item.exitLoadAndPeriod === "" ? `-` : item.exitLoadAndPeriod,
        minInvestmentAmount:
          item.minInvestmentAmount === "" ? `-` : item.minInvestmentAmount,
        fundManagerName:
          item.fundManagerName === "" ? `-` : item.fundManagerName,
        status: item.status === "" ? `-` : item.status,
        sclassMasterDescription:
          item.sclassMasterDescription === ""
            ? `-`
            : item.sclassMasterDescription,
      };
      RowData.push(SingleData);
    });
    setRowData(RowData);
  };

  const handleClear = () => {
    setValue("name", "");
    // setValue("Filter", "")
    setFilterData({ label: "", value: "" });
    fetchData(currentPage, perPagesize);
  };

  const handleSearchChange = async (value) => {
    if (value.length == 0) {
      fetchData(currentPage, perPagesize);
    }
    if (value.length >= 2) {
      setRowData(null);
      // setLoading(true)
      try {
        const response = await axiosInstance.get(
          Apiurl.globalSearchIMMF +
            value +
            "/" +
            filterData.label +
            `?page=${currentPage}&size=${perPagesize}`
        );
        let result = response.data;
        setLoading(false);
        createRowData(response.data);
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
    (page) => {
      setCurrentPage(page);
      getfetchData(page, perPagesize);
    },
    [perPagesize]
  );

  const handlePageSizeChange = useCallback(
    (x) => {
      setPerPagesize(x.target.value);
      setCurrentPage(1);
      getfetchData(1, x.target.value);
    },
    [perPagesize]
  );
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
        Apiurl.globalSearchFilter + "/" + "IM_MUTUAL_FUND"
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

  // Callback for Search

  const fetchData = async (getcurrentPage, getperPagesize) => {
    setRowLoading(false);
    setRowData(null);
    setExportClickvalue(false);
    setResetClickvalue(false);
    try {
      const response = await axiosInstance.get(
        Apiurl.IMMutualFundList +
          `?page=${getcurrentPage}&size=${getperPagesize}`
      );
      console.log(response.data, "MFList");

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
      //     fundHouse: item.fundHouse === "" ? `-` : item.fundHouse,
      //     schemeName: item.schemeName === "" ? `-` : item.schemeName,
      //     amfiCode: item.amfiCode === "" ? `-` : item.amfiCode,
      //     lookupAssetClassDescription:
      //       item.lookupAssetClassDescription === ""
      //         ? `-`
      //         : item.lookupAssetClassDescription,
      //     lookupAssetSubClassDescription:
      //       item.lookupAssetSubClassDescription === ""
      //         ? `-`
      //         : item.lookupAssetSubClassDescription,
      //     schemeOption: item.schemeOption === "" ? `-` : item.schemeOption,
      //     closeEndedFlag:
      //       item.closeEndedFlag === "" ? `-` : item.closeEndedFlag,
      //     schemeInceptionDate:
      //       item.schemeInceptionDate === ""
      //         ? `-`
      //         : getMomentFromDate(item.schemeInceptionDate, "Date"),
      //     regularDirectFlag:
      //       item.regularDirectFlag === "" ? `-` : item.regularDirectFlag,
      //     schemeEndDate:
      //       item.schemeEndDate === ""
      //         ? `-`
      //         : getMomentFromDate(item.schemeEndDate, "Date"),
      //     exitLoadAndPeriod:
      //       item.exitLoadAndPeriod === "" ? `-` : item.exitLoadAndPeriod,
      //     minInvestmentAmount:
      //       item.minInvestmentAmount === "" ? `-` : item.minInvestmentAmount,
      //     fundManagerName:
      //       item.fundManagerName === "" ? `-` : item.fundManagerName,
      //     status: item.status === "" ? `-` : item.status,
      //     sclassMasterDescription:
      //       item.sclassMasterDescription === ""
      //         ? `-`
      //         : item.sclassMasterDescription,
      //   };
      //   RowData.push(SingleData);
      // });
      // setRowData(RowData);

      //
    } catch (error) {
      console.error("Error during GET request:", error.message);
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
      headerName: "Scheme Name",
      field: "schemeName",
      minWidth: 300,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Fund House",
      field: "fundHouse",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "AMFI Code",
      field: "amfiCode",
      maxWidth: 120,
      minWidth: 120,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Asset Class",
      field: "lookupAssetClassDescription",
      maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Sub Asset Class",
      field: "lookupAssetSubClassDescription",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Scheme Option",
      field: "schemeOption",
      maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Close Ended /Open Ended",
      field: "closeEndedFlag",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Scheme Inception Date",
      field: "schemeInceptionDate",
      maxWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Regular / Direct",
      field: "regularDirectFlag",
      minWidth: 200,
      maxWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Scheme End Date",
      field: "schemeEndDate",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Exit Load And Period",
      field: "exitLoadAndPeriod",
      minWidth: 350,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Min Inv Amount",
      field: "minInvestmentAmount",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.minInvestmentAmount);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Fund Manager",
      field: "fundManagerName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "SEBI Category",
      field: "sclassMasterDescription",
      minWidth: 150,
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
        encrypt("MutualFundsFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("MutualFundsFormComponent") +
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
            breadcrumbItems={InstrumentMasterPageurl.MutualFundslist}
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
                    <div className="col-12 col-md-3 col-lg-3 col-xl-3 crossbtnDiv">
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
                        setValue={setValue}
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
                "Instrument_Master_Mutual_Funds_list_" +
                getMomentFromDate(new Date(), "Date&Time")
              }
              onResetClick={handleResetClick}
              ResetClickvalue={ResetClickvalue}
              onExportClick={handleExportClick}
              ExportClickvalue={ExportClickvalue}
              // onSearchClick={handleSearchChange}
              // SearchClickvalue={SearchValue}
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
              rowLoading={rowLoading}
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
                    onPageChange={(page) => handlePageChange(page)}
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
      // buttonConfigs={[
      //   {
      //     text: "View",
      //     icon: faEye,
      //     action: "handleView",
      //     show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
      //   },
      //   {
      //     text: "Edit",
      //     icon: faPen,
      //     action: "handleEdit",
      //     show: currentRealmRole(keycloak, [userUIRole.iap_superadmin]),
      //     disabled: currentDisabled(params.data, [
      //       "Pending_For_Approval",
      //       "Approved",
      //     ]),
      //   },
      //   {
      //     text: "Delete",
      //     icon: faTrashCan,
      //     action: "handleDelete",
      //     disabled: currentDisabled(params.data, "Delete"),
      //     disabled: currentDisabled(params.data, [
      //       "Pending_For_Approval",
      //       "Approved",
      //     ]),
      //   },
      // ]}
      handleFunction={handleTableFunction}
    />
  );
}

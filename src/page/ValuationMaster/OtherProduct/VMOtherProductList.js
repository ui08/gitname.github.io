import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { getMomentFromDate } from "../../../util/Authenticate";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import ButtonComp from "./../../../Component/ButtonComp/ButtonComp";
import InputDatePickerWithMoment from "./../../../Component/ComponentsInput/InputDatePickerWithMoment";
import InputText from "./../../../Component/ComponentsInput/InputText";

export default function VMOtherProductList({ UploadModalOpen }) {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // custom pageable
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).subtract(1, "days")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    setValue("SelectDate", moment(new Date()).subtract(1, "days"));
    fetchData(currentPage, perPagesize, selectedDate);
  }, [UploadModalOpen]);

  // Callback for Search
  const [SearchValue, setSearchValue] = useState();
  const handleSearchChange = (value) => {
    console.log("Search", value);
    setSearchValue(value);
  };
  // Callback for Date Picker
  const handleDateChange = useCallback(
    (value) => {
      console.log(value);

      setValue("SelectDate", value);
      getfetchData(1, 100, value);
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

  const fetchData = async (getcurrentPage, getperPagesize, getselectedDate) => {
    setRowData(null);
    setRowLoading(false);
    setExportClickvalue(false);
    setResetClickvalue(false);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.VMotherProductList}${getMomentFromDate(
          getselectedDate,
          "MonthDateYYYY"
        )}&page=${getcurrentPage}&size=${getperPagesize}`
      );
      // custom pageable
      setValue("SelectDate", getselectedDate);
      setPerPagesize(response?.data?.size);
      setTotalPages(response?.data?.totalPages);

      setTotalElements(response?.data?.totalElements);
      const RowData = [];
      let pageNumber = response?.data?.pageable.pageNumber;
      let pageSize = response?.data?.pageable.pageSize;
      Object.values(response?.data?.content).map((item, index) => {
        let SingleData = {
          srNo: pageNumber * pageSize + index + 1,
          unitizedFlag:
            item.unitizedFlag === "" || item.unitizedFlag === null
              ? `-`
              : item.unitizedFlag,
          prouctName:
            item.prouctName === "" || item.prouctName === null
              ? `-`
              : item.prouctName,
          securityId:
            item.securityId === "" || item.securityId === null
              ? `-`
              : item.securityId,
          isin: item.isin === "" || item.isin === null ? `-` : item.isin,
          rtaCode:
            item.rtaCode === "" || item.rtaCode === null ? `-` : item.rtaCode,
          instrumentName:
            item.instrumentName === "" || item.instrumentName === null
              ? `-`
              : item.instrumentName,
          accountId:
            item.accountId === "" || item.accountId === null
              ? `-`
              : item.accountId,
          clientName:
            item.clientName === "" || item.clientName === null
              ? `-`
              : item.clientName,
          marketValue:
            item.marketValue === "" || item.marketValue === null
              ? `-`
              : item.marketValue,
          updatedDate:
            item.updatedDate === "" || item.updatedDate === null
              ? `-`
              : getMomentFromDate(item.updatedDate, "Date"),
          id: item.id === "" || item.id === null ? `-` : item.id,
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

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      field: "srNo",
      maxWidth: 180,
      minWidth: 120,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Pricing Method",
      field: "unitizedFlag",
      maxWidth: 180,
      minWidth: 200,
      cellRenderer: (params) => {
        return params.data?.unitizedFlag === "Y" ? "Unitized" : "Non Unitized";
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Product Name",
      field: "prouctName",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Security ID",
      field: "securityId",

      maxWidth: 180,
      minWidth: 200,
      sortable: true,
      filter: true,
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
      headerName: "RTA Code",
      field: "rtaCode",

      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Instrument Name",
      field: "instrumentName",
      minWidth: 210,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Account ID",
      field: "accountId",

      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Client Name",
      field: "clientName",

      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Market Value",
      field: "marketValue",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.marketValue);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",

      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Updated Date",
      field: "updatedDate",
      maxWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      minWidth: 250,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const breadcrumbItems = [
    {
      label: "Other Products",
      // icon: <FontAwesomeIcon icon={faList} />,
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
        encrypt("VMOtherProductFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("VMOtherProductFormComponent") +
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
      fetchData(currentPage, perPagesize, selectedDate);
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="">
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
      <div>
        <AgTable
          columnDefs={columnDefs}
          rowData={rowData}
          filenames={
            "Valuation_Master_Other_Product_List_" +
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
      </div>
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
      <AppModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        handleActon={handleDelete}
        buttonConfigs={[
          {
            text: "Delete",
            icon: faTrashCan,
            action: "handleDelete",
          },
        ]}
        Modaldata={modalData}
        Modalsize={"lg"}
        ModalTitle={"Delete Confirmation"}
        ModalBody={"Are you sure you want to delete  ?"}
        btnText={"Deleted"}
        show={true}
      />
    </div>
  );
}
function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "View",
          icon: faEye,
          action: "handleView",
          show: RouteCurrentAuthorities([
            userRole.Valuation_Master_Other_Products_Details,
          ]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: RouteCurrentAuthorities([
            userRole.Valuation_Master_Other_Products_Edit,
          ]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

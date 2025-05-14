import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputText from "../../../Component/ComponentsInput/InputText";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import Pagehader from "../../../Layout/Pagehader";
import { getMomentFromDate } from "../../../util/Authenticate";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import Loader from "../../../util/Loader";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

export default function AssetClassList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  // custom pageable
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).subtract(1, "days").format("YYYY-MM-DD")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  // Callback for Search
  const [SearchValue, setSearchValue] = useState();
  // const handleSearchChange = (value) => {
  //   console.log("Search", value);
  //   setSearchValue(value);
  // };

  // Callback for Date Picker

//   const handleDateChange = useCallback(
//     (value) => {
//       console.log(value);

//       setValue("SelectDate", value.$d);
//       getfetchData(1, 100, value.$d);
//       setSelectedDate(value.$d);
//     },
//     [selectedDate]
//   );
// const [ExportClickvalue, setExportClickvalue] = useState();
//   // Callback for Export Button
//   const handleExportClick = () => {
//     setExportClickvalue(true);
//     setResetClickvalue(false);
//     setTimeout(() => {
//       setExportClickvalue(false);
//       setResetClickvalue(false);
//     }, 100);
//   };

  const [ResetClickvalue, setResetClickvalue] = useState();

  // const handleResetClick = () => {
  //   setExportClickvalue(false);
  //   setResetClickvalue(true);
  //   setTimeout(() => {
  //     setExportClickvalue(false);
  //     setResetClickvalue(false);
  //   }, 100);
  // };

   const handleResetClick = () => {
    console.log("Reset Button Clicked");
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
  // const fetchData = async (getcurrentPage, getperPagesize, getselectedDate) => {
  //   setRowData(null);
  //   setRowLoading(false);
  //   setExportClickvalue(false);
  //   setResetClickvalue(false);
  //   try {
  //     const response = await axiosInstance.get(
  //       Apiurl.assetList + `?page=${getcurrentPage}&size=${getperPagesize}`
  //     );
  //     // custom pageable
  //     setValue("SelectDate", getselectedDate);

  //     setPerPagesize(response?.data?.size);
  //     setTotalPages(response?.data?.totalPages);

  //     setTotalElements(response?.data?.totalElements);

  //     const RowData = [];
  //     let pageNumber = response?.data?.pageable.pageNumber;
  //     let pageSize = response?.data?.pageable.pageSize;
  //     const filteredData = response?.data?.content.filter(item => item.description !== "Data Not Available");

  //     Object.values(filteredData).map((item, index) => {

  //       let SingleData = {
  //         srNo: pageNumber * pageSize + index + 1, // Dynamically calculated
  //         description:
  //           item.description === null || item.description === ""
  //             ? `-`
  //             : item.description,
  //         entityAssetDescription:
  //           item.entityAssetDescription === null ||
  //           item.entityAssetDescription === ""
  //             ? `-`
  //             : item.entityAssetDescription,
  //         taxAssetDescription:
  //           item.taxAssetDescription === null || item.taxAssetDescription === ""
  //             ? `-`
  //             : item.taxAssetDescription,
  //         id: item.id === null || item.id === "" ? `-` : item.id,
  //       };
  //       RowData.push(SingleData);
  //     });
  //     setRowData(RowData);

      
  //     setRowLoading(true);
  //   } catch (error) {
  //     setRowLoading(false);
  //     console.error("Error during POST request:", error.message);
  //   } finally {
  //   }
  // };


     const fetchData = async () => {
        try {
          const response = await axiosInstance.get(Apiurl.assetList);
          setLoading(false);
          setRowData(response.data);
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
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Asset Name",
      field: "description",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Entity Asset Name",
      field: "entityAssetDescription",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Tax Asset Name",
      field: "taxAssetDescription",
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
      label: "Asset Class Master",
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
        encrypt("AssetClassFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    navigate(
      "/" +
        encrypt("AssetClassFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };

  const handleDelete = () => {
    deleteAssetClass(modalData.id);
    setDeleteModalOpen(false);
  };

  const deleteAssetClass = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        Apiurl.deleteAsset + "/" + id
      );
      const result = await response.data;
      fetchData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

    const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Callback for Date Picker
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  // Callback for Export Button
  const handleExportClick = () => {
    console.log("Export Button Clicked");
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00268")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00268")}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex">
                {RouteCurrentAuthorities([
                        userRole.Asset_Class_Master_Create
                      ]) && (
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle={ "tableHeader"}     
               btnText={"Add New"}
                onClick={() =>
                  navigate(
                    "/" +
                      encrypt("AssetClassFormComponent") +
                      `/${encryptData("add")}` +
                      `/${encryptData("ss")}`
                  )
                }
              />
                      )}
            </div>
            <div>
               <AgTable
                              columnDefs={columnDefs}
                              rowData={rowData}
                              filenames={"AssetClassList" + getMomentFromDate(new Date(), "Date&Time")
}
                              StyleClass="btn btn-primary"
                              type="table"
                              gridOptions={{
                                getRowStyle,
                              }}
                              onSearchChange={handleSearchChange}
                              onDateChange={handleDateChange}
                              onExportClick={handleExportClick}
                              onResetClick={handleResetClick}
                              showDatePicker={false}
                            />
            </div>
            {/* {rowLoading && (
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
              filenames={
                "AssetClassList" + getMomentFromDate(new Date(), "Date&Time")
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
            )} */}
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
        </>
      )}
    </>
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
            userRole.Asset_Class_Master_Details,
          ]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: RouteCurrentAuthorities([
            userRole.Asset_Class_Master_Edit,
          ]),
        },
        {
          text: "Delete",
          icon: faTrashCan,
          action: "handleDelete",
          show: RouteCurrentAuthorities([
            userRole.Asset_Class_Master_Delete,
          ]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

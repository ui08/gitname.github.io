import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputText from "../../../Component/ComponentsInput/InputText";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import { getMomentFromDate } from "../../../util/Authenticate";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

export default function FamilyMasterList({ UploadModalOpen }) {
  const [rowData, setRowData] = useState();
  const [modalText, setModalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);

  // custom pageable

  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    fetchData(currentPage, perPagesize);
  }, [UploadModalOpen]);
  // Callback for Search
  const [SearchValue, setSearchValue] = useState();
  // const handleSearchChange = (value) => {
  //   console.log("Search", value);
  //   setSearchValue(value);
  // };

  // Callback for Date Picker
  // const handleDateChange = (value) => {
  //   setSelectedDate(value);
  // };
const [ExportClickvalue, setExportClickvalue] = useState();
  // Callback for Export Button
  // const handleExportClick = () => {
  //   setExportClickvalue(true);
  //   setResetClickvalue(false);
  //   setTimeout(() => {
  //     setExportClickvalue(false);
  //     setResetClickvalue(false);
  //   }, 100);
  // };

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
  // const fetchData = async (getcurrentPage, getperPagesize) => {
  //   setRowData(null);
  //   setRowLoading(false);
  //   setExportClickvalue(false);
  //   setResetClickvalue(false);
  //   try {
  //     const response = await axiosInstance.get(
  //       Apiurl.familyList + `?page=${getcurrentPage}&size=${getperPagesize}`
  //     );
  //     // custom pageable
  //     setRowLoading(true);
  //     setPerPagesize(response?.data?.size);
  //     setTotalPages(response?.data?.totalPages);

  //     setTotalElements(response?.data?.totalElements);

  //     const RowData = [];
  //     let pageNumber = response?.data?.pageable.pageNumber;
  //     let pageSize = response?.data?.pageable.pageSize;
  //     Object.values(response?.data?.content).map((item, index) => {
  //       let SingleData = {
  //         srNo: pageNumber * pageSize + index + 1, // Dynamically calculated
  //         familyId:
  //           item.id === "" || item.id === null
  //             ? `-`
  //             : item.id,
  //         familyName:
  //           item.familyName === "" || item.familyName === null
  //             ? `-`
  //             : item.familyName,
  //         familyHeadId:
  //           item.familyHeadId === "" || item.familyHeadId === null
  //             ? `-`
  //             : item.familyHeadId,
  //         familyHeadNamePAN:
  //           item.familyHeadNamePAN === "" || item.familyHeadNamePAN === null
  //             ? `-`
  //             : item.familyHeadNamePAN,
  //         activeFlag:
  //           item.activeFlag === "" || item.activeFlag === null
  //             ? `-`
  //             : item.activeFlag == true
  //             ? "Activate"
  //             : "Deactivate",
  //       };
  //       RowData.push(SingleData);
  //     });
  //     setRowData(RowData);
      
  //   } catch (error) {
  //     setRowLoading(false);
  //     console.error("Error during POST request:", error.message);
  //   } finally {
  //   }
  // };

   const fetchData = async () => {
      try {
        const response = await axiosInstance.get(Apiurl.familyListV2);
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
      headerName: "Family ID",
      field: "id",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Family Name",
      field: "familyName",
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "Family Head Name",
      field: "familyHeadNamePAN",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Status",
    //   field: "activeFlag",
    //   minWidth: 210,
    //   sortable: true,
    //   filter: true,
    //   cellRenderer: (params) => {
    //     return (
    //       <>{params.data.activeFlag == "Activate" ? "Activate" : "Deactivate"}</>
    //     );
    //   },
    // },
    // {
    //   headerName: "Client Name",
    //   field: "",
    //   minWidth: 210,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Actions",
      minWidth: 250,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00268"),
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
    } else if (action === "handleToggle") {
      setModalData([]);
      setModalData(params.data);
      setModalText(
        params.data.activeFlag == "Activate"
          ? t("Messages:toggleDeactivate")
          : t("Messages:toggleActivate")
      );
      setToggleModalOpen(true);
    }
  };
  const handleEdit = (data) => {
    console.log("ddd", data);
    navigate(
      "/" +
        encrypt("FamilyMasterFormComponent") +
        `/${encryptData("edit")}` +
        `/${encryptData(data.id)}`
    );
  };
  const handleView = (data) => {
    console.log("ddd", data);
    navigate(
      "/" +
        encrypt("FamilyMasterFormComponent") +
        `/${encryptData("view")}` +
        `/${encryptData(data.id)}`
    );
  };

  const handleToggleStatus = async (data) => {

    let url;
    if (data.Modaldata.activeFlag == "Activate") {
      url = Apiurl.deactivateFamily;
    } else {
      url = Apiurl.activateFamily;
    }
    try {
      const response = await axiosInstance.get(
        `${url}${data.Modaldata.familyId}`
      );
      toast.success("Deactivated");
      setToggleModalOpen(false);
      fetchData(currentPage, perPagesize);
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
    <div className="">
      {/* <div>
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
            "Family_Master_list" + getMomentFromDate(new Date(), "Date&Time")
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
                onPageChange={(page) => handlePageChange(page, perPagesize)}
                previousLabel="Previous"
                nextLabel="Next"
              />
            </div>
          </div>
        )}
      </div> */}
      <AgTable
                columnDefs={columnDefs}
                rowData={rowData}
                filenames={"Family_Master_list" + getMomentFromDate(new Date(), "Date&Time")}
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
      <AppModal
        isOpen={toggleModalOpen}
        onClose={() => setToggleModalOpen(false)}
        handleActon={handleToggleStatus}
        buttonConfigs={[
          {
            text: "Yes",
            icon: "",
            action: "handleToggleStatus",
          },
        ]}
        Modaldata={modalData}
        Modalsize={"lg"}
        ModalTitle={modalText}
        ModalType={"Toggle"}
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
            userRole.Family_Master_Details,
          ]),
        },
        {
          text: "Edit",
          icon: faPen,
          action: "handleEdit",
          show: RouteCurrentAuthorities([
            userRole.Family_Master_Edit,
          ]),
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

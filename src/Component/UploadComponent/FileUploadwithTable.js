import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FileUpload from "../../Component/ComponentsInput/InputFileWith";
import { getMomentFromDate, getUserFilterDetails, getUserId } from "../../util/Authenticate";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import ButtonComp from "../ButtonComp/ButtonComp";
import AgTable from "../ComponentsTable/AgTable";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import InputDatePicker from "../../Component/ComponentsInput/InputDatePicker";
import dayjs from "dayjs";
import { Apiurl } from "../../util/apiurl";
import moment from "moment";

const FileUploadwithTable = ({
  initialData,
  onSubmit,
  FileUploadwithTableItems,
  dummy,
}) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [clientName, setClientName] = useState([]);
  const [accountName, setAccountName] = useState([]);
  const [clientId, setClientId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
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
  } = useForm({ defaultValues: initialData });
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };
  console.log("history", FileUploadwithTableItems);
  useEffect(() => {
    if (initialData) {
      // Populate form with initialData when it's available
      reset(initialData);
    }
    fetchClient();
  }, [initialData, reset]);

  const handleClientName = (e) => {
    console.log("client",e)
    setClientId(e.value)
    fetchAccount(e.value)
  };

  const handleAccount = (e) => {
    setAccountId(e.value)
  };

  const handleFromDateChange = useCallback((value) => {
    console.log(value);
    setFromDate(value.$d)
    setValue("SelectFromDate", value.$d);
    // setSelectedDate(value.$d);
  }, []);

  const handleToDateChange = useCallback((value) => {
    console.log(value);
    setToDate(value.$d)
    setValue("SelectToDate", value.$d);
    // setSelectedDate(value.$d);
  }, []);

  const handleUpload = async (file) => {
    setLoading(true);
    // setUploadModalOpen((prevValue) => !prevValue);
    const MAX_FILE_SIZE =
      FileUploadwithTableItems.UploadMAX_FILE_SIZE * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert(
        `File size exceeds the maximum limit of ${MAX_FILE_SIZE}MB. Please upload a smaller file.`
      );
      return;
    }

    let fileUploadDTO = JSON.stringify({
      filename: FileUploadwithTableItems.uploadEnum,
      userId: getUserId(),
      fileUploadType: FileUploadwithTableItems.uploadEnum,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      // Close modal if upload succeeds
      setLoading(false);
      fetchData();
      // navigate(
      //   "/" + encrypt("UserCreationListLanding") + `/${encryptData("History")}`
      // );
      // setUploadModalOpen((prevValue) => !prevValue);
    } else {
      setLoading(false);
    }
  };

  const handleUploadDelete = async (file) => {
    setLoading(true);
    // setUploadModalOpen((prevValue) => !prevValue);
    const MAX_FILE_SIZE =
      FileUploadwithTableItems.UploadMAX_FILE_SIZE * 1024 * 1024;

    if (file?.size > MAX_FILE_SIZE) {
      alert(
        `File size exceeds the maximum limit of ${MAX_FILE_SIZE}MB. Please upload a smaller file.`
      );
      return;
    }

    let fileUploadDTO = JSON.stringify({
      filename: FileUploadwithTableItems.uploadEnum,
      userId: getUserId(),
      fileUploadType: FileUploadwithTableItems.uploadEnum,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      // Close modal if upload succeeds
      setLoading(false);
      fetchData();
      // navigate(
      //   "/" + encrypt("UserCreationListLanding") + `/${encryptData("History")}`
      // );
      // setUploadModalOpen((prevValue) => !prevValue);
    } else {
      setLoading(false);
    }
  };

  const UploadTemplateFunction = async (payload) => {
    try {
      const response = await axiosInstance.post(
        FileUploadwithTableItems.TemplateUploadApi,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      return true; // Success: Return true
    } catch (error) {
      console.error("Upload error: ", error);
      toast.error("Upload failed. Please try again.");
      return false; // Failure: Return false
    }
  };
  const handledownloadTemplate = async (payload) => {
    setLoading(true);
    // setUploadModalOpen((prevValue) => !prevValue);

    // const { t } = useTranslation(["Common", "Messages", "Form"]);

    try {
      const response = await axiosInstance.get(
        `${FileUploadwithTableItems.downloadTemplateApi}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${FileUploadwithTableItems.downloadTemplateFileName}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      toast.success(t("Messages:DownloadTemplate"));
      setLoading(false);
      // setUploadModalOpen((prevValue) => !prevValue);

      return true;
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t("Download Failed"));
      return false;
    } finally {
    }
  };

  const handledownloadTemplateDelete = async (payload) => {
    console.log('from', fromDate, toDate)
    let Data = {
      clientName: clientId ? clientId: null,
      accountId: accountId ? accountId : null ,
      productName: FileUploadwithTableItems.downloadTemplateFileName == "TRANSACTION DIRECT EQUITY DELETE" ? "Stocks" : FileUploadwithTableItems.downloadTemplateFileName == "TRANSACTION OTHER PRODUCTS DELETE" ? "PMS" : FileUploadwithTableItems.downloadTemplateFileName == "BONDS TRANSACTION DELETE" ? "Bonds / Debentures" : "Mutual Funds",
      fromDate: fromDate ? moment(fromDate)?.format('YYYY-MM-DD') : null,
      toDate: toDate ? moment(toDate)?.format('YYYY-MM-DD') : null,
    };
    setLoading(true);
    // setUploadModalOpen((prevValue) => !prevValue);

    // const { t } = useTranslation(["Common", "Messages", "Form"]);

    try {
      const response = await axiosInstance.post(
        `${FileUploadwithTableItems.downloadTemplateApi}`, Data,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${FileUploadwithTableItems.downloadTemplateFileName}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      toast.success(t("Messages:DownloadTemplate"));
      setLoading(false);
      // setUploadModalOpen((prevValue) => !prevValue);

      return true;
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t("Download Failed"));
      return false;
    } finally {
    }
  };

  const [rowData, setRowData] = useState();

  const [rowDataDummy, setRowDataDummy] = useState([
    {
      fileId: "60219lwo-c916-4d7f-9532-665708325301",
      recordCount: "1",
      successCount: "1",
      errorCount: "0",
      startTime: "2025-03-05T09:03:01",
      uploadStatus: "SUCCESS",
    },
  ]);

  useEffect(() => {
    fetchData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const fetchClient = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.allClientsList}`);
      if (response) {
        let result = response.data;
        setClientName([])
        Object.values(response.data).map((item) => {
          let SingleData = {
            value: item.id,
            label: item.name,
          };
          setClientName((prev) => [...prev, SingleData]);
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  const fetchAccount = async (val) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.getAccountID}${val}`);
      if (response) {
        let result = response.data;
        setAccountName([])
        Object.values(response.data).map((item) => {
          let SingleData = {
            value: item.accountUniqueId,
            label: item.accountName,
          };
          setAccountName((prev) => [...prev, SingleData]);
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };
  console.log('name',clientName)

  const handleBulkOption = (page, type, file = null) => {
    console.log("page", page);
    if (type == "download") {
      if (page == "TRANSACTION DIRECT EQUITY DELETE" || page == "TRANSACTION MUTUAL FUNDS DELETE" || page == "TRANSACTION OTHER PRODUCTS DELETE" || page == "BONDS TRANSACTION DELETE") {
        handledownloadTemplateDelete();
      } else {
        handledownloadTemplate();
      }
    } else {
      if (page == "TRANSACTION DIRECT EQUITY DELETE" || page == "TRANSACTION MUTUAL FUNDS DELETE" || page == "TRANSACTION OTHER PRODUCTS DELETE" || page == "BONDS TRANSACTION DELETE") {
        handleUploadDelete(file);
      } else {
        handleUpload(file);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        FileUploadwithTableItems.fetchDataHistoryApi
      );
      if (response) {
        let result = response.data;
        setRowData(result);
      }
    } catch (error) {
      setLoading(false);
      // console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFile = async (fileId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${FileUploadwithTableItems.DownloadFileApi}/${fileId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      toast.success(t("Messages:FileDownload"));
      setLoading(false);
    } catch (error) {
      console.error("Login error: ", error);
      // toast.error(t(""));
      setLoading(false);
    } finally {
    }
  };

  const handleErrorLog = async (data) => {
    setLoading(true);
    console.log("first", data.rejectionFileId);
    try {
      const response = await axiosInstance.get(
        `${FileUploadwithTableItems.DownloadFileApi}/${data}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${data}.xlsx`);
      document.body.appendChild(link);
      link.click();
      setLoading(false);
      toast.success(t("Messages:FileDownload"));
    } catch (error) {
      setLoading(false);
      // console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
    }
  };

  const columnDefs = [
    {
      headerName: "File Id",
      field: "fileId",
      sortable: true,
      filter: true,
      minWidth: 350,
      cellRenderer: (params) => {
        const fileId = params.value;
        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDownloadFile(fileId);
            }}
          >
            {params.value}
          </a>
        );
      },
    },

    {
      headerName: "Record Count",
      field: "recordCount",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Success Count",
      field: "successCount",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Error Count",
      field: "errorCount",
      sortable: true,
      filter: true,

      cellRenderer: (params) => {
        console.log("first", params.data.rejectionFileId);

        return (
          <a
            href=""
            style={{
              pointerEvents:
                params.data.rejectionFileId == null ? "none" : "auto",
              color: params.data.rejectionFileId == null ? "gray" : "blue",
              textDecoration:
                params.data.rejectionFileId == null ? "none" : "underline",
            }}
            onClick={(e) => {
              e.preventDefault();
              handleErrorLog(params.data.rejectionFileId);
            }}
          >
            {params.value}
          </a>
        );
      },
    },

    {
      headerName: "Created Date",
      field: "startTime",
      minWidth: 200,
      cellRenderer: (params) =>
        getMomentFromDate(params.data.startTime, "Date&Time"),
      sortable: true,
      filter: true,
    },
    {
      headerName: "Upload Status",
      field: "uploadStatus",
      sortable: true,
      filter: true,
    },
  ];

  if (loading) {
    return (
      <div>
        {" "}
        <Loader pagename={t("Common:App_lms_Common_00269")} />.
      </div>
    );
  }

  const OnClickRefresh = () => {
    fetchData();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row justify-content-center ">
          {FileUploadwithTableItems.downloadTemplateFileName == "TRANSACTION DIRECT EQUITY DELETE" || FileUploadwithTableItems.downloadTemplateFileName == "TRANSACTION MUTUAL FUNDS DELETE" || FileUploadwithTableItems.downloadTemplateFileName == "TRANSACTION OTHER PRODUCTS DELETE" || FileUploadwithTableItems.downloadTemplateFileName == "BONDS TRANSACTION DELETE" ?
          <> 
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="Client"
                mandatory={false}
                labelName="Select Client Name"
                options={clientName}
                previewFlag={false}
                onSelect={(e) => handleClientName(e)}
                divClassName={"divClassName"}
              />
            </div>
            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="AccountType"
                mandatory={false}
                labelName="Select Account"
                options={accountName}
                previewFlag={false}
                onSelect={(e) => handleAccount(e)}
                divClassName={"divClassName"}
              />
            </div>
            <div className="col-12 col-md-3 col-lg-3">
              <InputDatePicker
                control={control}
                setValue={setValue}
                errors={errors}
                labelName="Select From Date"
                registerName="SelectFromDate"
                mandatory={true}
                dateformat="DD/MM/YYYY"
                readonly={false}
                // disabled={maturityDateProps.MaturityDatedisabled}
                disabled={false}
                minDateVal={null} // Optional: Specify the minimum date
                maxDateVal={dayjs()} // Disable future dates
                onSelect={(value) => handleFromDateChange(value)}
              />
            </div>
            <div className="col-12 col-md-3 col-lg-3">
              <InputDatePicker
                control={control}
                setValue={setValue}
                errors={errors}
                labelName="Select To Date"
                registerName="SelectToDate"
                mandatory={true}
                dateformat="DD/MM/YYYY"
                readonly={false}
                // disabled={maturityDateProps.MaturityDatedisabled}
                disabled={false}
                minDateVal={null} // Optional: Specify the minimum date
                maxDateVal={dayjs()} // Disable future dates
                onSelect={(value) => handleToDateChange(value)}
              />
            </div>
          </div> </> : null}
          <div className=" col-12">
            <FileUpload
              title={"Upload File"}
              docName={t("Common:App_lms_Common_00227")}
              FILE_ALLOWED_TYPES={[
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Word documents (DOCX)
                "application/vnd.ms-excel", // Excel documents (XLS)
              ]}
              FILEType={["excel"]}
              FILE_MAX_SIZE={10} //in MB
              FILE_MIN_SIZE={1} //in KB
              Id={"idFile"}
              // pagename={mode}
              downloadTemplate={() =>
                handleBulkOption(
                  FileUploadwithTableItems.downloadTemplateFileName,
                  "download"
                )
              }
              onFileChangeNew={(file) =>
                handleBulkOption(
                  FileUploadwithTableItems.downloadTemplateFileName,
                  "upload", file
                )
              }
              downloadButtonName={"Download Template"}
              uploadButtonName={"Upload"}
            />
          </div>
        </div>
      </form>

      <div>
        <div className="row  ">
          <div className="col-12 d-flex justify-content-between align-items-center my-3">
            <div>
              <strong>Upload History</strong>
            </div>

            <div>
              <ButtonComp
                key={"refresh"}
                wrapperName={"btn_wrapper "}
                type="button"
                btnStyle="box"
                btnText={"Refresh"}
                onClick={OnClickRefresh}
              ></ButtonComp>
            </div>
          </div>
          <div className=" col-12">
            <AgTable
              columnDefs={columnDefs}
              rowData={dummy == "dummy" ? rowDataDummy : rowData}
              filenames={
                FileUploadwithTableItems.downloadTemplateFileName +
                getMomentFromDate(new Date(), "Date&Time")
              }
              StyleClass="btn btn-primary"
              type="table"
              gridOptions={{
                getRowStyle,
              }}
              showDatePicker={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
// FormComponent.propTypes = {
//   initialData: PropTypes.any,
//   onSubmit: PropTypes.func,
// };
export default FileUploadwithTable;

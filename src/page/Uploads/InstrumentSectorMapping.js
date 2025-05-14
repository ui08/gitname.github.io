import { t } from "i18next";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AgTable from "../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../util/apiurl";
import { getUserId } from "../../util/Authenticate";
import axiosInstance from "../../util/axiosInstance";
import { uploadEnum } from "./data";
import FormComponent from "./UploadFormComponent";
import {
    DownloadTemplateFunction,
    UploadTemplateFunction
} from "./UploasAction";

export default function InstrumentSectorMapping() {
  const [loading, setLoading] = useState(false);
  const [tenantMasterData, setTenantMasterData] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // getUserDetails();
    handleRefresh(uploadEnum.INSTRUMENT_SECTOR_MAPPING);
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.userDetails);
      const userData = response.data;
      setUserId(userData.userId);
      setUserName(userData.fullName);
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = (data) => {
    // console.log("data", data);
  };
  const handledownloadTemplate = (data) => {
    DownloadTemplateFunction("INSTRUMENT_SECTOR_MAPPING");
  };
  const handleFileUpload = (file) => {
    const MIN_FILE_SIZE = 1 * 1024; // 1KB in bytes
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

    if (file.size < MIN_FILE_SIZE) {
      alert("File size is too small. Minimum allowed size is 1KB.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(
        "File size exceeds the maximum limit of 10MB. Please upload a smaller file."
      );
      return;
    }

    let fileUploadDTO = JSON.stringify({
      filename: "INSTRUMENT_SECTOR_MAPPING",
      userId: getUserId(),
      fileUploadType: uploadEnum.INSTRUMENT_SECTOR_MAPPING,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    UploadTemplateFunction(data);
  };
  const handleRefresh = async () => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.uploadHistory}${uploadEnum.INSTRUMENT_SECTOR_MAPPING}`
      );
      if (response) {
        // toast.success(response.data.message);
        let result = response.data;
        setTenantMasterData(result);
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      // setLoading(false);
    }
  };

  const handleDownloadFile = async (fileId) => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.bulkHistory}/${fileId}`,
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
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
    }
  };

  const handleErrorLog = async (data) => {
    setLoading(true)
    console.log("first", data.rejectionFileId);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.bulkHistory}/${data}`,
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
      setLoading(false)
      toast.success(t("Messages:FileDownload"));
    } catch (error) {
      console.error("Login error: ", error);
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
      maxWidth: 500,
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
      maxWidth: 100,
    },
    {
      headerName: "Success Count",
      field: "successCount",
      sortable: true,
      filter: true,
      maxWidth: 100,
    },
    {
      headerName: "Error Count",
      field: "errorCount",
      sortable: true,
      filter: true,
      maxWidth: 500,
      cellRenderer: (params) => {
        console.log("first", params.data.rejectionFileId);

        return (
          <a
            href=""
            style={{
              pointerEvents: params.data.rejectionFileId == null ? 'none' : 'auto',
              color: params.data.rejectionFileId == null ? 'gray' : 'blue',
              textDecoration: params.data.rejectionFileId == null ? 'none' : 'underline', 

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


    // {
    //   headerName: "Created By",
    //   field: "createdBy",
    //   cellRenderer: (params) => userName,
    //   sortable: true,
    //   filter: true,
    //   maxWidth: 200,
    // },
    {
      headerName: "Created Date",
      field: "createdDate",
      cellRenderer: (params) =>
        moment(params.data.createdDate).format("DD/MM/YYYY HH:mm:ss"),
      sortable: true,
      filter: true,
      maxWidth: 300,
    },
  ];

  return (
    <>
      <FormComponent
        onSubmit={handleAddSubmit}
        onFileChangeNew={handleFileUpload}
        downloadTemplate={handledownloadTemplate}
      />

      <div className="row">
        {/* <Historycard data={tenantMasterData} type = {uploadEnum.INSTRUMENT_SECTOR_MAPPING} name = {userName}/> */}
        <AgTable
          columnKeys={columnDefs.field}
          columnDefs={columnDefs}
          rowData={tenantMasterData}
          // filenames={
          //   `${optionbtn}` +
          //   "_" +
          //   `${optionbtn === "All" ? "" : selectedOptioncard}` +
          //   "_" +
          //   "Information"
          // }
          StyleClass={"ag_export_btn ripple_btn"}
          downloadbtnstext={true}
          // onSelectionChanged={onSelectionChangedContribution}
        />
      </div>
    </>
  );
}
const styles = {
  buttonGroup: {
    display: "flex",
    gap: "5px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4f74f7",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
};

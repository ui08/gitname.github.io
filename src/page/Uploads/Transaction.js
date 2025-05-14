import React from "react";
import FileUploadwithTable from './../../Component/UploadComponent/FileUploadwithTable';
import { Apiurl } from './../../util/apiurl';
import { uploadEnum } from "./data";

export default function Transaction() {
    const FileUploadwithTableItems = {
      downloadTemplateApi: Apiurl.CientMasterUpload,
      downloadTemplateFileName: "Client Master",
      fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.TRANSACTION_BULK_UPLOAD}`,
      TemplateUploadApi: Apiurl.uploadExcelTemplate,
      UploadMAX_FILE_SIZE: 10,
      DownloadFileApi: `${Apiurl.bulkmasterHistory}`,
      uploadEnum: uploadEnum.TRANSACTION_BULK_UPLOAD,
    };
  return (
    <>
      <FileUploadwithTable
            FileUploadwithTableItems={FileUploadwithTableItems}
          />
    </>
  );
}


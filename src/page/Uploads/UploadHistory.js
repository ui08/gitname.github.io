import React from "react";
import FileUpload from "../../util/FileUpload";

function UploadHistory({ initialData, onSubmit, onFileChangeNew }) {
  const mode = decryptData(useParams().mode);
  const handleUpload = (files) => {
    // console.log("Files uploaded:", files);
  };

  const handleDownload = () => {
    // console.log("Download triggered");
  };

  return (
    <div>
      <div
        className="mt-3"
        style={{
          margin: "15px",
          height: "240px",
          width: "88vw",
          backgroundColor: "#FFFF",
          borderRadius: "20px",
        }}
      >
        <div className="p-3 d-flex">
          {/* <FileUpload onUpload={handleUpload} onDownload={handleDownload} /> */}
          <FileUpload
            title={"Upload File"}
            docName={t("Common:App_lms_Common_00227")}
            FILE_ALLOWED_TYPES={[
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Word documents (DOCX)
              "application/vnd.ms-excel", // Excel documents (XLS)
            ]}
            FILEType={["excel"]}
            FILE_MAX_SIZE={5} //in MB
            FILE_MIN_SIZE={1} //in KB
            Id={"idFile"}
            onFileChangeNew={onFileChangeNew}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-12 bg-light">
          <div className="card uploadCards">
            <div className="card-body dashbordchartTitle">
              <p className="dashbordchartname">Code 1</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 bg-light">
          <div className="card uploadCards">
            <div className="card-body dashbordchartTitle">
              <p className="dashbordchartname">Code 2</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 bg-light">
          <div className="card uploadCards">
            <div className="card-body dashbordchartTitle">
              <p className="dashbordchartname">Code 3</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 bg-light">
          <div className="card uploadCards">
            <div className="card-body dashbordchartTitle">
              <p className="dashbordchartname">Code 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadHistory;

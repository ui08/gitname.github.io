import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronUp,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import "./CorporateReportscard.scss";

export default function CorporateReportscard({ data, type }) {
  const [currentPage, setCurrentPage] = useState(0);

  // Number of items per page
  const itemsPerPage = type === "Recent" ? 2 : 6;

  // Calculate the data to show on the current page
  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handlePDF = async (reportType, reportFileId, reportFileName) => {
    try {
      // Construct the API endpoint dynamically with the provided parameters (query parameters)
      const endpoint = `${Apiurl.downloadReport}reportType=${reportType}&fileId=${reportFileId}`;

      // Make an API request to fetch the PDF file
      const response = await axiosInstance.get(endpoint, {
        responseType: "blob", // Ensure the response is in blob format
      });

      // Create a temporary URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor link to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", reportFileName); // Set the default filename for the download

      // Append the link to the DOM, simulate a click to trigger the download, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the created URL object
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Handle errors if download fails
      // setError("Error downloading the PDF");
      console.error("Error downloading the PDF", err);
    } finally {
      // setLoading(false); // Reset the loading state after the operation completes
    }
  };
  const handleDownload = (x) => {
    alert("Download" + x);
  };
  return (
    <>
      {/* Render current page data */}

      <div className="row justify-content-center">
        {currentData.map((item, index) => (
          // <li key={item.id}>
          //   {item.name} - Age: {item.age}
          // </li>
          <div className="col-12 col-md-12 col-lg-6 col-xl-6 mb-3" key={index}>
            <div
              className={
                `CorporateReportscard CorporateReportscard-` +
                statusFunction(item.uploadStatus)
              }
            >
              <div className="row">
                <div className="col-10">
                  <div className="filename">
                    {item.reportType ? item.reportType : ""}
                  </div>
                  <div className="Uploader">
                    <p className="Uploadertext">Requested by:</p>
                    <p className="Uploaderdata">
                      {item.createdBy ? item.createdBy : ""}
                    </p>
                  </div>
                  <div className="Uploader">
                    <p className="Uploadertext">Created Date:</p>
                    <p className="Uploaderdata">
                      {moment(new Date(item.createdDate)).format(
                        "DD MMM YYYY, hh:mm:ss a"
                      )}
                    </p>
                  </div>
                  <div className="Uploader">
                    <p className="Uploadertext">Maturity:</p>
                    <p className="Uploaderdata">
                      -
                      {/* {moment(new Date(item.lastModifiedDate)).format("DD/MM/YYYY, hh:mm:ss a")} */}
                    </p>
                  </div>
                  <div className="Uploader">
                    <p className="Uploadertext">Duration:</p>
                    <p className="Uploaderdata">
                      From (20 Sep 2024) To (20 Sep 2024)
                      {/* {moment(new Date(item.lastModifiedDate)).format("DD/MM/YYYY, hh:mm:ss a")} */}
                    </p>
                  </div>
                  <div className="status">
                    <div className="statustextdiv">
                      {type === "Recent" ? (
                        <p className={`statustext statustext-Partially`}>
                          Generating...
                        </p>
                      ) : (
                        <p
                          className={
                            `statustext statustext-` +
                            statusFunction(item.reportDownloadFlag)
                          }
                        >
                          {item.reportDownloadFlag === "Y"
                            ? "Report Generated !"
                            : "Failed"}
                        </p>
                      )}
                    </div>
                    {type === "Recent" ? (
                      <div className="statusbar">
                        <ProgressBar
                          striped
                          // className="bg-Report Generated !"
                          variant={"Generating"}
                          animated
                          now={30}
                        />
                      </div>
                    ) : (
                      <div className="statusbar">
                        <ProgressBar
                          striped
                          // className="bg-Report Generated !"
                          variant={
                            item.reportDownloadFlag === "Y"
                              ? "ReportGenerated"
                              : "Failed"
                          }
                          animated
                          now={100}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={
                    type === "Recent"
                      ? "col-2  CorporateReportscardbtn btnDownloaddisbale"
                      : "col-2  CorporateReportscardbtn"
                  }
                >
                  <button
                    type="button"
                    className="btn"
                    disabled={
                      type === "Past" || item.reportDownloadFlag === "y"
                        ? item.reportFileType === "PDF"
                          ? false
                          : true
                        : true
                    }
                    onClick={() =>
                      handlePDF(
                        item.reportType,
                        item.reportFileId,
                        item.reportFileName
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faFilePdf} />
                    Pdf
                  </button>
                  <button
                    type="button"
                    className="btn "
                    disabled={true}
                    onClick={() => handleETLog(item.responseFileId)}
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    csv
                  </button>
                  <button
                    type="button"
                    className="btn "
                    disabled={true}
                    onClick={() => handleDownload(item.responseFileId)}
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    tsv
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12 paginationdiv">
          {/* Pagination Controls */}
          {/* <ReactPaginate
            previousLabel={
              <FontAwesomeIcon icon={faChevronUp} rotation={270} />
            }
            nextLabel={<FontAwesomeIcon icon={faChevronUp} rotation={90} />}
            breakLabel={"..."}
            pageCount={Math.ceil(data.length / itemsPerPage)} // Total pages (always based on 6 items per page)
            marginPagesDisplayed={2} // How many pages to display at the edges
            pageRangeDisplayed={5} // How many page numbers to display in the middle
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          /> */}
        </div>
      </div>
    </>
  );
}
function statusFunction(item) {
  let temstatus = "";
  if (item === "Y") {
    return (temstatus = "ReportGenerated");
  }
  // if (item === "N") {
  //   return (temstatus = "Partially");
  // }
  // if (item === "RUNNING") {
  //   return (temstatus = "Generating");
  // }
  if (item === "N") {
    return (temstatus = "Failed");
  }
}

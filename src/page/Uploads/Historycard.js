import {
    faFileArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import toast from "react-hot-toast";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import "./Historycard.scss";

// Sample data (array of objects)

export default function Historycard({ data, type, name }) {
  console.log("first",data)
  const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
  

  // Number of items per page
  const itemsPerPage = 6;

  // Calculate the data to show on the current page
  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleETLog = (x) => {
    alert("ETLog" + x);
  };
 
  const handleDownload = async ( reportFileId) => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.bulkHistory}/${reportFileId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${reportFileId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      toast.success(t("Messages:FileDownload"));
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
    }
  };

  const handleErrorLog = async ( reportFileId) => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.bulkHistory}/${reportFileId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${reportFileId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      toast.success(t("Messages:FileDownload"));
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
    }
  };

  useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);
  

 

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
                `historycard historycard-` + statusFunction(item.uploadStatus)
              }
            >
              <div className="row">
                <div className="col-9">
                  <div className="filename">{item.fileName}</div>
                  <div className="Uploader">
                    <p className="Uploadertext">Upload Date:</p>
                    <p className="Uploaderdata">
                     
                      {moment(item?.startTime).format('DD/MM/YYYY hh:mm:ss ')}
                   {/* {moment(new Date(item.lastModifiedDate)).format("DD/MM/YYYY, hh:mm:ss a")} */}
                    </p>
                  </div>
                  <div className="Uploader">
                    <p className="Uploadertext">Uploader:</p>
                    <p className="Uploaderdata">{name}</p>
                  </div>

                  <div className="status">
                    <div className="statustextdiv">
                      <p
                        className={
                          `statustext statustext-` +
                          statusFunction(item.uploadStatus)
                        }
                      >
                        {statusFunction(item.uploadStatus)}
                      </p>
                      <p
                        className={
                          `statusdata statusdata-` +
                          statusFunction(item.uploadStatus)
                        }
                      >
                        {statusFunction(item.uploadStatus) === "Partially"
                          ? item.errorCount + "/" + item.recordCount
                          : statusFunction(item.uploadStatus) === "Successful"
                          ? item.successCount + "/" + item.recordCount
                          : statusFunction(item.uploadStatus) === "Failed"
                          ? item.errorCount + "/" + item.recordCount
                          : "...."}
                      </p>
                    </div>
                    <div className="statusbar">
                      <ProgressBar
                        striped
                        // className="bg-Successful"
                        variant={statusFunction(item.uploadStatus)}
                        animated
                        now={
                          statusFunction(item.uploadStatus) === "Initiated"
                            ? 60
                            : 100
                        }
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={
                    statusFunction(item.uploadStatus) === "Initiated"
                      ? "col-3  historycardbtn btnDownloaddisbale"
                      : "col-3  historycardbtn"
                  }
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleErrorLog(item.rejectionFileId)}
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                    Error File
                  </button>
                  <button
                    type="button"
                    className="btn "
                    onClick={() => handleDownload( item.fileId)}
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                     Download
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
  // console.log(item);
  let temstatus = "";
  if (item === "ACCEPTED") {
    return (temstatus = "Successful");
  }
  if (item === "REJECTED") {
    return (temstatus = "Partially");
  }
  if (item === "RUNNING") {
    return (temstatus = "Initiated");
  }
  if (item === "FAILURE") {
    return (temstatus = "Failed");
  }
}

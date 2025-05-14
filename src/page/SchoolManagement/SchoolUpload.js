import { faDownload, faHouse, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import FileUpload from "../../Component/ComponentsInput/InputFile";
import { encrypt, encryptData } from "../../util/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";

export default function SchoolUpload() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00001"),
      href: "/",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      label: t("Common:App_lms_Common_00004B"),
      href: "/" + encrypt("Schoollist") + `/${encryptData("bulk")}`,
      icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: t("Common:App_lms_Common_00005", {
        mode: t("Common:App_lms_Common_00229"),
        label: t("Common:App_lms_Common_00004B"),
      }),
      icon: <FontAwesomeIcon icon={faList} />,
    },
  ];

  // Download template
  const downloadTemplate = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.schooTemplateDownload, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "School_upload_template.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success(t("Messages:DownloadTemplate"));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Upload template
  const uploadTemplate = async (file) => {
    try {
      const response = await axiosInstance.post(Apiurl.SchoolBulkUpload, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(t("Messages:UploadTemplate"));
      setTimeout(() => {
        navigate("/" + encrypt("Schoollist") + `/${encryptData("bulk")}`);
      }, 500);
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFileChangeNew = (file) => {
    const data = new FormData();
    data.append("file", file);
    uploadTemplate(data);
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00125")} />
      ) : (
        <div className="pagebody">
          <div className="row justify-content-center">
            <div className="form-group formgroup col-12">
              <div className="download_button">
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Download Template"}
                  // disabled={file === null ? true : false}
                  onClick={() => downloadTemplate()}
                />
              </div>

              <FileUpload
                title={"School Bulk Upload"}
                docName={t("Common:App_lms_Common_00227")}
                FILE_ALLOWED_TYPES={[
                  "application/vnd.ms-excel", // Excel documents (XLS)
                ]}
                FILEType={["excel"]}
                FILE_MAX_SIZE={2} //in MB
                FILE_MIN_SIZE={2} //in KB
                Id={"schoolUpload"}
                onFileChangeNew={onFileChangeNew}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FileUpload from "../../Component/ComponentsInput/InputFileWith";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import { uploadEnum } from "../Uploads/data";
import { Apiurl } from "./../../util/apiurl";
import { UploadTemplateFunction } from "./../Uploads/UploasAction";
import UserCreationtHistory from "./UserCreationtHistory";

const UserCreationUploadComponent = ({
  initialData,
  onSubmit,
  downloadTemplate,
handleFileUpload,
onFileChangeNew
}) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
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
  useEffect(() => {
    if (initialData) {
      // Populate form with initialData when it's available
      reset(initialData);
    }
  }, [initialData, reset]);


  return (
    <>
      {" "}
      {!loading ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center ">
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
                  downloadTemplate={downloadTemplate}
                  onFileChangeNew={onFileChangeNew}
                  downloadButtonName={"Download Template"}
                  uploadButtonName={"Upload"}
                />
              </div>
            </div>
          </form>

          <div>
          <h6 className="mb-2">
          <strong>
            Upload History
          </strong>
        </h6>
            <UserCreationtHistory />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
// FormComponent.propTypes = {
//   initialData: PropTypes.any,
//   onSubmit: PropTypes.func,
// };
export default UserCreationUploadComponent;

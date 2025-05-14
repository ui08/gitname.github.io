import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FileUpload from '../../../Component/ComponentsInput/InputFileWith';

const IncentiveRateUploadComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  downloadTemplate,
}) => {

  const { t } = useTranslation(["Common", "Messages", "Form"]);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row justify-content-center Reportspagebody">
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
  );
};
// FormComponent.propTypes = {
//   initialData: PropTypes.any,
//   onSubmit: PropTypes.func,
// };
export default IncentiveRateUploadComponent;

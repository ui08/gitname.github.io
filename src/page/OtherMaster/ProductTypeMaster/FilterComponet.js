import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  uploadedDocs
} from "../../ValidationPattern/Messaging";
import InputSelect from "./../../Component/ComponentsInput/InputSelect";
import { decryptData } from "./../../util/CryptoJS";

const FormComponent = ({ initialData, onSubmit }) => {
  const mode = decryptData(useParams().mode);
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

  const isViewMode = mode === "view";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <InputSelect
            {...useFromProps}
            useForm={useForm}
            clearable
            previewFlag={isViewMode}
            readOnly={false}
            registerName={"selectIntervention"}
            mandatory={true}
            labelName={t("Form:App_lms_Form_00005")}
            value={mode === "add" ? "" : uploadedDocs}
            options={uploadedDocs}
            onSelect={() => {}}
          />
        </div>
        
        <div className="col-12 col-md-6 col-lg-4">
          <InputSelect
            {...useFromProps}
            useForm={useForm}
            clearable
            previewFlag={isViewMode}
            readOnly={false}
            registerName={"selectInterventionLevel"}
            mandatory={true}
            labelName={t("Form:App_lms_Form_00055")}
            value={mode === "add" ? "" : uploadedDocs}
            options={uploadedDocs}
            onSelect={() => {}}
          />
        </div>
      </div>
    </form>
  );
};

FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
  
};
export default FormComponent;


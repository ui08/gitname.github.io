import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputText from "../../Component/ComponentsInput/InputText";
import "../../Component/ComponentsInput/InputText.scss";
import { decryptData } from "../../util/CryptoJS";
import PatternMessage from "../../util/PatternMessage";
import { ValidationPattern } from "../../ValidationPattern/ValidationPattern";
const FormComponent = ({ initialData, onSubmit }) => {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [interventionLevels, setInterventionLevels] = useState([]);

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

  const [levels, setLevels] = useState("");
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setInterventionLevels(
        initialData.levels.map((level) => ({
          id: level.id || 0,
          interventionLevels: level.interventionLevels || "",
        })) || []
      );
    }
  }, [initialData]);

  const isViewMode = mode === "view";
  const InterventionName = watch("interventionName");

  const isValid = ValidFunction();

  function ValidFunction() {
    return InterventionName && interventionLevels.every((level) => level);
  }
  const handleAddLevel = () => {
    setInterventionLevels((prevLevels) => [
      ...prevLevels,
      { id: 0, interventionLevels: "" }, // New level with ID of 0
    ]);
  };

  const handleLevelChange = (index, value) => {
    const newLevels = [...interventionLevels];
    newLevels[index].interventionLevels = value; // Update the level string
    setInterventionLevels(newLevels);
    setValue(`interventionLevels[${index}]`, value); // Update form state
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            maxLength={20}
            minLength={1}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            labelName={t("Form:App_lms_Form_00001")}
            pattern={{
              value: ValidationPattern.alphabet,
              // message: t("Form:App_lms_Form_00001"),
              message : PatternMessage("alphabet", t("Form:App_lms_Form_00001")),

            }}
            registerName={"interventionName"}
            name={"interventionName"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
          />
        </div>
        {interventionLevels.map((level, index) => (
          <div className="col-12 col-md-6 col-lg-4">
            <input
              type="hidden"
              {...register(`interventionid[${index}].id`)}
              defaultValue={level.id}
            />
            <InputText
              {...useFromProps}
              useForm={useForm}
              maxLength={20}
              minLength={1}
              readOnly={isViewMode}
              disabled={isViewMode}
              type="text"
              labelName={t("Form:App_lms_Form_00075", { index: index + 1 })}
              pattern={{
                value: ValidationPattern.alphabet,
                message: t("Form:App_lms_Form_00075"),
              }}
              registerName={`interventionLevels[${index}]`}
              name={`interventionLevels[${index}]`}
              mandatory={true}
              onPaste={false}
              onCopy={false}
              previewFlag={isViewMode}
              onChange={(e) => handleLevelChange(index, e.target.value)}
              
            />
          </div>
        ))}
      </div>

      <div className="row">
        {!isViewMode && (
          <ButtonComp
            wrapperName="btn_wrapper"
            type="button"
            btnStyle="box"
            btnText={"Add"}
            disabled={false}
            onClick={handleAddLevel} // Add level on click
          />
        )}
      </div>
      {!isViewMode && (
        <ButtonComp
          wrapperName="submit_btn_wrapper"
          type="submit"
          btnStyle="box"
          btnText={mode === "edit" ? "Edit" : "Submit"}
          disabled={!isValid}
          onClick={() => handleSubmit(interventionLevels)}
        />
      )}
    </form>
  );
};

FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};
export default FormComponent;
function cssFunction(previewFlag, errors, registerName) {
  if (previewFlag) {
    return "app_input previewStyle";
  } else if (errors?.[registerName]) {
    return "app_input errorsborder";
  } else {
    return "app_input";
  }
}

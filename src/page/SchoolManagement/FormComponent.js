import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ButtonComp from './../../Component/ButtonComp/ButtonComp';
import InputText from "./../../Component/ComponentsInput/InputText";
import { ValidationPattern } from "./../../ValidationPattern/ValidationPattern";
import { decryptData } from "./../../util/CryptoJS";
import PatternMessage from "../../util/PatternMessage";

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
      reset(initialData);
    }
  }, [initialData, reset]);

  const SchoolId = watch("schoolId");
  const SchoolName = watch("schoolName");
  const State = watch("state");
  const City = watch("city");
  const Pincode = watch("pincode");

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const isValid = ValidFunction();
  function ValidFunction() {
    if (isAddMode) {
      return SchoolId&&SchoolName&&State&&City&&Pincode;
    } else {
      return SchoolId&&SchoolName&&State&&City&&Pincode;
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
      <div className="col-12 col-md-6 col-lg-4">
          <InputText
            {...useFromProps} //...useFromPropsThis spreads all properties from useFromPropsinto <>&lt;InputText. This can include any props that useFromProps itself receives.</p>
            useForm={useForm} // useForm={'{'}useForm{'}'} Assigns the prop useForm with the value of useForm Typically used to handle form-related functionality
            maxLength={''}
            minLength={1}
            readOnly={isViewMode || isEditMode ? true : false} //readOnly=false: Specifies that the input field is not read-only if read-only pass readOnly=true
            disabled={false} //disabled=false: Specifies that the input field is not disabled if read-only pass disabled=true
            type="text" //Specifies the type of the input field as text
            labelName={t("Form:App_lms_Form_00008")} //Sets the main label for the input field as "Mobile".
            pattern={{
              value: ValidationPattern.alphaNumericWithoutSymbol, 
              message : PatternMessage("alphaNumericWithoutSymbol", t("Form:App_lms_Form_00008")),
            }}
            registerName={"schoolId"} // Sets the name used for registration purposes to "Mobile".
            name={"schoolId"} //Sets the name of the input field itself to "Mobile".
            mandatory={true} // Indicates that the input field is mandatory (required).
            onPaste={false} //Disables pasting into the input
            onCopy={false} //Disables copying from the input field
            previewFlag={isViewMode}
            onChange={() => {}} //Specifies an empty function for the <code>onChange</code> event handler. You might want to
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            maxLength={20}
            minLength={1}
            readOnly={isViewMode? true : false}
            disabled={false}
            type="text"
            labelName={t("Form:App_lms_Form_00007")}
            pattern={{
              value: ValidationPattern.alphabet, 
              message : PatternMessage("alphabet", t("Form:App_lms_Form_00007")),
            }}
            registerName={"schoolName"}
            name={"schoolName"}
            mandatory={true}
            onPaste={false}
            onCopy={false} 
            previewFlag={isViewMode}
            onChange={() => {}}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            maxLength={20}
            minLength={1}
            readOnly={isViewMode? true : false} //readOnly=false: Specifies that the input field is not read-only if read-only pass readOnly=true
            disabled={false} //disabled=false: Specifies that the input field is not disabled if read-only pass disabled=true
            type="text" //Specifies the type of the input field as text
            labelName={t("Form:App_lms_Form_00010")} //Sets the main label for the input field as "Mobile".
            pattern={{
              value: ValidationPattern.alphabet, 
              message : PatternMessage("alphabet", t("Form:App_lms_Form_00010")),
            }}
            registerName={"state"} // Sets the name used for registration purposes to "Mobile".
            name={"state"} //Sets the name of the input field itself to "Mobile".
            mandatory={true} // Indicates that the input field is mandatory (required).
            onPaste={false} //Disables pasting into the input
            onCopy={false} //Disables copying from the input field
            previewFlag={isViewMode}
            onChange={() => {}} //Specifies an empty function for the <code>onChange</code> event handler. You might want to
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <InputText
            {...useFromProps} //...useFromPropsThis spreads all properties from useFromPropsinto <>&lt;InputText. This can include any props that useFromProps itself receives.</p>
            useForm={useForm} // useForm={'{'}useForm{'}'} Assigns the prop useForm with the value of useForm Typically used to handle form-related functionality
            maxLength={20}
            minLength={1}
            readOnly={isViewMode? true : false} //readOnly=false: Specifies that the input field is not read-only if read-only pass readOnly=true
            disabled={false} //disabled=false: Specifies that the input field is not disabled if read-only pass disabled=true
            type="text" //Specifies the type of the input field as text
            labelName={t("Form:App_lms_Form_00009")}//Sets the main label for the input field as "Mobile".
            pattern={{
              value: ValidationPattern.alphabet, 
              message : PatternMessage("alphabet", t("Form:App_lms_Form_00009")),
            }}
            registerName={"city"} // Sets the name used for registration purposes to "Mobile".
            name={"city"} //Sets the name of the input field itself to "Mobile".
            mandatory={true} // Indicates that the input field is mandatory (required).
            onPaste={false} //Disables pasting into the input
            onCopy={false} //Disables copying from the input field
            previewFlag={isViewMode}
            onChange={() => {}} //Specifies an empty function for the <code>onChange</code> event handler. You might want to
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <InputText
            {...useFromProps} //...useFromPropsThis spreads all properties from useFromPropsinto <>&lt;InputText. This can include any props that useFromProps itself receives.</p>
            useForm={useForm} // useForm={'{'}useForm{'}'} Assigns the prop useForm with the value of useForm Typically used to handle form-related functionality
            maxLength={6}
            minLength={1}
            readOnly={isViewMode? true : false} //readOnly=false: Specifies that the input field is not read-only if read-only pass readOnly=true
            disabled={false} //disabled=false: Specifies that the input field is not disabled if read-only pass disabled=true
            type="text" //Specifies the type of the input field as text
            labelName={t("Form:App_lms_Form_00011")} //Sets the main label for the input field as "Mobile".
            pattern={{
              value: ValidationPattern.number, 
              message : PatternMessage("number", t("Form:App_lms_Form_00011")),
            }}
            registerName={"pincode"} // Sets the name used for registration purposes to "Mobile".
            name={"pincode"} //Sets the name of the input field itself to "Mobile".
            mandatory={true} // Indicates that the input field is mandatory (required).
            onPaste={false} //Disables pasting into the input
            onCopy={false} //Disables copying from the input field
            previewFlag={isViewMode}
            onChange={() => {}} //Specifies an empty function for the <code>onChange</code> event handler. You might want to
          />
        </div>

      </div>
      {!isViewMode && (

        <ButtonComp
          wrapperName="submit_btn_wrapper"
          type={"submit"}
          btnStyle="box"
          btnText={mode === "edit" ? "Edit" : "Submit"}
          disabled={!isValid}
          onClick={() => handleSubmit()}
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

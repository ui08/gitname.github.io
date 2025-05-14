import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputText from "../../../Component/ComponentsInput/InputText";
import { decryptData, encrypt } from "../../../util/Authenticate/CryptoJS";
import PatternMessage from "../../../util/PatternMessage";
import { ValidationPattern } from "../../../ValidationPattern/ValidationPattern";
import "./TransactionOtherProductFormComponent.scss";

const FormComponent = ({ initialData, onSubmit, onFileChangeNew, previewImage }) => {
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);
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

  const formProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  useEffect(() => {
    if (initialData) {
      // reset(initialData);
      setValue("permissionName", initialData.permissionName)
      setValue("permissionShortName", initialData.permissionShortName)
      setValue("permissionDesc", initialData.permissionDesc)

    }
  }, [initialData, reset]);

  const [shortName, setShortName] = useState("");

  const permissionName = watch("permissionName");
  const permissionDesc = watch("permissionDesc");

  const isValidCondition = permissionName && permissionDesc;
  const isValid = isAddMode || isEditMode ? isValidCondition : true;

  const handleCancel = () => {
    navigate("/" + encrypt("Rolepermission"));
  };

  const handlePermissionNameChange = (e) => {
    const name = e;
    const words = name.split(" ");
    const abbreviatedFirstWord = words[0].slice(0, 2);
    const abbreviatedWords = words.slice(1).map((word) => word.slice(0, 3));
    const short = [abbreviatedFirstWord, ...abbreviatedWords].join("_");

    setShortName(short);
    setValue("permissionShortName", short);
    setValue("permissionDesc", `This permission is for allowing access to ${name}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        <div className="col-12 col-md-7 col-lg-7">
          <InputText
            {...formProps}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            labelName="Permission Name"
            pattern={{
              value: ValidationPattern.permissionName,
              message: PatternMessage("alphabet", "permissionName"),
            }}
            registerName="permissionName"
            name="permissionName"
            mandatory
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={(e) => handlePermissionNameChange(e.target.value)}
            divClassName="divClassName"
          />
        </div>
        <div className="col-12 col-md-5 col-lg-5">
          <InputText
            {...formProps}
            readOnly
            disabled
            type="text"
            labelName="Permission Short Name"
            registerName="permissionShortName"
            name="permissionShortName"
            mandatory
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            divClassName="divClassName"
          />
        </div>
        <div className="col-12">
          <InputText
            {...formProps}
            readOnly
            disabled
            type="text"
            labelName="Permission Description"
            registerName="permissionDesc"
            name="permissionDesc"
            mandatory
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            divClassName="divClassName"
          />
        </div>

        {!isViewMode && (
          <div className="d-flex gap-2">
            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type="submit"
              btnStyle="box"
              btnText={mode === "edit" ? "Edit" : "Submit"}
              disabled={!isValid}
            />
            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type="button"
              btnStyle="box"
              btnText="Cancel"
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
    </form>
  );
};

FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};

export default FormComponent;

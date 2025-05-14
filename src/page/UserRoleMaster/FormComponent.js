import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import InputText from "../../Component/ComponentsInput/InputText";
import { Apiurl } from "../../util/apiurl";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import {
  ActivationReason,
  DeactivationReason,
} from "./../../util/FrontendMaster";
import "./UserRoleMasterFormComponent.scss";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);
  const [loading, setLoading] = useState(false);
  const [activationinitialData, setActivationinitialData] = useState();

  const [allRole, setAllRole] = useState([]);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  useEffect(() => {
    // GetallroleList();
    return () => {};
  }, []);
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
      GetallroleList(initialData.SupervisorRoleName, initialData.displayName);
      setActivationinitialData(initialData?.displayNameactivation);

      console.log(initialData?.displayNameactivation, "rolenamawaite");

      // GetallroleList(initialData.SupervisorRoleName);
      reset(initialData);
    }
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isActivationMode = mode === "Activation" || mode === "Deactivate";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [RoleName, SupervisorRoleName, RoleDescription] = watch([
    "RoleName",
    "SupervisorRoleName",
    "RoleDescription",
  ]);

  const GetallroleList = async (value, rolename) => {
    setAllRole([]);
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getallrole);
      setLoading(false);

      Object.values(response.data)
        .filter((x) => x.displayName != rolename)
        .map((item) => {
          if (value == item.roleId) {
            setValue("SupervisorRoleName", {
              label: item.displayName,
              value: item.roleId,
            });
          }
          let SingleData = {
            label: item.displayName,
            value: item.roleId,
          };
          setAllRole((prev) => [...prev, SingleData]);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidCondition = RoleName && SupervisorRoleName && RoleDescription;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const handleCancel = () => {
    navigate("/" + encrypt("UserRoleMasterList"));
  };
  console.log("initialData", initialData);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        {!isAddMode && (
          <div className="col-12 col-md-4 col-lg-4">
            <InputText
              {...useFromProps}
              useForm={useForm}
              readOnly={true}
              disabled={true}
              type="text"
              labelName="Role ID"
              registerName={"RoleID"}
              name={"RoleID"}
              mandatory={false}
              onPaste={false}
              onCopy={false}
              previewFlag={isViewMode || isActivationMode}
              onChange={() => {}}
              divClassName={"divClassName"}
            />
          </div>
        )}

        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={
              isViewMode || isActivationMode || isEditMode ? true : false
            }
            disabled={
              isViewMode || isActivationMode || isEditMode ? true : false
            }
            type="text"
            labelName="Role Name"
            // pattern={{
            //   value: ValidationPattern.alphabet,
            //   message: PatternMessage("alphabet", "Role Name"),
            // }}
            registerName={"RoleName"}
            name={"RoleName"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            minLength={1}
            maxLength={30}
            previewFlag={isViewMode || isActivationMode}
            onChange={(e) => {
              setValue("displayName", e.target.value);
              GetallroleList("value", e.target.value);
            }}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            type="text"
            labelName="Display Name"
            // pattern={{
            //   value: ValidationPattern.alphabet,
            //   message: PatternMessage("alphabet", "Display Name"),
            // }}
            registerName={"displayName"}
            name={"displayName"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            minLength={1}
            maxLength={80}
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="SupervisorRoleName"
            mandatory={true}
            labelName="Supervisor Role Name"
            options={allRole}
            onSelect={() => {}}
            previewFlag={isViewMode || isActivationMode}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-8 col-lg-8">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            type="text"
            minLength={1}
            maxLength={80}
            labelName="Role Description"
            registerName={"RoleDescription"}
            name={"RoleDescription"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>

        {mode === "Deactivation" || mode === "Activation" ? (
          <>
            <div className="col-12 col-md-4 col-lg-4">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="DeactivationorActivation"
                mandatory={true}
                labelName={
                  mode === "Deactivation"
                    ? "Deactivation Reason"
                    : mode === "Activation"
                    ? "Activation Reason"
                    : null
                }
                options={
                  mode === "Deactivation"
                    ? DeactivationReason
                    : mode === "Activation"
                    ? ActivationReason
                    : " -"
                }
                onSelect={() => {}}
                // previewFlag={isViewMode}
                divClassName={"divClassName"}
              />
            </div>
          </>
        ) : null}

        {activationinitialData !== null && mode === "view" && (
          <div className="col-12 col-md-4 col-lg-4">
            <InputText
              {...useFromProps}
              useForm={useForm}
              readOnly={isViewMode || isActivationMode ? true : false}
              disabled={isViewMode || isActivationMode ? true : false}
              type="text"
              labelName={
                initialData?.displayNameactivationstatus === "Active"
                  ? "Activation  Reason"
                  : " Deactivation  Reason"
              }
              // pattern={{
              //   value: ValidationPattern.alphabet,
              //   message: PatternMessage("alphabet", "Display Name"),
              // }}
              registerName={"displayNameactivation"}
              name={"displayNameactivation"}
              mandatory={true}
              onPaste={false}
              onCopy={false}
              minLength={1}
              maxLength={80}
              previewFlag={isViewMode}
              onChange={() => {}}
              divClassName={"divClassName"}
            />
          </div>
        )}

        {!isViewMode && (
          <div className="d-flex gap-2">
            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type={"submit"}
              btnStyle="box"
              btnText={"Submit"}
              disabled={!isValid}
              onClick={() => handleSubmit()}
            />

            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type={"submit"}
              btnStyle="box"
              btnText={"Cancel"}
              onClick={() => handleCancel()}
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

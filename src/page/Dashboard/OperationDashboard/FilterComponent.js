import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "./../../../Component/ComponentsInput/InputSelect";

const FilterComponent = ({ initialData, onSubmit }) => {
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
    setValue("SelectARN", { value: "ARN-22498", label: "ARN-22498" });
  }, [initialData, reset]);
  const approvalOptions = [
    { value: "ARN-22498", label: "ARN-22498" },
    // { value: "Options 2 ", label: "Options 2 " },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row  align-items-center my-2">
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="SelectARN"
            mandatory={true}
            labelName="Select ARN"
            options={approvalOptions}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>

        <div className="col-12 col-md-2 col-lg-2">
          <ButtonComp
            key={"Accordion Collapse"}
            wrapperName={"btn_wrapper "}
            type="button"
            btnStyle="box"
            btnText={"Show SIP"}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </form>
  );
};

FilterComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};
export default FilterComponent;

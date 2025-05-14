import dayjs from "dayjs";
import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputDatePicker from "../../Component/ComponentsInput/InputDatePicker";
import SelectElement from "../../Component/ComponentsInput/InputSelect";
import "../../Component/ComponentsInput/InputText.scss";
const FormComponent = ({ initialData, onSubmit }) => {
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

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData]);

  const CorporateReport = watch("CorporateReport");
  const CorporateDate = watch("date");

  const isValid = CorporateReport && CorporateDate;

  return (
    <div className="row">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row justify-content-center gap-3">
          <div className="CorporateReportsDiv col-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
            <SelectElement
              {...useFromProps}
              useForm={useForm}
              register={() => {}}
              // setValue={()=> {}}
              // errors={{}}
              // divClassName={{}}
              // control={{}}
              // isMulti = {false}
              // readOnly = {false}
              previewFlag={""}
              onSelect={() => {}}
              handleInputChange={() => {}}
              registerName={"CorporateReport"}
              mandatory={true}
              labelName="Corporate Reports"
              options={[
                { label: "Holding Report", value: "HOLDING_REPORT" },
                {
                  label: "Transaction Report",
                  value: "TRANSACTION_REPORT",
                },
              ]}
            />
          </div>
          <div className="CorporateReportsDiv col-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
            <InputDatePicker
              control={control}
              setValue={setValue}
              errors={errors}
              labelName="Select Date"
              registerName="date"
              mandatory={true}
              dateformat="DD/MM/YYYY"
              minDateVal={null} // Optional: Specify the minimum date
              maxDateVal={dayjs()} // Disable future dates
              // onSelect={(value) => console.log("Date selected:", value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <ButtonComp
            wrapperName="submit_btn_wrapper w-25"
            type="submit"
            btnStyle="box"
            btnText={"Generate"}
            disabled={!isValid}
            onClick={() => handleSubmit()}
          />
        </div>
      </form>
    </div>
  );
};

FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
  handleBtnClick: PropTypes.func,
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
